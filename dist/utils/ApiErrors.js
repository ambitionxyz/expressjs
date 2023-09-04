"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, details = null, validation = null) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.isOperational = isOperational;
        if (validation || details) {
            this.details = details;
            this.validation = validation;
        }
        // } else {
        //   Error.captureStackTrace(this);
        // }
    }
}
exports.ApiError = ApiError;
// module.exports = ApiError;
//# sourceMappingURL=ApiErrors.js.map