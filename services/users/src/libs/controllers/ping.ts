import { Request, Response, NextFunction } from 'express'

module.exports = (req: Request, res: Response) => {
  return res.send('pong')
}