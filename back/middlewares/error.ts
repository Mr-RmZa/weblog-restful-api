export class errorHandler {
  public static error(
    error: { statusCode: number; message: any; data: any },
    req: any,
    res: any,
    next: any
  ) {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    return res.status(status).json({ message, data });
  }
}
