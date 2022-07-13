import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import Home from '../views/home/index.vue'
import login from '../views/login/index.vue'
import Layout from '../layout/index.vue'



const routes = [

  {
    path: '/',
    name: login,
    component: login
  },
]

export const dynamicRouters = [{
  name: '',
  component: Layout,
  name: 'container',
  redirect: 'home',
  mate: {
    requiresAuth: true,
    name: '首页',
  },
  children: [{
    path: 'home',
    component: Home,
    name: Home,
    meta: {
      name: '首页',
      icon: 'icon-name'
    }
  }]
}, {
  path: '/*',
  component: () => import('../views/notfount/404.vue')
}]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router