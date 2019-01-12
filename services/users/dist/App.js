"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controllers_1 = require("./libs/controllers");
// const { ping } = controllers
class App {
    constructor() {
        this.express = express();
        this.mountRoutes();
    }
    mountRoutes() {
        const router = express.Router();
        router.get('/ping', controllers_1.ping);
        this.express.use('/', router);
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map