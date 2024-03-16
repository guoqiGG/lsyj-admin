//src/api/user/index.js

import service from "../request.js";
import qs from "qs";

// 登录
export function LoginInfo(query) {
  return service({
    method: "POST",
    url: "/admin/login",
    data: JSON.stringify(query),
  });
}

export function orderList(query) {
  return service({
    method: "get",
    url: "/order/get/list",
    params: query,
  });
}

export function leaderList(query) {
  return service({
    method: "get",
    url: "/user/leader/get/list",
    params: query,
  });
}

export function updateLeaderInfo(query) {
  return service({
    method: "POST",
    url: "user/leader/update",
    data: JSON.stringify(query),
  });
}

export function applyleaderList(query) {
  return service({
    method: "get",
    url: "user/leader/process/get/list",
    params: query,
  });
}

export function auditApplyleader(query) {
  return service({
    method: "get",
    url: "/user/leader/examine",
    params: query,
  });
}