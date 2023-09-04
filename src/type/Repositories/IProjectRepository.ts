import IProject from "../Models/IProject";
import { IBaseRepository } from "./IBaseRepository";

export interface IProjectRepository extends IBaseRepository<IProject> {
  findAllProject(status, search);
  projectsIncludingTasks(curentUserId: String);
  getPMSByProjectId(id: String);
  getTaskName(Tasks);
  getBillableByTaskProjectId(taskProjectId: String): Promise<Boolean>;
}
