import jwt, { JwtPayload } from "jsonwebtoken";
import { errorController } from "../controllers/errorController";
export class auth {
  public static authenticated(
    req: { get: (arg0: string) => any; userId: any },
    res: any,
    next: any
  ) {
    try {
      const authHeader = req.get("Authorization");
      if (authHeader) {
        const token = authHeader.split(" ")[1]; //Bearer Token => ['Bearer', token]
        let decodedToken;
        try {
          decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET!
          ) as JwtPayload;
        } catch (error) {
          decodedToken = null;
        }
        if (decodedToken) {
          req.userId = decodedToken.user.userId;
          next();
        } else {
          errorController.error(
            "You do not have enough permissions!",
            401,
            next
          );
        }
      } else {
        errorController.error("You do not have enough permissions!", 401, next);
      }
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
}
