<template>
  <el-icon class="icon-style" @click="dialogVisible = true"><Search /></el-icon>

  <el-dialog v-model="dialogVisible" :show-close="false">
    <el-input
      v-model="searchValue"
      placeholder="Please input"
      class="input-with-select"
    >
      <template #append>
        <el-button :icon="Search" />
      </template>
    </el-input>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false)
const searchValue = ref('')
</script>
