import { axiosInstance } from "../../utils/axiosInstance";

export const getDashboardAction = async () => {
  try {
    const res = await axiosInstance.get("/exam/data");

    return res.data.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
