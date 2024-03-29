<template>

    <el-card>

        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="直播间状态">
                        <el-select  v-model="searchForm.status" placeholder="请选择" clearable>
                            <el-option label="直播中" value="101" />
                            <el-option label="未开始" value="102" />
                            <el-option label="已结束" value="103" />
                            <el-option label="禁播" value="104" />
                            <el-option label="暂停" value="105" />
                            <el-option label="异常" value="106" />
                            <el-option label="已过期" value="107" />
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-form-item>
                    <el-button type="primary" @click="getLiveList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>

    </el-card>
    <el-card style="margin-top: 10px;">
        <el-table v-loading="loading" :data="liveListData" style="width: 100%" :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="roomId" label="房间号" />
            <el-table-column prop="name" label="直播间标题" />
            <el-table-column prop="anchorName" label="主播" />
            <el-table-column label="直播间状态">
                <template #default="scope">
                    {{ liveStatusCom[scope.row.liveStatus] }}
                </template>
            </el-table-column>
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
import { onMounted, ref, watch, computed } from "vue";
import { liveList } from "@/api/modules";

const liveStatusCom = {
    101: '直播中',
    102: '未开始',
    103: '已结束',
    104: '禁播',
    105: '暂停',
    106: '异常',
    107: '已过期',
}

const searchParams = {
    status: ''
}

const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 20,
    total: 0
})
let liveListData = ref([])
const getLiveList = async () => {
    loading.value = true
    const res = await liveList({ ...searchForm.value, ...pages.value })
    loading.value = false
    liveListData.value = res.data.list
    pages.value.total = res.data.total
}
const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getLiveList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getLiveList()
}
onMounted(() => {
    getLiveList()
})
</script>

<style scoped>
.pagination {
    margin-top: 20px;
}
</style>
