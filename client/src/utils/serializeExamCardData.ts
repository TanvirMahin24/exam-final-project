import { ExamCardType, ExamType } from "../types/Exam";

export const serializeExamCardData = (exam: ExamType): ExamCardType => {
  return {
    description: exam.description,
    duration: exam.duration,
    id: exam.id,
    end: exam.end,
    start: exam.start,
    title: exam.title,
    totalMark: exam.totalMark,
    totalQuestions: exam.totalQuestions,
    code: exam.code,
    status: exam.status,
  };
};
