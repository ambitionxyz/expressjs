import dotenv from "dotenv";

import { Server } from "./server";
import { connectDB } from "./config/database";
/**
 * Application class.
 * @description Handle init config and components.
 */
dotenv.config({
  path: ".env",
});

export class Application {
  server: Server;

  init() {
    this.initServer();
    connectDB();
  }

  private initServer() {
    this.server = new Server();
  }

  start() {
    (async (port = process.env.APP_PORT || 5000) => {
      this.server.app.listen(port, () =>
        console.log(`> Listening on port ${port}`)
      );
      this.server.app.use("/api", this.server.router);
    })();
  }
}
