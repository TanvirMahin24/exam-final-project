import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export function isAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  const token = authHeader ? authHeader : null;

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_KEY!, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    // @ts-ignore
    req.currentUser = user;
    next();
  });
}
