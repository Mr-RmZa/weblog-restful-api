export class errorController {
  public static error(message: string, status: number, next: any) {
    try {
      const error = new Error(message) as Record<string, any>;
      error.statusCode = status;
      throw error;
    } catch (error) {
      return next(error);
    }
  }
}
