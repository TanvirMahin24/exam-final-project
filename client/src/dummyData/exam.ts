import {
  AnswerType,
  ExamCardType,
  ExamType,
  QuestionType,
  ResultType,
} from "../types/Exam";
import { demoUser } from "./user";

export const demoQuestion1: QuestionType = {
  question: "Whait is this question 1?",
  options: ["Answer A", "Answer B", "Answer C", "Answer D"],
  id: "1",
  answer: "Answer A",
};

export const demoQuestion2: QuestionType = {
  question: "Whait is this question 2?",
  options: ["Answer A", "Answer B", "Answer C", "Answer D"],
  id: "2",
  answer: "Answer B",
};

export const demoQuestion3: QuestionType = {
  question: "Whait is this question 3?",
  options: ["Answer A", "Answer B", "Answer C", "Answer D"],
  id: "3",
  answer: "Answer C",
};
export const demoQuestion4: QuestionType = {
  question: "Whait is this question 4?",
  options: ["Answer A", "Answer B", "Answer C", "Answer D"],
  id: "4",
  answer: "Answer C",
};
export const demoAnswer1: AnswerType = {
  question: "Whait is this question 1?",
  answer: "Answer B",
  options: ["Answer A", "Answer B", "Answer C", "Answer D"],
  id: " 1",
  selected: "Answer A",
};

export const demoAnswer2: AnswerType = {
  question: "Whait is this question 2?",
  answer: "Answer C",
  options: ["Answer A", "Answer B", "Answer C", "Answer D"],
  id: "2",
  selected: "Answer C",
};

export const demoAnswer3: AnswerType = {
  question: "Whait is this question 3?",
  answer: "Answer A",
  options: ["Answer A", "Answer B", "Answer C", "Answer D"],
  id: "3",
  selected: "Answer B",
};
export const demoAnswer4: AnswerType = {
  question: "Whait is this question 4?",
  answer: "Answer D",
  options: ["Answer A", "Answer B", "Answer C", "Answer D"],
  id: "4",
  selected: "Answer D",
};

export const examDemo: ExamType = {
  title: "Test Exam 1",
  description:
    "This is a test exam description. This is a test exam description. This is a test exam description. This is a test exam description. This is a test exam description.",
  duration: 60,
  code: "das",
  questionMark: 1,
  status: "created",
  id: "1",
  questions: [
    demoQuestion1,
    demoQuestion2,
    demoQuestion3,
    demoQuestion4,
    demoQuestion1,
    demoQuestion2,
    demoQuestion3,
    demoQuestion4,
    demoQuestion1,
    demoQuestion2,
  ],
  totalQuestions: 10,
  start: "2024-04-19T08:22:33.881Z",
  end: "2024-04-19T09:22:33.881Z",
  totalMark: 20,
  user: demoUser,
};

export const examCardDemo: ExamCardType = {
  title: "Test Exam 1",
  description:
    "This is a test exam description. This is a test exam description. This is a test exam description. This is a test exam description. This is a test exam description.",
  duration: 60,
  id: "1",
  status: "created",
  totalQuestions: 10,
  start: "2024-04-19T08:22:33.881Z",
  end: "2024-04-19T09:22:33.881Z",
  totalMark: 20,
  code: "das",
};

export const resultDemo: ResultType = {
  title: "Test Result 1",
  duration: 60,
  id: "1",
  userId: "1",
  totalQuestions: 10,
  totalMark: 20,
  gainedMark: 18,
  correct: 9,
  wrong: 1,
  examId: "1",
  submissionDuration: 55,
  questions: [
    demoAnswer1,
    demoAnswer2,
    demoAnswer3,
    demoAnswer4,
    demoAnswer1,
    demoAnswer2,
    demoAnswer3,
    demoAnswer4,
    demoAnswer1,
    demoAnswer2,
  ],
};
