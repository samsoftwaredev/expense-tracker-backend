import { NextFunction, Request, Response } from "express";

const headerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.header("content-type", "application/json");
  next();
};

export default headerMiddleware;
