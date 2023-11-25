import express, { Request, Response } from "express";
const router = express.Router();

router.post("/api/users/signout", (req: Request, res: Response) => {
  // empty the session
  req.session = null;

  // send success response
  res.send({ message: "Logged out!" });
});

export { router as signoutRouter };
