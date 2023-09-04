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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("./server");
const database_1 = require("./config/database");
/**
 * Application class.
 * @description Handle init config and components.
 */
dotenv_1.default.config({
    path: ".env",
});
class Application {
    init() {
        this.initServer();
        (0, database_1.connectDB)();
    }
    initServer() {
        this.server = new server_1.Server();
    }
    start() {
        ((port = process.env.APP_PORT || 5000) => __awaiter(this, void 0, void 0, function* () {
            this.server.app.listen(port, () => console.log(`> Listening on port ${port}`));
            this.server.app.use("/api", this.server.router);
        }))();
    }
}
exports.Application = Application;
//# sourceMappingURL=app.js.map