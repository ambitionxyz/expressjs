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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const user_1 = __importDefault(require("./user"));
const client_1 = __importDefault(require("./client"));
const projectSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        unique: true,
    },
    projectType: {
        type: Number,
        required: true,
    },
    customerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Clients",
    },
    //tu them
    customerName: {
        type: String,
    },
    name: {
        type: String,
    },
    code: {
        type: String,
    },
    timeStart: {
        type: Date,
    },
    timeEnd: {
        type: Date,
    },
    note: {
        type: String,
        default: "",
    },
    projectTargetUsers: [
    // {
    //   userId: { type: String, unique: true },
    //   roleName: String,
    //   _id: false,
    // },
    ],
    isAllUserBelongTo: {
        type: Boolean,
        default: false,
    },
    isNoticeKMApproveChangeWorkingTime: {
        type: Boolean,
        default: false,
    },
    isNoticeKMApproveRequestOffDate: {
        type: Boolean,
        default: false,
    },
    isNoticeKMRequestChangeWorkingTime: {
        type: Boolean,
        default: false,
    },
    isNoticeKMRequestOffDate: {
        type: Boolean,
        default: false,
    },
    isNoticeKMSubmitTS: {
        type: Boolean,
        default: false,
    },
    isNotifyToKomu: {
        type: Boolean,
        default: true,
    },
    komuChannelId: {
        type: String,
        default: "aaaa",
    },
    tasks: [
        {
            taskId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Tasks" },
            billable: Boolean,
        },
    ],
    users: [
        {
            userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users" },
            type: { type: Number },
            isTemp: { type: Boolean, default: false },
        },
    ],
    status: {
        type: Number,
        default: 0,
    },
});
projectSchema.virtual("getTask", {
    ref: "Task",
    localField: "_id",
    foreignField: "tasks.taskId",
});
projectSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const project = this;
        if (!this.id) {
            this.id = this._id.toString();
        }
        let client = yield client_1.default.findOne({ id: project.customerId }).exec();
        project.customerName = client.name;
        console.log("save db");
        // Lấy danh sách user liên quan đến project
        let listPMs = [];
        yield project.users.map((user) => __awaiter(this, void 0, void 0, function* () {
            // console.log(user);
            if (user.type === 1) {
                let use = yield user_1.default.findOne({ id: user.userId }).exec();
                listPMs.push(use.name);
            }
            else {
                // continue;
            }
        }));
        project.users.map((user) => __awaiter(this, void 0, void 0, function* () {
            if (user.type === 0) {
                let use = yield user_1.default.findOne({ id: user.userId }).exec();
                yield use.projectUsers.push({
                    projectId: project.id,
                    projectCode: project.code,
                    projectName: project.name,
                    projectUserType: 0,
                    pms: listPMs,
                });
                yield use.save();
            }
            else {
            }
        }));
        next();
    });
});
const ProjectModel = mongoose_1.default.model("Project", projectSchema);
exports.default = ProjectModel;
//# sourceMappingURL=project.js.map