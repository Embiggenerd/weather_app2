require("source-map-support").install();
import * as express from "express";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as path from "path";
import * as nunjucks from "nunjucks";

import { Routes } from "./libs/routes";
import { Request, Response, NextFunction } from "express";
import { ErrorWithStatus } from "./types";
class App {
  public express: express.Application;
  public routes: Routes = new Routes();

  constructor() {
    this.express = express();
    this.configureHeaders();
    this.configureLogger();
    this.setupViewEngine();
    this.configureParsers();
    this.configureSession();
    this.setupServeStatic();
    this.mountRoutes();
    this.setup404();
    this.setupErrors();
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

  private mountRoutes(): void {
    this.routes.route(this.express);
  }

  private configureParsers(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cookieParser());
  }

  private configureSession(): void {
    this.express.use(
      session({
        secret: process.env.SECRET_KEY || "changeme",
        resave: false,
        saveUninitialized: true
      })
    );
  }

  private setupServeStatic(): void {
    this.express.use(
      express.static(path.join(__dirname, "..", "src", "public"))
    );
  }

  private setupViewEngine(): void {
    nunjucks.configure(path.join(__dirname, "..", "src", "views"), {
      express: this.express,
      autoescape: true,
      noCache: false,
      watch: true
    });
    this.express.set("view engine", "html");
  }

  private setup404(): void {
    console.log("setup404 invoked");
    this.express.use(
      (req: Request, res: Response, next: NextFunction): void => {
        console.log("webSetup404Error")
        const err: ErrorWithStatus = new Error("Not Found");
        err.statusCode = 404;
        err.detail = err.toString();
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
        console.log("webError", err)

        const detail =
          typeof err.error === "undefined" ? err.detail : err.error.detail;
        const status = err.statusCode || 500;
        const message = {
          status,
          detail: detail
        };
        return res.status(status).render("error", message);
      }
    );
  }
}

export default new App().express;
