<template>
  <el-icon class="icon-style"> <fold /></el-icon>

  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      ><a href="/">promotion management</a></el-breadcrumb-item
    >
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { Fold } from '@element-plus/icons-vue'
</script>

<style scoped>
.icon-style {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.75);
  cursor: pointer;
  margin-right: 10px;
}
</style>
