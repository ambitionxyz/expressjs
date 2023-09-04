import { Schema, Document } from "mongoose";

export interface ITimesheet extends Document {
  id: string;
  projectTaskId: string;
  note: string;
  workingTime: number;
  targetUserWorkingTime: number;
  typeOfWork: number;
  isCharged: boolean;
  dateAt: Date;
  status: number;
  projectTargetUserId: any;
  taskId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  projectId: Schema.Types.ObjectId;
}
