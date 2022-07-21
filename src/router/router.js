import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/home/index.vue";
import login from "../views/login/index.vue";
import Layout from "../layout/index.vue";
import store from "../store";

const routes = [
  {
    path: "/login",
    name: login,
    component: login,
  },
  {
    path: "/",
    name: "home",
    component: Layout,
  },
];
export const dynamicRouters = store.getters.menuList;
// routes.push(dynamicRouters);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
