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
const http_status_1 = __importDefault(require("http-status"));
const BaseResDto_1 = require("../dto/resDto/BaseResDto");
const ProjectRepository_1 = __importDefault(require("../repositories/ProjectRepository"));
const ApiErrors_1 = require("../utils/ApiErrors");
class ProjectService {
    constructor() {
        this._repository = ProjectRepository_1.default;
    }
    get(idQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = idQuery.input;
            console.log({ id });
            const result = yield this._repository.findOne({ id: id });
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result });
        });
    }
    getAll(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, search } = filter;
            const result = yield this._repository.findAllProject(status, search);
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result });
        });
    }
    save(projectInfor) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkExistPM = projectInfor.users.some((user) => {
                return user.type === 1;
            });
            if (!checkExistPM) {
                throw new ApiErrors_1.ApiError(http_status_1.default.BAD_REQUEST, "Project must have a PM!");
            }
            let result;
            if (projectInfor.id) {
                //update project
                const { id } = projectInfor, update = __rest(projectInfor, ["id"]);
                result = yield this._repository.update(id, update);
            }
            else {
                result = yield this._repository.create(projectInfor);
            }
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result });
        });
    }
    projectsIncludingTasks(curentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const { curentUserId } = curentUser;
            const projects = yield this._repository.projectsIncludingTasks(curentUserId);
            const fomated = [];
            // console.log({ result });
            for (const project of projects) {
                const projectFormat = {
                    customerName: project.customerName,
                    id: project.id,
                    listPM: yield this._repository.getPMSByProjectId(project.id),
                    projectCode: project.code,
                    projectName: project.name,
                    projectUserType: 0,
                    targetUsers: project.projectTargetUsers,
                    tasks: yield this._repository.getTaskName(project.tasks),
                };
                fomated.push(projectFormat);
                // console.log({ projectFormat });
            }
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result: fomated });
        });
    }
}
module.exports = new ProjectService();
//# sourceMappingURL=ProjectService.js.map