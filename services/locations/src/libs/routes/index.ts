import { Application } from "express";

import { ping, allLocations } from "../controllers";

const { ensureAuthenticated } = require("../helpers");

export class Routes {
  public route(pre: string, App: Application): void {
    App.route(pre + "/ping").get(ping);

    App.route(pre + "/").get(ensureAuthenticated, allLocations);
  }
}
