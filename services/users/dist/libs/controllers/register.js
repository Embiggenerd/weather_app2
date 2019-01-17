"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const localAuth = require('../auth/local');
const authHelpers = require('../auth/helpers');
module.exports = (req, res) => {
    return authHelpers.createUser(req, res)
        .then((user) => { return localAuth.encodeToken(user[0]); })
        .then((token) => {
        res.status(200).json({
            status: 'success',
            token,
        });
    })
        .catch(() => {
        res.status(500).json({
            status: 'error',
        });
    });
};
//# sourceMappingURL=register.js.map