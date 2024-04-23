import { axiosInstance } from "../../utils/axiosInstance";

export const getExamDetailsAction = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/exam/${id}`);

    return res.data.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
