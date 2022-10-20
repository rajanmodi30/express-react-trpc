import Axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/auth";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const { token, removeAll } = useAuthStore.getState();

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...config.headers,
  };
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      removeAll();
    }
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error(message);

    if (error.response?.status === 401) {
      toast.error("You have been logged out", {
        toastId: "401_error",
      });
      removeAll();
    } else {
      toast.error("OOPS Something went wrong", {
        toastId: "500_error",
      });
    }
    return Promise.reject(error);
  }
);
