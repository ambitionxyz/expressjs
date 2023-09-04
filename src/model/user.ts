import * as mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../type/Models/IUser";

import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const JWT_SECRET = process.env.JWT_SECRET;

const userSchema = new mongoose.Schema<IUser>({
  id: {
    type: String,
    unique: true,
  },
  password: { type: String, required: true }, //*
  userName: { type: String, unique: true }, //*
  name: { type: String, default: "" },
  surname: { type: String, default: "" }, //*
  fullName: { type: String, default: "" },
  emailAddress: {
    type: String,
    unique: true,
    require: true,
    // validate: {
    //   validator: function (value) {
    //     // Kiểm tra tính hợp lệ của địa chỉ email
    //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    //   },
    //   message: "Email không hợp lệ",
    // },
  },
  phoneNumber: { type: String, default: "" },
  address: { type: String, default: "" },
  isActive: { type: Boolean, default: null },
  roleNames: { type: Array, default: ["BASICUSER"] },

  projectUsers: { type: Array, default: [] },

  type: { type: Number, default: null },
  salary: { type: Number, default: null },
  salaryAt: { type: String, default: null },
  startDateAt: { type: String, default: null },
  allowedLeaveDay: { type: Number, default: null },
  userCode: { type: String, unique: true },
  jobTitle: { type: String, default: "" },
  level: { type: Number, default: null },
  registerWorkDay: { type: Number, default: null },
  avatarPath: { type: String, default: "" },
  avatarFullPath: { type: String, default: "" },
  managerId: { type: String, default: null },

  managerAvatarPath: { type: String, default: "" },
  managerName: { type: String, default: "" },
  branch: { type: Number, default: 0 },
  branchDisplayName: { type: String, default: null },
  branchId: { type: Number, default: null },
  positionId: { type: Number, default: null },
  positionName: { type: String, default: null },

  branchColor: { type: String, default: null },
  sex: { type: Number, default: null },
  creationTime: { type: String, default: new Date() },
  morningWorking: { type: Number, default: null },
  morningStartAt: { type: String, default: "" },
  morningEndAt: { type: String, default: "" },
  afternoonWorking: { type: Number, default: null },
  afternoonStartAt: { type: String, default: "" },
  afternoonEndAt: { type: String, default: "" },
});
userSchema.pre("save", async function (next: () => void) {
  console.log("save db");
  if (!this.id) {
    this.id = this._id.toString();
  }
  if (this.isModified("password")) {
    const user = this as unknown as IUser;
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this as unknown as IUser;
  const token = await jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8,
      id: this.id,
      roleNames: user.roleNames,
    },
    JWT_SECRET
  );
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  const user = this as unknown as IUser;
  const result = await bcrypt.compare(password, user.password);
  return result;
};

const User = mongoose.model<IUser>("user", userSchema);
export default User;
