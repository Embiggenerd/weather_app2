const bcrypt = require("bcryptjs");
const knex = require("../../db/connection");
const localAuth = require("../auth/local");

import { Request, Response, NextFunction } from "express";
import { TokenData, KnexUser, RequestWithUser } from "../types";

export class Helpers {
  
  public createUser(req: Request): KnexUser {
    const salt = bcrypt.getSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    return knex("users")
      .insert({
        username: req.body.username,
        password: hash
      })
      .returning("*");
  }

  public getUser(username: string): KnexUser {
    return knex("users")
      .where({ username })
      .first();
  }

  public comparePass(userPassword: string, databasePassword: string): boolean {
    return bcrypt.compareSync(userPassword, databasePassword);
  }

  public ensureAuthenticated(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Response | undefined {
    if (!(req.headers && req.headers.authorization)) {
      return res.status(400).json({
        status: "Please log in"
      });
    }

    const header = req.headers.authorization.split(" ");
    const token = header[1];
    localAuth.decodeToken(token, (err: Error, payload: TokenData) => {
      if (err) {
        return res.status(401).json({
          status: "Token has expired"
        });
      }
      return knex("users")
        .where({ id: parseInt(payload.sub, 10) })
        .first()
        .then((user: KnexUser) => {
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

// export default new Helpers;
