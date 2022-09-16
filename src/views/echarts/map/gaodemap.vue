<template>
  <el-card>
    <div id="gaodeMap"></div>
  </el-card>
</template>

<script setup>
import { nextTick, onMounted } from "vue";
const initGaoMap = () => {
  var map = new AMap.Map("gaodeMap", {
    zoom: 11, //级别
    center: [116.397428, 39.90923], //中心点坐标
    viewMode: "3D", //使用3D视图
  });
  map.setFitView();
};

onMounted(() => {
  nextTick(() => {
    initGaoMap();
  });
});
</script>

<style lang="scss" scoped>
#gaodeMap {
  width: 100%;
  height: 85vh;
}
</style>
