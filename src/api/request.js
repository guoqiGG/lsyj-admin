import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
  timeout: 50000,
  baseURL: "/api",
});
service.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

// Request interceptors
service.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json;charset=UTF-8";

    if (localStorage.getItem("token"))
      config.headers.Authorization = localStorage.getItem("token");
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptors
service.interceptors.response.use(
  (response) => {
    if (response.data.code !== 0) {
      ElMessage({
        type: "error",
        message: "服务器忙,请稍后再试~",
      });
      return;
    }

    return response;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);

export default service;
