import { JSON_POST_CONFIG } from "../../config/PostConfig";
import { axiosInstance } from "../../utils/axiosInstance";

export const joinExamAction = async (code: string) => {
  try {
    await axiosInstance.post(
      `/exam/join`,
      JSON.stringify({ code }),
      JSON_POST_CONFIG
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
