import { createApp } from 'vue'
import router from './router/index'
import store from "../src/store/index"
import "../src/styles/common.scss";
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(router).use(store).use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')

