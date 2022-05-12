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
import menuItems from './components/menuItems.vue'
const isCollapse = ref(false)
const menuList = reactive([
  {
    path: '/Home',
    component: 'Loyout',
    meta: {
      title: '首页',
      icon: 'HomeFilled',
      roles: ['sys:manage'],
    },
    children: [],
  },
])

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
