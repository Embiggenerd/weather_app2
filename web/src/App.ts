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
console.log("process.env.SECRET_KEY", process.env.SECRET_KEY);
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
      autoescape: true
    });
    this.express.set("view engine", "html");
  }

  private setup404(): void {
    this.express.use(
      (req: Request, res: Response, next: NextFunction): void => {
        const err: ErrorWithStatus = new Error("Not Found");
        err.status = 404;
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
        if (!err) return next();
        const status = err.status || 500;
        const message = {
          status,
          code: err.code,
          detail: err.message
        };
        return res.status(status).render("error", message);
      }
    );
  }
}

export default new App().express;
