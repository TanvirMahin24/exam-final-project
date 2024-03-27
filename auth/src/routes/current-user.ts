import express, { Request, Response } from "express";
const router = express.Router();
import { isAuth } from "../utils/authMiddleware";

router.get("/api/users/currentuser", isAuth, (req: Request, res: Response) => {
  return res.json({ data: req.currentUser || null });
});

export { router as currentuserRouter };
