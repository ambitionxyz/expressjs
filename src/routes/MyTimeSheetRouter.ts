import MyTimeSheetController from "../controller/MyTimeSheetController";
import { checkLogin } from "../middleware/auth";
import { Schema, ValidateSchema } from "../middleware/validateSchema";
import { BaseRouter } from "./BaseRouter";

/**
 * @description MyTimeSheetRoute
 */
class MyTimeSheetRouter extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.get("/Get", MyTimeSheetController.get);
    this.router.post("/SubmitToPending", MyTimeSheetController.submitToPending);
    this.router.post(
      "/Create",
      checkLogin,
      ValidateSchema(Schema.timeSheet.create),
      MyTimeSheetController.create
    );
    this.router.delete("/Delete", MyTimeSheetController.delete);
    this.router.put("/Update", MyTimeSheetController.update);
    this.router.get(
      "/GetAllTimeSheetOfUser",
      checkLogin,
      MyTimeSheetController.getAllTimeSheetOfUser
    );
  }
}

export = new MyTimeSheetRouter().router;
