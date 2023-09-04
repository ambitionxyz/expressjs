import mongoose, { Schema } from "mongoose";
import IProject from "../type/Models/IProject";
import User from "./user";
import ClientModel from "./client";
import { IUser } from "../type/Models/IUser";
import UserRepository from "../repositories/UserRepository";
import { ApiError } from "../utils/ApiErrors";
import httpStatus from "http-status";
import { type } from "os";

const projectSchema = new mongoose.Schema<IProject>({
  id: {
    type: String,
    unique: true,
  },
  projectType: {
    type: Number,
    required: true,
  },
  customerId: {
    type: Schema.Types.ObjectId,
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
      taskId: { type: Schema.Types.ObjectId, ref: "Tasks" },
      billable: Boolean,
    },
  ],
  users: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "Users" },
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

projectSchema.pre("save", async function (next: () => void) {
  const project = this as unknown as IProject;
  if (!this.id) {
    this.id = this._id.toString();
  }
  let client = await ClientModel.findOne({ id: project.customerId }).exec();

  project.customerName = client.name;
  console.log("save db");

  // Lấy danh sách user liên quan đến project
  let listPMs: Array<String> = [];
  await project.users.map(async (user) => {
    // console.log(user);
    if (user.type === 1) {
      let use = await User.findOne({ id: user.userId }).exec();
      listPMs.push(use.name);
    } else {
      // continue;
    }
  });

  project.users.map(async (user) => {
    if (user.type === 0) {
      let use = await User.findOne({ id: user.userId }).exec();
      await use.projectUsers.push({
        projectId: project.id,
        projectCode: project.code,
        projectName: project.name,
        projectUserType: 0,
        pms: listPMs,
      });
      await use.save();
    } else {
    }
  });
  next();
});

const ProjectModel = mongoose.model<IProject>("Project", projectSchema);

export default ProjectModel;
