<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" label-width="80px">
            <el-row>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="用户">
                        <el-select v-model="searchForm.userId" filterable remote reserve-keyword placeholder="用户昵称搜索"
                            remote-show-suffix :remote-method="getUserListByName" clearable>
                            <el-option v-for="item in userListData" :key="item.id" :label="item.name"
                                :value="item.id" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="用户手机">
                        <el-input v-model="searchForm.phone" placeholder="用户手机" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="团长">
                        <el-select v-model="searchForm.pUid" filterable placeholder="请选择团长" style="width: 90%"
                            clearable>
                            <el-option label="管理后台" :value="-1" />
                            <el-option v-for="item in leaderListData" :key="item.puid" :label="item.leaderName"
                                :value="item.puid" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="视频">
                        <el-select v-model="searchForm.videoId" filterable placeholder="请选择视频" style="width: 90%"
                            clearable>
                            <el-option v-for="item in videoListData" :key="item.id" :label="item.total"
                                :value="item.id" />
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
                    <el-button type="primary" @click="getCommentList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </el-card>
    <el-card style="margin-top: 10px;">
        <el-table v-loading="loading" :data="commentListData" style="width: 100%;"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="id" label="ID" align="center" />
            <el-table-column prop="userName" label="用户" align="center" />
            <el-table-column prop="userAvatar" label="头像" align="center">
                <template #default="scope">
                    <el-image style="width: 50px; height: 50px;border-radius: 50%;" :src="scope.row.userAvatar" />
                </template>
            </el-table-column>
            <el-table-column prop="leaderName" label="团长" align="center" />
            <el-table-column prop="leaderMobile" label="团长手机" align="center" />
            <el-table-column prop="videoName" label="相关视频" align="center" />
            <el-table-column prop="comment" label="评论内容" align="center" />
            <el-table-column prop="createTime" label="创建时间" align="center" />
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
                    <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" cancel-button-type="info"
                        icon-color="#626AEF" title="确定要删除吗?" @confirm="deleteVideoCommentById(scope.row.id, 1)"
                        @cancel="cancelEvent">
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
import { onMounted, ref, watch } from "vue";
import { videoComment, deleteVideoComment, leaderList, videoList, userList } from "@/api/modules";
import { ElMessage } from "element-plus";
import dayjs from "dayjs"

const searchParams = {
    videoId: null,
    pUid: null,
    phone: null,
    beginTime: null,
    endTime: null,
    time: null
}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 20,
})
const total = ref(0)
let commentListData = ref([])

const getCommentList = async () => {
    loading.value = true
    const res = await videoComment(Object.assign({ ...searchForm.value, ...pages.value },
        {
            beginTime: searchForm.value.beginTime ? new Date(searchForm.value.beginTime).getTime() : null,
            endTime: searchForm.value.endTime ? new Date(searchForm.value.endTime).getTime() : null
        }
    ))
    loading.value = false
    commentListData.value = res.data.list
    total.value = res.data.total
}

const leaderListData = ref([])
// 团长列表
const getLeaderList = async () => {
    const res = await leaderList({ pageNo: 1, pageSize: 100000000 })
    leaderListData.value = res.data.list
}
// 视频列表
const videoListData = ref([])
const getVideoList = async () => {
    const res = await videoList({ pageNo: 1, pageSize: 100000000 })
    videoListData.value = res.data.list
}

const userListData = ref([])
// 用户列表
const getUserList = async () => {
    const res = await userList({ pageNo: 1, pageSize: 1000 })
    userListData.value = res.data.list
}

const getUserListByName = async (query) => {
    const res = await userList({ name: query, pageNo: 1, pageSize: 1000 })
    userListData.value = res.data.list
}
const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getCommentList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getCommentList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getCommentList()
}

const deleteVideoCommentById = async (id, isDeleted) => {
    const res = await deleteVideoComment({ id, isDeleted })
    if (res.code === 0) {
        ElMessage({
            showClose: false,
            message: '删除成功',
            type: 'success',
        })
        getCommentList()
    }
}

onMounted(() => {
    getCommentList()
    getLeaderList()
    getVideoList()
    getUserList()
})

watch(searchForm.value, (newValue, oldValue) => {
    if (newValue.time && newValue.time[0]) {
        searchForm.value.beginTime = dayjs(newValue.time[0]).format('YYYY-MM-DD HH:mm:ss')
        searchForm.value.endTime = dayjs(newValue.time[1]).format('YYYY-MM-DD HH:mm:ss')
    }
}
    , { deep: true })
</script>

<style scoped>
.video-uploader .avatar,
.image-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.video-uploader .el-upload,
.image-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.video-uploader .el-upload:hover,
.image-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.video-uploader-icon,
.el-icon.image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>

<style scoped>
.pagination {
    margin-top: 20px;
}

.operation {
    color: #4060c7;
    margin: 0px 5px;
    cursor: pointer;
}

.footer {
    padding-left: 80px;
}

:deep(.el-table__cell) {
    position: static !important;
}
</style>