import { Request, Response } from "express";
import { Exam, Question } from "../../models/exam";

export const createExam = async (req: Request, res: Response) => {
  try {
    const exams = await Exam.find({ user: req.currentUser?.id })
      .sort({
        createdAt: -1,
      })
      .populate([
        {
          path: "user",
          model: "User",
        },
        {
          path: "questions",
          model: "Question",
        },
      ]);
    return res.status(200).json({ data: exams });
  } catch (error) {
    console.error("Error:", error);
    // @ts-ignore
    res.status(500).json({ error: error.message });
  }
};
