import { ITimesheet } from "../Models/ITimesheet";
import { IBaseRepository } from "./IBaseRepository";

export interface ITimesheetRepository extends IBaseRepository<ITimesheet> {
  createTimesheet(newTimesheet: ITimesheet);
  getAllTimeSheetOfUser(startDate, endDate);
  getTaskInProject(taskId: String);
  findOnDayAndUpdate(startDate, endDate);
  checkTime(dateAt, useId, workingTime);
}
