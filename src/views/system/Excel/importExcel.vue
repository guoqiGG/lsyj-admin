<template>
  <el-card>
    <el-button type="primary" @click="importExcel">导入Excel</el-button>
  </el-card>
  <filesUpload ref="importRef"></filesUpload>
</template>
<script setup>
import { ref } from 'vue'
import filesUpload from '../../../components/filesUpload.vue'
const importRef = ref('')
const importExcel = () => {
  let params = {}
  importRef.value.acceptParams(params)
  // console.log(importRef.value.acceptParams(params))
}
</script>

<style lang="scss" scoped>
.mt-4 {
  float: right;
  text-align: right;
  margin-bottom: 20px;
}
</style>
