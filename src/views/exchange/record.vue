<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" label-width="100px">
            <el-row>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="类型">
                        <el-select v-model="searchForm.type" placeholder="类型" style="width: 240px" @change="typeChange">
                            <el-option label="优惠券" :value="0" />
                            <el-option label="礼品卡" :value="1" />
                            <el-option label="红包" :value="2" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12" v-if="searchForm.type == 0 || searchForm.type == 1">
                    <el-form-item :label="searchForm.type == 0 ? '优惠券名称' : '礼品卡名称'">
                        <el-select v-model="searchForm.typeId" filterable style="width: 90%"
                            :placeholder="searchForm.type == 0 ? '请选择优惠券' : '请选择礼品卡'" clearable>
                            <el-option v-for="item in couponOrGiftListData" :key="item.id" :label="item.name"
                                :value="item.id" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="所属团长">
                        <el-select v-model="searchForm.pUid" filterable placeholder="请选择团长" style="width: 90%"
                            clearable>
                            <el-option v-for="item in leaderListData" :key="item.puid" :label="item.leaderName"
                                :value="item.puid" />
                        </el-select>
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
                    <el-button type="primary" @click="getExchangeRecordList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </el-card>

    <el-card style="margin-top: 10px;">
        <el-table v-loading="loading" :data="exchangeRecordListData" style="width: 100%;margin-top:10px;"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column align="center" prop="id" label="ID" />
            <el-table-column align="center" prop="realName" label="用户昵称" />
            <el-table-column align="center" prop="pname" label="团长" />
            <el-table-column align="center" prop="typeName" label="兑换商品名称" />
            <el-table-column align="center" prop="num" label="消耗豆" />
            <el-table-column align="center" prop="type" label="兑换类型">
                <template #default="scope">
                    {{ scope.row.type === 0 ? '优惠券' : scope.row.type === 1 ? '礼品卡' : '红包' }}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="createTime" label="兑换时间" />
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
import { exchangeRecordList, giftList, couponList, leaderList } from "@/api/modules";
import dayjs from "dayjs";
import { useRoute } from "vue-router";
const route = useRoute()
const searchParams = {
    type: null,
    beginTime: null,
    endTime: null,
    time: null,
    typeId: null,
    pUid: null,
    userId: null
}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 20,
})
const total = ref(0)
let exchangeRecordListData = ref([])
const couponOrGiftListData = ref([])
const getExchangeRecordList = async () => {
    loading.value = true
    const res = await exchangeRecordList({ userId: searchForm.value.userId, type: searchForm.value.type, typeId: searchForm.value.typeId, pUid: searchForm.value.pUid, beginTime: searchForm.value.beginTime ? new Date(searchForm.value.beginTime).getTime() : null, endTime: searchForm.value.endTime ? new Date(searchForm.value.endTime).getTime() : null, ...pages.value })
    loading.value = false
    exchangeRecordListData.value = res.data.list
    total.value = res.data.total
}
const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getExchangeRecordList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getExchangeRecordList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getExchangeRecordList()
}

const giftListData = ref([])
const couponListData = ref([])
const leaderListData = ref([])
// 礼品卡列表
const getGiftList = async () => {
    const res = await giftList({ pageNo: 1, pageSize: 100000000 })
    giftListData.value = res.data.list
}
// 优惠券列表
const getCouponList = async () => {
    const res = await couponList({ pageNo: 1, pageSize: 100000000 })
    couponListData.value = res.data.list
}
// 团长列表
const getLeaderList = async () => {
    const res = await leaderList({ pageNo: 1, pageSize: 100000000 })
    leaderListData.value = res.data.list
}

const typeChange = () => {
    if (searchForm.value.type == 0) {
        couponOrGiftListData.value = couponListData.value

    }
    if (searchForm.value.type == 1) {
        couponOrGiftListData.value = giftListData.value
    }
    searchForm.value.typeId = null
}
onMounted(() => {
    if (route.query.userId) {
        searchForm.value.userId = route.query.userId
    }
    getExchangeRecordList()
    getGiftList()
    getCouponList()
    getLeaderList()
})

watch(searchForm.value, (newValue, oldValue) => {
    // console.log(newValue, oldValue)
    if (newValue.time && newValue.time[0]) {
        searchForm.value.beginTime = dayjs(newValue.time[0]).format('YYYY-MM-DD HH:mm:ss')
        searchForm.value.endTime = dayjs(newValue.time[1]).format('YYYY-MM-DD HH:mm:ss')
    }
}
    , { deep: true })

</script>
<style scoped>
.operation {
    color: #4060c7;
    margin: 0px 5px;
    cursor: pointer;
}

.pagination {
    margin-top: 20px;
}

.image-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.image-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.image-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
