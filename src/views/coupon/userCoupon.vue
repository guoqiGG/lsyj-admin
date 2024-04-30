<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="用户昵称">
                        <el-input v-model="searchForm.userName" placeholder="用户昵称" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="用户手机">
                        <el-input v-model="searchForm.tel" placeholder="用户手机" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="优惠券名">
                        <el-input v-model="searchForm.couponName" placeholder="优惠券名" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="订单编号">
                        <el-input v-model="searchForm.orderId" placeholder="订单编号" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="类型">
                        <el-select v-model="searchForm.type" placeholder="请选择" clearable>
                            <el-option label="下单送的优惠券" value="0" />
                            <el-option label="系统补发的优惠券" value="1" />
                            <el-option label="系统延迟发放的优惠券" value="2" />
                            <el-option label="直播领取" value="3" />
                            <el-option label="兑换获得" value="4" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="状态">
                        <el-select v-model="searchForm.status" placeholder="请选择" clearable>
                            <el-option label="未使用" value="0" />
                            <el-option label="已使用" value="1" />
                            <el-option label="已过期" value="2" />
                            <el-option label="已回收" value="3" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-form-item>
                    <el-button type="primary" @click="getUserCouponList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </el-card>
    <el-card style="margin-top: 10px;">
        <el-table v-loading="loading" :data="couponListData" style="width: 100%" class="add_dialog"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="userName" label="用户昵称"></el-table-column>
            <el-table-column prop="userMobile" label="手机号"></el-table-column>
            <el-table-column prop="couponName" label="优惠券名称"></el-table-column>
            <!-- <el-table-column label="优惠券状态">
                <template #default="scope">
                    {{ scope.row.couponStatus == "1" ? "上架" : "下架" }}
                </template>
</el-table-column> -->
            <el-table-column label="获得类型">
                <template #default="scope">
                    {{
            scope.row.type == 0
                ? "下单"
                : scope.row.type == 1
                    ? "后台补发"
                    :scope.row.type ==2? "系统延迟发放": scope.row.type ==3?'直播领取':'兑换获得'
        }}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="获得时间"></el-table-column>
            <el-table-column label="使用状态">
                <template #default="scope">
                    {{
            scope.row.userCouponStatus == 0
                ? "未使用"
                : scope.row.userCouponStatus == 1
                    ? "已使用"
                    : scope.row.userCouponStatus == 2
                        ? "已过期"
                        : "已回收"
        }}
                </template>
            </el-table-column>
            <el-table-column prop="sourceId" label="来源(下单赠送等)"></el-table-column>
            <el-table-column prop="orderId" label="使用后对应的订单号"></el-table-column>
            <el-table-column prop="updateUser" label="删券人"></el-table-column>
            <el-table-column prop="createUser" label="发券人"></el-table-column>

            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
                    <span class="operation" style="cursor: pointer;"
                        v-if="scope.row.orderId && scope.row.userCouponStatus == 1"
                        @click="toOrder(scope.row.orderId, scope.row.userCouponStatus)">使用详情</span>
                    <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" cancel-button-type="info" v-if="scope.row.userCouponStatus === 0"
                        icon-color="#626AEF" title="确定要删除吗?" @confirm="handle_del(scope.row)" @cancel="cancelEvent">
                        <template #reference>
                            <span class="operation">删除</span>
                        </template>
                    </el-popconfirm>

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
import { onMounted, ref, } from "vue";
import { userCouponList, delUserCoupon } from "../../api/modules";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, } from 'element-plus';
const route = useRoute()
const router = useRouter()
const searchParams = {
    tel: null,
    userName: null,
    couponName: null,
    orderId: null, // 订单号查询
    type: null, //0下单送的优惠券 1系统补发的优惠券 2系统延迟发放的优惠券
    status: null,// 0未使用 1已使用 2已过期 3已回收（订单退款成功了，可以使用)
    userId: null
}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 20,
})
const total = ref(0)
let couponListData = ref([])
const getUserCouponList = async () => {
    loading.value = true
    const res = await userCouponList({ ...searchForm.value, ...pages.value })
    loading.value = false
    couponListData.value = res.data.list
    total.value = res.data.total
}
const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getUserCouponList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getUserCouponList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getUserCouponList()
}
const toOrder = (orderId, status) => {
    if (orderId && status == 1) {
        router.push({
            path: '/orderList',
            query: {
                orderId: 'qc240314592980001'
            }
        })
    } else {
        return
    }
}
const handle_del = async (row) => {
    const res = await delUserCoupon({ id: row.id, userId: row.userId, adminId: localStorage.getItem('UserID') })
    if (res.code === 0) {
        ElMessage.success('删除成功');
        getUserCouponList()
    } else {
        ElMessage.error(res.msg);
    }
}
onMounted(() => {
    if (route.query.userId) {
        searchForm.value.userId = route.query.userId
    }
    getUserCouponList()
})
</script>
<style lang="scss" scoped>
.add {
    margin-bottom: 20px;
}

.pagination {
    margin-top: 20px;
}

.operation {
    color: #4060c7;
    margin: 0px 5px;
}

.footer {
    margin-left: 80px;
}

.add_dialog {
    :deep(.el-form-item__label) {
        width: 95px !important;
    }
}
</style>
