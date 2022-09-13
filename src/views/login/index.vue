<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <!-- <div class="login-left">
         <img src="../../assets/login.png" alt="login" />
      </div> -->
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="../../assets/login.png" alt="" />
          <p class="logo-text">欢迎登录</p>
        </div>
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username" placeholder="用户名"> </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :prefix-icon="Lock" type="password" show-password v-model="loginForm.password" placeholder="密码"> </el-input>
          </el-form-item>
        </el-form>
        <div class="login-btn">
          <el-button :icon="CircleClose" round @click="resetForm(loginFormRef)" size="large">重置</el-button>
          <el-button :icon="UserFilled" round @click="login(loginFormRef)" size="large" type="primary" :loading="loading"> 登录 </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="login">
import axios from "axios";
import { useStore } from "vuex"; // 引入useStore 方法
import { CircleClose, UserFilled, Lock, User, Iphone } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const loginFormRef = ref();
const loading = ref(false);
const router = useRouter();
const loginForm = reactive({
  username: "admin",
  password: "123456",
});
const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const globalStore = useStore(); // 该方法用于返回store 实例

const login = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      loading.value = true;
      console.log(globalStore);
      globalStore.dispatch("user/login", loginForm);
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
