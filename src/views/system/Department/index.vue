<template>
  <el-card shadow="never" class="henader-card">
    <el-row :gutter="12">
      <el-col :span="8">
        <el-input placeholder="请输入搜索内容" v-model="queryData.keyworld">
        </el-input>
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
        show-overflow-tooltip
      >
        <template #default v-if="item.props === 'actions'">
          <el-icon class="icon-edit"><Edit /></el-icon>
          <el-icon class="icon-dele"><Delete /></el-icon>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="2"
      class="mt-4"
    />
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
const total = ref(0)

const initData = () => {
  getUserlist(queryData.value).then((res) => {
    console.log(Math.ceil(res.data.length / 10))
    total.value = Math.ceil(res.data.length / 10)
    if (queryData.value.page == 1) {
      tableData.value = res.data.splice(0, 10)
    }
    // tableData.value = res.data
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
.mt-4 {
  float: right;
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
