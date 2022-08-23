import { LoginInfo } from "../../api/modules/index.js";
import router from "../../router/router.js";
import { ElMessage } from "element-plus";

export default {
  namespaced: true,
  state: () => {
    UserInfo: {
    }
    token: localStorage.getItem("token") || "";
    isCollapse: true;
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserInfo(state, userinfo) {
      state.UserInfo = userinfo;
    },
    SetIsCollapse(state, isCollapse) {
      state.isCollapse = isCollapse;
    },
  },

  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        LoginInfo(userInfo)
          .then((res) => {
            console.log(res.data.data);
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("UserInfo", JSON.stringify(res.data.data));
            console.log(JSON.parse(localStorage.getItem("UserInfo")));
            commit("setToken", res.data.data.token);
            commit("setUserInfo", res.data.data);
            router.replace("/");
            ElMessage({
              message: "登录成功",
              type: "success",
            });
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    changeIsCollapse({ commit }, str) {
      console.log(str);
      commit("SetIsCollapse", str);
    },
  },
};
