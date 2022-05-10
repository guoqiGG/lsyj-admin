<template>
  <div class="menu">
    <el-scrollbar>
      <menuItems></menuItems>
    </el-scrollbar>
  </div>
</template>

<script setup>
import menuItems from './components/menuItems.vue'
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
