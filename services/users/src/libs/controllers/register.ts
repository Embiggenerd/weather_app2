import { Request, Response, NextFunction } from 'express'
const localAuth = require('../auth/local');
const authHelpers = require('../auth/helpers');

module.exports = (req: Request, res: Response) => {
  return authHelpers.createUser(req, res)
  .then((user: string[]) => { return localAuth.encodeToken(user[0]); })
  .then((token: string) => {
    res.status(200).json({
      status: 'success',
      token,
    });
  })
  .catch(() => {
    res.status(500).json({
      status: 'error',
    });
  });
}