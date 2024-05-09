import { createRouter, createWebHashHistory } from "vue-router";
import home from "../views/home/index.vue";
import login from "../views/login/index.vue";
import Layout from "../layout/index.vue";

const routes = [
  {
    path: "/login",
    name: login,
    component: login,
  },
  {
    path: "/",
    component: Layout,
    name: "container",
    redirect: "home",
    meta: {
      requiresAuth: true, //有一些页面是否登录才能进去
      name: "首页",
    },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/home/index.vue"),
        meta: {
          requiresAuth: true, //有一些页面是否登录才能进去
          name: "首页",
        },
      },
    ],
  },
  // 商品管理
  {
    path: "/prod",
    name: "prod",
    component: Layout,
    meta: {
      name: "商品管理",
    },
    children: [
      {
        path: "/prodList",
        name: "prodList",
        component: () => import("../views/prod/index.vue"),
        meta: {
          requiresAuth: true,
          name: "商品列表",
        },
      },
      // 商品分类列表
      {
        path: "/proCategoryList",
        name: "proCategoryList",
        component: () => import("../views/prod/category.vue"),
        meta: {
          requiresAuth: true,
          name: "商品分类",
        },
      },
    ],
  },
  //订单
  {
    path: "/order",
    name: "order",
    component: Layout,
    meta: {
      name: "订单管理",
    },
    children: [
      //订单列表
      {
        path: "/orderList",
        name: "orderList",
        component: () => import("../views/order/index.vue"),
        meta: {
          requiresAuth: true,
          name: "订单列表",
        },
      },
      //退款列表
      {
        path: "/refundList",
        name: "refundList",
        component: () => import("../views/order/refund.vue"),
        meta: {
          requiresAuth: true,
          name: "退款列表",
        },
      },
    ],
  },
  //团长
  {
    path: "/leader",
    name: "leader",
    component: Layout,
    meta: {
      name: "团长管理",
    },
    children: [
      //团长列表
      {
        path: "/leaderList",
        name: "leaderList",
        component: () => import("../views/leader/index.vue"),
        meta: {
          requiresAuth: true,
          name: "团长列表",
        },
      },
      //审批团长
      {
        path: "/applyList",
        name: "applyList",
        component: () => import("../views/leader/apply.vue"),
        meta: {
          requiresAuth: true,
          name: "审批团长",
        },
      },
      //提现列表
      {
        path: "/withdrawList",
        name: "withdrawList",
        component: () => import("../views/leader/withdraw.vue"),
        meta: {
          requiresAuth: true,
          name: "提现列表",
        },
      },
      //佣金明细
      {
        path: "/commissionDetails",
        name: "commissionDetails",
        component: () => import("../views/leader/commissionDetails.vue"),
        meta: {
          requiresAuth: true,
          name: "佣金明细",
        },
      },
    ],
  },
  // 用户
  {
    path: "/user",
    name: "user",
    component: Layout,
    meta: {
      name: "用户管理",
    },
    children: [
      // 用户列表
      {
        path: "/userList",
        name: "userList",
        component: () => import("../views/user/index.vue"),
        meta: {
          requiresAuth: true,
          name: "用户列表",
        },
      },
      // 分组列表
      {
        path: "/groupList",
        name: "groupList",
        component: () => import("../views/user/group.vue"),
        meta: {
          requiresAuth: true,
          name: "分组列表",
        },
      },
      // 用户分组列表
      {
        path: "/userGroupList",
        name: "userGroupList",
        component: () => import("../views/user/userGroup.vue"),
        meta: {
          requiresAuth: true,
          name: "用户分组",
        },
      },
    ],
  },
  // 优惠券列表
  {
    path: "/coupon",
    name: "coupon",
    component: Layout,
    meta: {
      name: "优惠券管理",
    },
    children: [
      // 优惠券列表
      {
        path: "/couponList",
        name: "couponList",
        component: () => import("../views/coupon/index.vue"),
        meta: {
          requiresAuth: true,
          name: "优惠券列表",
        },
      },
      // 用户优惠券列表
      {
        path: "/userCouponList",
        name: "userCouponList",
        component: () => import("../views/coupon/userCoupon.vue"),
        meta: {
          requiresAuth: true,
          name: "用户优惠券列表",
        },
      },
    ],
  },
  // 礼品卡列表
  {
    path: "/gift",
    name: "gift",
    component: Layout,
    meta: {
      name: "礼品卡管理",
    },
    children: [
      // 礼品卡列表
      {
        path: "/giftList",
        name: "giftList",
        component: () => import("../views/gift/index.vue"),
        meta: {
          requiresAuth: true,
          name: "礼品卡列表",
        },
      },
      // 用户礼品卡列表
      {
        path: "/userGiftCardList",
        name: "userGiftCardList",
        component: () => import("../views/compositeCard/userGiftCardList.vue"),
        meta: {
          requiresAuth: true,
          name: "用户礼品卡",
        },
      },
    ],
  },
  // 合成卡列表
  {
    path: "/compositeCard",
    name: "compositeCard",
    component: Layout,
    meta: {
      name: "合成卡管理",
    },
    children: [
      // 合成卡列表
      {
        path: "/compositeCardList",
        name: "compositeCardList",
        component: () => import("../views/compositeCard/index.vue"),
        meta: {
          requiresAuth: true,
          name: "合成卡列表",
        },
      },

      // 用户合成卡列表
      {
        path: "/userCompositeCardList",
        name: "userCompositeCardList",
        component: () =>
          import("../views/compositeCard/userCompositeCardList.vue"),
        meta: {
          requiresAuth: true,
          name: "用户合成卡",
        },
      },
    ],
  },
  // 兑换管理
  {
    path: "/exchange",
    name: "exchange",
    component: Layout,
    meta: {
      name: "兑换管理",
    },
    children: [
      // 兑换列表
      {
        path: "/exchangeList",
        name: "exchangeList",
        component: () => import("../views/exchange/index.vue"),
        meta: {
          requiresAuth: true,
          name: "兑换列表",
        },
      },
      // 兑换记录
      {
        path: "/exchangeRecord",
        name: "exchangeRecord",
        component: () => import("../views/exchange/record.vue"),
        meta: {
          requiresAuth: true,
          name: "兑换记录",
        },
      },
    ],
  },
  // 直播
  {
    path: "/live",
    name: "live",
    component: Layout,
    meta: {
      name: "直播管理",
    },
    children: [
      // 直播间列表
      {
        path: "/liveList",
        name: "liveList",
        component: () => import("../views/live/index.vue"),
        meta: {
          requiresAuth: true,
          name: "直播间列表",
        },
      },
      // 欢拓直播间列表
      {
        path: "/huantuo",
        name: "huantuo",
        component: () => import("../views/live/huantuo.vue"),
        meta: {
          requiresAuth: true,
          name: "欢拓直播间列表",
        },
      },
      // 用户观看时长
      {
        path: "/huantuouserviewtime",
        name: "huantuouserviewtime",
        component: () => import("../views/live/huantuouserviewtime.vue"),
        meta: {
          requiresAuth: true,
          name: "欢拓观看时长列表",
        },
      },
    ],
  },
  // 视频
  {
    path: "/video",
    name: "video",
    component: Layout,
    meta: {
      name: "视频管理",
    },
    children: [
      // 直播间列表
      {
        path: "/videoList",
        name: "videoList",
        component: () => import("../views/video/index.vue"),
        meta: {
          requiresAuth: true,
          name: "视频列表",
        },
      },
    ],
  },
  // 设置
  {
    path: "/setup",
    name: "setup",
    component: Layout,
    meta: {
      name: "系统设置",
    },
    children: [
      // 设置管理
      {
        path: "/adminList",
        name: "adminList",
        component: () => import("../views/setup/adminList.vue"),
        meta: {
          requiresAuth: true,
          name: "管理员列表",
        },
      },
      {
        path: "/roleList",
        name: "roleList",
        component: () => import("../views/setup/roleList.vue"),
        meta: {
          requiresAuth: true,
          name: "角色列表",
        },
      },
    ],
  },
  // 活动配置
  {
    path: "/config",
    name: "config",
    component: Layout,
    meta: {
      name: "配置",
    },
    children: [
      // 配置管理
      {
        path: "/configList",
        name: "configList",
        component: () => import("../views/config/index.vue"),
        meta: {
          requiresAuth: true,
          name: "配置列表",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
