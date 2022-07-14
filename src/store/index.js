import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    token: null,
  },
  mutations: {

  },
  actions: {
    setToken(token) {
      this.token = token
      console.log(token)
    }
  },
  modules: {}
})