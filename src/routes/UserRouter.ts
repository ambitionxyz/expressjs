import { BaseRouter } from "./BaseRouter";
import UserController = require("../controller/UserController");
import { checkAdmin, checkLogin } from "../middleware/auth";
import { Schema, ValidateSchema } from "../middleware/validateSchema";
/**
 * @description UserRouter
 */
class UserRouter extends BaseRouter {
  // private _userService = UserService;

  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.get("/get", checkLogin, UserController.get);
    this.router.get("/GetAllManager", checkLogin, UserController.getAllManager);
    this.router.get(
      "/GetUserNotPagging",
      checkLogin,
      UserController.getUserNotPagging
    );
    this.router.post(
      "/Create",
      checkLogin,
      checkAdmin,
      ValidateSchema(Schema.user.create),
      UserController.createUser
    );
    this.router.post(
      "/GetAllPagging",
      checkLogin,
      UserController.getAllPagging
    );
    this.router.put(
      "/Update",
      checkLogin,
      checkAdmin,
      ValidateSchema(Schema.user.update),
      UserController.updateUser
    );
    this.router.delete(
      "/Delete",
      checkLogin,
      checkAdmin,
      UserController.deleteUser
    );
    this.router.get("/GetRoles", checkLogin, UserController.getRoles);
  }
}

export = new UserRouter().router;
