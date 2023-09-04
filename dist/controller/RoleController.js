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
const RoleService_1 = __importDefault(require("../services/RoleService"));
class RoleController {
    constructor() {
        this.createRole = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield RoleService_1.default.createRole(req.body);
            return res.status(http_status_1.default.OK).json(result);
        }));
        this.getAllPagging = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // console.log("role", req);
            const result = yield RoleService_1.default.getAllPaggingRole(req.query);
            return res.status(http_status_1.default.OK).json(result);
        }));
    }
}
module.exports = new RoleController();
//# sourceMappingURL=RoleController.js.map