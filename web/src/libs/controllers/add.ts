import { Request, Response, NextFunction } from "express";
const request = require("request-promise")


module.exports = (req:Request, res:Response, next:NextFunction) => {
  const token = typeof request.session === "undefined" ? null : request.session.token
  
  const payload = {
    lat: req.body.latitude,
    long: req.body.longitude,
  };
  const options = {
    method: 'POST',
    uri: 'http://locations-service:3001/locations/',
    json: true,
    body: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return request(options)
  .then(() => {
    res.redirect('/');
  })
  .catch((err:Error) => { next(err); });
}