"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BaseRouter_1 = require("./BaseRouter");
const auth_1 = require("../middleware/auth");
const TimeKeepingController_1 = __importDefault(require("../controller/TimeKeepingController"));
/**
 * @description TimeKeepingRouter
 */
class TimeKeepingRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this.init();
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    init() {
        this.router.get("/GetMyDetails", auth_1.checkLogin, TimeKeepingController_1.default.GetMyDetails);
    }
}
module.exports = new TimeKeepingRouter().router;
//# sourceMappingURL=TimeKeepingRouter.js.map