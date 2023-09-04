import * as mongoose from "mongoose";
import { IClient } from "../type/Models/IClient";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const clientSchema = new mongoose.Schema<IClient>(
  {
    id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      require: true,
      unique: true,
    },
    code: {
      type: String,
    },
    address: String,
  },
  { timestamps: true }
);

clientSchema.pre("save", async function (next: () => void) {
  if (!this.id) {
    this.id = this._id.toString();
  }
  this.code = this.name;
  next();
});

const ClientModel = mongoose.model("Client", clientSchema);

export default ClientModel;
