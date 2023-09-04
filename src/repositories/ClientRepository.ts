import { BaseRepository } from "./BaseRepository";
import { IClient } from "../type/Models/IClient";
import ClientModel from "../model/client";
import { IFilterItems } from "../dto/reqDto/AllPaggingDto";
import { SEARCH_TEXT_FIELD_CLIENT } from "../constants";

class ClientRepository extends BaseRepository<IClient> {
  constructor() {
    super(ClientModel, "ClientRepository");
  }

  async deleteUser(idQuery): Promise<void> {
    await this._db.findOneAndDelete({ id: idQuery.Id });
  }

  public createClient = async (newClient: IClient) => {
    return await this.create(newClient);
  };
  public updateClient = async (newClient: IClient) => {
    const { id, ...update } = newClient;
    const client = await ClientModel.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    return client;
  };

  async filterClientPagging(
    filterItems: IFilterItems[],
    maxResultCount: Number,
    skipCount: Number,
    searchText: String
  ) {
    let orOpt;
    if (searchText !== "") {
      orOpt = SEARCH_TEXT_FIELD_CLIENT.map((item) => ({
        [item]: { $regex: searchText },
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

export = new ClientRepository();
