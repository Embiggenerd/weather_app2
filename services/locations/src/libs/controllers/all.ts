const queries = require("../../db/queries");

import { Request, Response, NextFunction } from "express";
import { LocationsArray, WeatherArray, RequestWithUser } from "../types";
const { getWeather } = require("../helpers");

module.exports = (req: RequestWithUser, res: Response, next: NextFunction) => {
  console.log("allInvoked")
  let allLocations: LocationsArray = [];
  try {return queries
    .getAllLocations()
    .then((locations: LocationsArray) => {
      allLocations = locations;
      return getWeather(allLocations);
    })
    .then((weather: WeatherArray) => {
      const final = allLocations.map((location, i) => {
        const convert = weather[i].main.temp * (9 / 5) - 459.67;
        location.temp = Math.round(convert);
        return location;
      });
      res.json({
        status: "success",
        data: final
      });
    })
    .catch((err: Error) => {
      console.log("allQueriesErr", err)
      return next(err);
    });
  } catch(e){
    console.log("allErr", e)
  }
};
