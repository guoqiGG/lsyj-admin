<template>

    <el-card>

        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="优惠券名">
                        <el-input v-model="searchForm.name" placeholder="优惠券名" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="优惠券状态">
                        <el-input v-model="searchForm.status" placeholder="优惠券状态" clearable />
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
        <el-table v-loading="loading" :data="couponListData" style="width: 100%">
            <el-table-column prop="name" label="优惠券名" />
            <el-table-column prop="status" label="状态">
                <template #default="scope">
                    {{ scope.row.status == 1 ? '上架' :scope.row.status == 1 ?'下架': '' }}
                </template>
            </el-table-column>
            <el-table-column prop="deadlineType" label="生效类型">
                <template #default="scope">
                    <!-- {{ scope.row.status == 1 ? '领取后' :scope.row.status == 1 ?'固定时间': '' }} -->
                    {{ scope.row.status == 1 ? scope.row.deadlineDay+'天' :scope.row.status == 1 ?scope.row.deadlineTime: '' }}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="开始时间" />
            <el-table-column prop="updateTime" label="更新时间"/>
            <el-table-column prop="amount" label="优惠券金额" />
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                v-model:page-size="pages.pageSize" v-model:current-page="pages.current"
                :page-sizes="[10, 20, 50, 100, 200, 500]" :total="pages.total" @size-change="tableHandleSizeChange"
                @current-change="tableHandleChange" />
        </div>
    </el-card>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { couponList } from "../../api/modules";
import dayjs from "dayjs";
const searchParams = {
    name: '',//优惠券名称
    status: 1,//优惠券状态--status	状态 1上架 2下架
    // memberType: '',
    // leaderName: '',
    // leaderMobile: '',
}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 10,
    total: 0
})
let couponListData = ref([])

const getUserList = async () => {
    loading.value = true
    const res = await couponList({ ...searchForm.value, ...pages.value })
    console.log(res,"res==============>")
    loading.value = false
    couponListData.value = res.data.list
    pages.value.total = res.data.total
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
}

onMounted(() => {
    getUserList()
})
</script>
