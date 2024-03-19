<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="礼品卡名">
                        <el-input v-model="searchForm.name" placeholder="礼品卡名" clearable />
                    </el-form-item>
                </el-col>
                <el-form-item>
                    <el-button type="primary" @click="getUserList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>

    </el-card>
    <el-card style="margin-top: 10px;">
        <el-button type="primary" :icon="CirclePlus" class="add" @click="add()">新增</el-button>
        <el-table v-loading="loading" :data="giftListData" style="width: 100%"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
            <el-table-column prop="name" label="礼品卡名" align="center" />
            <el-table-column prop="number" label="限制数量" align="center" />
            <el-table-column prop="total" label="礼品卡总数" align="center" />
            <el-table-column prop="startDate" label="开始时间" align="center" />
            <el-table-column prop="endDate" label="结束时间" align="center" />
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default>
                    <span class="operation" @click="editor">修改</span>
                    <span class="operation" @click="del">删除</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                v-model:page-size="pages.pageSize" v-model:current-page="pages.current"
                :page-sizes="[10, 20, 50, 100, 200, 500]" :total="total" @size-change="tableHandleSizeChange"
                @current-change="tableHandleChange" />
        </div>
    </el-card>
    <!-- 新增 -->
    <el-dialog v-model="editOrCreateDialogVisible" title="新增礼品卡" width="600px" :close="clearEditForm">
        <el-form :model="form" class="demo-form-inline" lable-width="100px">
            <el-form-item label="礼品卡名">
                <el-input v-model="form.name" placeholder="礼品卡名" clearable />
            </el-form-item>
            <el-form-item label="限制数量">
                <el-input type="number" v-model="form.number" placeholder="限制数量" clearable />
            </el-form-item>
            <el-form-item label="卡总数量">
                <el-input type="number" v-model="form.total" placeholder="卡总数量" clearable />
            </el-form-item>
            <el-form-item label="生效时间">
                <el-date-picker v-model="time" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间"
                    format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd" time-format="A hh:mm:ss"
                    value-format="YYYY-MM-DD h:m:s" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="closEditLeaderDialog">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { giftList, giftAdd } from "../../api/modules";
import {
    CirclePlus
} from '@element-plus/icons-vue'
import dayjs from "dayjs";

const searchParams = {
    name: null,//名称
}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 10,
})
const total = ref(0)
let giftListData = ref([])

const getUserList = async () => {
    loading.value = true
    const res = await giftList({ ...searchForm.value, ...pages.value })
    loading.value = false
    giftListData.value = res.data.list
    total.value = res.data.total
}

const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getUserList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getUserList()
}
const editOrCreateDialogVisible = ref(false)
const form = ref({
    name: '',
    number: '',
    // startDate: '',
    // endDate: '',
    total: '',
})
const time = ref('')
// 新增弹框
const add = () => {
    editOrCreateDialogVisible.value = true
}
// 修改
const editor = () => {
    editOrCreateDialogVisible.value = true
}
// 删除
const del = () => {
    console.log('删除')
}

// 新增弹框-保存按钮
const closEditLeaderDialog = () => {
    editOrCreateDialogVisible.value = false
}
// 新增弹框-保存按钮
const save =async () => {
    editOrCreateDialogVisible.value = false
    if (time.value.length > 0) {
        form.value.startDate = time.value[0]
        form.value.endDate = time.value[1]
    }
    const res = await giftAdd(JSON.stringify(form.value))
    console.log(res,'res=====新增弹框=====>')

}



onMounted(() => {
    getUserList()
})
</script>
<style lang="scss" scoped>
.add {
    margin-bottom: 20px;
}

.operation {
    color: #4060c7;
    margin: 0px 5px;
}

.pagination {
    margin-top: 20px;
}
</style>
