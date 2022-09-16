<template>
  <div
    id="guide"
    class="menu"
    :style="{
      width: store.getters.isCollapse == true ? '' : '200px',
      height: '100%',
    }"
  >
    <!-- <div class="logo">后台管理系统</div> -->
    <el-scrollbar style="height: 100%">
      <el-menu
        :default-active="activeMenu"
        :router="true"
        :collapse="store.getters.isCollapse"
        :collapse-transition="false"
        :unique-opened="true"
        :background-color="themeConfig.backgroundColor"
        :text-color="themeConfig.textColor"
        :active-text-color="themeConfig.primary"
      >
        <menuItems :menuList="menuList"></menuItems>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { getMenuList } from "../../api/modules/index.js";
import store from "../../store/index.js";
import menuItems from "./components/menuItems.vue";
const activeMenu = ref("/home");
const menuList = ref([]);
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
const themeConfig = store.getters.themeConfig;

onMounted(() => {
  getMenuList().then((res) => {
    menuList.value = res.data.data.menuList;
    console.log(menuItems.value);
  });
});
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
