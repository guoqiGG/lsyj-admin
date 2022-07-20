import router from './router.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../store'
NProgress.configure({
  ease: 'ease',
  speed: 500
})


const writeNames = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log(store.getters)
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    }
    return next()
  } else {
    if (writeNames.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }

  // next()
})

// 全局后置钩子-常用于结束动画等
router.afterEach(transition => {
  // NProgress结束进度条
  NProgress.done()
  // console.log(transition)
})


export default router