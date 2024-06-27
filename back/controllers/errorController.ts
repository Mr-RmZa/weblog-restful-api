import { NextFunction } from "express";

export class ErrorController {
  public static error(
    message: string,
    status: number,
    next: NextFunction
  ): void {
    const error = new Error(message) as Record<string, any>;
    error.statusCode = status;
    next(error);
  }
}
