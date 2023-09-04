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
const ConfigurationRepository_1 = __importDefault(require("../repositories/ConfigurationRepository"));
class ConfigurationService {
    constructor() {
        this._repository = ConfigurationRepository_1.default;
    }
    workingTimeConfigAllBranch() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._repository.workingTimeConfigAllBranch();
        });
    }
}
module.exports = new ConfigurationService();
//# sourceMappingURL=ConfigurationService.js.map