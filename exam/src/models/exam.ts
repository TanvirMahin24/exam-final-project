import mongoose, { Schema } from "mongoose";

export interface TUser extends Document {
  id: string;
  name: string;
  email: string;
  bio: string;
  institution: string;
  created: ExamDoc[];
  results: TResult[];
  exams: ExamDoc[];
}

export type AnswerType = {
  id: string | string;
  question: string;
  options: string[];
  answer: string;
  selected: string | null;
};

export interface TResult extends Document {
  id: string;
  examId: number;
  title: string;
  totalMark: number;
  gainedMark: number;
  duration: number;
  submissionDuration: number;
  totalQuestions: number;
  correct: number;
  wrong: number;
  answers: AnswerType[];
}

export interface TQuestion extends Document {
  question: string;
  options: string[];
  answer: string;
}

export interface TAnswer extends Document {
  question: string;
  options: string[];
  answer: string;
  selected: string | null;
}

// Create user attribute interface
interface ExamAttr {
  title: string;
  description: string;
  totalMark: number;
  questionMark: number;
  duration: number;
  totalQuestions: number;
  start: string;
  code: string;
  end: string;
  user: TUser;
  questions: TQuestion[];
  results: TResult[];
  students: TUser[];
  submissions: TAnswer[];
}

// Build function interface
interface ExamModel extends mongoose.Model<ExamDoc> {
  build(attr: ExamAttr): ExamDoc;
}

// Exam document inteface
interface ExamDoc extends mongoose.Document {
  title: string;
  description: string;
  totalMark: number;
  questionMark: number;
  duration: number;
  totalQuestions: number;
  start: string;
  code: string;
  end: string;
  user: TUser;
  students: TUser[];
  questions: TQuestion[];
  submissions: TAnswer[];
  results: TAnswer[];
}

// User Schema
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, required: false },
    institution: { type: String, required: false },
    created: [{ type: Schema.Types.ObjectId, ref: "Exam" }],
    exams: [{ type: Schema.Types.ObjectId, ref: "Exam" }],
    results: [{ type: Schema.Types.ObjectId, ref: "Result" }],
  },
  {
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret.__v;
      },
    },
  }
);
// Question Schema
const QuestionSchema: Schema = new Schema(
  {
    question: { type: String, required: true },
    options: [{ type: String }],
    answer: { type: String, required: false },
    exam: { type: Schema.Types.ObjectId, ref: "Exam" },
  },
  {
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret.__v;
      },
    },
  }
);
// Answer Schema
const AnswerSchema: Schema = new Schema(
  {
    question: { type: String, required: true },
    options: [{ type: String }],
    answer: { type: String, required: false },
    selected: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    exam: { type: Schema.Types.ObjectId, ref: "Exam" },
  },
  {
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    code: {
      type: String,
      required: false,
    },
    totalMark: {
      type: Number,
      required: false,
    },
    questionMark: {
      type: Number,
      required: false,
    },

    duration: {
      type: Number,
      required: false,
    },
    totalQuestions: {
      type: Number,
      required: false,
    },
    start: {
      type: Date,
      required: false,
    },
    end: {
      type: Date,
      required: false,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    submissions: [{ type: Schema.Types.ObjectId, ref: "Submission" }],
    results: [{ type: Schema.Types.ObjectId, ref: "Result" }],
  },
  {
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

// build method for using mongoose with typescript
examSchema.statics.build = (attr: ExamAttr) => {
  return new Exam(attr);
};

const Exam = mongoose.model<ExamDoc, ExamModel>("Exam", examSchema);
const User = mongoose.model<TUser>("User", UserSchema);
const Question = mongoose.model<TQuestion>("Question", QuestionSchema);
const Answer = mongoose.model<TAnswer>("Answer", AnswerSchema);
export { Exam, User, Question, Answer };
