<template>
  <div class="header">
    <div class="header-lf flx-center">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="header-ri flx-center">
      <message></message>
      <!-- <Driver></Driver> -->
      <fullScreen></fullScreen>
      <avatar></avatar>
      <el-icon class="icon-style"><setting /></el-icon>
    </div>
  </div>
</template>
<script setup name="header">
import { Setting } from '@element-plus/icons-vue'
import avatar from './components/avatar.vue'
import fullScreen from './components/fullScreen.vue'
import message from './components/message.vue'
import Breadcrumb from './components/Breadcrumb.vue'
// import Driver from './components/Driver/index.vue'
</script>

<style scoped lang="scss">
.header {
  border-bottom: 1px solid #f6f6f6;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  height: 48px;
  line-height: 48px;
  background-color: #fff;

  .header-lf {
    .collapse-icon {
      font-size: 22px;
      margin-right: 20px;
      cursor: pointer;
    }
  }

  .header-ri {
    // margin-left:10px;

    .message-box {
      height: 100%;
      position: relative;

      .dot {
        position: absolute;
        top: -5px;
        right: 10px;
        background-color: #d54f50;
        border-radius: 50%;
        width: 8px;
        height: 8px;
      }

      .bell-icon {
        font-size: 22px;
        margin-right: 20px;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.75);
      }
    }

    .icon-style {
      font-size: 20px;
      color: rgba(0, 0, 0, 0.75);
      cursor: pointer;
      margin: 0 0 0 11px;
    }
  }
}
</style>
