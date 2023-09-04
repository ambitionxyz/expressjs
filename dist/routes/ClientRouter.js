"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ClientController_1 = __importDefault(require("../controller/ClientController"));
const auth_1 = require("../middleware/auth");
const BaseRouter_1 = require("./BaseRouter");
/**
 * @description ConfigurationRouter
 */
class ConfigurationRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this.init();
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    init() {
        this.router.post("/Save", auth_1.checkLogin, auth_1.checkAdmin, ClientController_1.default.createClient);
        this.router.post("/GetAllPagging", auth_1.checkLogin, auth_1.checkAdmin, ClientController_1.default.findAll);
        this.router.get("/GetAll", auth_1.checkLogin, auth_1.checkAdmin, ClientController_1.default.getAll);
        this.router.delete("/Delete", auth_1.checkLogin, auth_1.checkAdmin, ClientController_1.default.deleteClient);
    }
}
module.exports = new ConfigurationRouter().router;
//# sourceMappingURL=ClientRouter.js.map