import { Request, Response, NextFunction } from "express";

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  console.log("typeof req.session", typeof req.session);
  if (typeof req.session != "undefined" && req.session.token) {
    return next();
  } else {
    return res.status(308).redirect("/login")
  }
}

function loginRedirect(req: Request, res: Response, next: NextFunction) {
  // console.log("typeof req.session",typeof req.session)
  if (typeof req.session != "undefined" && req.session.token) {
    return res.redirect("/");
  }

  return next();
}

module.exports = {
  ensureAuthenticated,
  loginRedirect
};
