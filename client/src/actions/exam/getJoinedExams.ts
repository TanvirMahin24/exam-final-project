import { axiosInstance } from "../../utils/axiosInstance";

export const getJoinedExamsAction = async () => {
  try {
    const res = await axiosInstance.get("/exam/joined");
    return res.data.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
