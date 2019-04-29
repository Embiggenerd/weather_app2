import { Request, Response, NextFunction } from "express";
import { ResponseWithToken } from "../../types";
const request = require("request-promise");

module.exports = (req: Request, res: Response, next: NextFunction) => {
  const payload = {
    username: req.body.username,
    password: req.body.password
  };
  const options = {
    method: "POST",
    uri: "http://users-service:3000/users/register",
    body: payload,
    json: true
  };
  return request(options)
    .then((response: ResponseWithToken) => {
      console.log("webPostRegResFromUsers", response)
      if (typeof req.session != "undefined") {
        req.session.token = response.token;
        res.redirect("/");
      }
    })
    .catch((err: Error) => {
      console.log("webPostRegisterErrCatch", err)
      next(err);
    });
};
