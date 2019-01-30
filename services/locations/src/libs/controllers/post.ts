const queries = require("../../db/queries");

import { Request, Response, NextFunction } from "express";
import { LocationsArray, WeatherArray, RequestWithUser } from "../types";

module.exports = (req: RequestWithUser, res: Response, next: NextFunction) => {
  req.body.user_id = req.user;
  return queries
    .addLocation(req.body)
    .then(() => {
      res.json({
        status: "success",
        data: "Location Added!"
      });
    })
    .catch((err: Error) => {
      return next(err);
    });
};
