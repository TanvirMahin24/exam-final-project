import { Request, Response } from "express";
import { Exam, Question, User } from "../../models/exam";
import { excludeFields } from "../../utils/excludeFields";

export const getData = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.currentUser?.id).populate([
      {
        path: "exams",
        model: "Exam",
        select: excludeFields,
        match: { status: "created" },
      },
      {
        path: "created",
        model: "Exam",
        select: excludeFields,
        // filter out exams based on status
        match: { status: "created" },
      },
      {
        path: "results",
        model: "Result",
      },
    ]);
    return res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error:", error);
    // @ts-ignore
    res.status(500).json({ error: error.message });
  }
};
