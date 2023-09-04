import * as mongoose from "mongoose";
import { ITask } from "../type/Models/ITask";

const taskSchema = new mongoose.Schema<ITask>({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    unique: true,
  },
  type: {
    type: Number,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
taskSchema.pre("save", async function (next: () => void) {
  if (!this.id) {
    this.id = this._id.toString();
  }
  next();
});

const TaskModel = mongoose.model<ITask>("Task", taskSchema);

export default TaskModel;
