//src/api/user/index.js

import service from "../request.js";

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
    method: "post",
    url: "/order/get/list",
    data: JSON.stringify(query),
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
    url: "/user/leader/update",
    data: JSON.stringify(query),
  });
}

// 更换团长
export function replaceLeader(query) {
  return service({
    method: "POST",
    url: "/user/leader/update/leader/all",
    data: JSON.stringify(query),
  });
}

// 团长审核列表
export function applyleaderList(query) {
  return service({
    method: "get",
    url: "/user/leader/process/get/list",
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
    url: "/user/leader/get/wallet/list",
    params: query,
  });
}
// 团长提现审批
export function leaderWithdrawApproval(query) {
  return service({
    method: "POST",
    url: "/user/leader/examine/wallet",
    data: JSON.stringify(query),
  });
}
// 佣金明细列表
export function commissionDetailsList(query) {
  return service({
    method: "POST",
    url: "/user/leader/order/list",
    data: JSON.stringify(query),
  });
}

//  团长分组列表
export function leaderGroupList(query) {
  return service({
    method: "get",
    url: "/leaderGroup/page",
    params: query,
  });
}
// 新增团长分组
export function addLeaderGroup(query) {
  return service({
    method: "POST",
    url: "/leaderGroup/add",
    data: JSON.stringify(query),
  });
}
// 编辑团长分组
export function updateLeaderGroup(query) {
  return service({
    method: "POST",
    url: "/leaderGroup/update",
    data: JSON.stringify(query),
  });
}

// 团长用户分组列表
export function leaderUserGroupList(query) {
  return service({
    method: "get",
    url: "/userLeaderGroup/page",
    params: query,
  });
}
// 给团长添加分组
export function addLeaderUserGroup(query) {
  return service({
    method: "POST",
    url: "/userLeaderGroup/add",
    data: JSON.stringify(query),
  });
}
// 编辑删除给团长添加分组
export function updateLeaderUserGroup(query) {
  return service({
    method: "POST",
    url: "/userLeaderGroup/update",
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
    url: "/level/get/list",
    params: query,
  });
}

// 分组列表
export function groupList(query) {
  return service({
    method: "get",
    url: "/group/list",
    params: query,
  });
}
// 新增分组
export function addGroup(query) {
  return service({
    method: "POST",
    url: "/group/add",
    data: JSON.stringify(query),
  });
}

// 编辑分组 、删除分组
export function editGroup(query) {
  return service({
    method: "POST",
    url: "/group/update",
    data: JSON.stringify(query),
  });
}

// 分组送优惠券
export function groupSendCoupon(query) {
  return service({
    method: "POST",
    url: "/group/add/user/coupon",
    data: JSON.stringify(query),
  });
}

// 用户分组列表
export function userGroupList(query) {
  return service({
    method: "get",
    url: "/group/user/list",
    params: query,
  });
}
// 用户分组添加
export function addUserGroup(query) {
  return service({
    method: "POST",
    url: "/group/user/add",
    data: JSON.stringify(query),
  });
}

// 用户分组编辑/删除
export function editUserGroup(query) {
  return service({
    method: "POST",
    url: "/group/user/update",
    data: JSON.stringify(query),
  });
}
// 兑换规则列表
export function exchangeList(query) {
  return service({
    method: "POST",
    url: "/pub/exchange/list",
    data: JSON.stringify(query),
  });
}

