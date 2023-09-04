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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BaseRepository_1 = require("./BaseRepository");
const client_1 = __importDefault(require("../model/client"));
const constants_1 = require("../constants");
class ClientRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(client_1.default, "ClientRepository");
        this.createClient = (newClient) => __awaiter(this, void 0, void 0, function* () {
            return yield this.create(newClient);
        });
        this.updateClient = (newClient) => __awaiter(this, void 0, void 0, function* () {
            const { id } = newClient, update = __rest(newClient, ["id"]);
            const client = yield client_1.default.findOneAndUpdate({ _id: id }, update, {
                new: true,
            });
            return client;
        });
    }
    deleteUser(idQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._db.findOneAndDelete({ id: idQuery.Id });
        });
    }
    filterClientPagging(filterItems, maxResultCount, skipCount, searchText) {
        return __awaiter(this, void 0, void 0, function* () {
            let orOpt;
            if (searchText !== "") {
                orOpt = constants_1.SEARCH_TEXT_FIELD_CLIENT.map((item) => ({
                    [item]: { $regex: searchText },
                }));
            }
            const items = yield this._db
                .find(orOpt ? { $or: orOpt } : orOpt)
                .skip(skipCount)
                .limit(maxResultCount);
            return {
                totalCount: items.length,
                items,
            };
        });
    }
}
module.exports = new ClientRepository();
//# sourceMappingURL=ClientRepository.js.map