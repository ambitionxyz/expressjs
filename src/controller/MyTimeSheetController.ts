import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync";
import { BaseResDto } from "../dto/resDto/BaseResDto";
import MyTimesheetService from "../services/MyTimesheetService";

class MyTimeSheetController {
  get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    const result = await MyTimesheetService.getTimesheet(req.query);
    return res.status(httpStatus.OK).json(result);
  });

  create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const curentUser = req["currentUser"];

      const result = await MyTimesheetService.createTimesheet(
        req.body,
        curentUser
      );
      return res.status(httpStatus.OK).json(result);
    }
  );

  update = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await MyTimesheetService.updateTimeSheet(req.body);
      return res.status(httpStatus.OK).json(result);
    }
  );

  delete = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      console.log(req);

      const result = await MyTimesheetService.deleteTimeSheet(req.query);
      return res.status(httpStatus.OK).json(result);
    }
  );

  getAllTimeSheetOfUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await MyTimesheetService.getAllTimeSheetOfUser(req.query);
      return res.status(httpStatus.OK).json(result);
    }
  );

  submitToPending = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await MyTimesheetService.submitToPending(req.body);
      return res.status(httpStatus.OK).json(result);
    }
  );
}

export = new MyTimeSheetController();
