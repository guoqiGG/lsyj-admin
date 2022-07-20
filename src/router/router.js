import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import Home from '../views/home/index.vue'
import login from '../views/login/index.vue'
import Layout from '../layout/index.vue'



const routes = [{
    path: '/login',
    name: login,
    component: login
  },
  {
    path: '/',
    name: 'home',
    component: Layout
  }
]
export const dynamicRouters = [{
    path: '/',
    component: Layout,
    name: 'container',
    redirect: 'home',
    meta: {
      requiresAuth: true, //有一些页面是否登录才能进去  
      name: '首页'
    },
    children: [{
      path: 'home',
      component: () => import('../views/home/index.vue'),
      name: 'home',
      mate: {
        name: '首页',
        icon: 'icon-name'
      }
    }]
  },

  {
    path: "/404",
    name: "404",
    component: () => import("../views/ErrorMessage/404.vue"),
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router