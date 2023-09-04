import { Document } from "mongoose";

export interface IBranch extends Document {
  name: string;
  displayName: string;
  morningStartAt: string;
  morningEndAt: string;
  morningWorking: string;
  afternoonStartAt: string;
  afternoonEndAt: string;
  afternoonWorking: string;
  color: string;
  code: string;
}
