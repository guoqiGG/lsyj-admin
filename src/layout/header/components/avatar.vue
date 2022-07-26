<template>
  <el-dropdown placement="bottom">
    <div class="flx-center">
      <div class="avatar">
        <img
          src="https://img.wxcha.com/m00/45/6e/ad1189f63cc71e06659340c078094873.jpg"
          alt="avatar"
        />
      </div>
      <span class="username">用户名</span>
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
import { ArrowDown } from '@element-plus/icons-vue'

const handleClick = () => {
  // eslint-disable-next-line no-alert
  alert('button click')
}
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
