import {
  LoginInfo
} from "../../api/modules/index.js";
import router from "../../router/router.js";
import {
  ElMessage
} from "element-plus";

export default {
  namespaced: true,
  state: {
    UserInfo: {},
    token: sessionStorage.getItem("token") || "",
    isCollapse: true,
    themeConfig: {
      primary: "#4060c7",
    },
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
    setThemeConfig(state, primary) {
      state.themeConfig.primary = primary
    }
  },

  actions: {
    login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        LoginInfo(userInfo)
          .then((res) => {
            console.log(res.data.data);
            sessionStorage.setItem("token", res.data.data.token);
            sessionStorage.setItem("UserInfo", JSON.stringify(res.data.data));
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
    changeIsCollapse({
      commit
    }, str) {
      console.log(str);
      commit("SetIsCollapse", str);
    },

    changeThem({
      commit
    }, str) {
      commit('setThemeConfig', str)
    }
  },
};