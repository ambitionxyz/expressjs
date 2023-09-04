import { BaseResDto } from "../dto/resDto/BaseResDto";
import ConfigurationRepository from "../repositories/ConfigurationRepository";
import { IConfigurationRepository } from "../type/Repositories/IConfigurationRepository";

class ConfigurationService {
  private _repository: IConfigurationRepository = ConfigurationRepository;
  async workingTimeConfigAllBranch() {
    return await this._repository.workingTimeConfigAllBranch();
  }
}

export = new ConfigurationService();
