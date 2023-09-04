"use strict";
const BaseRouter_1 = require("./BaseRouter");
const UserRouter = require("./UserRouter");
const UserController = require("../controller/UserController");
const ClientRouter = require("./ClientRouter");
const RoleRouter = require("./RoleRouter");
const TaskRouter = require("./TaskRouter");
const ConfigurationRouter = require("./ConfigurationRouter");
const ProjectRouter = require("./ProjectRouter");
const TimeKeepingRouter = require("./TimeKeepingRouter");
const MyTimeSheetRouter = require("./MyTimeSheetRouter");
class AppRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this.configure();
        this.init();
    }
    configure() {
        // define configurations
    }
    /**
     * Connect routes to their matching routers.
     */
    init() {
        this.router.get("/Session/GetCurrentLoginInformations", UserController.getUserLoginInfo);
        this.router.use("/MyTimesheets", MyTimeSheetRouter);
        this.router.use("/Timekeeping", TimeKeepingRouter);
        this.router.use("/User", UserRouter);
        this.router.use("/Configuration", ConfigurationRouter);
        this.router.use("/Customer", ClientRouter);
        this.router.use("/Task", TaskRouter);
        this.router.use("/Project", ProjectRouter);
        this.router.use("/Role", RoleRouter);
    }
}
module.exports = new AppRouter().router;
//# sourceMappingURL=AppRouter.js.map