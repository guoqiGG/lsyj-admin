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

      // {
      //   path: 'categories',
      //   name: 'categories',
      //   component: () => import('@/views/categories/index.vue')
      // },
      // {
      //   path: 'goods',
      //   name: 'goods',
      //   component: () => import('@/views/goods/index.vue')
      // },
      // {
      //   path: 'orders',
      //   name: 'orders',
      //   component: () => import('@/views/orders/index.vue')
      // },
      // {
      //   path: 'params',
      //   name: 'params',
      //   component: () => import('@/views/params/index.vue')
      // },
      // {
      //   path: 'reports',
      //   name: 'reports',
      //   component: () => import('@/views/reports/index.vue')
      // },
      // {
      //   path: 'rights',
      //   name: 'rights',
      //   component: () => import('@/views/rights/index.vue')
      // },
    ],
  },
  {
    path: "/system",
    name: "system",
    component: Layout,
    meta: {
      name: "系统管理",
    },
    children: [
      {
        path: "/Department",
        name: "Department",
        component: () => import("../views/system/Department/index.vue"),
        meta: {
          requiresAuth: true, //有一些页面是否登录才能进去
          name: "机构管理",
        },
      },
      {
        path: "/UserList",
        name: "UserList",
        component: () => import("../views/system/UserList/index.vue"),
        meta: {
          requiresAuth: true, //有一些页面是否登录才能进去
          name: "用户管理",
        },
      },
      {
        path: "/RoleList",
        name: "RoleList",
        component: () => import("../views/system/RoleList/index.vue"),
        meta: {
          requiresAuth: true,
          name: "角色管理",
        },
      },
      {
        path: "/MenuList",
        name: "MenuList",
        component: () => import("../views/system/MenuList/index.vue"),
        meta: {
          requiresAuth: true,
          name: "权限管理",
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
