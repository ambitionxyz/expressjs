import { BaseRepository } from "./BaseRepository";
import { ITask } from "../type/Models/ITask";
import db from "../model";

class TaskRepository extends BaseRepository<ITask> {
  constructor() {
    super(db.TaskModel, "TaskRepository");
  }
  async deleteTask(idQuery): Promise<void> {
    await this._db.findOneAndDelete({ id: idQuery.Id });
  }

  async createTask(task: ITask) {
    return await this.create(task);
  }
  async updateTask(taskInput: ITask) {
    const { id, ...update } = taskInput;
    const task = await this._db.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    return task;
  }
  async getTaskName(taskId: String) {
    const task = await this._db.findOne({ id: taskId });
    return task.name;
  }

  async findAllTask() {
    return await this._db.find({});
  }
  async archiveTask(idQuery) {
    const id = idQuery.Id;
    await this._db.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true }
    );
  }
}

export = new TaskRepository();
