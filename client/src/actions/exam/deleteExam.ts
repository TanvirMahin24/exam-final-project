import { axiosInstance } from "../../utils/axiosInstance";

export const deleteExamAction = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/exam/${id}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
