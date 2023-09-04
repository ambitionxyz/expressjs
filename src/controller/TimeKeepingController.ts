import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync";
import { BaseResDto } from "../dto/resDto/BaseResDto";

class TimeKeepingController {
  GetMyDetails = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      console.log("req", req.query);

      return res.status(httpStatus.OK).json({
        ...BaseResDto,
        result: [],
      });
    }
  );
}

export = new TimeKeepingController();
