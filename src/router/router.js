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
      // 用户等级列表
      {
        path: "/userLevelList",
        name: "userLevelList",
        component: () => import("../views/user/level.vue"),
        meta: {
          requiresAuth: true,
          name: "等级列表",
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
    ],
  },
  // 视频
  {
    path: "/live",
    name: "live",
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
