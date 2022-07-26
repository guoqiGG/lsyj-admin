<template>
  <!-- <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom"> -->
  <el-icon class="icon-style" @click="handleFullScreen"><full-screen /></el-icon>
  <!-- </el-tooltip> -->
</template>

<script setup>
// import  } from "screenfull";
import { ref, onMounted, onBeforeMount } from "vue";

import { ElMessage } from "element-plus";
const handleFullScreen = () => {
  ElMessage({
    showClose: true,
    message: "开启全屏模式",
    type: "success",
  });
  // ElMessage({
  //   showClose: true,
  //   message: "关闭全屏模式",
  //   type: "success",
  // });
};

onMounted(() => {
  // screenfull.on('change', changeIcon)
});

onBeforeMount(() => {
  // screenfull.off('change')
});
</script>

<style scoped>
.icon-style {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.75);
  cursor: pointer;
  margin: 0 11px;
}
</style>
