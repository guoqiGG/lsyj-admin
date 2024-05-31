<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" label-width="100px">
            <el-row>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="用户手机">
                        <el-input v-model="searchForm.mobile" placeholder="用户手机" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :sm="24">
                    <el-form-item label="时间 ">
                        <el-date-picker v-model="searchForm.time" type="datetimerange" start-placeholder="开始时间"
                            end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                            default-time />
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
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="userName" label="用户昵称"></el-table-column>
            <el-table-column prop="userMobile" label="手机号"></el-table-column>
            <el-table-column prop="couponName" label="优惠券名称"></el-table-column>
            <el-table-column prop="createTime" label="领取时间"></el-table-column>
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
import { onMounted, ref, watch } from "vue";
import dayjs from "dayjs";
import { userReceiveCouponRecord } from "../../api/modules";
const searchParams = {
    mobile: null,
    time: null,
    startDate: null,
    endDate: null
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
    searchForm.value.mobile = searchForm.value.mobile ? searchForm.value.mobile : null
    searchForm.value.startDate = searchForm.value.time ? searchForm.value.time[0] : null
    searchForm.value.endDate = searchForm.value.time ? searchForm.value.time[1] : null
    const res = await userReceiveCouponRecord(Object.assign({ ...searchForm.value, ...pages.value },))
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

onMounted(() => {
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
