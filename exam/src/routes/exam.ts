import { validateRequest } from "@inovit-bd/ms-common";
import express from "express";
import { createExam } from "../controllers/exam/create";
import { body } from "express-validator";
const router = express.Router();

router.post(
  "/api/exam",
  [
    body("title").isEmail().withMessage("Enter a valid title!"),
    body("description").isEmail().withMessage("Enter a description!"),
  ],
  validateRequest,
  createExam
);

export { router as examRouter };
