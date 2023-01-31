import { NextFunction, Request, Response } from "express";

const headerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  next();
};

export default headerMiddleware;
