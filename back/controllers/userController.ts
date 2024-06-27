import axios from "axios";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import PrismaService from "../config/db";
import RedisService from "../config/redis";
import { NextFunction, Request, Response } from "express";

export class UserController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "email is required." });
    }

    try {
      PrismaService.connect();

      const prisma = PrismaService.getClient();

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        return res.status(200).json({ isUser: true });
      } else {
        const isUser = false;

        const getOTP = await RedisService.getOTP(email);

        const getTTL = await RedisService.getTTL(email);

        if (!getOTP && !getTTL) {
          const otp = Math.floor(100000 + Math.random() * 900000).toString();
          const ttl = 15 * 60; // 15 minutes
          await RedisService.setOTP(email, otp, ttl);
          return res.status(200).json({
            isUser,
            otpTtl: ttl,
          });
        }

        return res.status(200).json({
          isUser,
          otpTtl: getTTL,
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
    } finally {
      await PrismaService.disconnect();
      await RedisService.disconnect();
    }
  }

  public static async otp(req: Request, res: Response, next: NextFunction) {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "email and otp are required." });
    }

    try {
      PrismaService.connect();

      const prisma = PrismaService.getClient();

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        return res.status(200).json({ isUser: true });
      }

      const getOTP = await RedisService.getOTP(email);

      if (getOTP === otp) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
          expiresIn: "1h",
        });
        return res.status(200).json({ token });
      } else {
        return res.status(400).json({ message: "invalid or expired otp." });
      }
    } catch (error) {
      console.error(error);
      next(error);
    } finally {
      await RedisService.disconnect();
      await PrismaService.disconnect();
    }
  }

  public static async password(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "email is not correct" });
    }

    try {
      await PrismaService.connect();

      // const user = await PrismaService.Prisma.user.findUnique({
      //   where: { email },
      // });

      // if (user) {
      //   return res.status(400).json({ message: "email is available" });
      // }
    } catch (error) {
      console.error(error);
      next(error);
    } finally {
      await PrismaService.disconnect();
    }
  }

  public static async rest(req: Request, res: Response, next: NextFunction) {
    const { token, password } = req.body;

    if (!token || !password) {
      return res
        .status(400)
        .json({ message: "token and new password are required." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        email: string;
      };

      const email = decoded.email;

      PrismaService.connect();

      const prisma = PrismaService.getClient();

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.upsert({
        where: { email },
        update: { password: hashedPassword },
        create: { email, password: hashedPassword },
      });

      //remove jwt

      return res.status(200).json({ message: "updated password" });
    } catch (error) {
      console.error(error);
      next(error);
    } finally {
      await PrismaService.disconnect();
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
}
