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
// 订单列表
export function orderList(query) {
  return service({
    method: "get",
    url: "/order/get/list",
    params: query,
  });
}
// 团长列表
export function leaderList(query) {
  return service({
    method: "get",
    url: "/user/leader/get/list",
    params: query,
  });
}
// 修改团长信息
export function updateLeaderInfo(query) {
  return service({
    method: "POST",
    url: "user/leader/update",
    data: JSON.stringify(query),
  });
}
// 团长审核列表
export function applyleaderList(query) {
  return service({
    method: "get",
    url: "user/leader/process/get/list",
    params: query,
  });
}
// 审批团长
export function auditApplyleader(query) {
  return service({
    method: "get",
    url: "/user/leader/examine",
    params: query,
  });
}
// 用户列表
export function userList(query) {
  return service({
    method: "get",
    url: "/user/get/list",
    params: query,
  });
}
