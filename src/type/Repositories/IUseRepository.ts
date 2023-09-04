import { IBaseRepository } from "./IBaseRepository";
import { IUser } from "../Models/IUser";
import { IFilterItems } from "../../dto/reqDto/AllPaggingDto";

export interface IUserRepository extends IBaseRepository<IUser> {
  generateToken(userName: string);

  comparePassword(userName: string, plainPass: string);

  createUser(user: IUser);

  findByUserNameEmail(userName: string, emailAddress: string);
  filterUserPagging(
    filterItems: IFilterItems[],
    maxResultCount: Number,
    skipCount: Number,
    searchText: String
  );
  allUserNotPagging();
  getAllManager();
  getUserById(id);
  deleteUser(idQuery): Promise<void>;
}
