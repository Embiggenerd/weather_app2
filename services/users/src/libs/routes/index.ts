import { Application } from "express";

import { ping, register, login, user } from "../controllers";

import { authHelpers } from "../auth";

export class Routes {
  public route(pre: string, App: Application): void {
    App.route(pre + "/ping").get(ping);

    App.route(pre + "/register").post(register);

    App.route(pre + "/login").post(login);

    App.route(pre + "/user").get(authHelpers.ensureAuthenticated, user);
  }
}
