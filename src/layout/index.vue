<template>
  <el-container class="container">
    <el-aside :style="{ backgroundColor: themeConfig.backgroundColor }"><Menu></Menu></el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <div class="main-box">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup name="layout">
import store from "../store/index.js";
import Header from "./header/index.vue";
import Menu from "./menu/index.vue";
const themeConfig = store.getters.themeConfig;
console.log(themeConfig.backgroundColor);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
