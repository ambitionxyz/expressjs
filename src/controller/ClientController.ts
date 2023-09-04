import { NextFunction, Response, Request } from "express";
import ClientSercive from "../services/ClientSercive";
import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync";

class ClientController {
  createClient = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await ClientSercive.create(req.body);
      return res.status(httpStatus.OK).json(result);
    }
  );
  findAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await ClientSercive.getAllPagging(req.body);
      return res.status(httpStatus.OK).json(result);
    }
  );
  getAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await ClientSercive.findAllClient();
      return res.status(httpStatus.OK).json(result);
    }
  );
  deleteClient = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      console.log(req);
      await ClientSercive.deleteClient(req.query);
      return res.status(httpStatus.OK).json({});
    }
  );
}
export = new ClientController();
