import { Request, Response } from "express";
import { Exam } from "../../models/exam";
import { BadRequestError } from "@inovit-bd/ms-common";

export const getExamDetails = async (req: Request, res: Response) => {
  try {
    const exam = await Exam.findById(req.params.id).populate([
      {
        path: "questions",
        model: "Question",
      },
    ]);

    return res.status(200).json({ data: exam });
  } catch (error) {
    console.error("Error:", error);
    // @ts-ignore
    throw new BadRequestError(error.message);
  }
};
