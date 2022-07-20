<template>
  <div class="menu">
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :router="true"
        :collapse="isCollapse"
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
import { reactive, ref } from 'vue'
import store from '../../store/index'
import menuItems from './components/menuItems.vue'
const isCollapse = ref(false)
const menuList = store.getters.menuList
console.log(menuList)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
