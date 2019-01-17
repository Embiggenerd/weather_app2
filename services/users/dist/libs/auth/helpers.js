"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
const knex = require("../../db/connection");
const localAuth = require("../auth/local");
class Helpers {
    createUser(req) {
        const salt = bcrypt.getSaltSync();
        const hash = bcrypt.hashSync(req.body.password, salt);
        return knex("users")
            .insert({
            username: req.body.username,
            password: hash
        })
            .returning("*");
    }
    getUser(username) {
        return knex("users")
            .where({ username })
            .first();
    }
    comparePass(userPassword, databasePassword) {
        return bcrypt.compareSync(userPassword, databasePassword);
    }
    ensureAuthenticated(req, res, next) {
        if (!(req.headers && req.headers.authorization)) {
            return res.status(400).json({
                status: "Please log in"
            });
        }
        const header = req.headers.authorization.split(" ");
        const token = header[1];
        localAuth.decodeToken(token, (err, payload) => {
            if (err) {
                return res.status(401).json({
                    status: "Token has expired"
                });
            }
            return knex("users")
                .where({ id: parseInt(payload.sub, 10) })
                .first()
                .then((user) => {
                req.user = user.id;
                return next();
            })
                .catch(() => {
                return res.status(500).json({
                    status: "error"
                });
            });
        });
    }
}
exports.default = new Helpers();
//# sourceMappingURL=helpers.js.map