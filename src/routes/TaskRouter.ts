import { BaseRouter } from "./BaseRouter";
import TaskController = require("../controller/TaskController");
import { checkAdmin, checkLogin } from "../middleware/auth";
/**
 * @description TaskRouter
 */
class TaskRouter extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.delete(
      "/Delete",
      checkLogin,
      checkAdmin,
      TaskController.deleteTask
    );
    this.router.post("/Save", checkLogin, checkAdmin, TaskController.save);
    this.router.delete("/Archive", checkLogin, checkAdmin, TaskController.archive);
    this.router.get("/GetAll", checkLogin, checkAdmin, TaskController.findAll);
  }
}

export = new TaskRouter().router;
