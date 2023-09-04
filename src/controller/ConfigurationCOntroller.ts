import { NextFunction, Response, Request } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync";
import ConfigurationService from "../services/ConfigurationService";

class ClientController {
  workingTimeConfigAllBranch = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await ConfigurationService.workingTimeConfigAllBranch();
      return res.status(httpStatus.OK).json(result);
    }
  );
}
export = new ClientController();
