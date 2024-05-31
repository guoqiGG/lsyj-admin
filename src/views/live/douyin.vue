<template>
    <el-card>
        <el-divider content-position="left"><span style="font-size: 16px;color:#ea3b26;">须知:</span></el-divider>
        <div style="font-size: 12px;color:#ea3b26;">1.今天的直播明天下午7点才显示所消耗流量 </div>
        <div style="margin-top: 5px; font-size: 12px;color:#ea3b26;">2.昨天的直播今天下午7点才显示所消耗流量</div>
    </el-card>
    <el-card style="margin-top: 10px;">
        <div style="font-size: 18px;" v-if="countLiveTraffic">本月总消耗:{{ countLiveTraffic }}(GB) </div>
        <el-table v-loading="loading" :data="liveListData" style="width: 100%;margin-top: 10px;"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="coureId" label="ID" width="100" align="center" />
            <el-table-column prop="coureName" label="名称" width="200" align="center">
                <template #default="scope">
                    <div style="white-space: nowrap;">
                        {{ scope.row.coureName }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="180" align="center">
                <template #default="scope">
                    <div style="white-space: nowrap;">
                        {{ scope.row.startTime }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="直播状态" align="center">
                <template #default="scope">
                    {{ liveStatus[scope.row.status] }}
                </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" align="center">
                <template #default="scope">
                    <el-switch v-model="scope.row.type" :active-value="0" :inactive-value="1" active-text="横屏"
                        inactive-text="竖屏" inline-prompt @change="switchChange(scope.row.coureId)" />
                </template>
            </el-table-column>
            <el-table-column prop="url" label="地址" align="center" />
            <el-table-column prop="liveTraffic" label="消耗流量(GB)" align="center" />
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
import { douYinLiveList, horizontalAndVerticalScreens } from "@/api/modules";
import { ElMessage } from "element-plus";
const liveStatus = ['', '直播中', '预告', '回访', '已结束']

const loading = ref(false)
const pages = ref({
    pageNo: 1,
    pageSize: 10,
    total: 0
})
let liveListData = ref([])
const countLiveTraffic = ref(null)
const getDouYinLiveList = async () => {
    loading.value = true
    const res = await douYinLiveList({ ...pages.value })
    loading.value = false
    liveListData.value = res.data.list
    pages.value.total = res.data.total
    countLiveTraffic.value = res.data.countLiveTraffic
}
const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getDouYinLiveList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getDouYinLiveList()
}

const switchChange = async (coureId) => {
    const res = await horizontalAndVerticalScreens({ dyCourseId: coureId })
    if (res?.code === 0) {
        ElMessage({
            showClose: false,
            message: '修改成功',
            type: 'success',
        })
        getDouYinLiveList()
    }
}

onMounted(() => {
    getDouYinLiveList()
})

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
