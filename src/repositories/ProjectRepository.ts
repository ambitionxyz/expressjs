import { BaseRepository } from "./BaseRepository";
import db from "../model";
import IProject from "../type/Models/IProject";
import { query } from "express";
import { SEARCH_TEXT_FIELD_PROJECT } from "../constants";
import { IFilterOpt } from "../dto/reqDto/AllPaggingDto";
import { ITask } from "../type/Models/ITask";

class ProjectRepository extends BaseRepository<IProject> {
  constructor() {
    super(db.ProjectModel, "ProjectRepository");
  }

  async findAllProject(status: Number, search: String) {
    let filterOptions: IFilterOpt = [
      {
        ["status"]: status,
      },
    ];
    if (search !== "") {
      let orOpt = SEARCH_TEXT_FIELD_PROJECT.map((item) => ({
        [item]: { $regex: search },
      }));
      if (orOpt.length) filterOptions.push({ $or: orOpt });
    }
    const findOpt = filterOptions.length ? { $and: filterOptions } : {};
    const items = await this._db.find(findOpt);

    return items;
  }

  async checkInProject(query) {
    return await this.findOne(query);
  }
  async getPMSByProjectId(idProject: String) {
    let formated = [];
    const getPMS = await this._db.find({ id: idProject });
    for (const pm of getPMS) {
      // console.log({ pm });
      for (const user of pm.users) {
        // console.log({ user });
        if (user.type === 1) {
          const userName = await db.User.findOne({ id: user.userId });
          formated.push(userName.name);
        }
      }
    }
    return formated;
  }

  async getTaskName(tasks) {
    let fomated = [];
    for (const task of tasks) {
      const taskQuery: any = await db.TaskModel.findOne({ id: task.taskId });
      fomated.push({
        billable: true,
        isDefault: false,
        projectTaskId: task._id,
        taskName: taskQuery.name,
      });
    }
    return fomated;
  }

  async getBillableByTaskProjectId(taskProjectId: string): Promise<Boolean> {
    const result = await this._db.findOne({ "tasks._id": taskProjectId });
    return result.billable;
  }

  async projectsIncludingTasks(curentUserId) {
    const projects =
      (await this._db.find({
        $and: [
          { status: 0 },
          {
            "users.userId": curentUserId,
          },
        ],
      })) || [];
    return projects;
  }
}

export = new ProjectRepository();
