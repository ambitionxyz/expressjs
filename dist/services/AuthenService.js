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
const BaseResDto_1 = require("../dto/resDto/BaseResDto");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const AuthResultDto_1 = require("../dto/resDto/AuthResultDto");
const ApiErrors_1 = require("../utils/ApiErrors");
const http_status_1 = __importDefault(require("http-status"));
class AuthenService {
    constructor() {
        this._repository = UserRepository_1.default;
        this.authen = (userLogin) => __awaiter(this, void 0, void 0, function* () {
            // const { userNameOrEmailAddress, password } = req.body;
            // try {
            //   const exitstedUser = await this._repository.findOne({
            //     userName: userNameOrEmailAddress,
            //   });
            //   console.log({ exitstedUser });
            //   if (!exitstedUser) return res.status(500).json(LOGIN_FAILED);
            //   const checkPass = await this._repository.comparePassword(
            //     userNameOrEmailAddress as string,
            //     password as string
            //   );
            //   if (!checkPass) return res.status(500).json(LOGIN_FAILED);
            //   const accessToken = await this._repository.generateToken(
            //     userNameOrEmailAddress as string
            //   );
            //   return res.status(200).json({
            //     ...BaseResDto,
            //     result: {
            //       ...AuthResultDto,  
            //       accessToken,
            //       userId: exitstedUser.id,
            //     },
            //   });
            // } catch (error) {
            //   console.log("authen AuthenService error: ", error.message);
            //   next(error);
            // }
            // console.log({ userLogin });
            const { userNameOrEmailAddress, password } = userLogin;
            const exitstedUser = yield this._repository.findOne({
                userName: userNameOrEmailAddress,
            });
            const checkPass = yield this._repository.comparePassword(userNameOrEmailAddress, password);
            if (!exitstedUser || !checkPass) {
                throw new ApiErrors_1.ApiError(http_status_1.default.UNAUTHORIZED, "Incorrect email or password");
            }
            const accessToken = yield this._repository.generateToken(userNameOrEmailAddress);
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result: Object.assign(Object.assign({}, AuthResultDto_1.AuthResultDto), { accessToken, userId: exitstedUser.id }) });
        });
    }
}
module.exports = new AuthenService();
//# sourceMappingURL=AuthenService.js.map