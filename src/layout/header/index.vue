<template>
  <div class="header">
    <div class="header-lf flx-center">
      <el-icon class="collapse-icon">
        <component is="expand"></component>
      </el-icon>
    </div>
    <div class="header-ri flx-center">
      <div class="avatar">
        <img src="https://img.wxcha.com/m00/45/6e/ad1189f63cc71e06659340c078094873.jpg" alt="avatar">
      </div>
      <span class="username">用户名</span>
    </div>
  </div>
</template>
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
    margin: 0 30px;

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

    .username {
      font-size: 15px;
      color: rgba(0, 0, 0, 0.75);
      margin: 0 0 0 20px;
    }

    .avatar {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>