import * as mongoose from "mongoose";

export interface IUser {
  id: Number;
  password: string;
  userName: string;
  name: string;
  surname: String;

  fullName: String;
  emailAddress: String;
  phoneNumber: String;
  address: String;
  isActive: Boolean;
  roleNames: Array<string>;

  projectUsers: Array<Object>;
  type: Number;
  salary: Number;
  salaryAt: Date;
  startDateAt: Date;
  allowedLeaveDay: Number;

  userCode: String;
  jobTitle: String;
  level: Number;
  registerWorkDay: Number;
  avatarPath: String;
  managerId: Number;
  managerAvatarPath: String;
  managerName: String;
  branch: Number;

  sex: Number;
  creationTime: String;
  morningWorking: Number;
  morningStartAt: String;
  morningEndAt: String;

  afternoonWorking: Number;
  afternoonStartAt: String;
  afternoonEndAt: String;
}
