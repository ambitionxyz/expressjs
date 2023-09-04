import authLoginRouter from "./AuthLoginRouter";
import AppRouter = require("./AppRouter");
import { BaseRouter } from "./BaseRouter";

import bodyParser = require("body-parser");
import cors = require("cors");
import httpStatus = require("http-status");
import { errorConverter, errorHandler } from "../middleware/error";
import { ApiError } from "../utils/ApiErrors";

class MasterRouter extends BaseRouter {
  constructor() {
    super();
    this.configure();
    this.init();
  }

  private configure() {
    // define onfigurations
    this.router.use(cors());

    this.router.use(bodyParser.json()); // to support JSON-encoded bodies
    this.router.use(
      bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: true,
      })
    );
  }

  /**
   * Connect routes to their matching routers.
   */
  protected init() {
    this.router.use("/TokenAuth", authLoginRouter);
    this.router.use("/services/app", AppRouter);
    // send back a 404 error for any unknown api request
    this.router.use((req, res, next) => {
      next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
    });
    // convert error to ApiError, if needed
    this.router.use(errorConverter);

    // handle error
    this.router.use(errorHandler);
  }
}

export = new MasterRouter().router;
