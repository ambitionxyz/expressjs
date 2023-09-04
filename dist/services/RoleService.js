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
const RoleRepository_1 = __importDefault(require("../repositories/RoleRepository"));
const ApiErrors_1 = require("../utils/ApiErrors");
const http_status_1 = __importDefault(require("http-status"));
class RoleService {
    constructor() {
        this._repository = RoleRepository_1.default;
    }
    createRole(roleData) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkExistOfRoleName = yield this._repository.checkRoleError({
                name: roleData.name,
            });
            if (checkExistOfRoleName) {
                throw new ApiErrors_1.ApiError(http_status_1.default.CONFLICT, "Role name is existed in the system!");
            }
            const result = yield this._repository.createRole(roleData);
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result });
        });
    }
    getAllPaggingRole(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Keyword, skipCount, maxResultCount } = filter;
            const result = yield this._repository.filterRolePagging(Keyword, skipCount, maxResultCount);
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result });
        });
    }
}
module.exports = new RoleService();
//# sourceMappingURL=RoleService.js.map