const queries = require("../../db/queries");

import { Request, Response, NextFunction } from "express";
import {
  ErrorWithStatus,
  LocationsArray,
  WeatherArray,
  RequestWithUser
} from "../types";

module.exports = (req: RequestWithUser, res: Response, next: NextFunction) => {
  req.body.user_id = req.user;
  return queries
    .addLocation(req.body)
    .then((response: LocationsArray) => {
      // let rez = null
      // if (!response) {
      //   const noLocations: ErrorWithStatus = new Error("Locations Error");
      //   noLocations.detail = noLocations.toString();
      // }
      res.json({
        status: "success",
        data: "Location Added!"
      });
    })
    .catch((err: Error) => {
      return next(err);
    });
};
