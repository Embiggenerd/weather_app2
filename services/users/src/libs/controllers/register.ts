import { Request, Response, NextFunction } from 'express'
// const localAuth = require('../auth/local');
// const authHelpers = require('../auth/helpers');
const { authHelpers, localAuth } = require("../auth")

module.exports = (req: Request, res: Response) => {
  // console.log("req", req)
  return authHelpers.createUser(req)
  .then((user: string[]) => { return localAuth.encodeToken(user[0]); })
  .then((token: string) => {
    res.status(200).json({
      status: 'success',
      token,
    });
  })
  .catch((e: Error) => {
    console.log('registerError',e)
    res.status(500).json({
      status: 'error',
    });
  });
}