import { Application } from "express";

import { ping, allLocations, login } from "../controllers";

const { ensureAuthenticated, loginRedirect } = require("../helpers");

export class Routes {
  public route(App: Application): void {
    App.route("/ping").get(ping);

    App.route("/").get( ensureAuthenticated, allLocations)

    App.route("/login").get(loginRedirect, login)
  }
}
