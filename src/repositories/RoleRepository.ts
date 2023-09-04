import { BaseRepository } from "./BaseRepository";

import db from "../model";
import { IRole } from "../type/Models/IRole";
import { SEARCH_TEXT_FIELD_ROLE } from "../constants";

class RoleRepository extends BaseRepository<IRole> {
  constructor() {
    super(db.RoleModel, "RoleRepository");
  }
  async getAll() {
    return await this.findAll();
  }
  async checkRoleError(query: object): Promise<IRole> {
    return await this.findOne(query);
  }

  async createRole(roleData: IRole): Promise<IRole> {
    return await this.create(roleData);
  }
  async roleById(Id: number): Promise<IRole> {
    return await this.findOne({ id: Id });
  }

  async roleUpdate(updateData): Promise<void> {
    const { id, ...update } = updateData;
    const role = await this._db.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    return role;
  }
  async deleteRole(id: number): Promise<void> {
    await await this._db.findOneAndDelete({ id: id });
  }
  async filterRolePagging(
    Keyword: String,
    maxResultCount: Number,
    skipCount: Number
  ) {
    let orOpt;
    if (Keyword !== "") {
      orOpt = SEARCH_TEXT_FIELD_ROLE.map((item) => ({
        [item]: { $regex: Keyword },
      }));
    }
    const items = await this._db
      .find(orOpt ? { $or: orOpt } : orOpt)
      .skip(skipCount)
      .limit(maxResultCount);
    return {
      totalCount: items.length,
      items,
    };
  }
}

export = new RoleRepository();
