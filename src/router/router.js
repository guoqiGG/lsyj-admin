import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import Home from '../views/home/index.vue'
import About from '../views/about/index.vue'
import login from '../views/login/index.vue'
import Layout from '../layout/index.vue'

const routes = [
  {
    path: '/Home',
    name: 'Home',
    redirect: '/Home',
    component: Layout, // 导入组件 Layout
    hidden: true,
    children: [{
      path: '/home',
      // 引入的组件会渲染到 Layout 中的 <router-view />
      component: Home
    }]
  },
  {
      path: '/about',
      name: 'About',
      component: About
  },{
    path:'/',
    name:login,
    component:login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
