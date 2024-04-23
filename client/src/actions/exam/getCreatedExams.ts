import { axiosInstance } from "../../utils/axiosInstance";

export const getCreatedExamsAction = async () => {
  try {
    const res = await axiosInstance.get("/exam");

    return res.data.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
