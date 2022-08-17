<template>
  <el-card>
    <el-button type="primary" :icon="Search" class="ml20">编辑表格</el-button>
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
        v-for="item in options"
        :key="item.type"
        :prop="item.props"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        show-overflow-tooltip
        :fixed="item.fixed"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt10"
      v-model:currentPage="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]"
      :small="small"
      :disabled="disabled"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>

  <el-dialog
    v-model="dialogVisible"
    :title="`${dialogData.title}用户`"
    :width="dialogWidth"
    :hide-required-asterisk="dialogData.isView"
    draggable
  >
    <el-form
      :model="dialogData.FormData"
      :rules="rules"
      ref="FormRef"
      class="demo-ruleForm"
    >
      <el-form-item
        label="用户名"
        :label-width="formLabelWidth"
        prop="username"
      >
        <el-input v-model="dialogData.FormData.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="dialogData.FormData.email" autocomplete="off" />
      </el-form-item>

      <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
        <el-input v-model="dialogData.FormData.address" type="textarea" />
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth" prop="content">
        <el-input v-model="dialogData.FormData.content" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
const tableData = ref([])

const options = reactive([
  {
    label: '用户名',
    props: 'username',
    width: 'auto',
    align: 'left',
  },
  {
    label: '邮箱',
    props: 'email',
    width: 'auto',
    align: 'left',
  },
  {
    label: '创建时间',
    props: 'date',
    width: 'auto',
    align: 'left',
  },
  {
    label: '地址',
    props: 'address',
    width: 'auto',
    align: 'left',
  },
  {
    label: '备注',
    props: 'content',
    width: 'auto',
    align: 'left',
    show: true,
  },
  {
    label: '操作',
    props: 'actions',
    width: '150',
    align: 'center',
    fixed: 'right',
  },
])
</script>
