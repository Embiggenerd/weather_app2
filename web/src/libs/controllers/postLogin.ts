import { Request, Response, NextFunction } from "express";
const request = require("request-promise");
import { ResponseWithToken } from "../../types";
module.exports = (req: Request, res: Response, next: NextFunction) => {
  const payload = {
    username: req.body.username,
    password: req.body.password
  };
  const options = {
    method: "POST",
    uri: "http://users-service:3000/users/login",
    body: payload,
    json: true
  };
  return request(options)
    .then((response: ResponseWithToken) => {
      // console.log("webPostLoginResponse", response);
      if (typeof req.session != "undefined") {
        req.session.token = response.token;
        return res.redirect("/");
      }
      
    })
    .catch((err: Error) => {
      // console.log("webPostLoginErrCatch", err);
      return next(err);
    });
};
