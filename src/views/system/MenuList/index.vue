<template>
  <el-card>
    <el-button type="primary" class="mt-4" @click="dialogVisibleHanle"
      >编辑表格</el-button
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
        v-show="item.show"
        :fixed="item.fixed"
        :align="item.align"
      ></el-table-column>
    </el-table>
    <el-pagination
      class="mt10 mt-4"
      v-model:currentPage="queryData.page"
      v-model:page-size="queryData.size"
      :page-sizes="[10]"
      :small="small"
      :disabled="disabled"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>

  <el-dialog
    v-model="dialogVisible"
    title="编辑列表"
    width="80%"
    :before-close="handleClose"
  >
    <el-table
      :data="tableDialog"
      :header-cell-style="{ backgroundColor: '#ecf5ff' }"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column
        v-for="item in DialogColumn"
        :key="item.props"
        :prop="item.props"
        :label="item.label"
      >
        <template v-slot:default="scope" v-if="item.props === 'label'">
          <el-input v-model.trim="scope.row.label"></el-input>
        </template>
        <template v-slot:default="scope" v-if="item.props === 'width'">
          <el-input v-model.trim="scope.row.width"></el-input>
        </template>
        <template v-slot:default="scope" v-if="item.props === 'align'">
          <el-select
            v-model="scope.row[scope.column.property]"
            placeholder="Select"
          >
            <el-option
              v-for="i in optionsType"
              :key="i.value"
              :label="i.label"
              :value="i.value"
            />
          </el-select>
        </template>
        <template v-slot:default="scope" v-if="item.props === 'show'">
          <el-switch v-model="scope.row.show" />
        </template>
        <template v-slot:default="scope" v-if="item.props === 'fiexd'">
          <el-select v-model="scope.row.fixed" placeholder="Select">
            <el-option
              v-for="i in fiexdType"
              :key="i.value"
              :label="i.label"
              :value="i.value"
            />
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import { getUserList } from '../../../api/modules/index.js'
import { options } from './options.js'
const tableData = ref([])
const tableDialog = ref([])
const optionsType = ref([
  { value: 'left', label: '右对齐' },
  { value: 'right', label: '左对齐' },
  { value: 'center', label: '居中' },
])
const fiexdType = ref([
  { value: true, label: '是' },
  { value: false, label: '否' },
])
const DialogColumn = ref([
  {
    label: '表头',
    props: 'label',
  },
  {
    label: '对应列的宽度',
    props: 'width',
  },
  {
    label: '对齐方式',
    props: 'align',
  },
  {
    label: '是否显示',
    props: 'show',
  },
  {
    label: '列是否固定',
    props: 'fiexd',
  },
])

const columnData = ref(JSON.parse(JSON.stringify(options)))
const disabled = ref(false)
const dialogVisible = ref(false)
const total = ref('')
const queryData = ref({
  keyWord: '',
  page: 1,
  size: 10,
})
const initData = () => {
  getUserList(queryData.value).then((res) => {
    total.value = res.data.data.total
    tableData.value = res.data.data.userList
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
  console.log(tableData.value)
  console.log(columnData)
  tableDialog.value = columnData.value
  console.log(tableDialog.value)
  dialogVisible.value = true
}

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
</style>
