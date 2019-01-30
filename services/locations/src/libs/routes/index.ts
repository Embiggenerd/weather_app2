import { Application } from "express";

import {
  ping,
  allLocations,
  locationsByUser,
  singleLocation,
  postLocation,
  putLocation,
  delLocation
} from "../controllers";

const { ensureAuthenticated } = require("../helpers");

export class Routes {
  public route(pre: string, App: Application): void {
    App.route(pre + "/ping").get(ping);

    App.route(pre + "/").get(ensureAuthenticated, allLocations);

    App.route(pre + "/user").get(ensureAuthenticated, locationsByUser);

    App.route(pre + "/:id").get(ensureAuthenticated, singleLocation);

    App.route(pre + "/").post(ensureAuthenticated, postLocation);

    App.route(pre + "/:id").put(ensureAuthenticated, putLocation);

    App.route(pre + "/:id").delete(ensureAuthenticated, delLocation);

  }
}
