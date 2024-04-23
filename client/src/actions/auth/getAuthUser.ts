import { axiosInstance } from "../../utils/axiosInstance";

export const getAuthUserAction = async () => {
  try {
    const res = await axiosInstance.get("/users/currentuser");

    return res.data.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
