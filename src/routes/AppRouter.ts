import { BaseRouter } from "./BaseRouter";
import UserService = require("../services/UserService");
import UserRouter = require("./UserRouter");
import UserController = require("../controller/UserController");
import ClientRouter = require("./ClientRouter");
import RoleRouter = require("./RoleRouter");
import TaskRouter = require("./TaskRouter");
import ConfigurationRouter = require("./ConfigurationRouter");
import ProjectRouter = require("./ProjectRouter");
import TimeKeepingRouter = require("./TimeKeepingRouter");
import MyTimeSheetRouter = require("./MyTimeSheetRouter");

class AppRouter extends BaseRouter {
  constructor() {
    super();
    this.configure();
    this.init();
  }

  private configure() {
    // define configurations
  }

  /**
   * Connect routes to their matching routers.
   */ 
  protected init() {
    this.router.get(
      "/Session/GetCurrentLoginInformations",
      UserController.getUserLoginInfo
    );
    this.router.use("/MyTimesheets", MyTimeSheetRouter);
    this.router.use("/Timesheet", TimesheetRouter);
    this.router.use("/Timekeeping", TimeKeepingRouter);
    this.router.use("/User", UserRouter);
    this.router.use("/Configuration", ConfigurationRouter);
    this.router.use("/Customer", ClientRouter);
    this.router.use("/Task", TaskRouter);
    this.router.use("/Project", ProjectRouter);
    this.router.use("/Role", RoleRouter);
  }
}

export = new AppRouter().router;
