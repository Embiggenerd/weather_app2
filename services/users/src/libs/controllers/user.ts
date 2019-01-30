import { Response  } from "express"
import { RequestWithUser} from '../types'

module.exports = (req: RequestWithUser, res: Response) => {
  res.status(200).json({
    message: "success",
    user: req.user
  })}