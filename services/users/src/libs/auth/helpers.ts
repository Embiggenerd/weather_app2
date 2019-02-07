const bcrypt = require("bcryptjs");

const knex = require("../../db/connection");
const { decodeToken } = require("./local");

import { Request, Response, NextFunction } from "express";
import { TokenData, KnexUser, RequestWithUser } from "../types";

function createUser(req: Request): KnexUser {
  let user;

  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  user = knex("users")
    .insert({
      username: req.body.username,
      password: hash
    })
    .returning("*");
  return user;
}

function getUser(username: string): KnexUser {
  let user;
  user = knex("users")
    .where({ username })
    .then((users:any) => {
      return users[0]
    })
    
  return user;
}

function comparePass(userPassword: string, databasePassword: string): boolean {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function ensureAuthenticated(
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
  console.log("usersAuthReq", header)

  console.log("usersAuthHeader", header)
  console.log("usersAuthToken", token)


  decodeToken(token, (err: Error, payload: TokenData) => {
    if (err) {
      console.log("usersAuthErr2", err)
      return res.status(401).json({
        status: "Token has expired"
      });
    }
    let knexUser;

    knexUser = knex("users")
      .where({ id: parseInt(payload.sub, 10) })
      .first()
      .then((user: KnexUser) => {
        req.user = user.id;
        return next();
      })
      .catch((e: Error) => {
        console.log("usersAuthErr", e)
        return next(err)
      });

    return knexUser;
  });
}

export { createUser, getUser, comparePass, ensureAuthenticated };
