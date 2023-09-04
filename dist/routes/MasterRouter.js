"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const AuthLoginRouter_1 = __importDefault(require("./AuthLoginRouter"));
const AppRouter = require("./AppRouter");
const BaseRouter_1 = require("./BaseRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
const httpStatus = require("http-status");
const error_1 = require("../middleware/error");
const ApiErrors_1 = require("../utils/ApiErrors");
class MasterRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this.configure();
        this.init();
    }
    configure() {
        // define onfigurations
        this.router.use(cors());
        this.router.use(bodyParser.json()); // to support JSON-encoded bodies
        this.router.use(bodyParser.urlencoded({
            // to support URL-encoded bodies
            extended: true,
        }));
    }
    /**
     * Connect routes to their matching routers.
     */
    init() {
        this.router.use("/TokenAuth", AuthLoginRouter_1.default);
        this.router.use("/services/app", AppRouter);
        // send back a 404 error for any unknown api request
        this.router.use((req, res, next) => {
            next(new ApiErrors_1.ApiError(httpStatus.NOT_FOUND, "Not found"));
        });
        // convert error to ApiError, if needed
        this.router.use(error_1.errorConverter);
        // handle error
        this.router.use(error_1.errorHandler);
    }
}
module.exports = new MasterRouter().router;
//# sourceMappingURL=MasterRouter.js.map