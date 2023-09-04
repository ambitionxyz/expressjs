import mongoose, { Schema } from "mongoose";
import { IBranch } from "../type/Models/IBranch";

const branchSchema = new Schema<IBranch>({
  name: {
    type: String,
    unique: true,
  },
  displayName: {
    type: String,
    unique: true,
  },
  morningStartAt: { type: String, default: "08:30" },

  morningEndAt: { type: String, default: "12:00" },
  morningWorking: { type: String, default: "3.5" },
  afternoonStartAt: { type: String, default: "13:00" },

  afternoonEndAt: { type: String, default: "17:30" },
  afternoonWorking: { type: String, default: "4.5" },
  color: { type: String, default: "#f44336" },
  code: { type: String, default: "DEFAULT" },
});

const BranchModel = mongoose.model<IBranch>("Branch", branchSchema);

export default BranchModel;
