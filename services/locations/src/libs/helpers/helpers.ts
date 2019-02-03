const request = require("request-promise");

const BASE = "http://api.openweathermap.org/data/2.5/weather";
const KEY = process.env.OPENWEATHERMAP_API_KEY;

import { LocationsArray, RequestWithUser, ResponseWithUser } from "../types";
import { Response, NextFunction } from "express";
console.log("process.env.OPENWEATHERMAP_API_KEY", process.env.OPENWEATHERMAP_API_KEY)
function getWeather(locationsArray: LocationsArray) {
  console.log("apikey", KEY)
  try {
    const data = locationsArray.map(location => {
      const options = {
        method: "GET",
        uri: `${BASE}?lat=${location.lat}&lon=${location.long}&appid=${KEY}`,
        json: true
      };
      return request(options);
    });
    return Promise.all(data);
  } catch(e){
    return console.log("getWeatherErr", e)
  }
  
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
  try {
    const options = {
      method: "GET",
      uri: "http://users-service:3000/users/user",
      json: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.headers.authorization.split(" ")[1]}`
      }
    };
    return request(options)
    .then((response: ResponseWithUser) => {
      req.user = response.user;
      return next();
    })
    .catch((err: Error) => {
      console.log("locAuthErr2", err)
      return next(err);
    });
  }catch(e){
    console.log("locAuthErr", e)
  }
  

  // Send reques to users, which will decode ID from token, and 
  // fetch correct user.

  
}

module.exports = {
  getWeather,
  ensureAuthenticated
};
