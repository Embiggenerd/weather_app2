const bcrypt = require("bcryptjs");

const knex = require("../../db/connection");
const { localAuth } = require("../auth");

import { Request, Response, NextFunction } from "express";
import { TokenData, KnexUser, RequestWithUser } from "../types";

function createUser(req: Request): KnexUser {
  let user;
  try {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    user = knex("users")
      .insert({
        username: req.body.username,
        password: hash
      })
      .returning("*");
  } catch (e) {}
  return user;
}

function getUser(username: string): KnexUser {
  let user;
  try {
    user = knex("users")
      .where({ username })
      .first();
  } catch (e) {}
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

  // if (!(req.headers && req.headers.authorization)) {
  //   return res.status(400).json({
  //     status: 'Please log in',
  //   });
  // }
  // // decode the token
  // const header = req.headers.authorization.split(' ');
  // const token = header[1];
  // localAuth.decodeToken(token, (err:Error, payload:TokenData) => {
  //   if (err) {
  //     return res.status(401).json({
  //       status: 'Token has expired',
  //     });
  //   }
  //   return knex('users').where({ id: parseInt(payload.sub, 10) }).first()
  //   .then((user:KnexUser) => {
  //     req.user = user.id;
  //     return next();
  //   })
  //   .catch((e:Error) => {
  //     console.log(e)
  //     return res.status(500).json({
  //       status: 'error',
  //     });
  //   });
  // });
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({
      status: "Please log in"
    });
  }

  const header = req.headers.authorization.split(" ");
  const token = header[1];
  console.log(token)
  localAuth.decodeToken(token, (err: Error, payload: TokenData) => {
    if (err) {
      console.log('decodeError', err)
      return res.status(401).json({
        status: "Token has expired"
      });
    }
    let knexUser;
    try {
      knexUser = knex("users").where({ id: parseInt(payload.sub, 10) })
      .first()
      .then((user: KnexUser) => {
        console.log("knexUser", user);
        req.user = user.id;
        return next();
      })
      .catch((e: Error) => {
        console.log("authError", e);
        return res.status(500).json({
          status: "error"
        });
      });

    } catch(e) {
      console.log("knexError:", e)
    }
     console.log('sss', knexUser)
     return knexUser 
  });
}

export { createUser, getUser, comparePass, ensureAuthenticated };
