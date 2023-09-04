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
const http_status_1 = __importDefault(require("http-status"));
const BaseResDto_1 = require("../dto/resDto/BaseResDto");
const ClientRepository_1 = __importDefault(require("../repositories/ClientRepository"));
const ProjectRepository_1 = __importDefault(require("../repositories/ProjectRepository"));
const ApiErrors_1 = require("../utils/ApiErrors");
class ClientService {
    constructor() {
        this._repository = ClientRepository_1.default;
        this.create = (clientInput) => __awaiter(this, void 0, void 0, function* () {
            let result;
            if (clientInput.id) {
                result = yield this._repository.updateClient(clientInput);
            }
            else {
                result = yield this._repository.createClient(clientInput);
            }
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result });
        });
        this.getAllPagging = (filter) => __awaiter(this, void 0, void 0, function* () {
            const { filterItems, maxResultCount, skipCount, searchText } = filter;
            const result = yield this._repository.filterClientPagging(filterItems, maxResultCount, skipCount, searchText);
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result });
        });
        this.findAllClient = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this._repository.findAll();
            return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result });
        });
        this.deleteClient = (idQuery) => __awaiter(this, void 0, void 0, function* () {
            const checkClientIsInProject = yield ProjectRepository_1.default.checkInProject({
                customerId: idQuery.Id,
            });
            if (checkClientIsInProject) {
                throw new ApiErrors_1.ApiError(http_status_1.default.INTERNAL_SERVER_ERROR, "Can't delete client is in project");
            }
            yield this._repository.deleteUser(idQuery);
        });
    }
}
module.exports = new ClientService();
//# sourceMappingURL=ClientSercive.js.map