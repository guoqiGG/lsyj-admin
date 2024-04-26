<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :lg="8" :md="8" :sm="24">
                    <el-form-item label="时间 ">
                        <el-date-picker v-model="searchForm.time" type="datetimerange" start-placeholder="开始时间"
                            end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                            default-time />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="用户手机">
                        <el-input v-model="searchForm.userMobile" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="12" :sm="12">
                    <el-form-item label="所属团长">
                        <el-select v-model="searchForm.parentUserId" filterable placeholder="请选择所属团长" style="width: 90%"
                            clearable>
                            <el-option v-for="item in options" :key="item.puid" :label="item.leaderName"
                                :value="item.puid" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-form-item>
                    <el-button type="primary" @click="getHuanTuoUserViewTimeList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>

        </el-form>

    </el-card>
    <el-card style="margin-top: 10px;">
        <el-table v-loading="loading" :data="huanTuoUserViewTimeListData" style="width: 100%;margin-top: 10px;"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column  label="日期" align="center">
                <template #default="scope">
                  {{scope.row.createTime.split(' ')[0]}}
                </template>
                </el-table-column>
            <el-table-column prop="userName" label="用户"  align="center" />
            <el-table-column prop="leaderName" label="所属团长"  align="center" />
            <el-table-column prop="puid" label="团长ID"  align="center" />
            <el-table-column prop="durationStr" label="观看时长"  align="center" />
            <el-table-column prop="createTime" label="创建时间"  align="center" />
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
import { huanTuoUserViewTimeList,leaderList } from "@/api/modules";
import dayjs from 'dayjs'
const searchParams = {
    userMobile: null,
    parentUserId: null,
    startTime: null,
    endTime: null,
    time: null
}
const options = ref()
const getLeaderList = async () => {
    const res = await leaderList({
        pageNo: 1,
        pageSize: 100000,
    })
    options.value = res.data.list
}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 20,
    total: 0
})
let huanTuoUserViewTimeListData = ref([])
const getHuanTuoUserViewTimeList = async () => {
    loading.value = true
    const res = await huanTuoUserViewTimeList({ ...searchForm.value, ...pages.value })
    loading.value = false
    huanTuoUserViewTimeListData.value = res.data.list
    pages.value.total = res.data.total
}
const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getHuanTuoUserViewTimeList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getHuanTuoUserViewTimeList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getHuanTuoUserViewTimeList()
}

onMounted(() => {
    getHuanTuoUserViewTimeList()
    getLeaderList()
})

watch(searchForm.value, (newValue, oldValue) => {
    // console.log(newValue, oldValue)
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
</style>
