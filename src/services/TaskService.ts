import httpStatus from "http-status";
import { BaseResDto } from "../dto/resDto/BaseResDto";
import TaskRepository from "../repositories/TaskRepository";
import { ITaskRepository } from "../type/Repositories/ITaskRepository";
import { ApiError } from "../utils/ApiErrors";
import ProjectRepository from "../repositories/ProjectRepository";

class TaskService {
  private _repository: ITaskRepository = TaskRepository;
  async save(taskInput) {
    let data;
    if (taskInput.id) {
      data = await this._repository.updateTask(taskInput);
    } else {
      data = await this._repository.create(taskInput);
    }
    return {
      ...BaseResDto,
      data,
    };
  }
  async findAll() {
    const result = await this._repository.findAll();
    return {
      ...BaseResDto,
      result,
    };
  }
  async archiveTask(idQuery) {
    await this._repository.archiveTask(idQuery);
    return {
      ...BaseResDto,
    };
  }

  public deleteTask = async (idQuery): Promise<void> => {
    console.log({ idQuery });
    const checkTaskIsInProject = await ProjectRepository.checkInProject({
      "tasks.taskId": idQuery.Id,
    });
    if (checkTaskIsInProject) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Can't delete task is in project"
      );
    }

    await this._repository.deleteTask(idQuery);
  };
}

export = new TaskService();
