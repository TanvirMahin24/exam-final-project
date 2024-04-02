import { Request, Response } from "express";
import { Exam, Question } from "../../models/exam";

export const createExam = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      totalMark,
      questionMark,
      duration,
      totalQuestions,
      start,
      questions,
    } = req.body;

    const questionIds: any[] = [];

    for (const quest of questions) {
      let newQuestion = new Question({
        question: quest.question,
        answer: quest.answer,
        options: quest.options,
      });
      let savedQuestion = await newQuestion.save();
      questionIds.push(savedQuestion._id);
    }

    const newExam = new Exam({
      title,
      description,
      user: req?.currentUser?.id,
      totalMark,
      questionMark,
      duration,
      totalQuestions,
      start: new Date(start),
      end: new Date(new Date(start).getTime() + parseInt(duration) * 60000),
      questions: questionIds,
      submissions: [],
      code: `${new Date().getTime()}`,
    });
    const exam = await newExam.save();
    // Send success response
    return res.status(201).send({ data: exam });
  } catch (error) {
    console.error("Error:", error);
    // @ts-ignore
    res.status(500).json({ error: error.message });
  }
};
