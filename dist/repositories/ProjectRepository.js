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
const BaseRepository_1 = require("./BaseRepository");
const model_1 = __importDefault(require("../model"));
const constants_1 = require("../constants");
class ProjectRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(model_1.default.ProjectModel, "ProjectRepository");
    }
    findAllProject(status, search) {
        return __awaiter(this, void 0, void 0, function* () {
            let filterOptions = [
                {
                    ["status"]: status,
                },
            ];
            if (search !== "") {
                let orOpt = constants_1.SEARCH_TEXT_FIELD_PROJECT.map((item) => ({
                    [item]: { $regex: search },
                }));
                if (orOpt.length)
                    filterOptions.push({ $or: orOpt });
            }
            const findOpt = filterOptions.length ? { $and: filterOptions } : {};
            const items = yield this._db.find(findOpt);
            return items;
        });
    }
    checkInProject(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne(query);
        });
    }
    getPMSByProjectId(idProject) {
        return __awaiter(this, void 0, void 0, function* () {
            let formated = [];
            const getPMS = yield this._db.find({ id: idProject });
            for (const pm of getPMS) {
                // console.log({ pm });
                for (const user of pm.users) {
                    // console.log({ user });
                    if (user.type === 1) {
                        const userName = yield model_1.default.User.findOne({ id: user.userId });
                        formated.push(userName.name);
                    }
                }
            }
            return formated;
        });
    }
    getTaskName(tasks) {
        return __awaiter(this, void 0, void 0, function* () {
            let fomated = [];
            for (const task of tasks) {
                const taskQuery = yield model_1.default.TaskModel.findOne({ id: task.taskId });
                fomated.push({
                    billable: true,
                    isDefault: false,
                    projectTaskId: task._id,
                    taskName: taskQuery.name,
                });
            }
            return fomated;
        });
    }
    getBillableByTaskProjectId(taskProjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._db.findOne({ "tasks._id": taskProjectId });
            return result.billable;
        });
    }
    projectsIncludingTasks(curentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = (yield this._db.find({
                $and: [
                    { status: 0 },
                    {
                        "users.userId": curentUserId,
                    },
                ],
            })) || [];
            return projects;
        });
    }
}
module.exports = new ProjectRepository();
//# sourceMappingURL=ProjectRepository.js.map