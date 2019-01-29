const request = require("request-promise");

const BASE = "http://api.openweathermap.org/data/2.5/weather";
const KEY = process.env.OPENWEATHERMAP_API_KEY;

import { LocationsArray, RequestWithUser, ResponseWithUser } from "../types";
import { Response, NextFunction } from "express";

function getWeather(locationsArray: LocationsArray) {
  const data = locationsArray.map(location => {
    const options = {
      method: "GET",
      uri: `${BASE}?lat=${location.lat}&lon=${location.long}&appid=${KEY}`,
      json: true
    };
    return request(options);
  });
  return Promise.all(data);
}

function ensureAuthenticated(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({ status: "Please log in" });
  }
  // Place a header on request to users with same autherization
  // bearer, token as on the request to this mw
  const options = {
    method: "GET",
    uri: "http://users-service:3001/users/user",
    json: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${req.headers.authorization.split(" ")[1]}`
    }
  };
  // Send reques to users, which will decode ID from token, and 
  // fetch correct user.
  return request(options)
    .then((response: ResponseWithUser) => {
      req.user = response.user;
      return next();
    })
    .catch((err: Error) => {
      return next(err);
    });
}

module.exports = {
  getWeather,
  ensureAuthenticated
};
