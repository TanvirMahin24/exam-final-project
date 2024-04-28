import { Request, Response } from "express";
import { Exam, Question, Result, User } from "../../models/exam";
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
    ]);

    const exams = await Result.find({ userId: req.currentUser?.id });

    // @ts-ignore
    let examIds = exams.map((exam) => exam?.examId.toString());
    examIds = [...new Set(examIds)];

    return res.status(200).json({
      data: {
        ...user?.toJSON(),
        results: exams
          .filter((exam) => {
            //@ts-ignore
            if (examIds.includes(exam?.examId.toString())) {
              //@ts-ignore
              examIds.splice(examIds.indexOf(exam?.examId), 1);

              return true;
            }
            return false;
          })
          .map((result) => result?.toJSON()),
      },
    });
  } catch (error) {
    console.error("Error:", error);
    // @ts-ignore
    res.status(500).json({ error: error.message });
  }
};
