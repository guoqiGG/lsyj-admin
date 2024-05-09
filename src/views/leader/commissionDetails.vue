<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" label-width="100px">
            <el-row>

                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="订单编号">
                        <el-input v-model="searchForm.orderId" placeholder="订单编号" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="用户手机">
                        <el-input v-model="searchForm.userMobile" placeholder="用户手机" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="结算类型">
                        <el-select style="width:92%" v-model="searchForm.type" placeholder="结算类型" clearable>
                            <el-option label="邀请购买" value="1" />
                            <el-option label="团长自购" value="2" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="结算状态">
                        <el-select style="width:92%" v-model="searchForm.status" placeholder="结算状态" clearable>
                            <el-option label="未结算" value="0" />
                            <el-option label="已结算" value="1" />
                            <el-option label="已退回" value="2" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="团长姓名">
                        <el-select v-model="searchForm.puid" filterable placeholder="团长" clearable>
                            <el-option v-for="item in leaderListData" :key="item.id" :label="item.leaderName"
                                :value="item.puid" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :sm="24">
                    <el-form-item label="时  间 ">
                        <el-date-picker v-model="searchForm.time" type="datetimerange" start-placeholder="开始时间"
                            end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                            default-time />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item>
                        <el-button type="primary" @click="getCommissionDetailsList">查询</el-button>
                        <el-button @click="resetForm()">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </el-card>
    <el-card style="margin-top: 10px;">
        <el-table v-loading="loading" :data="commissionDetailsListData" style="width: 100%"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="id" label="ID" align="center" />
            <el-table-column prop="leaderName" label="团长姓名" align="center" />
            <el-table-column prop="orderId" label="订单编号" align="center" />
            <el-table-column prop="remark" label="备注" align="center" />
            <el-table-column prop="settleAmount" label="结算金额" align="center" />
            <el-table-column prop="settleType" label="结算类型" align="center">
                <template #default="scope">
                    {{ scope.row.settleType == 1 ? '邀请购买' : '团长自购' }}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="结算状态" align="center">
                <template #default="scope">
                    {{ scope.row.status == 0 ? '未结算' : scope.row.status == 1 ? '已结算' : '已退回' }}
                </template>
            </el-table-column>
            <el-table-column prop="userName" label="用户昵称" />
            <el-table-column prop="userMobile" label="用户手机" />
            <el-table-column prop="createTime" label="创建时间" />
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
import { onMounted, ref, watch } from "vue";
import { commissionDetailsList, leaderList } from "../../api/modules";
import dayjs from "dayjs";
const searchParams = {
    orderId: null,
    userMobile: null,
    type: null, // 1 邀请购买 2团长自购
    status: null,// 结算状态 0-未结算 1-已结算 2-已退回
    time: null,
    startTime: null,
    endTime: null,
    puid: null
}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 10,
    total: 0
})
let commissionDetailsListData = ref([])


const getCommissionDetailsList = async () => {
    loading.value = true
    console.log(searchForm.value.startTime, searchForm.value.endTime)
    const res = await commissionDetailsList({ ...searchForm.value, ...pages.value })
    loading.value = false
    commissionDetailsListData.value = res.data.list
    pages.value.total = res.data.total
}

const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getCommissionDetailsList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getCommissionDetailsList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getCommissionDetailsList()

}

const leaderListData = ref([])
// 团长列表
const getLeaderList = async () => {
    const res = await leaderList({ pageNo: 1, pageSize: 100000000 })
    leaderListData.value = res.data.list
}

onMounted(() => {
    getCommissionDetailsList()
    getLeaderList()
})

watch(searchForm.value, (newValue, oldValue) => {
    if (newValue.time && newValue.time[0]) {
        searchForm.value.startTime = dayjs(newValue.time[0]).format('YYYY-MM-DD HH:mm:ss')
        searchForm.value.endTime = dayjs(newValue.time[1]).format('YYYY-MM-DD HH:mm:ss')
    }
}
    , { deep: true })
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