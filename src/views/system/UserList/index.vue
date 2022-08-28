<template>
  <el-card>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="机构名">
        <el-input v-model="formInline.user" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item label="选择">
        <el-select v-model="formInline.region" placeholder="Activity zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">重置</el-button>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button text bg class="btn-color"
          >更多 <el-icon class="el-icon--right"><ArrowDownBold /></el-icon
        ></el-button>
      </el-form-item>
    </el-form>
    <!-- <el-button type="primary" @click="dialogVisibleHanle">滑动加载</el-button> -->
    <!-- <el-button type="primary" @click="dialogVisibleHanle">分页加载</el-button> -->
    <!-- <el-button type="primary" @click="educeExcel">导出表格</el-button> -->
  </el-card>
  <!-- <el-row :gutter="20">
    <el-col :span="16"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
  </el-row> -->
  <el-card class="mt10">
    <el-table
      :data="tableData"
      :header-cell-style="{ backgroundColor: '#ecf5ff' }"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template #default="props">
          <div class="m10">
            <div class="expand-title">机构信息</div>
            <el-table
              :header-cell-style="{ backgroundColor: '#FAFAFA' }"
              :data="props.row.ItemData"
              border
              style="border-bottom: none"
            >
              <el-table-column
                v-for="ctx in ItemData"
                :key="ctx.props"
                :sortable="ctx.sortable"
                :prop="ctx.props"
                :label="ctx.label"
                :width="ctx.width"
                :fixed="ctx.fixed"
                :align="ctx.align"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-for="item in columnData"
        :key="item.props"
        :sortable="item.sortable"
        :prop="item.props"
        :label="item.label"
        :width="item.width"
        :fixed="item.fixed"
        :align="item.align"
        show-overflow-tooltip
      >
        <template v-slot:default="scope" v-if="item.props !== 'actions'">
          <el-input
            v-model="scope.row[item.props]"
            v-if="scope.row.itemEdit"
          ></el-input>
          <div v-else class="one-cut-txt">{{ scope.row[item.props] }}</div>
        </template>
        <template v-slot:default="scope" v-if="item.props === 'actions'">
          <el-icon class="icon-edit" @click="itemEditHanld(scope.row)"
            ><Finished v-if="scope.row.itemEdit" /><Edit v-else
          /></el-icon>
          <el-popconfirm
            confirm-button-text="确认"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="确认删除该数据?"
            @confirm="DeleteItem(index)"
          >
            <template #reference>
              <el-icon class="icon-dele"><Delete /></el-icon>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="50"
      class="mt-4 mt10"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>
<script setup>
import * as XLSX from 'xlsx'
import {
  Edit,
  Delete,
  InfoFilled,
  View,
  ArrowDownBold,
  Plus,
} from '@element-plus/icons-vue'
import { nextTick, onMounted, reactive, ref } from 'vue'
import { orderLists } from '../../../api/modules/index.js'
import { options, ItemData } from './options.js'
const tableData = ref([])
const tabclickIndex = ref()

const columnData = ref(JSON.parse(JSON.stringify(options)))
const disabled = ref(false)
const dialogVisible = ref(false)
const total = ref(0)
const formInline = ref({})
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
const itemEditHanld = (item) => {
  item.itemEdit = !item.itemEdit
  // // console.log(JSON.stringify(item));
  // tabclickIndex.value = item;
}
const handleSizeChange = (val) => {
  console.log(val)
}
const handleSelectionChange = (val) => {}
const handleCurrentChange = (val) => {
  queryData.value.size = 10
  queryData.value.page = val
  initData(queryData.value)
}
const handleClose = () => {}
const dialogVisibleHanle = () => {
  console.log('滑动加载')
}
const educeExcel = () => {
  console.log('导出表格')
  const data = XLSX.utils.json_to_sheet(tableData.value) //此处tableData.value为表格的数据
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, data, 'test-data') //test-data为自定义的sheet表名
  XLSX.writeFile(wb, '测试.xlsx') //test.xlsx为自定义的文件名
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
.demo-form-inline {
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

.icon-view {
  font-size: 20px;
  color: #673ab7;
  margin: 0 10px;
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
.btn-color {
  background: #fff;
  color: #4c60cc;
}
.expand-title {
  padding: 10px;
  color: #919399;
  font-weight: 600;
}
</style>
