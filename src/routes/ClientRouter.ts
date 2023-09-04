import ClientController from "../controller/ClientController";
import { checkAdmin, checkLogin } from "../middleware/auth";
import { BaseRouter } from "./BaseRouter";

/**
 * @description ConfigurationRouter
 */
class ConfigurationRouter extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.post(
      "/Save",
      checkLogin,
      checkAdmin,
      ClientController.createClient
    );
    this.router.post(
      "/GetAllPagging",
      checkLogin,
      checkAdmin,
      ClientController.findAll
    );
    this.router.get("/GetAll", checkLogin, checkAdmin, ClientController.getAll);
    this.router.delete(
      "/Delete",
      checkLogin,
      checkAdmin,
      ClientController.deleteClient
    );
  }
}

export = new ConfigurationRouter().router;
