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
const timeSheet_1 = __importDefault(require("../model/timeSheet"));
class MyTimesheetRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(model_1.default.TimesheetModel, "TimesheetRepository");
    }
    getTaskInProject(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield model_1.default.ProjectModel.findOne({ "tasks._id": taskId });
            // console.log({ result });
            for (const task of list.tasks) {
                // console.log({ task });
                if (taskId.toString() === task.id) {
                    const taskName = yield model_1.default.TaskModel.findOne({ id: task.taskId });
                    // console.log("name: ", taskName.name);
                    return {
                        name: taskName.name,
                        billable: task.billable,
                    };
                }
            }
        });
    }
    createTimesheet(newTimesheet) {
        return __awaiter(this, void 0, void 0, function* () {
            const getProject = yield model_1.default.ProjectModel.findOne({
                "tasks._id": newTimesheet.projectTaskId,
            });
            const data = Object.assign(Object.assign({}, newTimesheet), { projectId: getProject._id, taskId: newTimesheet.projectTaskId });
            yield this._db.create(data);
        });
    }
    getAllTimeSheetOfUser(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._db.find({
                dateAt: {
                    $gte: startDate,
                    $lte: endDate,
                },
            });
            console.log({ result });
            return result;
        });
    }
    findOnDayAndUpdate(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("-------------------------");
            const listTimeSheet = yield this.getAllTimeSheetOfUser(startDate, endDate);
            console.log({ listTimeSheet });
            listTimeSheet.map((currentTimesheet) => __awaiter(this, void 0, void 0, function* () {
                console.log({ currentTimesheet });
                yield timeSheet_1.default.findOneAndUpdate({
                    id: currentTimesheet.id,
                }, { status: 1 });
            }));
        });
    }
    checkTime(dateAt, useId, workingTime) {
        return __awaiter(this, void 0, void 0, function* () {
            const listTimeSheet = yield this._db.find({
                $and: [
                    { dateAt: dateAt },
                    {
                        userId: useId,
                    },
                ],
            });
            // console.log({ listTimeSheet });
            let sum = 0;
            if (listTimeSheet.length === 0)
                return true;
            else {
                for (const time of listTimeSheet) {
                    if (time.status === 0) {
                        sum += time.workingTime;
                    }
                }
                console.log({ sum });
                if (sum + workingTime > 480) {
                    return false;
                }
                else
                    return true;
            }
        });
    }
}
module.exports = new MyTimesheetRepository();
//# sourceMappingURL=MyTimesheetRepository.js.map