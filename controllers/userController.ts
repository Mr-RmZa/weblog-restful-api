import axios from "axios";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import * as svgCaptcha from "svg-captcha";
import { sendEmail } from "../utils/mailer";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  schemaUser,
  schemaContact,
  schemaResetPass,
  schemaForgetPass,
} from "../models/secure/userValidation";

export class userController {
  public static async recaptcha(
    req: {
      body: { [x: string]: any };
      connection: { remoteAddress: any };
      flash: (arg0: string, arg1: string) => void;
      originalUrl: string;
    },
    res: any,
    next: any
  ) {
    try {
      const GRR = req.body["g-recaptcha-response"];
      if (GRR) {
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA}&response=${GRR}&remoteip=${req.connection.remoteAddress}`;
        const response = await axios.post(verifyUrl);
        if (response.data.success) {
          console.log("mmd");
        } else {
          req.flash("error", "recaptcha error");
          return res.redirect(req.originalUrl);
        }
      } else {
        req.flash("error", "recaptcha is required");
        return res.redirect(req.originalUrl);
      }
    } catch (error) {
      console.log(error);
      return res.redirect("/error/500");
    }
  }

  public static logout(req: any, res: any, next: (arg0: any) => any) {
    try {
      req.logout((err: any) => {
        if (err) {
          return next(err);
        }
        res.set(
          "Cache-Control",
          "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
        );
        return res.redirect("/");
      });
    } catch (error) {
      console.log(error);
      return res.redirect("/error/500");
    }
  }

  public static async createUser(
    req: {
      body: { fullName: any; email: any; password: any; captcha: any };
      session: { captcha: any };
      flash: (arg0: string, arg1: string) => void;
    },
    res: any
  ) {
    try {
      const { fullName, email, password, captcha } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        schemaUser
          .validate(req.body, { abortEarly: false })
          .then(() => {
            if (captcha === req.session.captcha) {
              bcrypt.hash(password, 10).then(async (hash) => {
                await User.create({
                  fullName,
                  email,
                  password: hash,
                });
              });

              //? Send Welcome Email
              sendEmail(
                email,
                fullName,
                "خوش آمدی به وبلاگ ما",
                "خیلی خوشحالیم که به جمع ما وبلاگرهای خفن ملحق شدی"
              );

              req.flash("success_msg", "register successfully!");
              return res.redirect("/admin/login");
            } else {
              req.flash("error", "the code is not correct");
              return res.redirect("/admin/register");
            }
          })
          .catch((err: { errors: any }) => {
            req.flash("error", err.errors);
            return res.redirect("/admin/register");
          });
      } else {
        req.flash("error", "duplicate email!");
        return res.redirect("/admin/register");
      }
    } catch (error) {
      console.log(error);
      return res.redirect("/error/500");
    }
  }

  public static async handleForgetPassword(
    req: {
      body: { email: any; captcha: any };
      session: any;
      logout: (arg0: (err: any) => any) => void;
      flash: (arg0: string, arg1: string) => void;
    },
    res: any,
    next: (arg0: any) => any
  ) {
    try {
      const { email, captcha } = req.body;
      schemaForgetPass
        .validate(req.body, { abortEarly: false })
        .then(async () => {
          if (captcha === req.session.captcha) {
            const user = await User.findOne({ email: email });
            if (user) {
              const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET!,
                {
                  expiresIn: "1h",
                }
              );
              const resetLink = `http://${process.env.URL}:3000/admin/resetPassword/${token}`;
              console.log(resetLink);

              sendEmail(
                user.email!,
                user.fullName!,
                "فراموشی رمز عبور",
                `جهت تغییر رمز عبور فعلی رو لینک زیر کلیک کنید
          <a href="${resetLink}">لینک تغییر رمز عبور</a>`
              );
              req.logout((err: any) => {
                if (err) {
                  return next(err);
                }
                req.flash(
                  "success_msg",
                  "the email containing the link has been sent successfully"
                );
                return res.redirect("/admin/forgetPassword");
              });
            } else {
              req.flash("error", "user with email is not registered");
              return res.redirect("/admin/forgetPassword");
            }
          } else {
            req.flash("error", "the code is not correct");
            return res.redirect("/admin/forgetPassword");
          }
        })
        .catch((err: { errors: any }) => {
          req.flash("error", err.errors);
          return res.redirect("/admin/forgetPassword");
        });
    } catch (error) {
      console.log(error);
      return res.redirect("/error/500");
    }
  }

  public static resetPassword(
    req: { params: { token: any }; flash: (arg0: string) => any },
    res: {
      render: (
        arg0: string,
        arg1: { pageTitle: string; message: any; error: any; userId: any }
      ) => void;
      redirect: (arg0: string) => void;
    }
  ) {
    try {
      const token = req.params.token;

      let decodedToken;

      try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        console.log(decodedToken);
      } catch (err) {
        console.log(err);
        if (!decodedToken) {
          return res.redirect("/error/404");
        }
      }
      return res.render("users/resetPass", {
        pageTitle: "Change Password",
        message: req.flash("success_msg"),
        error: req.flash("error"),
        userId: decodedToken.userId,
      });
    } catch (error) {
      console.log(error);
      return res.redirect("/error/500");
    }
  }

  public static async handleResetPassword(
    req: {
      body: { password: any };
      params: { id: any };
      flash: (arg0: string, arg1?: string | undefined) => void;
    },
    res: {
      redirect: (arg0: string) => any;
      render: (
        arg0: string,
        arg1: { pageTitle: string; message: any; error: any; userId: any }
      ) => any;
    }
  ) {
    try {
      const { password } = req.body;
      schemaResetPass
        .validate(req.body, { abortEarly: false })
        .then(() => {
          bcrypt.hash(password, 10).then(async (hash) => {
            const user = await User.findOne({ _id: req.params.id });
            if (user) {
              user.password = hash;
              await user.save();
              req.flash(
                "success_msg",
                "your password has been successfully updated"
              );
              return res.redirect("/admin/login");
            } else {
              return res.redirect("/error/404");
            }
          });
        })
        .catch((err: { errors: any }) => {
          req.flash("error", err.errors);
          return res.render("users/resetPass", {
            pageTitle: "Change Password",
            message: req.flash("success_msg"),
            error: req.flash("error"),
            userId: req.params.id,
          });
        });
    } catch (error) {
      console.log(error);
      return res.redirect("/error/500");
    }
  }

  public static handleContact(req: any, res: any, next: any) {
    try {
      const { fullName, email, message, captcha } = req.body;
      schemaContact
        .validate(req.body, { abortEarly: false })
        .then(() => {
          // if (captcha === req.session.captcha) {
          sendEmail(
            email,
            fullName,
            "پیام از طرف وبلاگ",
            `${message} <br/> ایمیل کاربر : ${email}`
          );
          return res
            .status(200)
            .json({ message: "your message has been successfully sent" });
          // } else {
          //   return res.status(422).json({ error: "the code is not correct" });
          // }
        })
        .catch((err: { errors: any }) => {
          return res.status(422).json({ errors: err.errors });
        });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  public static captcha(req: { session: { captcha: any } }, res: any) {
    const captcha = svgCaptcha.createMathExpr({ mathMin: 1 });
    req.session.captcha = captcha.text;
    res.type("svg");
    res.status(200).send(captcha.data);
  }
}
