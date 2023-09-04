import mongoose, { Schema, mongo } from "mongoose";

const TaskOfProjectSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Project" },
  task: { type: Schema.Types.ObjectId, ref: "Task" },
  bullable: { type: Boolean, default: true },
});
TaskOfProjectSchema.virtual("id").get(function () {
  return this._id;
});

const TaskOfProjectModel = mongoose.model("TaskOfProject", TaskOfProjectSchema);
export default TaskOfProjectModel;
