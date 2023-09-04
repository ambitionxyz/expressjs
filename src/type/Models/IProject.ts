import { Document, Schema } from "mongoose";

interface ProjectUser {
  userId: string;
  roleName: string;
}

interface ProjectTask {
  taskId: Schema.Types.ObjectId;
  billable: boolean;
}

interface ProjectUserRef {
  userId: Schema.Types.ObjectId;
  type: number;
  isTemp: boolean;
}

interface IProject extends Document {
  [x: string]: any;
  projectType: number;
  customerId: Schema.Types.ObjectId;
  customerName?: string; // tuthem
  name?: string;
  code?: string;
  timeStart?: Date;
  timeEnd?: Date;
  note?: string;
  projectTargetUsers?: ProjectUser[];
  isAllUserBelongTo: boolean;
  task: ProjectTask[];
  users: ProjectUserRef[];
  status: number;
  // getTask?: () => any;
}

export default IProject;
