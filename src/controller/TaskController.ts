import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync";
import TaskService from "../services/TaskService";

class TaskController {
  save = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await TaskService.save(req.body);
    return res.status(httpStatus.OK).json(result);
  });
  findAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await TaskService.findAll();
      return res.status(httpStatus.OK).json(result);
    }
  );
  deleteTask = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await TaskService.deleteTask(req.query);
      return res.status(httpStatus.OK).json();
    }
  );
  archive = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await TaskService.archiveTask(req.query);
      return res.status(httpStatus.OK).json();
    }
  );

  //fake
  // findAll = catchAsync(
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     await BranchModel.create({
  //       name: "HN1",
  //       displayName: "HN1",
  //       morningWorking: 3.5,
  //       morningStartAt: "08:30",
  //       morningEndAt: "12:00",
  //       afternoonWorking: 4.5,
  //       afternoonStartAt: "13:00",
  //       afternoonEndAt: "17:30",
  //       color: "#f44336",
  //       code: "HN1",
  //     });
  //     await BranchModel.create({
  //       name: "HN2",
  //       displayName: "HN2",
  //       morningWorking: 3.5,
  //       morningStartAt: "08:30",
  //       morningEndAt: "12:00",
  //       afternoonWorking: 4.5,
  //       afternoonStartAt: "13:00",
  //       afternoonEndAt: "17:30",
  //       color: "#ff9800",
  //       code: "HN2",
  //     });
  //     await BranchModel.create({
  //       name: "ĐN",
  //       displayName: "ĐN",
  //       morningWorking: 3.5,
  //       morningStartAt: "08:30",
  //       morningEndAt: "12:00",
  //       afternoonWorking: 4.5,
  //       afternoonStartAt: "13:00",
  //       afternoonEndAt: "17:30",
  //       color: "purple",
  //       code: "ĐN",
  //     });
  //   }
  // );
}

export = new TaskController();
