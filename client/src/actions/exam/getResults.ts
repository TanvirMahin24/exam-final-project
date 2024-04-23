import { axiosInstance } from "../../utils/axiosInstance";

export const getResultsAction = async () => {
  try {
    const res = await axiosInstance.get(`/exam/results`);

    return res.data.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
