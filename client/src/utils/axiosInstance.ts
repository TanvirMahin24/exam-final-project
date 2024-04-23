import axios from "axios";
import Swal from "sweetalert2";

// Create an instance of axios with a base URL
const axiosInstance = axios.create({
  baseURL: "/api",
});

// Add a request interceptor to handle base URL configuration and set authorization header
axiosInstance.interceptors.request.use(
  function (config) {
    if (localStorage.getItem("exam-client")) {
      config.headers.authorization = `${localStorage.getItem("exam-client")}`;
    }
    return config;
  },
  function (error) {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor to catch errors
axiosInstance.interceptors.response.use(
  function (response) {
    // Any successful response handling can be done here
    return response;
  },
  function (error) {
    // Handle error response
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.data.errors && error.response.data.errors.length > 0) {
        Swal.fire({
          text: error.response.data.errors[0].message,
          icon: "error",
        });
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
