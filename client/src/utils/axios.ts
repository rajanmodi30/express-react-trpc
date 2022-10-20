import Axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/auth";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const { token, removeAll } = useAuthStore.getState();
let lastTimeCalledAt: any = null;

function authRequestInterceptor(config: AxiosRequestConfig) {
  config.headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...config.headers,
  };
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      removeAll();
    }
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    const difference = lastTimeCalledAt
      ? (Date.now() - lastTimeCalledAt.getTime()) / 1000
      : 0;
    if (error.response?.status === 401) {
      toast.error("You have been logged out");
      removeAll();
    } else {
      if (lastTimeCalledAt && difference > 10000) {
        lastTimeCalledAt = new Date();
        toast.error("OOPS Something went wrong");
      } else if (!lastTimeCalledAt) {
        toast.error("OOPS Something went wrong");
        lastTimeCalledAt = new Date();
      }
    }
    return Promise.reject(error);
  }
);
