import express, { Request, Response } from "express";
const router = express.Router();
import { currentUser } from "@inovit-bd/ms-common";

router.get(
  "/api/users/currentuser",
  currentUser,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentuserRouter };
