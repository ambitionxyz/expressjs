import { BaseRepository } from "./BaseRepository";
import db from "../model";
import { IBranch } from "../type/Models/IBranch";

class ConfigurationRepository extends BaseRepository<IBranch> {
  constructor() {
    super(db.BranchModel, "ConfigurationRepository");
  }
  async workingTimeConfigAllBranch() {
    return await this._db.find({});
  }
}

export = new ConfigurationRepository();
