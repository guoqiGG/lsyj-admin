import axios from "axios";
import { ElMessage } from "element-plus";
import { tansParams, blobValidate } from "@/utils/ruoyi";

const service = axios.create({
  timeout: 50000,
  baseURL: '/api',
});
// Request interceptors
service.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    if (localStorage.getItem("token"))
      config.headers.Authorization = localStorage.getItem("token");
    // get请求映射params参数
    if (config.method === "get" && config.params) {
      let url = config.url + "?" + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }

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

    return response.data;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);

export default service;
