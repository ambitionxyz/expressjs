import httpStatus from "http-status";
import { BaseResDto } from "../dto/resDto/BaseResDto";
import ClientRepository from "../repositories/ClientRepository";
import ProjectRepository from "../repositories/ProjectRepository";
import { IClientRepository } from "../type/Repositories/IClientRepository";
import { ApiError } from "../utils/ApiErrors";

class ClientService {
  private _repository: IClientRepository = ClientRepository;
  public create = async (clientInput) => {
    let result;
    if (clientInput.id) {
      result = await this._repository.updateClient(clientInput);
    } else {
      result = await this._repository.createClient(clientInput);
    }
    return {
      ...BaseResDto,
      result,
    };
  };

  public getAllPagging = async (filter) => {
    const { filterItems, maxResultCount, skipCount, searchText } = filter;
    const result = await this._repository.filterClientPagging(
      filterItems,
      maxResultCount,
      skipCount,
      searchText
    );
    return {
      ...BaseResDto,
      result,
    };
  };
  public findAllClient = async () => {
    const result = await this._repository.findAll();
    return {
      ...BaseResDto,
      result,
    };
  };
  public deleteClient = async (idQuery): Promise<void> => {
    const checkClientIsInProject = await ProjectRepository.checkInProject({
      customerId: idQuery.Id,
    });
    if (checkClientIsInProject) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Can't delete client is in project"
      );
    }

    await this._repository.deleteUser(idQuery);
  };
}

export = new ClientService();
