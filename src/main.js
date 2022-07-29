import {
  createApp
} from "vue";
import router from "./router/index";
import store from "../src/store/index";
import "../src/styles/common.scss";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import App from "./App.vue";
import "./mock/index.js";
import * as ELIcons from '@element-plus/icons-vue'
const app = createApp(App);

// 小图标引用
for (const iconName in ELIcons) {
  // 注册组件
  app.component(iconName, ELIcons[iconName])
}


app.use(router).use(store).use(ElementPlus, {
  locale: zhCn,
});
app.mount("#app");