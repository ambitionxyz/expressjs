import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Error } from "mongoose";
import { baseError } from "../dto/resDto/BaseError";
import { ApiError } from "../utils/ApiErrors";
import { BaseErrorDto } from "../dto/resDto/BaseError";
export const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("da vao err convert");
  let error = err;
  if (!(err instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];

    error = new ApiError(statusCode, message);
  }
  next(error);
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;
  if (!statusCode || !message) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }
  // res.locals.errorMessage = message;
  const ERR_RES = baseError();
  ERR_RES.error.message = message;
  ERR_RES.error.code = statusCode;
  console.log("ERR HANDLER");
  res.status(statusCode).json(ERR_RES);
};
