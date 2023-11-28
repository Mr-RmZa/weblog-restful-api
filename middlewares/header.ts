export class header {
  public static setHeader(
    req: any,
    res: { setHeader: (arg0: string, arg1: string) => void },
    next: () => void
  ) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  }
}
