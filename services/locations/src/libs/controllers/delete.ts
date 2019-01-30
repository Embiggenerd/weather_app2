const queries = require("../../db/queries");

import { Request, Response, NextFunction } from "express";
import { LocationsArray, WeatherArray, RequestWithUser } from "../types";
const { getWeather } = require("../helpers");

module.exports = (req:Request, res: Response, next: NextFunction) => {
  return queries
    .removeLocation(parseInt(req.params.id, 10))
    .then(() => {
      res.json({
        status: "success",
        data: "Location Removed!"
      });
    })
    .catch((err: Error) => {
      return next(err);
    });
}