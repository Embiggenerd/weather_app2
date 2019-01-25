import { Request, Response, NextFunction } from "express";
import { KnexUser, Token } from "../types";
import { authHelpers, localAuth } from "../auth";

module.exports = (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username;
  const password = req.body.password;
  return authHelpers
    .getUser(username)
    .then((response: KnexUser) => {
      // console.log("getUserRes", response)
      if (!authHelpers.comparePass(password, response.password)) {
        throw new Error("Incorrect password");
      }
      return response;
    })
    .then((response: KnexUser) => {
      return localAuth.encodeToken(response);
    })
    .then((token: Token) => {
      res.status(200).json({
        status: "success",
        token
      });
    })
    .catch((err: Error) => {
      res.status(500).json({
        status: "error",
        message: err
      });
    });
};
