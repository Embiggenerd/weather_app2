"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const jwt = require("jwt-simple");
class Local {
    constructor() {
        this.secret = process.env.TOKEN_SECRET || "changeme";
    }
    encodeToken(user) {
        const payload = {
            exp: moment()
                .add(14, "days")
                .unix(),
            iat: moment().unix(),
            sub: user.id
        };
        return jwt.encode(payload, this.secret);
    }
    decodeToken(token, callback) {
        const payload = jwt.decode(token, this.secret);
        const now = moment().unix();
        // check if the token has expired
        if (now > payload.exp)
            callback("Token has expired.");
        else
            callback(null, payload);
    }
}
exports.default = new Local();
//# sourceMappingURL=local.js.map