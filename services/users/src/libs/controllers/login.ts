import { Request, Response, NextFunction } from "express";
import { KnexUser, Token, ErrorWithStatus } from "../types";
import { authHelpers, localAuth } from "../auth";

module.exports = (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username;
  const password = req.body.password;
  return authHelpers
    .getUser(username)
    .then((response: KnexUser) => {
      if (!response) {
        const noUser: ErrorWithStatus = new Error("No such user")
        noUser.detail = noUser.toString()
        noUser.httpStatusCode = 400
        throw noUser
      }
      if (!authHelpers.comparePass(password, response.password)) {
        const wrongPass: ErrorWithStatus = new Error("Incorrect password");
        wrongPass.detail = wrongPass.toString()
        wrongPass.httpStatusCode = 400
        throw wrongPass
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
      next(err);
    });
};
