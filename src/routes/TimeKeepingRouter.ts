import { BaseRouter } from "./BaseRouter";
import { checkLogin } from "../middleware/auth";
import TimeKeepingController from "../controller/TimeKeepingController";

/**
 * @description TimeKeepingRouter
 */
class TimeKeepingRouter extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.get(
      "/GetMyDetails",
      checkLogin,
      TimeKeepingController.GetMyDetails
    );
  }
}

export = new TimeKeepingRouter().router;
