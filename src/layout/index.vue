<template>
  <div class="common-layout">
    <el-container>
      <el-aside>Aside</el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <div class="main-box ">
            <router-view></router-view>
          </div>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup name="layout">
import Header from './header/index.vue'
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>