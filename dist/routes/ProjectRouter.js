"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ProjectController_1 = __importDefault(require("../controller/ProjectController"));
const auth_1 = require("../middleware/auth");
const BaseRouter_1 = require("./BaseRouter");
/**
 * @description ProjectRouter
 */
class ProjectRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this.init();
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    init() {
        this.router.get("/getAll", auth_1.checkAdmin, auth_1.checkLogin, ProjectController_1.default.getAll);
        this.router.post("/Save", auth_1.checkLogin, auth_1.checkAdmin, ProjectController_1.default.save);
        this.router.get("/Get", auth_1.checkLogin, auth_1.checkAdmin, ProjectController_1.default.get);
        this.router.get("/GetProjectsIncludingTasks", auth_1.checkLogin, ProjectController_1.default.getProjectsIncludingTasks);
    }
}
module.exports = new ProjectRouter().router;
//# sourceMappingURL=ProjectRouter.js.map