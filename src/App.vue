<template>
  <!-- <el-config-provider :locale="i18nLocale" :button="config" :size="assemblySize"> -->
  <router-view v-if="isRouterAlive"></router-view>
  <!-- </el-config-provider> -->
</template>

<script setup>
import { onMounted, ref, nextTick, provide } from 'vue'
// 局部组件刷新
const isRouterAlive = ref(true)

const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
    console.log('数据刷新成功')
  })
}

provide('reload', reload)
onMounted(() => {
  document.body.style.setProperty('--el-color-primary', '#4060c7')
  document.body.style.setProperty('--el-color-primary-light-9', '#F5FBF0')
  document.body.style.setProperty('--el-color-primary-light-3', '#6c88d5')
})
</script>

<style scoped lang="scss"></style>
