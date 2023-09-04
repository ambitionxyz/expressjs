"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../utils/catchAsync");
const TaskService_1 = __importDefault(require("../services/TaskService"));
class TaskController {
    constructor() {
        this.save = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TaskService_1.default.save(req.body);
            return res.status(http_status_1.default.OK).json(result);
        }));
        this.findAll = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TaskService_1.default.findAll();
            return res.status(http_status_1.default.OK).json(result);
        }));
        this.deleteTask = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield TaskService_1.default.deleteTask(req.query);
            return res.status(http_status_1.default.OK).json();
        }));
        this.archive = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield TaskService_1.default.archiveTask(req.query);
            return res.status(http_status_1.default.OK).json();
        }));
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
}
module.exports = new TaskController();
//# sourceMappingURL=TaskController.js.map