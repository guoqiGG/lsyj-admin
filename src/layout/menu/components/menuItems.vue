<template>
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
    <template v-for="menu in menuList" :key="menu.path">
      <el-sub-menu
        v-if="menu.children && menu.children.length > 0"
        :index="menu.path"
      >
        <template #title>
          <!-- 动态组件的使用方式 -->
          <component class="icons" :is="menu.meta.icon" />
          <!-- 方式二 -->
          <!-- <Icon class="icons" :icon="menu.mata.icon"></Icon> -->
          <span>{{ menu.meta.title }}</span>
        </template>
        <menu-item :menuList="menu.children"></menu-item>
      </el-sub-menu>

      <el-menu-item style="color: #f4f4f5" v-else :index="menu.path">
        <i
          v-if="menu.meta.icon && menu.meta.icon.includes('el-icon')"
          :class="menu.meta.icon"
        ></i>
        <component class="icons" v-else :is="menu.meta.icon" />
        <template #title>{{ menu.meta.title }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const activeMenu = ref('1')
const isCollapse = ref(false)
const menulist = ref([])
</script>

<style scoped lang="scss">
@import '../index.scss';
</style>
