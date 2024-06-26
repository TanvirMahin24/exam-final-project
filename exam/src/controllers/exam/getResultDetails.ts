import { BadRequestError } from "@inovit-bd/ms-common";
import { Request, Response } from "express";
import { Result } from "../../models/exam";

export const getResultDetails = async (req: Request, res: Response) => {
  try {
    const result = await Result.findById(req.params.id).populate([
      {
        path: "examId",
        model: "Exam",
      },
      {
        path: "userId",
        model: "User",
      },
    ]);

    return res.status(200).json({ data: result });
  } catch (error) {
    console.error("Error:", error);
    // @ts-ignore
    throw new BadRequestError(error.message);
  }
};
