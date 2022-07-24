<template>
  <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom">
    <el-icon class="icon-style" @click="handleFullScreen"
      ><full-screen
    /></el-icon>
  </el-tooltip>
</template>

<script setup>
// import { screenfull } from 's/creenfull'
// // import { FullScreen } from '@element-plus/icons-vue'
import { ref, onMounted, onBeforeMount } from 'vue'

const handleFullScreen = () => {
  // if (FullScreen.isEnabled) {
  //   FullScreen.toggle()
  // }
}

// onMounted(() => {
//   screenfull.on('change', changeIcon)
// })

// onBeforeMount(() => {
//   screenfull.off('change')
// })
</script>

<style scoped>
.icon-style {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.75);
  cursor: pointer;
  margin: 0 11px;
}
</style>
