import { Request, Response, NextFunction } from "express";

module.exports = (req: Request, res: Response, next: NextFunction) => {
  let user = false;
  if (typeof req.session != "undefined" && req.session.token) {
    user = true;
  }
  res.render("login.html", { user });
};
