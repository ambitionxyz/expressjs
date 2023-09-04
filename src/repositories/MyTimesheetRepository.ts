import { BaseRepository } from "./BaseRepository";
import db from "../model";
import { ITimesheet } from "../type/Models/ITimesheet";
import { forbidden } from "joi";
import TimesheetModel from "../model/timeSheet";

class MyTimesheetRepository extends BaseRepository<ITimesheet> {
  constructor() {
    super(db.TimesheetModel, "TimesheetRepository");
  }

  async getTaskInProject(taskId: String) {
    const list = await db.ProjectModel.findOne({ "tasks._id": taskId });
    // console.log({ result });
    for (const task of list.tasks) {
      // console.log({ task });
      if (taskId.toString() === task.id) {
        const taskName = await db.TaskModel.findOne({ id: task.taskId });
        // console.log("name: ", taskName.name);
        return {
          name: taskName.name,
          billable: task.billable,
        };
      }
    }
  }

  async createTimesheet(newTimesheet: ITimesheet) {
    const getProject = await db.ProjectModel.findOne({
      "tasks._id": newTimesheet.projectTaskId,
    });
    const data = {
      ...newTimesheet,
      projectId: getProject._id,
      taskId: newTimesheet.projectTaskId,
    };
    await this._db.create(data);
  }
  async getAllTimeSheetOfUser(startDate, endDate) {
    const result = await this._db.find({
      dateAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    return result;
  }
  async findOnDayAndUpdate(startDate, endDate) {
    console.log("-------------------------");
    const listTimeSheet = await this.getAllTimeSheetOfUser(startDate, endDate);
    console.log({ listTimeSheet });
    listTimeSheet.map(async (currentTimesheet) => {
      console.log({ currentTimesheet });
      await TimesheetModel.findOneAndUpdate(
        {
          id: currentTimesheet.id,
        },
        { status: 1 }
      );
    });
  }

  async checkTime(dateAt, useId, workingTime) {
    const listTimeSheet = await this._db.find({
      $and: [
        { dateAt: dateAt },
        {
          userId: useId,
        },
      ],
    });
    // console.log({ listTimeSheet });
    let sum = 0;
    if (listTimeSheet.length === 0) return true;
    else {
      for (const time of listTimeSheet) {
        if (time.status === 0) {
          sum += time.workingTime;
        }
      }
      console.log({ sum });
      if (sum + workingTime > 480) {
        return false;
      } else return true;
    }
  }
}

export = new MyTimesheetRepository();
