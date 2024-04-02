<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="团长姓名">
                        <el-input v-model="searchForm.leaderName" placeholder="团长姓名" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="团长号码">
                        <el-input v-model="searchForm.leaderMobile" placeholder="团长号码" clearable />
                    </el-form-item>
                </el-col>
                <el-form-item>
                    <el-button type="primary" @click="getLeaderList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>

    </el-card>
    <el-card style="margin-top: 10px;">
        <el-button :icon="Download" style="margin-bottom: 20px" @click="exportExcel">导出</el-button>
        <el-table v-loading="loading" :data="leaderListData" style="width: 100%"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="leaderName" label="团长姓名" align="center" width="80" />
            <el-table-column prop="leaderMobile" label="团长手机" align="center" width="120" />
            <el-table-column prop="leaderStore" label="门店名称" width="220" />
            <el-table-column prop="address" label="门店地址" width="300" />
            <el-table-column prop="commissionRate" label="佣金比例(0-1)" align="center" width="120" />
            <el-table-column prop="countUser" label="用户数" align="center" />
            <el-table-column prop="totalIncome" label="总收益" align="center" />
            <el-table-column prop="balance" label="当前余额" align="center" />
            <el-table-column prop="withrawingAmt" label="正在提余额" align="center" width="100" />
            <el-table-column fixed="right" label="操作" width="120" align="center">
                <template #default="scope">
                    <span class="operation" @click="openUpdateUserInfoDialog(scope)">修改团长信息</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                v-model:page-size="pages.pageSize" v-model:current-page="pages.pageNo"
                :page-sizes="[10, 20, 50, 100, 200, 500]" :total="pages.total" @size-change="tableHandleSizeChange"
                @current-change="tableHandleChange" />
        </div>
    </el-card>

    <el-dialog v-model="editLeaderDialogVisible" title="修改团长信息" width="600px" @close="clearEditForm">
        <el-form :model="leaderForm" class="demo-form-inline" lable-width="100px">
            <el-form-item label="团长姓名">
                <el-input v-model="leaderForm.leaderName" placeholder="团长姓名" clearable />
            </el-form-item>
            <el-form-item label="团长号码">
                <el-input v-model="leaderForm.leaderMobile" placeholder="团长号码" clearable />
            </el-form-item>
            <el-form-item label="门店名称">
                <el-input v-model="leaderForm.leaderStore" placeholder="团长姓名" clearable />
            </el-form-item>
            <el-form-item label="门店地址">
                <el-input v-model="leaderForm.address" placeholder="门店地址" clearable />
            </el-form-item>
            <el-form-item label="佣金比例">
                <el-input-number v-model="leaderForm.commissionRate" min="0" max="1" step="0.1" placeholder="佣金比例"
                    clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="closEditLeaderDialog">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { leaderList, updateLeaderInfo, exportLeader } from "../../api/modules";
import {
    Download
} from '@element-plus/icons-vue'
import dayjs from "dayjs";
const searchParams = {
    leaderName: '',
    leaderMobile: ''
}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 20,
    total: 0
})
let leaderListData = ref([])
const editLeaderDialogVisible = ref(false)
const leaderForm = ref({
    id: 0,
    leaderName: '',
    leaderMobile: '',
    leaderStore: '',
    address: '',
    commissionRate: ''
})

const getLeaderList = async () => {
    loading.value = true
    const res = await leaderList({ ...searchForm.value, ...pages.value })
    loading.value = false
    leaderListData.value = res.data.list
    pages.value.total = res.data.total
}

const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getLeaderList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getLeaderList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getLeaderList()

}

const closEditLeaderDialog = () => {
    editLeaderDialogVisible.value = false
    clearEditForm()
}
const openUpdateUserInfoDialog = (scope) => {
    editLeaderDialogVisible.value = true
    leaderForm.value.id = scope.row.puid
    leaderForm.value.leaderName = scope.row.leaderName
    leaderForm.value.leaderMobile = scope.row.leaderMobile
    leaderForm.value.leaderStore = scope.row.leaderStore
    leaderForm.value.address = scope.row.address
    leaderForm.value.commissionRate = scope.row.commissionRate
}

const save = async () => {
    const res = await updateLeaderInfo({ ...leaderForm.value })
    if (res.code === 0) {
        closEditLeaderDialog()
        getLeaderList()
    }

}

// 清空修改团长信息表单
const clearEditForm = () => {
    leaderForm.value = {
        id: 0,
        leaderName: '',
        leaderMobile: '',
        leaderStore: '',
        address: '',
        commissionRate: ''
    }
}

const exportExcel = async () => {
    loading.value = true
    const res = await exportLeader()
    loading.value = false
    var blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
    const fileName = '团长信息表'
    const elink = document.createElement('a')
    if ('download' in elink) { // 非IE下载
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
    } else { // IE10+下载
        navigator.msSaveBlob(blob, fileName)
    }
}


onMounted(() => {
    getLeaderList()
})
</script>
<style scoped>
.pagination {
    margin-top: 20px;
}

.operation {
    color: #4060c7;
    margin: 0px 5px;
    cursor: pointer;
}
</style>