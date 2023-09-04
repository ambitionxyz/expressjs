import ProjectController from "../controller/ProjectController";
import { checkAdmin, checkLogin } from "../middleware/auth";
import { BaseRouter } from "./BaseRouter";
/**
 * @description ProjectRouter
 */
class ProjectRouter extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.get(
      "/getAll",
      checkAdmin,
      checkLogin,
      ProjectController.getAll
    );
    this.router.post("/Save", checkLogin, checkAdmin, ProjectController.save);
    this.router.get("/Get", checkLogin, checkAdmin, ProjectController.get);
    this.router.get(
      "/GetProjectsIncludingTasks",
      checkLogin,
      ProjectController.getProjectsIncludingTasks
    );
  }
}

export = new ProjectRouter().router;
