const queries = require("../../db/queries");

import { Request, Response, NextFunction } from "express";
import { LocationsArray, WeatherArray, RequestWithUser } from "../types";

module.exports = (req: Request, res: Response, next: NextFunction) => {
  return queries
    .getSingleLocation(parseInt(req.params.id, 10))
    .then((locations: LocationsArray) => {
      res.json({
        status: "success",
        data: locations[0]
      });
    })
    .catch((err: Error) => {
      return next(err);
    });
};
