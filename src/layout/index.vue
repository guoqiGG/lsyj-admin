<template>
  <el-container>
    <el-aside><Menu></Menu></el-aside>
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
import { computed } from "vue-demi";
import store from "../store/index";
import Header from "./header/index.vue";
import Menu from "./menu/index.vue";
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
