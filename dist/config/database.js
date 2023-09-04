"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = require("mongoose");
function connectDB() {
    (0, mongoose_1.connect)(process.env.DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
    })
        .then((result) => {
        switch (mongoose_1.connection.readyState) {
            case 0:
                console.log("disconnected");
                break;
            case 1:
                console.log("connected");
                break;
            case 2:
                console.log("connecting");
                break;
            case 3:
                console.log("disconnecting");
                break;
        }
    })
        .catch((err) => {
        console.log(err);
    });
    mongoose_1.connection.on("connected", () => {
        console.log("Connect to MongoDB successfully !!!");
    });
    mongoose_1.connection.on("error", (err) => {
        console.log(`Mongoose default connection has occured error: ${err}`);
    });
}
exports.connectDB = connectDB;
//# sourceMappingURL=database.js.map