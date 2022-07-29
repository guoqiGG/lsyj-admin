<template>
  <el-card shadow="never" class="henader-card">
    <el-row :gutter="12">
      <el-col :span="8">
        <el-input placeholder="请输入搜索内容"> </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" :icon="Search">搜索</el-button>
        <el-button type="primary">+添加</el-button>
      </el-col>
    </el-row>
  </el-card>
  <el-card shadow="never">
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column
        v-for="item in options"
        :key="item.type"
        :prop="item.props"
        :label="item.label"
        :width="item.width"
        :align="item.align"
      >
        <template #default v-if="item.props === 'actions'">
          <el-icon class="icon-edit"><Edit /></el-icon>
          <el-icon class="icon-dele"><Delete /></el-icon>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { Search, Edit, Delete, UserFilled } from '@element-plus/icons-vue'
import { getUserlist } from '../../../api/modules/index.js'
import { options } from './options.js'
import { onMounted, ref } from 'vue'
const queryData = ref({
  keyworld: '',
  page: 1,
  size: 10,
})
const tableData = ref([])

const initData = () => {
  getUserlist(queryData.value).then((res) => {
    console.log(res)
    tableData.value = res.data
  })
}

onMounted(() => {
  initData()
})
</script>

<style lang="scss" scoped>
.henader-card {
  margin-bottom: 20px;
}
.icon-edit {
  font-size: 20px;
  color: #2f60c2;
  margin: 0 10px;
}
.icon-dele {
  font-size: 20px;
  color: #ff5722;
}
</style>
