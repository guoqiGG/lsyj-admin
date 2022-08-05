<template>
  <el-card class="box-card col-center" shadow="never">
    <span class="box-card-title">拖拽 🍓🍇🍈🍉</span>
    <div v-draggable class="drag-box flx-center text">我可以拖拽哦~</div>
  </el-card>
</template>

<script setup></script>

<style lang="scss" scoped>
.box-card {
  width: 100%;
  position: relative;
  .drag-box {
    position: absolute;
    top: 110px;
    width: 300px;
    height: 300px;
    color: #b2bec3;
    background: #dfe6e9;
    border-radius: 50%;
  }
}
</style>
