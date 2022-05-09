import router from './router.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ ease: 'ease', speed: 500 })
router.beforeEach((to, from, next) => {
  if (to.path === `login`) {
    return next()
  }
 
  // token验证，如果存储在sessionStorage里的auth的值丢失，就回到登陆页面，(开发时可以注释掉)
  // if (!sessionStorage.getItem('auth')) {
  //   return next(`${base}login`)
  // }
 
  // 如果页面在 /  默认页面，跳转到登陆页面(和vue路由重定向功能类似)
 
  // NProgress开始进度条
  NProgress.start()
  next()
})
 
// 全局后置钩子-常用于结束动画等
router.afterEach(transition => {
  // NProgress结束进度条
  NProgress.done()
  // console.log(transition)
})


export default router
