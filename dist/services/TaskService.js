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
const http_status_1 = __importDefault(require("http-status"));
const BaseResDto_1 = require("../dto/resDto/BaseResDto");
const TaskRepository_1 = __importDefault(require("../repositories/TaskRepository"));
const ApiErrors_1 = require("../utils/ApiErrors");
const ProjectRepository_1 = __importDefault(require("../repositories/ProjectRepository"));
class TaskService {
    constructor() {
        this._repository = TaskRepository_1.default;
        this.deleteTask = (idQuery) => __awaiter(this, void 0, void 0, function* () {
            console.log({ idQuery });
            const checkTaskIsInProject = yield ProjectRepository_1.default.checkInProject({
                "tasks.taskId": idQuery.Id,
            });
            if (checkTaskIsInProject) {
                throw new ApiErrors_1.ApiError(http_status_1.default.INTERNAL_SERVER_ERROR, "Can't delete task is in project");
            }
            yield this._repository.deleteTask(idQuery);
        });
    }
    save(taskInput) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            if (taskInput.id) {
                data = yield this._repository.updateTask(taskInput);
            }
            else {
                data = yield this._repository.create(taskInput);
            }
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { data });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._repository.findAll();
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result });
        });
    }
    archiveTask(idQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._repository.archiveTask(idQuery);
            return Object.assign({}, BaseResDto_1.BaseResDto);
        });
    }
}
module.exports = new TaskService();
//# sourceMappingURL=TaskService.js.map