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
const ClientSercive_1 = __importDefault(require("../services/ClientSercive"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../utils/catchAsync");
class ClientController {
    constructor() {
        this.createClient = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield ClientSercive_1.default.create(req.body);
            return res.status(http_status_1.default.OK).json(result);
        }));
        this.findAll = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield ClientSercive_1.default.getAllPagging(req.body);
            return res.status(http_status_1.default.OK).json(result);
        }));
        this.getAll = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield ClientSercive_1.default.findAllClient();
            return res.status(http_status_1.default.OK).json(result);
        }));
        this.deleteClient = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            yield ClientSercive_1.default.deleteClient(req.query);
            return res.status(http_status_1.default.OK).json({});
        }));
    }
}
module.exports = new ClientController();
//# sourceMappingURL=ClientController.js.map