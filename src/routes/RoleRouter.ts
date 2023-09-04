import { BaseRouter } from "./BaseRouter";
import RoleController from "../controller/RoleController";

/**
 * @description RoleRouter
 */
class RoleRouter extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.get("/GetAll", RoleController.getAllPagging);
    this.router.post("/create", RoleController.createRole);
  }
}

export = new RoleRouter().router;
