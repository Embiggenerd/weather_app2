const queries = require("../db/queries.js");

import { Request, Response, NextFunction } from "express";
import { LocationsArray, WeatherArray } from "../types";
const { getWeather } = require("../helpers");

module.exports = (req: Request, res: Response, next: NextFunction) => {
  let allLocations: LocationsArray = [];
  return queries
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
      return next(err);
    });
};
