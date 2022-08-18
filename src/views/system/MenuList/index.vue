<template>
  <el-card>
    <el-button type="primary" class="mt-4" @click="dialogVisible = true">编辑表格</el-button>
  </el-card>
  <el-card class="mt10">
    <el-table :data="tableData" :header-cell-style="{ backgroundColor: '#ecf5ff' }" border stripe style="width: 100%">
      <el-table-column
        v-for="item in columnData"
        :key="item.props"
        :prop="item.props"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        show-overflow-tooltip
        :fixed="item.fixed"
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

  <el-dialog v-model="dialogVisible" title="编辑列表" width="80%" :before-close="handleClose">
    <el-table :data="tableDialog" :header-cell-style="{ backgroundColor: '#ecf5ff' }" border stripe style="width: 100%">
      <el-table-column
        v-for="item in DialogColumn"
        :key="item.props"
        :prop="item.props"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        show-overflow-tooltip
        :fixed="item.fixed"
      ></el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { getUserList } from "../../../api/modules/index.js";
import { options } from "./options.js";
const tableData = ref([]);
const tableDialog = ref([]);
const DialogColumn = ref([
  {
    label: "表头",
    props: "username",
    width: "auto",
    align: "left",
  },
  {
    label: "对应列的宽度",
    props: "email",
    width: "auto",
    align: "left",
  },
  {
    label: "对齐方式",
    props: "date",
    width: "auto",
    align: "left",
  },
  {
    label: "是否显示",
    props: "date",
    width: "auto",
    align: "left",
  },
  {
    label: "列是否固定",
    props: "date",
    width: "auto",
    align: "left",
  },
]);

const columnData = ref(JSON.parse(JSON.stringify(options)));
const disabled = ref(false);
const dialogVisible = ref(true);
const total = ref("");
const queryData = ref({
  keyWord: "",
  page: 1,
  size: 10,
});
const initData = () => {
  getUserList(queryData.value).then((res) => {
    total.value = res.data.data.total;
    tableData.value = res.data.data.userList;
  });
};
const handleSizeChange = (val) => {
  console.log(val);
};

const handleCurrentChange = (val) => {
  queryData.value.page = val;
  initData(queryData.value);
};

onMounted(() => {
  console.log(columnData.value);
  initData();
});
</script>

<style lang="scss" scoped>
.mt-4 {
  float: right;
  text-align: right;
  margin-bottom: 20px;
}
</style>
