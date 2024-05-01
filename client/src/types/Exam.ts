import { UserType } from "./User";

export type ExamCardType = {
  id: string;
  title: string;
  description: string;
  start: string;
  code: string;
  end: string;
  status: "created" | "resulted";
  totalMark: number;
  duration: number;
  totalQuestions: number;
};

export type ExamType = {
  id: string;
  title: string;
  description: string;
  code: string;
  totalMark: number;
  questionMark: number;
  duration: number;
  totalQuestions: number;
  start: string;
  end: string;
  user: UserType;
  status: "created" | "resulted";
  questions: QuestionType[];
};

export type QuestionType = {
  id: string;
  question: string;
  options: string[];
  answer: string;
};

export type AnswerType = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  selected: string | null;
};

export type ResultType = {
  id: string;
  examId: any;
  userId: any;
  title: string;
  totalMark: number;
  gainedMark: number;
  duration: number;
  submissionDuration: number;
  totalQuestions: number;
  correct: number;
  wrong: number;
  exam?: ExamType;
  questions: AnswerType[];
};
