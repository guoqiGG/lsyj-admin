<template>
  <el-dropdown placement="bottom">
    <div class="flx-center">
      <div class="avatar">
        <img src="https://portrait.gitee.com/uploads/avatars/user/636/1908423_tanzo_1657785658.png!avatar100" alt="avatar" />
      </div>
      <span class="username">宇宙无敌大可爱</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import { ArrowDown } from "@element-plus/icons-vue";
import { nextTick, onMounted, ref } from "vue";
import store from "../../../store/index.js";

const uersInfo = store.getters.UserInfo;
const handleClick = () => {
  // eslint-disable-next-line no-alert
  alert("button click");
};
</script>
<style lang="scss" scoped>
.el-dropdown {
  cursor: pointer;
  .el-tooltip__trigger {
    display: flex;
    flex-flow: row;
    align-items: center;
  }
}
.username {
  font-size: 15px;
  color: rgba(0, 0, 0, 0.75);
  margin: 0 0 0 10px;
}

.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  margin-left: 20px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
