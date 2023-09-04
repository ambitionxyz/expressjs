import { Document, Schema, model } from "mongoose";

export interface ITask extends Document {
  name: string;
  type: number;
  isDelete: boolean;
}
