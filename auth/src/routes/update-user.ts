import express, { Request, Response } from "express";
const router = express.Router();
import { isAuth } from "../utils/authMiddleware";
import { User } from "../models/user";
import { BadRequestError } from "@inovit-bd/ms-common";

router.patch(
  "/api/users/update",
  isAuth,
  async (req: Request, res: Response) => {
    try {
      const user = await User.findById({ _id: req?.currentUser?.id });

      if (user) {
        let updatedUser = await User.findOneAndUpdate(
          { _id: req?.currentUser?.id },
          { ...req.body }
        );
        return res.status(200).json({ data: updatedUser });
      } else {
        throw new BadRequestError("User not found");
      }
    } catch (error: any) {
      console.log(error);
      throw new BadRequestError(error.message);
    }
  }
);

export { router as updateUserRouter };
