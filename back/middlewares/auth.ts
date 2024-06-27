import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ErrorController } from "../controllers/errorController";

export class Auth {
  public static authenticated(
    req: Request & { userId?: string },
    res: Response,
    next: NextFunction
  ): void {
    try {
      const authHeader = req.get("Authorization");

      if (!authHeader) {
        return ErrorController.error(
          "You do not have enough permissions!",
          401,
          next
        );
      }

      const token = authHeader.split(" ")[1]; // Bearer Token => ['Bearer', token]

      let decodedToken: JwtPayload | null = null;

      try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      } catch (error) {
        return ErrorController.error("Invalid token!", 401, next);
      }

      if (!decodedToken) {
        return ErrorController.error(
          "You do not have enough permissions!",
          401,
          next
        );
      }

      req.userId = decodedToken.user.userId;
      next();
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
}
