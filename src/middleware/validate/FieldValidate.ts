import { Request, Response, NextFunction } from "express";

export const validate = (requestFeild) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("middleware validation");
    next();
  };
};
