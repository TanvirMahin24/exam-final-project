import { Request, Response } from "express";
import { Exam, Question, User } from "../../models/exam";
import { ExamCreatedPublisher } from "../../events/publishers/exam-created-publisher";
import { natsWrapper } from "../../nats-wrapper";
import { BadRequestError } from "@inovit-bd/ms-common";

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

    const user = await User.findById(req.currentUser?.id);

    // Publish an event saying that an order was created
    new ExamCreatedPublisher(natsWrapper.client).publish({
      id: exam.id,
      end: exam.end,
    });
    if (user && !user.created.includes(exam.id)) {
      user.created.push(exam._id);
      await user.save();
    } else {
      throw new BadRequestError("Already created the exam");
    }
    // Send success response
    return res.status(201).send({ data: exam });
  } catch (error) {
    console.error("Error:", error);
    // @ts-ignore
    throw new BadRequestError(error.message);
  }
};
