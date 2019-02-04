import { Request, Response, NextFunction } from "express";
const request =require("request-promise")
import { ResponseWithToken} from "../../types"
module.exports = (req: Request, res: Response, next:NextFunction) => {
  const payload = {
    username: req.body.username,
    password: req.body.password,
  };
  const options = {
    method: 'POST',
    uri: 'http://users-service:3000/users/login',
    body: payload,
    json: true,
  };
  return request(options)
  .then((response: ResponseWithToken) => {
    if(typeof req.session != "undefined") {
      req.session.token = response.token;
      res.redirect('/');
    }
    // req.session.token = response.token;
    // res.redirect('/');
  })
  .catch((err:Error) => { next(err); });
}