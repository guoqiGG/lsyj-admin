<template>
  <div class="box-card-content">
    <span class="box-card-title">拖拽🍇🍇🍇🍓🍓🍓</span>
    <div v-draggable class="drag-box flx-center text">我可以拖拽哦~</div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.box-card-title {
  padding: 10px;
  // display: block;
}
.box-card-content {
  width: 100%;
  height: 100%;
  background-color: #fff;

  position: relative;
  .drag-box {
    position: absolute;
    top: 110px;
    width: 300px;
    height: 300px;
    color: #fff;
    background: #fab6b6;
  }
}
</style>
