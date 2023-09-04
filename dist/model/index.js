"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const project_1 = __importDefault(require("./project"));
const task_1 = __importDefault(require("./task"));
const branch_1 = __importDefault(require("./branch"));
const roles_1 = __importDefault(require("./roles"));
const timeSheet_1 = __importDefault(require("./timeSheet"));
// import ClientModel from "./client";
exports.default = {
    User: user_1.default,
    ProjectModel: project_1.default,
    TaskModel: task_1.default,
    BranchModel: branch_1.default,
    RoleModel: roles_1.default,
    TimesheetModel: timeSheet_1.default,
    // ClientModel,
};
//# sourceMappingURL=index.js.map