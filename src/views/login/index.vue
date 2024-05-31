<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <div class="login-left">
        <div class="title">邻舍云集</div>
        <div class="sub">社区团购 生活驿站</div>
        <img src="../../assets/login.png" alt="" />
      </div>

      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="../../assets/logo.png" alt="" />
          <p class="logo-text">欢迎登录</p>
        </div>
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
          <el-form-item prop="account">
            <el-input :prefix-icon="User" v-model="loginForm.account" placeholder="用户名">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :prefix-icon="Lock" type="password" show-password v-model="loginForm.password" placeholder="密码">
            </el-input>
          </el-form-item>
          <div class="flx-row">
            <el-checkbox style="flex: 1" v-model="loginForm.checked" label="记住我" size="large" />
            <span>忘记密码？</span>
          </div>
        </el-form>

        <div class="login-btn">
          <el-button :icon="CircleClose" round @click="resetForm(loginFormRef)" size="large">重置</el-button>
          <el-button :icon="UserFilled" round @click="login(loginFormRef)" size="large" type="primary"
            :loading="loading">
            登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="login">
import { useStore } from 'vuex' // 引入useStore 方法


import {
  CircleClose,
  UserFilled,
  Lock,
  User,
  Iphone,
} from '@element-plus/icons-vue'
import { Base64 } from 'js-base64'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const loginFormRef = ref()
const loading = ref(false)
const router = useRouter()

const loginForm = reactive({
  account: '',
  password: '',
  checked: true,
})
const loginRules = reactive({
  account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const globalStore = useStore() // 该方法用于返回store 实例

const login = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      loading.value = true

      if (loginForm.checked) {
        let password = Base64.encode(loginForm.password) // base64加密
        setCookie(loginForm.account, password, 7)
      } else {
        setCookie('', '', -1)
      }
      globalStore.dispatch('user/login', loginForm)
    } else {
      console.log('账号密码不正确')
      return false
    }
  })
}

const setCookie = (userId, password, days) => {
  let date = new Date() // 获取时间
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days) // 保存的天数
  // 字符串拼接cookie
  window.document.cookie =
    'userId' + '=' + userId + ';path=/;expires=' + date.toGMTString()
  window.document.cookie =
    'password' + '=' + password + ';path=/;expires=' + date.toGMTString()
}

// 读取cookie 将用户名和密码回显到input框中
const getCookie = () => {
  if (document.cookie.length > 0) {
    let arr = document.cookie.split('; ') //分割成一个个独立的“key=value”的形式
    for (let i = 0; i < arr.length; i++) {
      let arr2 = arr[i].split('=') // 再次切割，arr2[0]为key值，arr2[1]为对应的value
      if (arr2[0] === 'userId') {
        loginForm.account = arr2[1]
      } else if (arr2[0] === 'password') {
        loginForm.password = Base64.decode(arr2[1]) // base64解密
        loginForm.checked = true
      }
    }
  }
}
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
