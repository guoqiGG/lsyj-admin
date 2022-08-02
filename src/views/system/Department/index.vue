<template>
  <el-card shadow="never" class="henader-card">
    <el-row :gutter="12">
      <el-col :span="8">
        <el-input placeholder="请输入搜索内容" v-model="queryData.keyWord">
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" :icon="Search" @click="initData"
          >搜索</el-button
        >
        <el-button type="primary" @click="dialogVisible = true"
          >+添加</el-button
        >
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
          <el-icon class="icon-dele" @click="deleteItem(item, index)"
            ><Delete
          /></el-icon>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      :page-size="queryData.size"
      layout="prev, pager, next"
      :total="total"
      class="mt-4"
      @current-change="handleCurrentChange"
    />
  </el-card>

  <el-dialog v-model="dialogVisible" title="添加用户" width="50%" draggable>
    <el-form :model="from" :rules="rules" ref="FormRef" class="demo-ruleForm">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="from.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="from.email" autocomplete="off" />
      </el-form-item>

      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-select placeholder="Please select a zone" v-model="from.address">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="from.content" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit()">添加</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { Search, Edit, Delete, UserFilled } from '@element-plus/icons-vue'
import { getUserList } from '../../../api/modules/index.js'
import { options } from './options.js'
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
const queryData = ref({
  keyWord: '',
  page: 1,
  size: 10,
})
const FormRef = ref()
const formLabelWidth = '140px'
const from = reactive({
  name: '',
  email: '',
  address: '',
  content: '',
})

const rules = {
  name: [
    {
      required: true,
      message: '姓名不能为空',
      trigger: 'blur',
    },
  ],
  email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
  content: [
    {
      required: true,
      message: 'Please input activity form',
      trigger: 'blur',
    },
  ],
}
const oldTableData = ref([])
const dialogVisible = ref(false)
const tableData = ref([])
const total = ref(0)

const initData = () => {
  getUserList(queryData.value).then((res) => {
    console.log(res)
    if (res.data.code == 400) {
      return ElMessage({
        message: res.data.data.message,
        type: 'error',
      })
    }
    oldTableData.value = res.data
    total.value = res.data.length
    if (queryData.value.page == 1) {
      tableData.value = res.data.slice(0, 10)
    }
  })
}
const onSubmit = () => {
  // console.log(formEl)
  if (!FormRef.value) return
  FormRef.value.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const handleCurrentChange = (val) => {
  tableData.value = oldTableData.value.slice(val - 1, 10)
}
const deleteItem = (item, index) => {
  tableData.value.splice(index, 1)
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
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
