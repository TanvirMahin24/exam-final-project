import { axiosInstance } from "../../utils/axiosInstance";

export const getExamResultsAction = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/exam/results/${id}`);

    return res.data.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
