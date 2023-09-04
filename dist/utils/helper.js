"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = void 0;
function sendError(res, error, statusCode = 401) {
    return res.status(statusCode).json({ error });
}
exports.sendError = sendError;
//# sourceMappingURL=helper.js.map