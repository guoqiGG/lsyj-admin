<template>
  <el-tooltip
    class="box-item"
    effect="dark"
    content="全屏"
    placement="bottom"
  >
    <el-icon class="icon-style"><full-screen /></el-icon>
  </el-tooltip>
</template>

<script setup>
import { FullScreen } from '@element-plus/icons-vue'
</script>

<style scoped>
.icon-style {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.75);
  cursor: pointer;
  margin:0 11px;
}
</style>
