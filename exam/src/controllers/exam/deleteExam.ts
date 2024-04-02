import { Request, Response } from "express";
import { Answer, Exam, Question } from "../../models/exam";

export const deleteExam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Exam.findByIdAndDelete(id);
    await Question.deleteMany({ exam: id });
    await Answer.deleteMany({ exam: id });
    return res.json({ data: "Exam deleted" });
  } catch (error) {
    console.error("Error:", error);
    // @ts-ignore
    res.status(500).json({ error: error.message });
  }
};
