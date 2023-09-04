import { connect, connection } from "mongoose";
import dotenv from "dotenv";

export function connectDB() {
  connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
    .then((result) => {
      switch (connection.readyState) {
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
  connection.on("connected", () => {
    console.log("Connect to MongoDB successfully !!!");
  });
  connection.on("error", (err) => {
    console.log(`Mongoose default connection has occured error: ${err}`);
  });
}
