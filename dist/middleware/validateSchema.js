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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = exports.ValidateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const http_status_1 = __importDefault(require("http-status"));
const ValidateSchema = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        let message = "";
        try {
            yield schema.validateAsync(req.body);
            next();
        }
        catch (err) {
            message = err.details[0].message;
            // console.log();
            res.status(http_status_1.default.UNPROCESSABLE_ENTITY).json({ message });
            // throw new ApiError(httpStatus.FORBIDDEN, message);
        }
    });
};
exports.ValidateSchema = ValidateSchema;
exports.Schema = {
    user: {
        create: joi_1.default.object({
            userName: joi_1.default.string().required(),
            name: joi_1.default.string().required(),
            emailAddress: joi_1.default.string().required(),
            surname: joi_1.default.string().required(),
            userCode: joi_1.default.string().required(),
            password: joi_1.default.string().required(),
        }).options({ allowUnknown: true }),
        update: joi_1.default.object({
            name: joi_1.default.string().required(),
            emailAddress: joi_1.default.string().required(),
            userCode: joi_1.default.string().required(),
        }).options({ allowUnknown: true }),
    },
    timeSheet: {
        create: joi_1.default.object({
            workingTime: joi_1.default.number()
                .max(8 * 60)
                .required(),
        }).options({ allowUnknown: true }),
    },
};
//# sourceMappingURL=validateSchema.js.map