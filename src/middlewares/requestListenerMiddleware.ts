import { NextFunction, Request, Response } from "express";

const listen = (req: Request, res: Response, next: NextFunction) => {
  console.log("Request URL: " + req.originalUrl);
  console.log("Request Body: ", req.body);
  next();
};

export default listen;
