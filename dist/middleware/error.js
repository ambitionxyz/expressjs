"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorConverter = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const BaseError_1 = require("../dto/resDto/BaseError");
const ApiErrors_1 = require("../utils/ApiErrors");
const errorConverter = (err, req, res, next) => {
    console.log("da vao err convert");
    let error = err;
    if (!(err instanceof ApiErrors_1.ApiError)) {
        const statusCode = error.statusCode || error instanceof mongoose_1.Error
            ? http_status_1.default.BAD_REQUEST
            : http_status_1.default.INTERNAL_SERVER_ERROR;
        const message = error.message || http_status_1.default[statusCode];
        error = new ApiErrors_1.ApiError(statusCode, message);
    }
    next(error);
};
exports.errorConverter = errorConverter;
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    if (!statusCode || !message) {
        statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
        message = http_status_1.default[http_status_1.default.INTERNAL_SERVER_ERROR];
    }
    // res.locals.errorMessage = message;
    const ERR_RES = (0, BaseError_1.baseError)();
    ERR_RES.error.message = message;
    ERR_RES.error.code = statusCode;
    console.log("ERR HANDLER");
    res.status(statusCode).json(ERR_RES);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map