<template>
  <el-card>
    <el-button type="primary" class="mt-4" @click="dialogVisibleHanle"
      >导出表格</el-button
    >
  </el-card>
  <el-card class="mt10">
    <el-table
      :data="tableData"
      :header-cell-style="{ backgroundColor: '#ecf5ff' }"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column
        v-for="item in columnData"
        :key="item.props"
        :prop="item.props"
        :label="item.label"
        :width="item.width"
        :fixed="item.fixed"
        :align="item.align"
        show-overflow-tooltip
      ></el-table-column>
    </el-table>
  </el-card>
</template>
<script setup>
import { nextTick, onMounted, reactive, ref } from 'vue'
import { orderLists } from '../../../api/modules/index.js'
import { options } from './options.js'
const tableData = ref([])

const columnData = ref(JSON.parse(JSON.stringify(options)))
const disabled = ref(false)
const dialogVisible = ref(false)
const total = ref(0)
const queryData = ref({
  keyWord: '',
  page: 1,
  size: 10,
})
const initData = () => {
  orderLists(queryData.value).then((res) => {
    console.log(res.data.data)
    // total.value = res.data.data.total
    tableData.value = res.data.data
  })
}
const handleSizeChange = (val) => {
  console.log(val)
}

const handleCurrentChange = (val) => {
  queryData.value.page = val
  initData(queryData.value)
}
const handleClose = () => {}
const dialogVisibleHanle = () => {
  //   console.log(tableData.value);
}

// https://www.zcool.com.cn/work/ZMzUzMDA0MDQ=.html

onMounted(() => {
  console.log(columnData.value)
  initData()
})
</script>

<style lang="scss" scoped>
.mt-4 {
  float: right;
  text-align: right;
  margin-bottom: 20px;
}

.dragClass {
  background: rgba($color: #41c21a, $alpha: 0.5) !important;
}
// 停靠
.ghostClass {
  background: rgba($color: #6cacf5, $alpha: 0.5) !important;
}
// 选择
.chosenClass:hover > td {
  background: rgba($color: #f56c6c, $alpha: 0.5) !important;
}
</style>
