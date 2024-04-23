import { JSON_POST_CONFIG } from "../../config/PostConfig";
import { ResultType } from "../../types/Exam";
import { axiosInstance } from "../../utils/axiosInstance";

export const submitResultAction = async (
  values: Partial<ResultType> & { start: string; end: string },
  id: string
) => {
  try {
    const res = await axiosInstance.post(
      `/exam/${id}`,
      JSON.stringify({
        title: values.title,
        totalMark: values.totalMark,
        gainedMark: values.gainedMark,
        duration: values.duration,
        totalQuestions: values.totalQuestions,
        start: values.start,
        end: values.end,
        correct: values.correct,
        wrong: values.wrong,
        questions: values.questions,
      }),
      JSON_POST_CONFIG
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
