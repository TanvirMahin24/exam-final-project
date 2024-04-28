import { BadRequestError } from "@inovit-bd/ms-common";
import { Request, Response } from "express";
import { Exam, User, Result } from "../../models/exam";

export const submitResult = async (req: Request, res: Response) => {
  try {
    const {
      start,
      end,
      title,
      totalMark,
      gainedMark,
      duration,
      totalQuestions,
      correct,
      wrong,
      questions,
    } = req.body;
    const exam = await Exam.findById(req.params.id);

    const user = await User.findById(req.currentUser?.id);
    const resultCheck = await Result.findOne({
      examId: exam?._id,
      userId: user?._id,
    });

    if (resultCheck) {
      throw new BadRequestError("Already submitted");
    }
    if (exam?.end && new Date(exam?.end).getTime() < new Date().getTime()) {
      throw new BadRequestError("Exam has ended");
    } else if (
      exam &&
      exam.results.filter((result) => result.userId === user?.id).length > 0
    ) {
      throw new BadRequestError("Already submitted");
    }
    if (!exam || !user) {
      throw new BadRequestError("Exam not found");
    } else {
      const result = await Result.create({
        examId: exam._id,
        userId: user._id,
        title,
        totalMark,
        gainedMark,
        duration,
        submissionDuration:
          (new Date(end).getTime() - new Date(start).getTime()) / 1000 / 60,
        totalQuestions,
        correct,
        wrong,
      });
      // @ts-ignore
      result.updateOne({
        $push: {
          questions: [...questions],
        },
      });
      user.results.push(result._id);
      user.updateOne({
        $pull: {
          created: exam._id,
        },
      });
      await result.save();
      await user.save();
      // @ts-ignore
      exam.results.push(result._id);
      await exam.save();
      return res.status(200).json({ data: result });
    }
  } catch (error: any) {
    console.error("Error:", error);
    // @ts-ignore
    throw new BadRequestError(error.message);
  }
};
