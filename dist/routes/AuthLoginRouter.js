"use strict";
const BaseRouter_1 = require("./BaseRouter");
const AuthenticateController = require("../controller/AuthenticateController");
/**
 * @description AuthLoginRouter
 */
class AuthLoginRouter extends BaseRouter_1.BaseRouter {
    // private _authenService = AuthenService;
    constructor() {
        super();
        this.init();
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    init() {
        this.router.post("/Authenticate", 
        // validate(REQUIRED_FIELD_LOGIN),
        AuthenticateController.authenticate);
    }
}
module.exports = new AuthLoginRouter().router;
//# sourceMappingURL=AuthLoginRouter.js.map