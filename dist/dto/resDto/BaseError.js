"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNAUTHORIZED_ERR = exports.INVALID_TOKEN = exports.LOGIN_FAILED = exports.baseError = exports.BaseErrorDto = void 0;
const BaseResDto_1 = require("./BaseResDto");
const BaseErrorDto = (message = null, details = null) => {
    return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { error: {
            code: 0,
            message: message,
            details: details,
            validationErrors: null,
        }, success: false });
};
exports.BaseErrorDto = BaseErrorDto;
exports.baseError = exports.BaseErrorDto;
exports.LOGIN_FAILED = (0, exports.BaseErrorDto)("Login failed!", "Invalid user name or password");
exports.INVALID_TOKEN = (0, exports.BaseErrorDto)("Your request is not valid!", "Invalid token");
exports.UNAUTHORIZED_ERR = (0, exports.BaseErrorDto)("Current user did not login to the application");
//# sourceMappingURL=BaseError.js.map