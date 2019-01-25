import { Application } from "express";

import { ping, register, login, user } from "../controllers";

import { authHelpers } from "../auth"

export class Routes {
  public route(App: Application): void {

    App.route("/ping").get(ping);

    App.route("/users/register").post(register);

    App.route("/users/login").post(login)

    App.route("/users/user").get(authHelpers.ensureAuthenticated, user)
  }
}
