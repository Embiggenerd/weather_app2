import { Application } from "express";

import {
  ping,
  allLocations,
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  logout,
  locationsByuser,
  addLocation
} from "../controllers";

const { ensureAuthenticated, loginRedirect } = require("../helpers");

export class Routes {
  public route(App: Application): void {
    App.route("/ping").get(ping);

    App.route("/").get(ensureAuthenticated, allLocations);

    App.route("/login").get(loginRedirect, getLogin);

    App.route("/login").post(loginRedirect, postLogin);

    App.route("/register").get(loginRedirect, getRegister)

    App.route("/register").post(postRegister)

    App.route("/logout").get(ensureAuthenticated, logout)

    App.route("/add").post(ensureAuthenticated, addLocation)

    App.route("/user").get(ensureAuthenticated, locationsByuser)
  }
}
