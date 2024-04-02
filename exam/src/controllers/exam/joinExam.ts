import { BadRequestError } from "@inovit-bd/ms-common";
import { Request, Response } from "express";
import { Exam, User } from "../../models/exam";

export const joinExam = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const exam = await Exam.findOne({ code });
    const user = await User.findById(req.currentUser?.id);
    if (!exam || !user) {
      throw new BadRequestError("Exam not found");
    } else {
      user.exams.push(exam._id);
      await user.save();
      // @ts-ignore
      exam.students.push(req?.currentUser?.id);
      await exam.save();
    }
    return res.status(200).json({ data: "Joined exam" });
  } catch (error: any) {
    console.error("Error:", error);
    // @ts-ignore
    throw new BadRequestError(error.message);
  }
};
