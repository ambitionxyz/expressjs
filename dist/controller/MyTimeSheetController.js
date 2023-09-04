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
const MyTimesheetService_1 = __importDefault(require("../services/MyTimesheetService"));
class MyTimeSheetController {
    constructor() {
        this.get = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            const result = yield MyTimesheetService_1.default.getTimesheet(req.query);
            return res.status(http_status_1.default.OK).json(result);
        }));
        this.create = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const curentUser = req["currentUser"];
            const result = yield MyTimesheetService_1.default.createTimesheet(req.body, curentUser);
            return res.status(http_status_1.default.OK).json(result);
        }));
        this.update = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield MyTimesheetService_1.default.updateTimeSheet(req.body);
            return res.status(http_status_1.default.OK).json(result);
        }));
        this.delete = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            const result = yield MyTimesheetService_1.default.deleteTimeSheet(req.query);
            return res.status(http_status_1.default.OK).json(result);
        }));
        this.getAllTimeSheetOfUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield MyTimesheetService_1.default.getAllTimeSheetOfUser(req.query);
            return res.status(http_status_1.default.OK).json(result);
        }));
        this.submitToPending = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield MyTimesheetService_1.default.submitToPending(req.body);
            return res.status(http_status_1.default.OK).json(result);
        }));
    }
}
module.exports = new MyTimeSheetController();
//# sourceMappingURL=MyTimeSheetController.js.map