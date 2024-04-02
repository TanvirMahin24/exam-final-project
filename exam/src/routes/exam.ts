import { validateRequest } from "@inovit-bd/ms-common";
import express from "express";
import { createExam } from "../controllers/exam/create";
import { body } from "express-validator";
import { isAuth } from "../utils/authMiddleWare";
import { getCreatedExams } from "../controllers/exam/getCreatedExams";
import { deleteExam } from "../controllers/exam/deleteExam";
import { joinExam } from "../controllers/exam/joinExam";
const router = express.Router();

router.post(
  "/api/exam/join",
  [body("code").isString().withMessage("Enter a valid code!")],
  isAuth,
  validateRequest,
  joinExam
);
router.post(
  "/api/exam",
  [
    body("title").isString().withMessage("Enter a valid title!"),
    body("description").isString().withMessage("Enter a description!"),
    body("start").isString().withMessage("Enter a start date!"),
  ],
  isAuth,
  validateRequest,
  createExam
);

router.get("/api/exam", isAuth, getCreatedExams);
router.delete("/api/exam/:id", isAuth, deleteExam);

export { router as examRouter };
