"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
class Server {
    constructor() {
        this.port = process.env.PORT || "3000";
        this.listen();
    }
    listen() {
        App_1.default.listen(this.port, () => {
            console.log(`listening on port ${this.port}`);
        });
    }
}
exports.default = new Server();
//# sourceMappingURL=index.js.map