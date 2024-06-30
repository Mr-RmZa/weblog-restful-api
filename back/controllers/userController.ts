import axios from "axios";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import PrismaService from "../config/db";
import RedisService from "../config/redis";
import { Request, Response } from "express";

export class UserController {
  public static async login(req: Request, res: Response) {
    const { email } = req.body;

    if (
      !email ||
      typeof email !== "string" ||
      !/^[a-zA-Z0-9._%+-][a-zA-Z0-9._%+-][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm.test(
        email
      )
    ) {
      return res.status(400).json({ message: "email is not valid." });
    }

    const user = await PrismaService.get(email);

    if (user) {
      return res.status(200).json({ isUser: true });
    } else {
      const isUser = false;

      const getOTP = await RedisService.get(email);

      const getTTL = await RedisService.getTtl(email);

      if (!getOTP && !getTTL) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const ttl = 15 * 60; // 15 minutes

        await RedisService.set(email, otp, ttl);

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
  }
  public static async otp(req: Request, res: Response) {
    const { email, otp } = req.body;

    if (
      !email ||
      typeof email !== "string" ||
      !/^[a-zA-Z0-9._%+-][a-zA-Z0-9._%+-][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm.test(
        email
      ) ||
      !otp ||
      typeof otp !== "string" ||
      !/^\d{6}$/gm.test(otp)
    ) {
      return res.status(400).json({ message: "email or otp is not valid." });
    }

    const user = await PrismaService.get(email);

    if (user) {
      return res.status(200).json({ isUser: true });
    }

    const getOTP = await RedisService.get(email);

    if (getOTP === otp) {
      await RedisService.delete(email);

      const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      return res.status(200).json({ token });
    }

    return res
      .status(401)
      .json({ message: "invalid or expired email or otp." });
  }
  public static async rest(req: Request, res: Response) {
    const { token, password } = req.body;

    if (
      !token ||
      typeof token !== "string" ||
      !/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+\/=]+$/gm.test(token) ||
      !password ||
      typeof password !== "string" ||
      /[\u0600-\u06FF\s]+/.test(password)
    ) {
      return res
        .status(400)
        .json({ message: "token or password is not valid." });
    }

    const blacklist = await RedisService.get(`blacklist:${token}`);

    if (blacklist) {
      return res.status(401).json({ message: "invalid or expired token." });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        email: string;
      };
    } catch (error) {
      return res.status(401).json({ message: "invalid or expired token." });
    }

    const email = decoded.email;

    const user = await PrismaService.get(email);

    if (user) {
      await RedisService.set(`blacklist:${token}`, "true", 30 * 24 * 60 * 60); // 30 day
    } else {
      await RedisService.set(`blacklist:${token}`, "true", 60 * 60); // 1 hour
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await PrismaService.upsert(email, hashedPassword);

    const newToken = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: "30d",
    });

    return res.status(200).json({ token: newToken });
  }
  public static async password(req: Request, res: Response) {
    const { email, password } = req.body;

    if (
      !email ||
      typeof email !== "string" ||
      !/^[a-zA-Z0-9._%+-][a-zA-Z0-9._%+-][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm.test(
        email
      ) ||
      !password ||
      typeof password !== "string" ||
      /[\u0600-\u06FF\s]+/.test(password)
    ) {
      return res
        .status(400)
        .json({ message: "email or password is not valid." });
    }

    const user = await PrismaService.password(email, password);

    if (user) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
        expiresIn: "30d",
      });
      return res.status(200).json({ token });
    } else {
      return res
        .status(400)
        .json({ message: "email or password is not valid." });
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
