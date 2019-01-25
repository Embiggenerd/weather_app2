import { Request, Response, NextFunction } from "express";
const { authHelpers, localAuth } = require("../auth");

module.exports = (req: Request, res: Response) => {
  return authHelpers
    .createUser(req)
    .then((user: string[]) => {
      return localAuth.encodeToken(user[0]);
    })
    .then((token: string) => {
      res.status(200).json({
        status: "success",
        token
      });
    })
    .catch((e: Error) => {
      res.status(500).json({
        status: "error"
      });
    });
};
