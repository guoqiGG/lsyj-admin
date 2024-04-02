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
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="用户姓名">
                        <el-input v-model="searchForm.userName" placeholder="用户姓名" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="用户号码">
                        <el-input v-model="searchForm.userMobile" placeholder="用户号码" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="门店名称">
                        <el-input v-model="searchForm.remark" placeholder="门店名称" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="审核状态">
                        <el-select style="width:92%" v-model="searchForm.status" placeholder="请选择" clearable>
                            <el-option label="待审核" value="0" />
                            <el-option label="已成功" value="1" />
                            <el-option label="已拒绝" value="2" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="团长类型">
                        <el-select style="width:92%" v-model="searchForm.type" placeholder="请选择" clearable>
                            <el-option label="有店" value="0" />
                            <el-option label="无店" value="1" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-form-item>
                    <el-button type="primary" @click="getApplyLeaderList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>

    </el-card>
    <el-card style="margin-top: 10px;">
        <el-table v-loading="loading" :data="applyLeaderListData" style="width: 100%"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="leaderName" label="团长姓名"  align="center" width="100"/>
            <el-table-column prop="leaderMobile" label="团长手机" align="center" width="120"/>
            <el-table-column prop="remark" label="门店名称"  width="200"/>
            <el-table-column prop="address" label="门店地址"  width="300"/>
            <el-table-column prop="userName" label="用户姓名"  width="200"/>
            <el-table-column prop="userMobile" label="用户手机" align="center" width="120"/>

            <el-table-column label="类型" align="center" width="200">
                <template #default="scope" >
                    <div :class="['info', scope.row.address ? 'blue' : '']" style="margin:0 auto;">{{ scope.row.address ? '有店' : '无店' }}</div>
                </template>
            </el-table-column>

            <el-table-column label="审核状态" align="center">
                <template #default="scope">
                    <el-tag v-if="scope.row.status == 0" type="info">待审核</el-tag>
                    <el-tag v-if="scope.row.status == 1" type="success">审核通过</el-tag>
                    <el-tag v-if="scope.row.status == 2" type="danger">审核拒绝</el-tag>
                </template>
            </el-table-column>


            <el-table-column fixed="right" label="操作" align="center" width="180">
                <template #default="scope">
                    <span v-if="scope.row.status == 0" class="operation" @click="auditLeader(scope.row.id, 1)">同意</span>
                    <span v-if="scope.row.status == 0" class="operation" @click="auditLeader(scope.row.id, 2)">拒绝</span>
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
</template>
<script setup>
import { onMounted, ref } from "vue";
import { applyleaderList, auditApplyleader } from "../../api/modules";
const searchParams = {
    leaderName: '',
    leaderMobile: '',
    userName: '',
    userMobile: '',
    type: '',
    status: '',
    remark: ''
}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 20,
    total: 0
})
let applyLeaderListData = ref([])

const getApplyLeaderList = async () => {
    loading.value = true
    const res = await applyleaderList({ ...searchForm.value, ...pages.value })
    loading.value = false
    applyLeaderListData.value = res.data.list
    pages.value.total = res.data.total
}

const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getApplyLeaderList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getApplyLeaderList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getApplyLeaderList()
}

const auditLeader = async (id, status) => {
    const res = await auditApplyleader({ id, status })
    if (res.code === 0) {
        getApplyLeaderList()
    }
}

onMounted(() => {
    getApplyLeaderList()
})
</script>

<style>
.info {
    display: block;
    width: 40px;
    line-height: 20px;
    margin-top: 10px;
    text-align: center;
    border: 1px solid #F53F3F;
    border-radius: 3px;
    padding: 0 5px;

    &.blue {
        border: 1px solid blue;
    }
}

.pagination {
    margin-top: 20px;
}

.operation {
    color: #4060c7;
    margin: 0px 5px;
    cursor: pointer;
}
</style>