"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const MyTimeSheetController_1 = __importDefault(require("../controller/MyTimeSheetController"));
const auth_1 = require("../middleware/auth");
const validateSchema_1 = require("../middleware/validateSchema");
const BaseRouter_1 = require("./BaseRouter");
/**
 * @description MyTimeSheetRoute
 */
class MyTimeSheetRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this.init();
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    init() {
        this.router.get("/Get", MyTimeSheetController_1.default.get);
        this.router.post("/SubmitToPending", MyTimeSheetController_1.default.submitToPending);
        this.router.post("/Create", auth_1.checkLogin, (0, validateSchema_1.ValidateSchema)(validateSchema_1.Schema.timeSheet.create), MyTimeSheetController_1.default.create);
        this.router.delete("/Delete", MyTimeSheetController_1.default.delete);
        this.router.put("/Update", MyTimeSheetController_1.default.update);
        this.router.get("/GetAllTimeSheetOfUser", auth_1.checkLogin, MyTimeSheetController_1.default.getAllTimeSheetOfUser);
    }
}
module.exports = new MyTimeSheetRouter().router;
//# sourceMappingURL=MyTimeSheetRouter.js.map