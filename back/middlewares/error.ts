import { Request, Response, NextFunction } from "express";

export class Error {
  public static error(
    error: { statusCode: number; message: string; data: string },
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    return res.status(status).json({ message, data });
  }
}
