import { JSON_POST_CONFIG } from "../../config/PostConfig";
import { LoginType } from "../../types/Auth";
import { axiosInstance } from "../../utils/axiosInstance";

export const loginAction = async (values: LoginType) => {
  try {
    const res = await axiosInstance.post(
      "/users/signin",
      JSON.stringify(values),
      JSON_POST_CONFIG
    );

    localStorage.setItem("exam-client", res.data.data);
    console.log(res.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
