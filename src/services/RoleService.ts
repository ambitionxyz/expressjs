import { BaseResDto } from "../dto/resDto/BaseResDto";
import { IRoleRepository } from "../type/Repositories/IRoleRepository";
import { IRole } from "../type/Models/IRole";
import RoleRepository from "../repositories/RoleRepository";
import { ApiError } from "../utils/ApiErrors";
import httpStatus from "http-status";

class RoleService {
  private _repository: IRoleRepository = RoleRepository;
  async createRole(roleData: IRole) {
    const checkExistOfRoleName = await this._repository.checkRoleError({
      name: roleData.name,
    });
    if (checkExistOfRoleName) {
      throw new ApiError(
        httpStatus.CONFLICT,
        "Role name is existed in the system!"
      );
    }
    const result = await this._repository.createRole(roleData);
    return {
      ...BaseResDto,
      result,
    };
  }

  async getAllPaggingRole(filter) {
    const { Keyword, skipCount, maxResultCount } = filter;
    const result = await this._repository.filterRolePagging(
      Keyword,
      skipCount,
      maxResultCount
    );
    return {
      ...BaseResDto,
      result,
    };
  }
}

export = new RoleService();
