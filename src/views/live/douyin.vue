<template>
    <el-card>
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
const getDouYinLiveList = async () => {
    loading.value = true
    const res = await douYinLiveList({ ...pages.value })
    loading.value = false
    liveListData.value = res.data.list
    pages.value.total = res.data.total
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
