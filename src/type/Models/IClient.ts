import { Document } from "mongoose";
export interface IClient extends Document {
  id_client: Number;
  name: String;
  code: String;
  address: String;
}
