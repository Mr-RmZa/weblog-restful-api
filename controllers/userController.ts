import axios from "axios";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import * as svgCaptcha from "svg-captcha";
import { sendEmail } from "../utils/mailer";
import jwt, { JwtPayload } from "jsonwebtoken";
import { errorController } from "./errorController";
import {
  schemaLogin,
  schemaContact,
  schemaRegister,
  schemaResetPass,
  schemaForgetPass,
} from "../models/secure/userValidation";

export class userController {
  public static login(
    req: { body: { email: any; password: any } },
    res: any,
    next: (arg0: unknown) => any
  ) {
    try {
      schemaLogin
        .validate(req.body, { abortEarly: false })
        .then(async () => {
          const { email, password } = req.body;
          const user = await User.findOne({ email });
          if (user) {
            const isEqual = await bcrypt.compare(password, user.password!);
            if (isEqual) {
              const token = jwt.sign(
                {
                  user: {
                    userId: user._id.toString(),
                    email: user.email,
                    fullName: user.fullName,
                  },
                },
                process.env.JWT_SECRET!,
                {
                  expiresIn: "1h",
                }
              );
              return res
                .status(200)
                .json({ token, userId: user._id.toString() });
            } else {
              errorController.error("not found!", 422, next);
            }
          } else {
            errorController.error("not found!", 404, next);
          }
        })
        .catch((error: { errors: any }) => {
          errorController.error(error.errors, 422, next);
        });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

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
      req.logout((error: any) => {
        if (error) {
          return next(error);
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

  public static register(
    req: { body: { fullName: any; email: any; password: any; captcha: any } },
    res: any,
    next: (arg0: unknown) => any
  ) {
    try {
      schemaRegister
        .validate(req.body, { abortEarly: false })
        .then(async () => {
          const { fullName, email, password, captcha } = req.body;
          const user = await User.findOne({ email });
          if (!user) {
            // if (captcha === req.session.captcha) {
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
            return res.status(201).json({ message: "register successfully!" });
            // } else {
            // errorController.error("the code is not correct!", 422);
            // }
          } else {
            errorController.error("duplicate email!", 422, next);
          }
        })
        .catch((error: { errors: any }) => {
          errorController.error(error.errors, 422, next);
        });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  public static forgetPassword(
    req: {
      body: { email: string; captcha: string };
      // logout: (arg0: (error: any) => any) => void;
    },
    res: any,
    next: (arg0: any) => any
  ) {
    try {
      schemaForgetPass
        .validate(req.body, { abortEarly: false })
        .then(async () => {
          const { email, captcha } = req.body;
          // if (captcha === req.session.captcha) {
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
            // req.logout((error: any) => {
            //   if (error) {
            //     return next(error);
            //   }
            //   req.flash(
            //     "success_msg",
            //     "the email containing the link has been sent successfully"
            //   );
            //   return res.redirect("/admin/forgetPassword");
            // });
            return res.status(200).json({
              message:
                "the email containing the link has been sent successfully!",
            });
          } else {
            errorController.error("not found!", 404, next);
          }
          // } else {
          // errorController.error("the code is not correct", 422, next);
          // }
        })
        .catch((error: { errors: any }) => {
          errorController.error(error.errors, 422, next);
        });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  public static resetPassword(
    req: { body: { password: any }; params: { token: any } },
    res: any,
    next: (arg0: unknown) => any
  ) {
    try {
      const token = req.params.token;
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as JwtPayload;
      if (decodedToken) {
        schemaResetPass
          .validate(req.body, { abortEarly: false })
          .then(async () => {
            const { password } = req.body;
            const user = await User.findOne({ _id: decodedToken.userId });
            if (user) {
              bcrypt.hash(password, 10).then(async (hash) => {
                user.password = hash;
                await user.save();
                return res.status(200).json({
                  message: "your password has been successfully updated",
                });
              });
            } else {
              errorController.error("not found!", 404, next);
            }
          })
          .catch((error: { errors: any }) => {
            errorController.error(error.errors, 422, next);
          });
      } else {
        errorController.error("not found!", 404, next);
      }
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  public static contact(req: any, res: any, next: any) {
    try {
      schemaContact
        .validate(req.body, { abortEarly: false })
        .then(() => {
          const { fullName, email, message, captcha } = req.body;
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
          // errorController.error("the code is not correct!", 422, next);
          // }
        })
        .catch((error: { errors: any }) => {
          errorController.error(error.errors, 422, next);
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
    return res.status(200).send(captcha.data);
  }
}
