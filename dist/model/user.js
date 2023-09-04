"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: ".env",
});
const JWT_SECRET = process.env.JWT_SECRET;
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    password: { type: String, required: true },
    userName: { type: String, unique: true },
    name: { type: String, default: "" },
    surname: { type: String, default: "" },
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
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("save db");
        if (!this.id) {
            this.id = this._id.toString();
        }
        if (this.isModified("password")) {
            const user = this;
            user.password = yield bcrypt_1.default.hash(user.password, 10);
        }
        next();
    });
});
userSchema.methods.generateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const token = yield jsonwebtoken_1.default.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8,
            id: this.id,
            roleNames: user.roleNames,
        }, JWT_SECRET);
        return token;
    });
};
userSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const result = yield bcrypt_1.default.compare(password, user.password);
        return result;
    });
};
const User = mongoose.model("user", userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map