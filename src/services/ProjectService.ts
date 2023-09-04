import httpStatus from "http-status";
import { BaseResDto } from "../dto/resDto/BaseResDto";
import ProjectRepository from "../repositories/ProjectRepository";
import IProject from "../type/Models/IProject";
import { IProjectRepository } from "../type/Repositories/IProjectRepository";
import { ApiError } from "../utils/ApiErrors";

class ProjectService {
  private _repository: IProjectRepository = ProjectRepository;
  async get(idQuery) {
    const id = idQuery.input;
    console.log({ id });
    const result = await this._repository.findOne({ id: id });
    return {
      ...BaseResDto,
      result,
    };
  }

  async getAll(filter) {
    const { status, search } = filter;
    const result = await this._repository.findAllProject(status, search);
    return {
      ...BaseResDto,
      result,
    };
  }

  async save(projectInfor: IProject) {
    const checkExistPM = projectInfor.users.some((user) => {
      return user.type === 1;
    });
    if (!checkExistPM) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Project must have a PM!");
    }
    let result;
    if (projectInfor.id) {
      //update project
      const { id, ...update } = projectInfor;
      result = await this._repository.update(id, update);
    } else {
      result = await this._repository.create(projectInfor);
    }

    return {
      ...BaseResDto,
      result,
    };
  }

  async projectsIncludingTasks(curentUser) {
    const { curentUserId } = curentUser;
    const projects = await this._repository.projectsIncludingTasks(
      curentUserId
    );
    const fomated = [];
    // console.log({ result });
    for (const project of projects) {
      const projectFormat = {
        customerName: project.customerName,
        id: project.id,
        listPM: await this._repository.getPMSByProjectId(project.id),
        projectCode: project.code,
        projectName: project.name,
        projectUserType: 0,
        targetUsers: project.projectTargetUsers,
        tasks: await this._repository.getTaskName(project.tasks),
      };
      fomated.push(projectFormat);
      // console.log({ projectFormat });
    }
    return {
      ...BaseResDto,
      result: fomated,
    };
  }
}

export = new ProjectService();
