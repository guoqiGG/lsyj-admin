import {
  getMenuList
} from '../../api/login/index.js'
import router from '../../router/router.js'
import {
  ElMessage
} from 'element-plus'

export default {
  namespaced: true,
  state: () => {
    token: localStorage.getItem('token') ||
      '';
    isCollapse: false;
    menuList: []
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setMenuList(state, menuList) {
      state.menuList = menuList
    },
    setisCollapse(state, isCollapse) {
      state.isCollapse = isCollapse
    }
  },
  actions: {
    login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        getMenuList(userInfo).then(res => {
          // console.log(res)
          localStorage.setItem('token', res.data.data.token)
          console.log(localStorage.getItem('token'))
          commit('setToken', res.data.data.token)
          commit('setMenuList', res.data.data.menu)
          router.replace('/')
          ElMessage({
            message: '登录成功',
            type: 'success',
          })
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    setIsCollapse({
      commit
    }, str) {
      console.log(str)
      commit('setisCollapse', str)

    }
  }
}