import * as mongoose from "mongoose";
import { IRole } from "../type/Models/IRole";

const roleSchema = new mongoose.Schema<IRole>({
  id: {
    type: String,
    unique: true,
  },
  description: { type: String },
  displayName: { type: String },
  name: { type: String },
  normalizedName: { type: String },
});

roleSchema.pre("save", async function (next: () => void) {
  if (!this.id) {
    this.id = this._id.toString();
  }
  this.normalizedName = this.name.toUpperCase();
  next();
});
const RoleModel = mongoose.model<IRole>("Role", roleSchema);

export default RoleModel;
