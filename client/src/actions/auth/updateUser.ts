import Swal from "sweetalert2";
import { JSON_POST_CONFIG } from "../../config/PostConfig";
import { LoginType } from "../../types/Auth";
import { UserType } from "../../types/User";
import { axiosInstance } from "../../utils/axiosInstance";

export const updateUserAction = async (values: Partial<UserType>) => {
  try {
    const res = await axiosInstance.patch(
      "/users/update",
      JSON.stringify(values),
      JSON_POST_CONFIG
    );
    console.log(res.data);
    return true;
  } catch (error: any) {
    return false;
  }
};
