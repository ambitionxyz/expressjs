import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync";
import RoleService from "../services/RoleService";

class RoleController {
  createRole = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await RoleService.createRole(req.body);
      return res.status(httpStatus.OK).json(result);
    }
  );

  getAllPagging = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // console.log("role", req);
      const result = await RoleService.getAllPaggingRole(req.query);

      return res.status(httpStatus.OK).json(result);
    }
  );
}

export = new RoleController();
