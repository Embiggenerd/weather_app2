"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
class Routes {
    route(App) {
        App.route("/ping")
            .get(controllers_1.ping);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map