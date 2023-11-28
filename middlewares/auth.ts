export class auth {
  public static authenticated(req: any, res: any, next: any) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(422).json({ message: "your are not login" });
  }
}
