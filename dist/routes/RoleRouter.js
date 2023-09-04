"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BaseRouter_1 = require("./BaseRouter");
const RoleController_1 = __importDefault(require("../controller/RoleController"));
/**
 * @description RoleRouter
 */
class RoleRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this.init();
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    init() {
        this.router.get("/GetAll", RoleController_1.default.getAllPagging);
        this.router.post("/create", RoleController_1.default.createRole);
    }
}
module.exports = new RoleRouter().router;
//# sourceMappingURL=RoleRouter.js.map