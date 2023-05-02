import axios from 'axios';
import { BASE_URL } from '@/constants';
import { stringify } from 'qs';
import { customErrorHandler } from "@/libs/request/handler.ts";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  paramsSerializer: (params) => stringify(params, { arrayFormat: 'comma' })
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return customErrorHandler(error);
  }
);

export default axiosInstance;
