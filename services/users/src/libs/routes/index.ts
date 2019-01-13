import { Application } from "express";

import { ping } from "../controllers";

export class Routes {
  public route(App: Application): void {
    App.route("/ping")
        .get(ping);
  }
}
