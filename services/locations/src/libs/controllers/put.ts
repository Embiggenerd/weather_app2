const queries = require("../../db/queries");

import { Request, Response, NextFunction } from "express";
import { LocationsArray, WeatherArray, RequestWithUser } from "../types";
const { getWeather } = require("../helpers");

module.exports =  (req: RequestWithUser, res: Response, next: NextFunction) => {
  req.body.user_id = req.user
  return queries
    .updateLocation(parseInt(req.params.id, 10), req.body)
    .then(() => {
      res.json({
        status: "success",
        data: "Location Updated!"
      });
    })
    .catch((err: Error) => {
      return next(err);
    });
}