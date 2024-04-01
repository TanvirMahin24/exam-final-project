import express, { Request, Response } from "express";
const router = express.Router();
import { isAuth } from "../utils/authMiddleware";
import { User } from "../models/user";

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
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
);

export { router as updateUserRouter };
