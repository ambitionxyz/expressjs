"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ConfigurationCOntroller_1 = __importDefault(require("../controller/ConfigurationCOntroller"));
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
        this.router.get("/GetWorkingTimeConfigAllBranch", ConfigurationCOntroller_1.default.workingTimeConfigAllBranch);
    }
}
module.exports = new ConfigurationRouter().router;
//# sourceMappingURL=ConfigurationRouter.js.map