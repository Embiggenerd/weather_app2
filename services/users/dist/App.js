"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
// hello there
// import { ping } from "./libs/controllers";
const routes_1 = require("./libs/routes");
class App {
    constructor() {
        this.routes = new routes_1.Routes();
        this.express = express();
        this.configureHeaders();
        this.configureLogger();
        this.configureParsers();
        this.mountRoutes();
        this.setup404();
        this.setupErrors();
    }
    mountRoutes() {
        this.routes.route(this.express);
    }
    configureHeaders() {
        this.express.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            next();
        });
    }
    configureLogger() {
        if (process.env.NODE_ENV !== "test") {
            this.express.use(logger("dev"));
        }
    }
    configureParsers() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cookieParser());
    }
    setup404() {
        this.express.use((req, res, next) => {
            const err = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    }
    setupErrors() {
        this.express.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.json({
                status: "error",
                message: err
            });
        });
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map