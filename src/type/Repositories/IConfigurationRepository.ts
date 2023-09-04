import { IBranch } from "../Models/IBranch";
import { IBaseRepository } from "./IBaseRepository";

export interface IConfigurationRepository extends IBaseRepository<IBranch> {
  workingTimeConfigAllBranch();
}
