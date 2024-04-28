import { Request, Response } from "express";
import { Result } from "../../models/exam";

function onlyUnique(value: any, index: number, array: any) {
  return array.indexOf(value) === index;
}

export const getResults = async (req: Request, res: Response) => {
  try {
    const exams = await Result.find({ userId: req.currentUser?.id });

    // @ts-ignore
    let examIds = exams.map((exam) => exam?.examId);
    examIds = examIds.filter(onlyUnique);

    return res.status(200).json({
      data: exams.filter((exam) => {
        //@ts-ignore
        if (examIds.includes(exam?.examId)) {
          //@ts-ignore
          examIds.splice(examIds.indexOf(exam?.examId), 1);
          return true;
        }
        return false;
      }),
    });
  } catch (error) {
    console.error("Error:", error);
    // @ts-ignore
    res.status(500).json({ error: error.message });
  }
};
