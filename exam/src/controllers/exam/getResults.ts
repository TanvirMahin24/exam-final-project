import { Request, Response } from "express";
import { Result } from "../../models/exam";

export const getResults = async (req: Request, res: Response) => {
  try {
    const exams = await Result.find({ userId: req.currentUser?.id });

    return res.status(200).json({ data: exams });
  } catch (error) {
    console.error("Error:", error);
    // @ts-ignore
    res.status(500).json({ error: error.message });
  }
};
