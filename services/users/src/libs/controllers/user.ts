import { Response } from "express";
import { RequestWithUser } from "../types";

module.exports = (req: RequestWithUser, res: Response) => {
  try {
    res.status(200).json({
    status: "success",
    user: req.user
  })
  ;} catch (e) {
    console.log("users/user error",e)
  }
};
