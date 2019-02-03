import { Request, Response, NextFunction } from "express"
import { LocationsResponse } from "../../types"

const request = require("request-promise")


module.exports = (req: Request, res: Response, next: NextFunction) => {
  let user = false;
  const token = typeof req.session != "undefined" ? req.session.token : null
  if (typeof req.session != "undefined" && req.session.token) { user = true; }
  const options = {
    method: 'GET',
    uri: 'http://locations-service:3001/locations/',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return request(options)
  .then((response: LocationsResponse) => {
    res.render('main.html', { user, locations: response.data });
  })
  .catch((err: Error) => { 
    console.log("LocationsRequest", err)
    next(err); });
} 