// 新增兑换规则
export function addExchange(query) {
  return service({
    method: "POST",
    url: "/pub/exchange/add",
    data: JSON.stringify(query),
  });
}
// 编辑、删除兑换规则
export function editExchange(query) {
  return service({
    method: "POST",
    url: "/pub/exchange/update",
    data: JSON.stringify(query),
  });
}
// 用户兑换记录
export function exchangeRecordList(query) {
  return service({
    method: "get",
    url: "/user/exchange/get/list",
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
// 抖音直播间列表
export function douYinLiveList(query) {
  return service({
    method: "POST",
    url: "/pub/user/admin/get/douyin/coure",
    data: JSON.stringify(query),
  });
}

// 抖音 修改横竖屏
export function horizontalAndVerticalScreens(query) {
  return service({
    method: "get",
    url: "pub/user/update/douyin/coure",
    params: query,
  });
}

// 欢拓直播间列表
export function huanTuoliveList(query) {
  return service({
    method: "POST",
    url: "/huan/tuo/get/list",
    data: JSON.stringify(query),
  });
}

// 获取欢拓直播间 推流地址 和 obs地址
export function huanTuoPushStreamingAndObsAddress(query) {
  return service({
    method: "POST",
    url: "huan/tuo/pushAddr",
    data: JSON.stringify(query),
  });
}

// 生成欢拓直播链接
export function generateHuanTuoLiveLink(query) {
  return service({
    method: "POST",
    url: "huan/tuo/user/status",
    data: JSON.stringify(query),
  });
}

//  根据用户id直播间id 生成用户直播地址
export function generateHuanTuoLiveSingleLink(query) {
  return service({
    method: "POST",
    url: "huan/tuo/user/courseId/group",
    data: JSON.stringify(query),
  });
}
// 新增欢拓直播间
export function createLive(query) {
  return service({
    method: "POST",
    url: "huan/tuo/add",
    data: JSON.stringify(query),
  });
}

// 欢拓直播间添加直播商品
export function huanTuoAddLiveProd(query) {
  return service({
    method: "POST",
    url: "huan/tuo/add/goods",
    data: JSON.stringify(query),
  });
}

// 上下架欢拓直播间商品
export function editHuanTuoLiveProdStatus(query) {
  return service({
    method: "POST",
    url: "huan/tuo/update/goods/status",
    data: JSON.stringify(query),
  });
}

// 欢拓用户观看时长列表
export function huanTuoUserViewTimeList(query) {
  return service({
    method: "POST",
    url: "/huan/tuo/user/viewing/time/list",
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

// 图片base64上传
export function uploadImageByBase64(query) {
  return service({
    method: "POST",
    url: "/upload/base64",
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

// 商品修改
export function updateProd(query) {
  return service({
    method: "POST",
    url: "/goods/modify",
    data: JSON.stringify(query),
  });
}
// 商品上下架
export function goodsDisplay(query) {
  return service({
    method: "POST",
    url: "/goods/display",
    data: JSON.stringify(query),
  });
}

// 商品删除
export function deleteProdById(query) {
  return service({
    method: "POST",
    url: "/goods/update/status",
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
// 删除用户优惠券 id,userId,adminId  后台删券
export function delUserCoupon(data) {
  return service({
    method: "POST",
    url: "/user/coupon/del ",
    data: JSON.stringify(data),
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

// 用户送青春豆
export function userScoreAdd(data) {
  return service({
    method: "POST",
    url: "pub/user/integral/add",
    data: JSON.stringify(data),
  });
}

// 退款列表
export function refundList(query) {
  return service({
    method: "get",
    url: "order/refund/get/list",
    params: query,
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
// 导出用户
export function exportUser(data) {
  return service({
    method: "POST",
    url: "export/user",
    data: JSON.stringify(data),
    responseType: "blob",
  });
}
// 团长导出
export function exportLeader(data) {
  return service({
    method: "POST",
    url: "export/leader/user",
    data: JSON.stringify(data),
    responseType: "blob",
  });
}
// 退款订单导出
export function exportRefundOrder(data) {
  return service({
    method: "POST",
    url: "export/order/refund",
    data: JSON.stringify(data),
    responseType: "blob",
  });
}
// 订单导出
export function exportOrder(data) {
  return service({
    method: "POST",
    url: "export/order",
    data: JSON.stringify(data),
    responseType: "blob",
  });
}
// 用户礼品卡导出
export function exportUserGift(data) {
  return service({
    method: "POST",
    url: "export/user/gift",
    data: JSON.stringify(data),
    responseType: "blob",
  });
}
// 用户合成卡导出
export function exportUserGiftRule(data) {
  return service({
    method: "POST",
    url: "export/user/gift/rule",
    data: JSON.stringify(data),
    responseType: "blob",
  });
}
// 商品导出
export function exportGoods(data) {
  return service({
    method: "POST",
    url: "export/goods/date",
    data: JSON.stringify(data),
    responseType: "blob",
  });
}

// 首页团长前十销量查询
export function homeLeaderTopSales10(data) {
  return service({
    method: "POST",
    url: "admin/get/day/order/leader/top",
    data: JSON.stringify(data),
  });
}

// 首页商品前十销量查询
export function homeGoodsTopSales10(data) {
  return service({
    method: "POST",
    url: "admin/get/day/goods/top",
    data: JSON.stringify(data),
  });
}
// 首页订单树状图
export function homeOrder(data) {
  return service({
    method: "POST",
    url: "admin/get/day/order",
    data: JSON.stringify(data),
  });
}
// 首页查询某个时间段内订单
export function homeOrderTime(data) {
  return service({
    method: "POST",
    url: "admin/get/yesterday",
    data: JSON.stringify(data),
  });
}
// 管理员列表
export function adminList(data) {
  return service({
    method: "POST",
    url: "admin/get/list",
    data: JSON.stringify(data),
  });
}
// 管理员新增
export function addAdminList(data) {
  return service({
    method: "POST",
    url: "admin/add",
    data: JSON.stringify(data),
  });
}
// 管理员禁用
export function adminUpdate(data) {
  return service({
    method: "POST",
    url: "admin/update",
    data: JSON.stringify(data),
  });
}

// 角色列表
export function roleList(data) {
  return service({
    method: "POST",
    url: "admin/get/rule/list",
    data: JSON.stringify(data),
  });
}

// 角色新增列表
export function roleAdd(data) {
  return service({
    method: "POST",
    url: "admin/add/rule",
    data: JSON.stringify(data),
  });
}
// 角色删除
export function roleDel(data) {
  return service({
    method: "POST",
    url: "admin/update/rule",
    data: JSON.stringify(data),
  });
}

// 角色权限列表
export function authorityList() {
  return service({
    method: "POST",
    url: "admin/get/authority/list",
    data: {},
  });
}
// 订单退款
export function orderRefund(orderNumber, adminId) {
  return service({
    method: "get",
    url:
      `order/refund/order?orderNumber=` + orderNumber + "&adminId=" + adminId,
  });
}

// 配置列表
export function configList(query) {
  return service({
    method: "get",
    url: "/admin/get/setting",
    params: query,
  });
}

// 修改配置
// 上下架欢拓直播间商品
export function updateConfig(query) {
  return service({
    method: "POST",
    url: "admin/update/setting",
    data: JSON.stringify(query),
  });
}

// 轮播图列表
export function carouselList(query) {
  return service({
    method: "get",
    url: "/swiper/list",
    params: query,
  });
}

// 添加轮播图
export function carouselAdd(query) {
  return service({
    method: "POST",
    url: "/swiper/add",
    data: JSON.stringify(query),
  });
}

// 编辑、删除轮播图
export function carouselUpdate(query) {
  return service({
    method: "POST",
    url: "/swiper/update",
    data: JSON.stringify(query),
  });
}

// 用户转移(把用户没有用完的优惠券\礼品卡转移到另一个手机号上) params id mobile
export function userTransfer(query) {
  return service({
    method: "get",
    url: "/user/delete",
    params: query,
  });
}

// 转账记录(兑换商品-红包发放记录)
export function transferList(query) {
  return service({
    method: "get",
    url: "/send/list",
    params: query,
  });
}

// 查询转账最新状态
export function transferNewStatusById(query) {
  return service({
    method: "get",
    url: "/send/getNewById",
    params: query,
  });
}

// 补发红包
export function reissueRedEnvelope(query) {
  return service({
    method: "POST",
    url: "/send/admin",
    data: JSON.stringify(query),
  });
}
// 修改团长
export function modifyGroupLeader(query) {
  return service({
    method: "POST",
    url: "/user/leader/update/leader",
    data: JSON.stringify(query),
  });
}

// 视频评论列表
export function videoComment(query) {
  return service({
    method: "get",
    url: "/videoComment/page",
    params: query,
  });
}

// 删除用户视频评论
export function deleteVideoComment(query) {
  return service({
    method: "POST",
    url: "/videoComment/del",
    data: JSON.stringify(query),
  });
}

// 用户领取优惠券记录
export function userReceiveCouponRecord(query) {
  return service({
    method: "POST",
    url: "/user/coupon/check/list",
    data: JSON.stringify(query),
  });
}
