import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import dotenv from "dotenv";

interface checkToken {
  roleNames: [string];
}

interface ICurrentUser {
  curentUserId: String;
}

import { ApiError } from "../utils/ApiErrors";
dotenv.config();
export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  const decoToken: checkToken =
    req.headers && req.headers.authorization
      ? jwtDecode(req.headers.authorization)
      : null;
  if (
    decoToken &&
    decoToken.roleNames &&
    decoToken.roleNames.some((r) => r.includes("ADMIN"))
  ) {
    console.log("pass ADMIn");
    next();
  } else {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You can't access this page without permission"
    );
  }
};
export const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers && !req.headers.authorization)
    throw new ApiError(httpStatus.UNAUTHORIZED, "User not login");
  else {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET,
      (err, decode: any) => {
        const currentTime = Math.floor(Date.now() / 1000);
        if (decode.exp && decode.exp < currentTime) {
          if (req["currentUser"]) delete req["currentUser"];
          throw new ApiError(
            httpStatus.UNAUTHORIZED,
            "Your sesion was expired!"
          );
        } else {
          if (
            !req["currentUser"] ||
            (req["currentUser"] && req["currentUser"] !== decode.id)
          ) {
            req["currentUser"] = {
              curentUserId: decode.id,
            } as ICurrentUser;
          }

          next();
        }
      }
    );
  }
};
