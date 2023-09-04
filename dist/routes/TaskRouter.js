"use strict";
const BaseRouter_1 = require("./BaseRouter");
const TaskController = require("../controller/TaskController");
const auth_1 = require("../middleware/auth");
/**
 * @description TaskRouter
 */
class TaskRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this.init();
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    init() {
        this.router.delete("/Delete", auth_1.checkLogin, auth_1.checkAdmin, TaskController.deleteTask);
        this.router.post("/Save", auth_1.checkLogin, auth_1.checkAdmin, TaskController.save);
        this.router.delete("/Archive", auth_1.checkLogin, auth_1.checkAdmin, TaskController.archive);
        this.router.get("/GetAll", auth_1.checkLogin, auth_1.checkAdmin, TaskController.findAll);
    }
}
module.exports = new TaskRouter().router;
//# sourceMappingURL=TaskRouter.js.map