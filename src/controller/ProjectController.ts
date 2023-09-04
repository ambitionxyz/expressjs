import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync";
import ProjectService from "../services/ProjectService";

class ProjectController {
  getAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await ProjectService.getAll(req.query);
      return res.status(httpStatus.OK).json(result);
    }
  );
  save = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await ProjectService.save(req.body);
    return res.status(httpStatus.OK).json(result);
  });
  get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await ProjectService.get(req.query);
    return res.status(httpStatus.OK).json(result);
  });
  getProjectsIncludingTasks = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const curentUser = req["currentUser"];
      const result = await ProjectService.projectsIncludingTasks(curentUser);
      return res.status(httpStatus.OK).json(result);
    }
  );
}

export = new ProjectController();
