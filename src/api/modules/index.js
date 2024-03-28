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
// 订单详情
export function orderDetail(query) {
  return service({
    method: "get",
    url: `/order/get/detail?id=` + query,
    // params: query,
  });
}
// 订单批量发货
export function orderBatchSend(data) {
  return service({
    method: "POST",
    url: "upload/order/delivery/list",
    data,
  });
}
// 订单批量收货
export function orderBatchReceive(data) {
  return service({
    method: "POST",
    url: "upload/order/take/delivery/list",
    data,
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

// 商品分类列表
export function prodCategoryList(query) {
  return service({
    method: "get",
    url: "/category/admin/list",
    params: query,
  });
}

// 商品分类新增
export function prodCategoryAdd(query) {
  return service({
    method: "POST",
    url: "/category/admin/add",
    data: JSON.stringify(query),
  });
}

// 删除、编辑商品分类
export function deleteProdCategory(query) {
  return service({
    method: "POST",
    url: "/category/admin/update",
    data: JSON.stringify(query),
  });
}

// 商品列表
export function prodList(query) {
  return service({
    method: "get",
    url: "/goods/get/list",
    params: query,
  });
}

// 商品新增
export function prodAdd(query) {
  return service({
    method: "POST",
    url: "/goods/add",
    data: JSON.stringify(query),
  });
}

// 根据id查询商品信息
export function prodInfoById(query) {
  return service({
    method: "get",
    url: "/goods/get/detail",
    params: query,
  });
}

// 商品删除与修改
export function deleteProd(query) {
  return service({
    method: "POST",
    url: "/goods/modify",
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
// 优惠券新增
export function addCouponList(data) {
  return service({
    method: "POST",
    url: "/coupon/add",
    data,
  });
}
// 优惠券修改
export function updateCouponList(data) {
  return service({
    method: "POST",
    url: "coupon/update",
    data,
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

export function giftUpdate(data) {
  return service({
    method: "POST",
    url: "/gift/update",
    data,
  });
}
//合成卡列表
export function compositeCardList(query) {
  return service({
    method: "POST",
    url: "/gift/rule/get/list",
    data: JSON.stringify(query),
  });
}
// 新增合成卡
export function compositeCardAdd(data) {
  return service({
    method: "POST",
    url: "/gift/rule/add",
    data,
  });
}

// 修改合成卡与删除合成卡
export function compositeCardUpdate(data) {
  return service({
    method: "POST",
    url: "/gift/rule/update",
    data,
  });
}
// 用户领取的礼品卡列表-page
export function userGiftList(query) {
  return service({
    method: "get",
    url: "/gift/user/get/list",
    params: query,
  });
}
// 用户合成卡列表-page
export function userCompositeList(data) {
  return service({
    method: "POST",
    url: "/gift/rule/user/get/list",
    data: JSON.stringify(data),
  });
}
// 用户优惠券列表
export function userCouponList(query) {
  return service({
    method: "get",
    url: "/user/coupon/get/list",
    params: query,
  });
}

// 用户送优惠券
export function userCouponAdd(data) {
  return service({
    method: "POST",
    url: "user/coupon/add",
    data: JSON.stringify(data),
  });
}

// 用户送礼品券
export function userGiftAdd(data) {
  return service({
    method: "POST",
    url: "gift/user/admin/add",
    data: JSON.stringify(data),
  });
}

// 退款列表
export function refundList(query) {
  return service({
    method: "get",
    url: "order/refund/get/list",
    params:query,
  });
}
// 退款审核
export function refundAudit(query) {
  return service({
    method: "get",
    url: "order/refund/audit",
    params: query,
  });
}
// 批量退款
export function batchRefund(query) {
  return service({
    method: "get",
    url: "order/refund/audit/batch",
    params: query,
  });
}



