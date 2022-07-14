const userInfo = {
  namespaced: true, //让这里的东西独立成模块，不然mutations等都会和根state的合并
  state: {
    token: ''
  },
  mutations: {
    setMsg(state, str) {
      state.token = str
    }
  }
}​
export {
  userInfo
}