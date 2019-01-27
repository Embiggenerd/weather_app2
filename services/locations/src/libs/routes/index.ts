import { Application } from "express"

import { ping } from "../controllers"

export class Routes {
  public route(pre:string, App:Application): void {
    App.route(pre + "/ping").get(ping)
  }
}