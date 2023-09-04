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
const UserService_1 = __importDefault(require("../services/UserService"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../utils/catchAsync");
class UserController {
    constructor() {
        this.createUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield UserService_1.default.create(req.body);
            return res.status(http_status_1.default.OK).json(result);
        }));
        this.deleteUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield UserService_1.default.deleteUser(req.query);
            res.status(http_status_1.default.OK).json({});
        }));
        // deactiveUser = catchAsync(async (req: Request, res: Response) => {
        //   await UserService.deactiveUser(req.body);
        //   return res.status(httpStatus.OK).json();
        // });
        // activeUser = catchAsync(async (req: Request, res: Response) => {
        //   await UserService.activeUser(req.body);
        //   return res.status(httpStatus.OK).json();
        // });
        this.getUserLoginInfo = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield UserService_1.default.getUserLoginInfo(req);
            return res.status(http_status_1.default.OK).json(result);
        }));
        this.getAllPagging = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield UserService_1.default.getAllPagging(req.body);
            return res.status(http_status_1.default.OK).json(result);
        }));
        this.get = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield UserService_1.default.get(req.query);
            return res.status(http_status_1.default.OK).json(result);
        }));
        this.getUserNotPagging = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield UserService_1.default.allUserNotPagging();
            return res.status(http_status_1.default.OK).json(result);
        }));
        this.getAllManager = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield UserService_1.default.getAllManager();
            return res.status(http_status_1.default.OK).json(result);
        }));
        this.updateUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield UserService_1.default.updateUser(req.body);
            return res.status(http_status_1.default.OK).json(result);
        }));
        this.getRoles = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield UserService_1.default.getRoles();
            return res.status(http_status_1.default.OK).json(result);
        }));
    }
}
module.exports = new UserController();
//# sourceMappingURL=UserController.js.map