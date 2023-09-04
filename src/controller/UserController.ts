import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync";

class UserController {
  createUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await UserService.create(req.body);
      return res.status(httpStatus.OK).json(result);
    }
  );
  deleteUser = catchAsync(async (req: Request, res: Response) => {
    await UserService.deleteUser(req.query);
    res.status(httpStatus.OK).json({});
  });

  // deactiveUser = catchAsync(async (req: Request, res: Response) => {
  //   await UserService.deactiveUser(req.body);
  //   return res.status(httpStatus.OK).json();
  // });

  // activeUser = catchAsync(async (req: Request, res: Response) => {
  //   await UserService.activeUser(req.body);
  //   return res.status(httpStatus.OK).json();
  // });

  getUserLoginInfo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await UserService.getUserLoginInfo(req);
      return res.status(httpStatus.OK).json(result);
    }
  );
  getAllPagging = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await UserService.getAllPagging(req.body);
      return res.status(httpStatus.OK).json(result);
    }
  );
  get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.get(req.query);
    return res.status(httpStatus.OK).json(result);
  });

  getUserNotPagging = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await UserService.allUserNotPagging();
      return res.status(httpStatus.OK).json(result);
    }
  );
  getAllManager = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await UserService.getAllManager();
      return res.status(httpStatus.OK).json(result);
    }
  );
  updateUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await UserService.updateUser(req.body);
      return res.status(httpStatus.OK).json(result);
    }
  );
  getRoles = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await UserService.getRoles();
      return res.status(httpStatus.OK).json(result);
    }
  );
}
export = new UserController();
