import mongoose, { Schema } from "mongoose";
import { ITimesheet } from "../type/Models/ITimesheet";

const timesheetSchema = new Schema<ITimesheet>({
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
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  projectTaskId: {
    type: Schema.Types.ObjectId,
    ref: "Tasks",
  },
  projectId: {
    type: Schema.Types.ObjectId,
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

timesheetSchema.pre("save", function (next: () => void) {
  if (!this.id) {
    this.id = this._id.toString();
  }
  next();
});
const TimesheetModel = mongoose.model<ITimesheet>("Timesheet", timesheetSchema);
export default TimesheetModel;
