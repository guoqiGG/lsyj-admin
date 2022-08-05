<template>
  <!-- <el-config-provider :locale="i18nLocale" :button="config" :size="assemblySize"> -->
  <router-view></router-view>
  <!-- </el-config-provider> -->
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.body.style.setProperty('--el-color-primary', '#4060c7')
  document.body.style.setProperty('--el-color-primary-light-9', '#F5FBF0')
  document.body.style.setProperty('--el-color-primary-light-3', '#6c88d5')
})
</script>

<style scoped lang="scss"></style>
