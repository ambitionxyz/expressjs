import { BaseRepository } from "./BaseRepository";
import { IUser } from "../type/Models/IUser";
import db from "../model";
import { IFilterItems, IFilterOpt } from "../dto/reqDto/AllPaggingDto";
import { SEARCH_TEXT_FIELD_USER } from "../constants/index";

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(db.User, "UserRepository");
  }
  async generateToken(userName) {
    const user = await this._db.findOne({ userName });
    return await user.generateAuthToken();
  }

  async comparePassword(userName: String, plainPass: String) {
    const user = await this._db.findOne({ userName });

    return await user.comparePassword(plainPass);
  }

  async createUser(user: IUser) {
    return await this.create(user);
  }

  async findByUserNameEmail(userName: string, emailAddress: string) {
    let user: IUser = await this._db.findOne({ userName });
    if (user) return { userName: user.userName };

    let userByEmail = await this._db.findOne({ emailAddress });
    if (userByEmail) return { emailAddress: userByEmail.emailAddress };

    return null;
  }

  async filterUserPagging(
    filterItems: IFilterItems[],
    maxResultCount: Number,
    skipCount: Number,
    searchText: String
  ) {
    let filterOptions: IFilterOpt = filterItems.length
      ? filterItems.map((item) => ({
          [item.propertyName]: item.value,
        }))
      : [];
    if (searchText !== "") {
      let orOpt = SEARCH_TEXT_FIELD_USER.map((item) => ({
        [item]: { $regex: searchText },
      }));
      if (orOpt.length) filterOptions.push({ $or: orOpt });
    }
    const findOpt = filterOptions.length ? { $and: filterOptions } : {};

    const items = await this._db
      .find(findOpt)
      .skip(skipCount)
      .limit(maxResultCount);
    return {
      totalCount: items.length,
      items,
    };
  }

  async allUserNotPagging() {
    const list = await this._db
      .find({
        roleNames: {
          $in: ["BASICUSER", "PROJECTADMIN", "HR MANAGER", "SUPERVISOR"],
          $nin: ["ADMIN"],
        },
      })
      .select(
        "avatarFullPath avatarPath branch branchColor branchDisplayName branchId emailAddress id isActive jobTitle level name positionId positionName type userCode"
      );

    return list;
  }

  async getAllManager() {
    const list = await this._db
      .find({
        roleNames: { $in: ["MANAGER"], $nin: ["ADMIN"] },
      })
      .select(
        "name emailAddress isActive type jobTitle level userCode avatarPath avatarFullPath branch branchColor branchDisplayName branchId positionId positionName id"
      );

    return list;
  }
  async getUserById(userId) {
    const user = await this._db.findOne({ id: userId });
    return user;
  }
  async deactiveUser(id: number): Promise<void> {
    await this._db.findOneAndUpdate({ id: id }, { isActive: false });
  }
  async activeUser(id: number): Promise<void> {
    await this._db.findOneAndUpdate({ id: id }, { isActive: true });
  }

  async deleteUser(idQuery): Promise<void> {
    await this._db.findOneAndDelete({ id: idQuery.Id });
  }
  async getNameUserById(userId) {
    const user = await this._db.findOne({ id: userId });
    return user.name;
  }
}

export = new UserRepository();
