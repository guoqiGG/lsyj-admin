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
    path: "/goods",
    name: "goods",
    component: Layout,
    meta: {
      name: "列表页",
    },
    children: [{
        path: "/goodCategory",
        name: "goodCategory",
        component: () => import("../views/goods/goodCategory.vue"),
        meta: {
          requiresAuth: true, //有一些页面是否登录才能进去
          name: "基础列表",
        },
      },
      {
        path: "/cardList",
        name: "cardList",
        component: () => import("../views/goods/cardList.vue"),
        meta: {
          requiresAuth: true, //有一些页面是否登录才能进去
          name: "卡片列表",
        },
      },
      {
        path: "/searchList",
        name: "searchList",
        component: () => import("../views/goods/searchList.vue"),
        meta: {
          requiresAuth: true, //有一些页面是否登录才能进去
          name: "搜索列表",
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
        path: "/countTo",
        name: "countTo",
        component: () => import("../views/able/countTo.vue"),
        meta: {
          requiresAuth: true, //有一些页面是否登录才能进去
          name: "数字动画",
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
        path: "/strength",
        name: "strength",
        component: () => import("../views/able/strength.vue"),
        meta: {
          requiresAuth: true,
          name: "密码强度",
        },
      },
      {
        path: "/validation",
        name: "validation",
        component: () => import("../views/able/validation.vue"),
        meta: {
          requiresAuth: true,
          name: "验证组件",
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
      path: "/demo1",
      name: "demo1",
      component: () => import("../views/DataReport/demo1.vue"),
      meta: {
        requiresAuth: true,
        name: "项目一",
      },
    }, ],
  },
  {
    path: "/directives",
    name: "directives",
    component: Layout,
    meta: {
      name: "自定义指令",
    },
    children: [{
        path: "/Drag",
        name: "Drag",
        component: () => import("../views/directives/Drag.vue"),
        meta: {
          requiresAuth: true,
          name: "拖拽",
        },
      },
      {
        path: "/copy",
        name: "copy",
        component: () => import("../views/directives/copy.vue"),
        meta: {
          requiresAuth: true,
          name: "复制",
        },
      },
      {
        path: "/debounceDirect",
        name: "debounceDirect",
        component: () => import("../views/directives/debounceDirect.vue"),
        meta: {
          requiresAuth: true,
          name: "防抖",
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