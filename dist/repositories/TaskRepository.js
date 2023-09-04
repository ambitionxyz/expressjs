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
const BaseRepository_1 = require("./BaseRepository");
const model_1 = __importDefault(require("../model"));
class TaskRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(model_1.default.TaskModel, "TaskRepository");
    }
    deleteTask(idQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._db.findOneAndDelete({ id: idQuery.Id });
        });
    }
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.create(task);
        });
    }
    updateTask(taskInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = taskInput, update = __rest(taskInput, ["id"]);
            const task = yield this._db.findOneAndUpdate({ _id: id }, update, {
                new: true,
            });
            return task;
        });
    }
    getTaskName(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this._db.findOne({ id: taskId });
            return task.name;
        });
    }
    findAllTask() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.find({});
        });
    }
    archiveTask(idQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = idQuery.Id;
            yield this._db.findOneAndUpdate({ id: id }, { isDeleted: true }, { new: true });
        });
    }
}
module.exports = new TaskRepository();
//# sourceMappingURL=TaskRepository.js.map