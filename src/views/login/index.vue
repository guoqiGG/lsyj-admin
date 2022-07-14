<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <div class="login-left">
        <img src="../../assets/images/login_left.svg" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <!-- <img class="login-icon" src="../assets/images/logo.svg" alt="" /> -->
          <p class="logo-text">holle Admin</p>
        </div>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          size="large"
        >
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
              placeholder="用户名"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              show-password
              v-model="loginForm.password"
              placeholder="密码"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <div class="login-btn">
          <el-button
            :icon="CircleClose"
            round
            @click="resetForm(loginFormRef)"
            size="large"
            >重置</el-button
          >
          <el-button
            :icon="UserFilled"
            round
            @click="login(loginFormRef)"
            size="large"
            type="primary"
            :loading="loading"
          >
            登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="login">
import axios from 'axios'
import { useStore } from 'vuex' // 引入useStore 方法

import { getMenuList } from '../../api/login/index.js'
import {
  CircleClose,
  UserFilled,
  Lock,
  User,
  Iphone,
} from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const loginFormRef = ref()
const loading = ref(false)
const router = useRouter()
const loginForm = reactive({
  username: '',
  password: '',
})
const loginRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const globalStore = useStore() // 该方法用于返回store 实例
console.log(globalStore) // store 实例对象

const login = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      loading.value = true
      console.log(loginForm)
      getMenuList(loginForm).then((res) => {
        if (res.status == 200) {
          // globalStore._actions.setToken(res.data.data.token)
          ElMessage.success('登录成功！')
          // router.push({ name: 'home' })
        }

        // menus.mensList = res.data.menusList
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
