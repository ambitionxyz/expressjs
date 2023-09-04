"use strict";
const BaseRouter_1 = require("./BaseRouter");
const UserController = require("../controller/UserController");
const auth_1 = require("../middleware/auth");
const validateSchema_1 = require("../middleware/validateSchema");
/**
 * @description UserRouter
 */
class UserRouter extends BaseRouter_1.BaseRouter {
    // private _userService = UserService;
    constructor() {
        super();
        this.init();
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    init() {
        this.router.get("/get", auth_1.checkLogin, UserController.get);
        this.router.get("/GetAllManager", auth_1.checkLogin, UserController.getAllManager);
        this.router.get("/GetUserNotPagging", auth_1.checkLogin, UserController.getUserNotPagging);
        this.router.post("/Create", auth_1.checkLogin, auth_1.checkAdmin, (0, validateSchema_1.ValidateSchema)(validateSchema_1.Schema.user.create), UserController.createUser);
        this.router.post("/GetAllPagging", auth_1.checkLogin, UserController.getAllPagging);
        this.router.put("/Update", auth_1.checkLogin, auth_1.checkAdmin, (0, validateSchema_1.ValidateSchema)(validateSchema_1.Schema.user.update), UserController.updateUser);
        this.router.delete("/Delete", auth_1.checkLogin, auth_1.checkAdmin, UserController.deleteUser);
        this.router.get("/GetRoles", auth_1.checkLogin, UserController.getRoles);
    }
}
module.exports = new UserRouter().router;
//# sourceMappingURL=UserRouter.js.map