import { JSON_POST_CONFIG } from "../../config/PostConfig";
import { AnswerType, ExamType } from "../../types/Exam";
import { axiosInstance } from "../../utils/axiosInstance";

export const createExamAction = async (
  values: Partial<ExamType>,
  questions: AnswerType[]
) => {
  try {
    const res = await axiosInstance.post(
      "/exam",
      JSON.stringify({
        title: values.title,
        description: values.description,
        // @ts-ignore
        totalMark: values.questionMark * questions.length,
        questionMark: values.questionMark,
        duration: values.duration,
        totalQuestions: questions.length,
        start: values.start,
        questions,
      }),
      JSON_POST_CONFIG
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
