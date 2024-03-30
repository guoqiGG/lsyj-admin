<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="用户名称">
                        <el-input v-model="searchForm.userName" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="用户手机号">
                        <el-input v-model="searchForm.userMobile" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <!-- <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="用户ID">
                        <el-input v-model="searchForm.userId" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col> -->
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="合成卡名称">
                        <el-input v-model="searchForm.giftRuleName" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="核销状态">
                        <el-select style="width:92%" v-model="searchForm.status" placeholder="请选择" clearable>
                            <el-option label="未核销" value="0" />
                            <el-option label="已核销" value="1" />
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="团长名称">
                        <el-input v-model="searchForm.leaderName" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>

                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="团长手机号">
                        <el-input v-model="searchForm.leaderMobile" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <!-- <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="团长ID">
                        <el-input v-model="searchForm.pUid" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col> -->
                <!-- 合成卡获得开始时间 -->
                <el-col :lg="12" :md="12" :sm="24">
                    <el-form-item label="合成卡获得时间 ">
                        <el-date-picker v-model="searchForm.time1" type="daterange" start-placeholder="开始时间"
                            end-placeholder="结束时间" format="YYYY-MM-DD" date-format="YYYY/MM/DD ddd"
                            time-format="A hh:mm:ss" value-format="YYYY-MM-DD" />
                    </el-form-item>
                </el-col>
                <!--核销时间-->
                <el-col :lg="12" :md="12" :sm="24">
                    <el-form-item label="核销时间 ">
                        <el-date-picker v-model="searchForm.time2" type="datetimerange" start-placeholder="开始时间"
                            end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd"
                            time-format="A hh:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
                    </el-form-item>
                </el-col>

                <el-form-item>
                    <el-button type="primary" @click="getUserCompositeList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>

    </el-card>
    <el-card style="margin-top: 10px;">
        <el-button :icon="Download" style="margin-bottom: 20px" @click="exportExcel">导出</el-button>
        <el-table v-loading="loading" :data="userCompositeData" style="width: 100%"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="name" label="用户名称" align="center" />
            <el-table-column prop="mobile" label="手机号" align="center" />
            <el-table-column prop="userId" label="用户ID" align="center" />
            <el-table-column prop="giftRuleName" label="合成卡名称" align="center" />
            <el-table-column prop="status" label="核销状态" align="center">
                <template #default="scope">
                    {{ scope.row.status == 0 ? '未核销' : scope.row.status == 1 ? '已核销' : scope.row.status == 1 ? '已过期' :
            ''
                    }}
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="核销备注" align="center" />
            <el-table-column prop="leaderName" label="团长名称" align="center" />
            <el-table-column prop="leaderMobile" label="团长手机号" align="center" />
            <el-table-column prop="cancelTime" label="核销时间" align="center" />
            <el-table-column prop="createTime" label="合成时间" align="center" />
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
import { onMounted, ref } from "vue";
import { userCompositeList, exportUserGiftRule } from "../../api/modules";
import {
    Download
} from '@element-plus/icons-vue'
import { useRoute } from "vue-router";
const route = useRoute()
const searchParams = {
    userName: null,//用户名称
    userMobile: null,
    userId: null,
    giftRuleName: null,//合成卡名称
    status: null,//0未核销 1已核销
    leaderName: null,//团长名称
    leaderMobile: null,//团长手机号
    // pUid: null,//团长id
    startDate: null,//合成卡获得开始时间
    endDate: null,//合成卡获得结束时间
    cancelStartDate: null,//核销开始时间
    cancelEndDate: null,//核销结束时间

    time1: [],
    time2: [],
}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 10,
})
const total = ref(0)
let userCompositeData = ref([])

const getUserCompositeList = async () => {
    loading.value = true
    let obj = { ...searchForm.value }
    obj.pageNo = pages.value.pageNo
    obj.pageSize = pages.value.pageSize
    if (searchForm.value.time1) {
        obj.startDate = searchForm.value.time1[0]
        obj.endDate = searchForm.value.time1[1]
        obj.time1 = null
    }
    if (searchForm.value.time2) {
        obj.cancelStartDate = searchForm.value.time2[0]
        obj.cancelEndDate = searchForm.value.time2[1]
        obj.time2 = null
    }
    const res = await userCompositeList(obj)
    loading.value = false
    userCompositeData.value = res.data.list
    total.value = res.data.total
}

const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getUserCompositeList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getUserCompositeList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getUserCompositeList()
}

const exportExcel = async () => {
    loading.value = true
    const res = await exportUserGiftRule({
        userName: searchForm.value.userName,
        userMobile: searchForm.value.userMobile,
        userId: searchForm.value.userId,
        giftRuleName: searchForm.value.giftRuleName,
        status: searchForm.value.status,
        leaderName: searchForm.value.leaderName,
        leaderMobile: searchForm.value.leaderMobile,
        // pUid: searchForm.value.pUid,
        startDate: searchForm.value.startDate,
        endDate: searchForm.value.endDate,
        cancelStartDate: searchForm.value.cancelStartDate,
        cancelEndDate: searchForm.value.cancelEndDate
    })
    console.log(111, res)
    loading.value = false
    var blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
    // 读取文件内容
    // try {
    //     const TEXT = await(new Response(blob)).text()
    //     const result = JSON.parse(TEXT)
    //     console.log(result)
    // } catch (error) {
    //     console.log(error)
    // }
    const fileName = '用户合成卡表'
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
    if (route.query.userId) {
        searchForm.value.userId = route.query.userId
    }
    getUserCompositeList()
})
</script>
<style lang="scss" scoped>
.pagination {
    margin-top: 20px;
}

.operation {
    color: #4060c7;
    margin: 0px 5px;
}
</style>
