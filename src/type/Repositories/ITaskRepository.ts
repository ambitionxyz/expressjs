import { ITask } from "../Models/ITask";
import { IBaseRepository } from "./IBaseRepository";

export interface ITaskRepository extends IBaseRepository<ITask> {
  createTask(task: ITask);
  updateTask(taskInput: ITask);
  findAllTask();
  deleteTask(idQuery): Promise<void>;
  archiveTask(idQuery);
}
