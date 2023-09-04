"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const client_1 = __importDefault(require("../../model/client"));
/**
 * @description ClientService.
 */
class ClientService {
    createClient(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield client_1.default.create({
                name: data.name,
                address: data.address,
                code: data.code,
            });
            return result;
        });
    }
    updateClient(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield client_1.default.updateOne({ _id: data.id }, Object.assign({}, data));
            return result;
        });
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
module.exports = new ClientService();
//# sourceMappingURL=ClientService.js.map