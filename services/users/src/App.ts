require("source-map-support").install();
import * as express from "express";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";

import { Routes } from "./libs/routes";
import { Request, Response, NextFunction } from "express";
import { ErrorWithStatus } from "./libs/types";

class App {
  public express: express.Application;
  public routes: Routes = new Routes();

  constructor() {
    this.express = express();
    this.configureHeaders();
    this.configureLogger();
    this.configureParsers();
    this.mountRoutes();
    this.setup404();
    this.setupErrors();
  }

  private mountRoutes(): void {
    this.routes.route("/users", this.express);
  }

  private configureHeaders(): void {
    this.express.use(
      (req: Request, res: Response, next: NextFunction): void => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        next();
      }
    );
  }

  private configureLogger(): void {
    if (process.env.NODE_ENV !== "test") {
      this.express.use(logger("dev"));
    }
  }

  private configureParsers(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cookieParser());
  }

  private setup404(): void {
    this.express.use(
      (req: Request, res: Response, next: NextFunction): void => {
        const err: ErrorWithStatus = new Error("Not Found");
        err.httpStatusCode = 404;
        next(err);
      }
    );
  }

  private setupErrors(): void {
    this.express.use(
      (
        err: ErrorWithStatus,
        req: Request,
        res: Response,
        next: NextFunction
      ): void => {
        res.status(err.httpStatusCode || 500).json({
          msg: err.message,
          detail: err.detail
        });
      }
    );
  }
}

export default new App().express;
