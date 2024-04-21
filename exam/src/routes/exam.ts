import { validateRequest } from "@inovit-bd/ms-common";
import express from "express";
import { createExam } from "../controllers/exam/create";
import { body } from "express-validator";
import { isAuth } from "../utils/authMiddleWare";
import { getCreatedExams } from "../controllers/exam/getCreatedExams";
import { deleteExam } from "../controllers/exam/deleteExam";
import { joinExam } from "../controllers/exam/joinExam";
import { getData } from "../controllers/exam/getData";
import { getExamDetails } from "../controllers/exam/getExamDetails";
import { submitResult } from "../controllers/exam/submitResult";
import { getResultDetails } from "../controllers/exam/getResultDetails";
import { getResults } from "../controllers/exam/getResults";
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
router.post(
  "/api/exam/:id",
  [body("title").isString().withMessage("Enter a valid title!")],
  isAuth,
  validateRequest,
  submitResult
);

router.get("/api/exam/data", isAuth, getData);
router.get("/api/exam/:id", isAuth, getExamDetails);
router.get("/api/exam/result/:id", isAuth, getResultDetails);
router.get("/api/exam/results", isAuth, getResults);
router.get("/api/exam", isAuth, getCreatedExams);
router.delete("/api/exam/:id", isAuth, deleteExam);

export { router as examRouter };
