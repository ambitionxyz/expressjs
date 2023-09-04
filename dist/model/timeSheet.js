"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const timesheetSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
    },
    // projectTaskId: {
    //   type: String,
    //   unique: true,
    // },
    note: {
        type: String,
        default: "",
    },
    workingTime: {
        type: Number,
        require: true,
    },
    targetUserWorkingTime: {
        type: Number,
        require: true,
    },
    typeOfWork: {
        type: Number,
        default: 0,
    },
    isCharged: {
        type: Boolean,
        default: false,
    },
    dateAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: Number,
        default: 0,
    },
    projectTargetUserId: {
        type: Object,
        default: null,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users",
    },
    projectTaskId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Tasks",
    },
    projectId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Projects",
    },
});
// timesheetSchema.virtual("getProject", {
//   ref: "Project",
//   localField: "projectId",
//   foreignField: "_id",
// });
// timesheetSchema.virtual("getTask", {
//   ref: "Task",
//   localField: "taskId",
//   foreignField: "_id",
// });
timesheetSchema.pre("save", function (next) {
    if (!this.id) {
        this.id = this._id.toString();
    }
    next();
});
const TimesheetModel = mongoose_1.default.model("Timesheet", timesheetSchema);
exports.default = TimesheetModel;
//# sourceMappingURL=timeSheet.js.map