import { Request, Response, NextFunction } from "express";
const { authHelpers, localAuth } = require("../auth");
import { ErrorFromKnex } from "../types";

module.exports = (req: Request, res: Response, next:NextFunction) => {
  return authHelpers
    .createUser(req)
    .then((user: string[]) => {
      console.log("usersRegisterUser", user)
      return localAuth.encodeToken(user[0]);
    })
    .then((token: string) => {
      res.status(200).json({
        status: "success",
        token
      });
    })
    .catch((e: ErrorFromKnex) => {
      if (e.constraint === "users_username_unique") {
        const usernameTaken: ErrorFromKnex = new Error("Username not available");
        usernameTaken.httpStatusCode = 400
        usernameTaken.detail = usernameTaken.toString()
        return res.status(400).json({
          detail: "Username not available",
          status:400
        })
      }
      console.log("usersRegisterError", e)
      res.status(500).json({
        status: "error"
      });
    });
};
