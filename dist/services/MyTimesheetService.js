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
const MyTimesheetRepository_1 = __importDefault(require("../repositories/MyTimesheetRepository"));
const ApiErrors_1 = require("../utils/ApiErrors");
const ProjectRepository_1 = __importDefault(require("../repositories/ProjectRepository"));
class MyTimesheetService {
    constructor() {
        this._repository = MyTimesheetRepository_1.default;
    }
    getTimesheet(timeSheetId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = timeSheetId;
            const result = yield this._repository.findOne({ id: id });
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result });
        });
    }
    updateTimeSheet(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = param, update = __rest(param, ["id"]);
            const result = yield this._repository.update(id, update);
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result });
        });
    }
    deleteTimeSheet(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Id } = param;
            yield this._repository.delete(Id);
            return Object.assign({}, BaseResDto_1.BaseResDto);
        });
    }
    createTimesheet(newTimesheet, curentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dateAt, workingTime } = newTimesheet;
            const checkTime = yield this._repository.checkTime(dateAt, curentUser.curentUserId, workingTime);
            console.log({ checkTime });
            if (!checkTime) {
                throw new ApiErrors_1.ApiError(http_status_1.default.INTERNAL_SERVER_ERROR, "total normal working time on 2023-06-19 can't  > 8 hours");
            }
            const result = yield this._repository.createTimesheet(Object.assign(Object.assign({}, newTimesheet), { userId: curentUser.curentUserId }));
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result });
        });
    }
    submitToPending(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { startDate, endDate } = query;
            yield this._repository.findOnDayAndUpdate(startDate, endDate);
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result: "Submit success 1 timesheets" });
        });
    }
    getAllTimeSheetOfUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { startDate, endDate } = query;
            let fomated = [];
            const timesheets = yield this._repository.getAllTimeSheetOfUser(startDate, endDate);
            for (const timesheet of timesheets) {
                const task = yield this._repository.getTaskInProject(timesheet.projectTaskId);
                const project = yield ProjectRepository_1.default.findOne({
                    id: timesheet.projectId,
                });
                const data = {
                    id: timesheet.id,
                    projectTaskId: timesheet.projectTaskId,
                    projectCode: project.code,
                    dateAt: timesheet.dateAt,
                    workingTime: timesheet.workingTime,
                    status: timesheet.status,
                    note: timesheet.note,
                    typeOfWork: timesheet.typeOfWork,
                    isCharged: timesheet.isCharged,
                    taskName: task.name,
                    customerName: project.customerName,
                    projectName: project.name,
                    billable: task.billable,
                };
                // console.log({ data });
                fomated.push(data);
            }
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result: fomated });
        });
    }
}
module.exports = new MyTimesheetService();
//# sourceMappingURL=MyTimesheetService.js.map