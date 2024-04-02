import { BadRequestError } from "@inovit-bd/ms-common";
import { Request, Response } from "express";
import { Exam } from "../../models/exam";

export const joinExam = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const exam = await Exam.findOne({ code });
    if (!exam) {
      throw new BadRequestError("Exam not found");
    } else {
      exam.updateOne({ $push: { students: req?.currentUser?.id } });
    }
    return res.status(200).json({ data: "Joined exam" });
  } catch (error: any) {
    console.error("Error:", error);
    // @ts-ignore
    throw new BadRequestError(error.message);
  }
};
