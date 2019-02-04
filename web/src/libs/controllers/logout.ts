import { Request, Response, NextFunction } from "express";

module.exports = (req: Request, res: Response) => {
  if (typeof req.session != "undefined") {
    req.session.token = null;
    res.redirect("/");
  }
};
