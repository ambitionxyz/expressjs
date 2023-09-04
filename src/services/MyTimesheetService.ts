import httpStatus from "http-status";
import { BaseResDto } from "../dto/resDto/BaseResDto";
import MyTimesheetRepository from "../repositories/MyTimesheetRepository";
import { ITimesheet } from "../type/Models/ITimesheet";
import { ApiError } from "../utils/ApiErrors";
import { ITimesheetRepository } from "../type/Repositories/IMyTimesheetRepository";
import ProjectRepository from "../repositories/ProjectRepository";

class MyTimesheetService {
  private _repository: ITimesheetRepository = MyTimesheetRepository;

  async getTimesheet(timeSheetId) {
    const { id } = timeSheetId;
    const result = await this._repository.findOne({ id: id });
    return {
      ...BaseResDto,
      result,
    };
  }

  async updateTimeSheet(param) {
    const { id, ...update } = param;
    const result = await this._repository.update(id, update);
    return {
      ...BaseResDto,
      result,
    };
  }

  async deleteTimeSheet(param) {
    const { Id } = param;
    await this._repository.delete(Id);
    return {
      ...BaseResDto,
    };
  }

  async createTimesheet(newTimesheet, curentUser) {
    const { dateAt, workingTime } = newTimesheet;
    const checkTime = await this._repository.checkTime(
      dateAt,
      curentUser.curentUserId,
      workingTime
    );
    console.log({ checkTime });

    if (!checkTime) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "total normal working time on 2023-06-19 can't  > 8 hours"
      );
    }

    const result = await this._repository.createTimesheet({
      ...newTimesheet,
      userId: curentUser.curentUserId,
    });
    return {
      ...BaseResDto,
      result,
    };
  }

  async submitToPending(query) {
    const { startDate, endDate } = query;

    await this._repository.findOnDayAndUpdate(startDate, endDate);
    return {
      ...BaseResDto,
      result: "Submit success 1 timesheets",
    };
  }

  async getAllTimeSheetOfUser(query) {
    const { startDate, endDate } = query;
    let fomated = [];
    //lay ra tat ca timesheet
    const timesheets = await this._repository.getAllTimeSheetOfUser(
      startDate,
      endDate
    );
    for (const timesheet of timesheets) {
      //   console.log("timesheet", timesheet);
      const task = await this._repository.getTaskInProject(
        timesheet.projectTaskId
      );
      // console.log(task);
      const project = await ProjectRepository.findOne({
        id: timesheet.projectId,
      });
      console.log(project);
      const data = {
        id: timesheet.id,
        projectTaskId: timesheet.projectTaskId,
        projectCode: project.code,
        dateAt: timesheet.dateAt,
        workingTime: timesheet.workingTime,
        status: timesheet.status,
        note: timesheet.note,
        typeOfWork: timesheet.typeOfWork,
        isCharged: timesheet.isCharged,
        taskName: task.name,
        customerName: project.customerName,
        projectName: project.name,
        billable: task.billable,
      };
      fomated.push(data);
    }

    return {
      ...BaseResDto,
      result: fomated,
    };
  }
}

export = new MyTimesheetService();
