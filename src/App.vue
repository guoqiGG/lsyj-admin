<template>
  <router-view v-if="isRouterAlive"></router-view>
</template>

<script setup>
import { onMounted, ref, nextTick, provide } from "vue";
import { useStore } from "vuex";

// 局部组件刷新
const isRouterAlive = ref(true);
const globalStore = useStore();
const reload = () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
    console.log("数据刷新成功");
  });
};

provide("reload", reload);
onMounted(() => {
  globalStore.dispatch("user/changeThem", "#155bd4");
});
</script>

<style scoped lang="scss"></style>

<style lang="scss">
.el-button {
  color: #78797d;
  background-color: #FFF;
  border-color: #dee1e7;
  font-size: 12px;

  &:hover {
    color: #409eff;
    background-color: #FFF;
    border-color: #409eff;
  }

  &:focus {
    color: #78797d;
    background-color: #FFF;
    border-color: #dee1e7;
  }

  &:active {
    color: #78797d;
    background-color: #FFF;
    border-color: #dee1e7;
  }
}


.el-button--primary {
  color: #fff;
  background-color: #155bd4;
  border-color: #155bd4;

  &:hover {
    color: #FFF;
    background-color: #155bd4;
    border-color: #155bd4;
    opacity: 0.8;
  }

  &:focus {
    color: #FFF;
    background-color: #155bd4;
    border-color: #155bd4;
  }

  &:active {
    color: #FFF;
    background-color: #155bd4;
    border-color: #155bd4;
  }
}

.el-button--info {
  color: #fff;
  background-color: #909399;
  border-color: #909399;

  &:hover {
    color: #FFF;
    background-color: #909399;
    border-color: #909399;
  }

  &:focus {
    color: #FFF;
    background-color: #909399;
    border-color: #909399;
  }

  &:active {
    color: #FFF;
    background-color: #909399;
    border-color: #909399;
  }
}

.el-button--success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;

  &:hover {
    color: #FFF;
    background-color: #67c23a;
    border-color: #67c23a;
  }

  &:focus {
    color: #FFF;
    background-color: #67c23a;
    border-color: #67c23a;
  }

  &:active {
    color: #FFF;
    background-color: #67c23a;
    border-color: #67c23a;
  }
}

.el-button--warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;

  &:hover {
    color: #FFF;
    background-color: #e6a23c;
    border-color: #e6a23c;
  }

  &:focus {
    color: #FFF;
    background-color: #e6a23c;
    border-color: #e6a23c;
  }

  &:active {
    color: #FFF;
    background-color: #e6a23c;
    border-color: #e6a23c;
  }
}

.el-button--danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;

  &:hover {
    color: #FFF;
    background-color: #f56c6c;
    border-color: #f56c6c;
  }

  &:focus {
    color: #FFF;
    background-color: #f56c6c;
    border-color: #f56c6c;
  }

  &:active {
    color: #FFF;
    background-color: #f56c6c;
    border-color: #f56c6c;
  }
}
</style>
