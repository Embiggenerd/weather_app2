import { Response  } from "express"
import { RequestWithUser} from '../types'

module.exports = (req: RequestWithUser, res: Response) => {
  res.status(200).json({
    status: "success",
    user: req.user
  })}