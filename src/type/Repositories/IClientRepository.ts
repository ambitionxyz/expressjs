import { IClient } from "../Models/IClient";
import { IBaseRepository } from "./IBaseRepository";

export interface IClientRepository extends IBaseRepository<IClient> {
  createClient(newClient: IClient);
  updateClient(client: IClient);
  filterClientPagging(filterItems, maxResultCount, skipCount, searchText);
  deleteUser(idQuery): Promise<void>;
}
