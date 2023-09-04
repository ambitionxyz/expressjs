"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLogin = exports.checkAdmin = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const dotenv_1 = __importDefault(require("dotenv"));
const ApiErrors_1 = require("../utils/ApiErrors");
dotenv_1.default.config();
const checkAdmin = (req, res, next) => {
    const decoToken = req.headers && req.headers.authorization
        ? (0, jwt_decode_1.default)(req.headers.authorization)
        : null;
    if (decoToken &&
        decoToken.roleNames &&
        decoToken.roleNames.some((r) => r.includes("ADMIN"))) {
        console.log("pass ADMIn");
        next();
    }
    else {
        throw new ApiErrors_1.ApiError(http_status_1.default.FORBIDDEN, "You can't access this page without permission");
    }
};
exports.checkAdmin = checkAdmin;
const checkLogin = (req, res, next) => {
    if (req.headers && !req.headers.authorization)
        throw new ApiErrors_1.ApiError(http_status_1.default.UNAUTHORIZED, "User not login");
    else {
        jsonwebtoken_1.default.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET, (err, decode) => {
            const currentTime = Math.floor(Date.now() / 1000);
            if (decode.exp && decode.exp < currentTime) {
                if (req["currentUser"])
                    delete req["currentUser"];
                throw new ApiErrors_1.ApiError(http_status_1.default.UNAUTHORIZED, "Your sesion was expired!");
            }
            else {
                if (!req["currentUser"] ||
                    (req["currentUser"] && req["currentUser"] !== decode.id)) {
                    req["currentUser"] = {
                        curentUserId: decode.id,
                    };
                }
                next();
            }
        });
    }
};
exports.checkLogin = checkLogin;
//# sourceMappingURL=auth.js.map