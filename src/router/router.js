import {
  createRouter,
  createWebHashHistory
} from "vue-router";
import home from "../views/home/index.vue";
import login from "../views/login/index.vue";
import Layout from "../layout/index.vue";

const routes = [{
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
    children: [{
      path: "/home",
      name: "home",
      component: () => import("../views/home/index.vue"),
      meta: {
        requiresAuth: true, //有一些页面是否登录才能进去
        name: "首页",
      },
    }, ],
  },
  {
    path: "/system",
    name: "system",
    component: Layout,
    meta: {
      name: "系统管理",
    },
    children: [{
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
  {
    path: "/able",
    name: "able",
    component: Layout,
    meta: {
      name: "功能",
    },
    children: [{
        path: "/watermark",
        name: "watermark",
        component: () => import("../views/able/watermark.vue"),
        meta: {
          requiresAuth: true, //有一些页面是否登录才能进去
          name: "水印",
        },
      },
      {
        path: "/Drag",
        name: "Drag",
        component: () => import("../views/able/Drag.vue"),
        meta: {
          requiresAuth: true, //有一些页面是否登录才能进去
          name: "拖拽",
        },
      },
      {
        path: "/batchImport",
        name: "batchImport",
        component: () => import("../views/able/batchImport.vue"),
        meta: {
          requiresAuth: true,
          name: "文件上传",
        },
      },
      {
        path: "/wangEditor",
        name: "wangEditor",
        component: () => import("../views/able/wangEditor.vue"),
        meta: {
          requiresAuth: true,
          name: "富文本编辑器",
        },
      },
      {
        path: "/guide",
        name: "guide",
        component: () => import("../views/able/guide.vue"),
        meta: {
          requiresAuth: true,
          name: "引导页",
        },
      },
      {
        path: "/embedded",
        name: "embedded",
        component: () => import("../views/able/embedded.vue"),
        meta: {
          requiresAuth: true,
          name: "内嵌页",
        },
      },
    ],

  },
  {
    path: "/DataReport",
    name: "DataReport",
    component: Layout,
    meta: {
      name: "数据统计",
    },
    children: [{
      path: '/demo1',
      name: 'demo1',
      component: () => import('../views/DataReport/demo1.vue'),
      meta: {
        requiresAuth: true,
        name: '项目一'
      }
    }]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;