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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const ProjectRepository_1 = __importDefault(require("../repositories/ProjectRepository"));
const UserResDto_1 = require("../dto/resDto/UserResDto");
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("../model/user"));
const BaseResDto_1 = require("../dto/resDto/BaseResDto");
const ApiErrors_1 = require("../utils/ApiErrors");
const http_status_1 = __importDefault(require("http-status"));
const RoleRepository_1 = __importDefault(require("../repositories/RoleRepository"));
dotenv_1.default.config();
class UserService {
    constructor() {
        this._repository = UserRepository_1.default;
        this.create = (userInput) => __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this._repository.findByUserNameEmail(userInput.userName, userInput.emailAddress);
            if (existingUser) {
                let message = "is already taken.";
                if (Object.keys(existingUser)[0] === "userName")
                    message = `User name '${existingUser.userName}' ` + message;
                else
                    message = `Email address '${existingUser.emailAddress}' ` + message;
                throw new ApiErrors_1.ApiError(http_status_1.default.CONFLICT, message);
            }
            const newUser = new user_1.default(userInput);
            const result = yield this._repository.create(newUser);
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result });
        });
        this.getUserLoginInfo = (req) => __awaiter(this, void 0, void 0, function* () {
            if (req.headers["authorization"] === undefined)
                return UserResDto_1.UserResDTO;
            const token = req.headers["authorization"].split(" ")[1];
            const { id } = yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = yield this._repository.findOne({ id: id });
            if (!user)
                throw new ApiErrors_1.ApiError(http_status_1.default.BAD_REQUEST, "Your request is not valid!");
            return Object.assign(Object.assign({}, UserResDto_1.UserResDTO), { result: Object.assign(Object.assign({}, UserResDto_1.UserResDTO.result), { user }) });
        });
        this.getAllPagging = (filter) => __awaiter(this, void 0, void 0, function* () {
            const { filterItems, maxResultCount, skipCount, searchText } = filter;
            const result = yield this._repository.filterUserPagging(filterItems, maxResultCount, skipCount, searchText);
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result });
        });
        this.allUserNotPagging = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this._repository.allUserNotPagging();
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result });
        });
        this.getAllManager = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this._repository.getAllManager();
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result });
        });
        this.get = (query) => __awaiter(this, void 0, void 0, function* () {
            const userId = query.Id;
            const result = yield this._repository.getUserById(userId);
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result });
        });
        this.updateUser = (query) => __awaiter(this, void 0, void 0, function* () {
            const { id } = query, update = __rest(query, ["id"]);
            // if (
            //   this._repository.checkDuplicate(
            //     { emailAddress: update.emailAddress },
            //     id
            //   ) !== null
            // ) {
            //   throw new ApiError(httpStatus.CONFLICT, "user id exist");
            // }
            const result = yield this._repository.update(id, update);
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result });
        });
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findAll();
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result });
        });
        this.deactiveUser = (idQuery) => __awaiter(this, void 0, void 0, function* () { });
        this.deleteUser = (idQuery) => __awaiter(this, void 0, void 0, function* () {
            const checkUserIsInProject = yield ProjectRepository_1.default.checkInProject({
                "users.userId": idQuery.Id,
            });
            if (checkUserIsInProject) {
                throw new ApiErrors_1.ApiError(http_status_1.default.INTERNAL_SERVER_ERROR, "Can't delete user is in project");
            }
            yield this._repository.deleteUser(idQuery);
        });
        this.getRoles = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield RoleRepository_1.default.getAll();
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result: {
                    items: result,
                } });
        });
    }
}
module.exports = new UserService();
//# sourceMappingURL=UserService.js.map