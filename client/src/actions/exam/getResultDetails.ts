import { axiosInstance } from "../../utils/axiosInstance";

export const getResultDetailsAction = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/exam/result/${id}`);

    return res.data.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
