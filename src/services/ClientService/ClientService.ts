import Client from "../../model/client";
import { IClientServiceInterface } from "./IClientServiceInterface";

/**
 * @description ClientService.
 */
class ClientService implements IClientServiceInterface {
  async createClient(data) {
    let result = await Client.create({
      name: data.name,
      address: data.address,
      code: data.code,
    });
    return result;
  }

  async updateClient(data) {
    let result = await Client.updateOne({ _id: data.id }, { ...data });
    return result;
  }

  deleteClient(id) {
    // async () => {
    //   try {
    //     let result = await Client.deleteById(id);
    //     return result;
    //   } catch (err) {
    //     console.log(err);
    //     return null;
    //   }
    // };
  }
}

export = new ClientService();
