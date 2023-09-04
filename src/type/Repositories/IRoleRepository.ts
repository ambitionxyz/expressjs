import { IRole } from "../Models/IRole";
import { IBaseRepository } from "./IBaseRepository";

export interface IRoleRepository extends IBaseRepository<IRole> {
  createRole(roleData: IRole): Promise<IRole>;
  roleById(Id: number): Promise<IRole>;
  roleUpdate(updateData): Promise<void>;
  deleteRole(id: number): Promise<void>;
  checkRoleError(query: object): Promise<IRole>;
  filterRolePagging(Keyword: String, maxResultCount: Number, skipCount: Number);
}
