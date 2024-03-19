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

// 团长提现列表
export function leaderWithdrawList(query) {
  return service({
    method: "get",
    url: "user/leader/get/wallet/list",
    params: query,
  });
}
// 团长提现审批
export function leaderWithdrawApproval(query) {
  return service({
    method: "POST",
    url: "user/leader/examine/wallet",
    data: JSON.stringify(query),
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

// 用户等级列表
export function userLevelList(query) {
  return service({
    method: "get",
    url: "level/get/list",
    params: query,
  });
}

// 直播间列表
export function liveList(query) {
  return service({
    method: "POST",
    url: "admin/get/live/list",
    data: JSON.stringify(query),
  });
}

// 视频列表
export function videoList(query) {
  return service({
    method: "get",
    url: "/video/get/list",
    params: query,
  });
}

// 删除视频
export function deleteVideo(query) {
  return service({
    method: "POST",
    url: "/video/update",
    data: JSON.stringify(query),
  });
}

// 新增视频
export function createVideo(query) {
  return service({
    method: "POST",
    url: "/video/add",
    data: JSON.stringify(query),
  });
}

// 文件上传
export function upload(query) {
  return service({
    method: "POST",
    url: "/upload/oss",
    data: JSON.stringify(query),
  });
}

// 优惠券列表
export function couponList(query) {
  return service({
    method: "get",
    url: "/coupon/get/list",
    params: query,
  });
}
//礼品卡列表
export function giftList(query) {
  return service({
    method: "get",
    url: "/gift/get/list",
    params: query,
  });
}
// 新增礼品卡
export function giftAdd(data) {
  return service({
    method: "POST",
    url: "/gift/add",
    data,
  });
}
