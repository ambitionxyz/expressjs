import ConfigurationCOntroller from "../controller/ConfigurationCOntroller";
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
    this.router.get(
      "/GetWorkingTimeConfigAllBranch",
      ConfigurationCOntroller.workingTimeConfigAllBranch
    );
  }
}

export = new ConfigurationRouter().router;
