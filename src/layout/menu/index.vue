<template>
  <div id="guide" class="menu" :style="{ width: store.getters.isCollapse == true ? '' : '200px' }">
    <!-- <div class="logo">后台管理系统</div> -->
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :router="true"
        :collapse="store.getters.isCollapse"
        :collapse-transition="false"
        :unique-opened="true"
        background-color="#20222a"
        text-color="#bdbdc0"
        active-text-color="#fff"
      >
        <menuItems :menuList="menuList"></menuItems>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import store from "../../store/index";
import menuItems from "./components/menuItems.vue";
const activeMenu = ref("/home");
const menuList = store.getters.menuList;
console.log(menuList);
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style scoped lang="scss">
.menu {
  // width: 200px;
  .logo {
    height: 48px;
    line-height: 48px;
    color: rgb(244, 244, 245);
    padding: 0 20px;
    list-style: none;
    cursor: pointer;
    position: relative;
  }
}
</style>
