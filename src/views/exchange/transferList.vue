<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" label-width="80px">
            <el-row>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="用户">
                        <el-select v-model="searchForm.userId" filterable remote reserve-keyword placeholder="用户手机搜索"
                            remote-show-suffix :remote-method="getUserListByMobile" clearable>
                            <el-option v-for="item in userListData" :key="item.id"
                                :label="item.name + '-' + item.mobile" :value="item.id" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="团长">
                        <el-select v-model="searchForm.pUid" filterable placeholder="请选择团长" style="width: 90%"
                            clearable>
                            <el-option v-for="item in leaderListData" :key="item.puid" :label="item.leaderName"
                                :value="item.puid" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="发放类型">
                        <el-select v-model="searchForm.type" filterable placeholder="发放类型" style="width: 90%" clearable>
                            <el-option label="观看直播" :value="0" />
                            <el-option label="红包兑换" :value="1" />
                            <el-option label="手动补发" :value="2" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="类型名称">
                        <el-input v-model="searchForm.typeName" placeholder="类型名称" clearable />
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
                    <el-button type="primary" @click="getTransferList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </el-card>
    <el-card style="margin-top: 10px;">
        <el-table v-loading="loading" :data="transferListData" style="width: 100%;margin-top:10px;"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column align="center" prop="id" label="ID" />
            <el-table-column align="center" prop="realName" label="用户昵称" />
            <el-table-column align="center" label="用户头像">
                <template #default="scope">
                    <img style="width: 40px;height: 40px;border-radius:50%;" :src="scope.row.avatar" alt="">
                </template>
            </el-table-column>
            <el-table-column align="center" prop="price" label="红包金额" />
            <el-table-column align="center" prop="pname" label="团长名称" />
            <el-table-column align="center" label="类型">
                <template #default="scope">
                    <span v-if="scope.row.type == 0">观看直播</span>
                    <span v-if="scope.row.type == 1">红包兑换</span>
                    <span v-if="scope.row.type == 2">手动补发</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="typeName" label="类型名称" />
            <!-- <el-table-column align="center" prop="outBatchNo" label="商家批次单号" />
            <el-table-column align="center" prop="batchName" label="批次名称" />
            <el-table-column align="center" prop="batchRemark" label="批次备注" />
            <el-table-column align="center" prop="outDetailNo" label="商家明细单号" />
            <el-table-column align="center" prop="transferRemark" label="转账备注" />
            <el-table-column align="center" prop="transferSceneId" label="转账场景ID" />
            <el-table-column align="center" prop="batchId" label="微信批次单号" />
            <el-table-column align="center" prop="batchTime" label="微信批次创建时间" />
            <el-table-column align="center" prop="batchStatus" label="微信批次状态" /> -->
            <el-table-column align="center" prop="state" label="状态">
                <template #default="scope">
                    {{ scope.row.state == 'ACCEPTED' ? '已受理' : scope.row.state == 'INIT' ? '初始态' : scope.row.state ==
            'WAIT_PAY' ? '待确认' : scope.row.state == 'PROCESSING' ? '转帐中' : scope.row.state == 'SUCCESS' ?
                '成功' : scope.row.state == 'FINISHED' ? '已完成' : scope.row.state == 'CLOSED' ? '已关闭' : '失败' }}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="createTime" label="创建时间" />
            <el-table-column align="center" prop="updateTime" label="更新时间" />
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
                    <span class="operation" @click="checkLastStatusOfTransfer(scope.row.id)">查询最新状态</span>
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
import { onMounted, ref, watch } from "vue";
import { transferList, userList, leaderList, transferNewStatusById } from "@/api/modules";
import { ElMessage } from 'element-plus';
import dayjs from "dayjs";
import { useRoute } from "vue-router";
const route = useRoute()
const searchParams = {
    userId: null,
    pUid: null,
    type: null,
    typeName: null,
    time: null,
    beginTime: null,
    endTime: null,
}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 20,
})
const total = ref(0)
let transferListData = ref([])
const getTransferList = async () => {
    loading.value = true
    const res = await transferList(Object.assign({
        ...searchForm.value,
        beginTime: searchForm.value.beginTime ? new Date(searchForm.value.beginTime).getTime() : null,
        endTime: searchForm.value.endTime ? new Date(searchForm.value.endTime).getTime() : null,
        ...pages.value
    }, {}))
    loading.value = false
    transferListData.value = res.data.list
    total.value = res.data.total
}

const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getTransferList()
}

const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getTransferList()
}

const resetForm = () => {
    searchForm.value = { ...searchParams }
    getTransferList()
}

const leaderListData = ref([])

// 团长列表
const getLeaderList = async () => {
    const res = await leaderList({ pageNo: 1, pageSize: 100000000 })
    leaderListData.value = res.data.list
}

const userListData = ref([])

// 用户列表
const getUserList = async () => {
    const res = await userList({ pageNo: 1, pageSize: 1000 })
    userListData.value = res.data.list
}

const getUserListByMobile = async (query) => {
    const res = await userList({ mobile: query, pageNo: 1, pageSize: 1000 })
    userListData.value = res.data.list
}

const checkLastStatusOfTransfer = async (id) => {
    const res = await transferNewStatusById({ id })
    console.log(res)
    if (res?.code == 0) {
        ElMessage.success(
            '最新状态是:' + (res.data.state == 'ACCEPTED' ? '已受理' : res.data.state == 'INIT' ? '初始态' : res.data.state ==
                'WAIT_PAY' ? '待确认' : res.data.state == 'PROCESSING' ? '转帐中' : res.data.state == 'SUCCESS' ?
                    '成功' : res.data.state == 'FINISHED' ? '已完成' : res.data.state == 'CLOSED' ? '已关闭' : '失败')
        )
        getTransferList()
    } else {
        getTransferList()
    }
}

onMounted(() => {
    if (route.query.userId) {
        searchForm.value.userId = route.query.userId
    }
    getTransferList()
    getLeaderList()
    getUserList()
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
