<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="用户名称">
                        <el-input v-model="searchForm.userName" placeholder="用户名称" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="用户手机号">
                        <el-input v-model="searchForm.userMobile" placeholder="用户手机号" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="团长名称">
                        <el-input v-model="searchForm.leaderName" placeholder="团长名称" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="团长手机号">
                        <el-input v-model="searchForm.leaderMobile" placeholder="团长手机号" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="商品名称">
                        <el-input v-model="searchForm.goodsName" placeholder="商品名称" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="退款状态">
                        <el-select style="width:92%" v-model="searchForm.refundStatus" placeholder="请选择" clearable>
                            <el-option label="申请中" value="1" />
                            <el-option label="已退款" value="2" />
                            <el-option label="已拒绝" value="3" />
                            <el-option label="后台手动退款成功" value="4" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="订单号">
                        <el-input v-model="searchForm.orderNumber" placeholder="订单号" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="订单类型">
                        <el-select style="width:92%" v-model="searchForm.orderType" placeholder="请选择" clearable>
                            <el-option label="配送单" value="1" />
                            <el-option label="自提单" value="2" />
                        </el-select>
                    </el-form-item>
                </el-col>


                <el-form-item>
                    <el-button type="primary" @click="getRefundList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </el-card>
    <el-card style="margin-top: 10px;">
        <el-button type="primary" :icon="CirclePlus" class="add" @click="add()">新增</el-button>
        <el-table v-loading="loading" :data="refundData" style="width: 100%"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
            <el-table-column prop="orderNumber" label="订单号" align="center" />
            <el-table-column prop="orderType" label="订单类型" align="center">
                <template #default="scope">
                    {{ scope.row.orderType == 1 ? '配送单' : scope.row.refundStatus == 2 ? '自提单' : '' }}
                </template>
            </el-table-column>
            <el-table-column prop="userName" label="用户名称" align="center" />
            <el-table-column prop="userMobile" label="用户手机号" align="center" />
            <el-table-column prop="leaderName" label="团长名称" align="center" />
            <el-table-column prop="leaderMobile" label="团长手机号" align="center" />
            <el-table-column prop="refundStatus" label="退款状态" align="center">
                <template #default="scope">
                    {{ scope.row.refundStatus == 1 ? '申请中' : scope.row.refundStatus == 2 ? '已退款' :
            scope.row.refundStatus
                == 3 ? '已拒绝' : scope.row.refundStatus == 4 ? '后台手动退款成功' : '' }}
                </template>
            </el-table-column>
            <el-table-column prop="startDate" label="开始时间" align="center" />
            <el-table-column prop="endDate" label="结束时间" align="center" />
            <el-table-column prop="goodsName" label="商品名称" align="center" />
            <el-table-column prop="remark" label="备注" align="center" />
            <el-table-column prop="refundReason" label="退款原因" align="center" />
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
                    <span class="operation" @click="handleClick(scope.row, 1)">通过</span>
                    <span class="operation" @click="handleClick(scope.row, 2)">拒绝</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                v-model:page-size="pages.pageSize" v-model:current-page="pages.pageNo"
                :page-sizes="[10, 20, 50, 100, 200, 500]" :total="total" @size-change="tableHandleSizeChange"
                @current-change="tableHandleChange" />
        </div>
    </el-card>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import { refundList, refundAudit, } from "../../api/modules";
import {
    CirclePlus
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import dayjs from "dayjs";
const loading = ref(false)
const searchForm = ref({
    userName: null,//用户名称
    userMobile: null,
    leaderName: null,//团长名称
    leaderMobile: null,
    goodsName: null,//商品名称
    refundStatus: null,//退款状态
    orderNumber: null,//订单号
    orderType: null,//订单类型
})
const pages = ref({
    pageNo: 1,
    pageSize: 10,
})
const total = ref(0)
let refundData = ref([])
// 列表数据
const getRefundList = async () => {
    loading.value = true
    const res = await refundList({ ...searchForm.value, ...pages.value })
    loading.value = false
    refundData.value = res.data.list
    total.value = res.data.total
}
// 分页
const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getRefundList()
}
// 重置
const resetForm = () => {
    searchForm.value = {}
    getRefundList()
}
// 通过or拒绝
const handleClick = async (item, type) => {
    let obj = {
        remark: item.remark,
        id: item.id,
        auditStatus: 1,//1:通过 2:拒绝
    }
    if (type === 2) {
        obj.auditStatus = 2
    }
    const res = await refundAudit(obj)
    if (res.code === 0) {
        ElMessage.success('审核成功');
        getRefundList()
    } else {
        ElMessage.error(res.msg);
        return false;
    }
}



onMounted(() => {
    getRefundList()
})


</script>
<style lang="scss" scoped>
.add {
    margin-bottom: 20px;
}

.operation {
    color: #4060c7;
    margin: 0px 5px;
    cursor: pointer;
}

.pagination {
    margin-top: 20px;
}

.footer {
    margin-left: 80px;
}
</style>
