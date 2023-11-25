"use client";
import axios from "axios";
import Swal from "sweetalert2";
import { configJSON } from "../utils/postHeader";

const useRequet = ({ url, method, body, onSuccess }) => {
  const request = async (props = {}) => {
    try {
      const res = await axios[method](url, { ...body, ...props }, configJSON);
      if (onSuccess) {
        onSuccess(res.data);
      }
      return res.data;
    } catch (error) {
      let err = [];
      error?.response?.data?.errors?.map((e) => err.push(e.message));
      Swal.fire({
        title: "Error!",
        text: err.join(", "),
        icon: "error",
        confirmButtonText: "Close",
      });

      return false;
    }
  };

  return { request };
};

export default useRequet;
