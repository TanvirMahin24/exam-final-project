import { JSON_POST_CONFIG } from "../../config/PostConfig";
import { RegisterType } from "../../types/Auth";
import { axiosInstance } from "../../utils/axiosInstance";

export const registerAction = async (values: RegisterType) => {
  try {
    const res = await axiosInstance.post(
      "/users/signup",
      JSON.stringify(values),
      JSON_POST_CONFIG
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
