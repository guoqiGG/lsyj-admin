<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" label-width="100px">
            <el-row>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="团长">
                        <el-select v-model="searchForm.userId" filterable placeholder="请选择团长" style="width: 90%"
                            clearable>
                            <el-option label="管理后台" :value="-1" />
                            <el-option v-for="item in leaderListData" :key="item.puid" :label="item.leaderName"
                                :value="item.puid" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="团长手机">
                        <el-input v-model="searchForm.phone" placeholder="团长手机" clearable />
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
                    <el-button type="primary" @click="getVideoList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </el-card>
    <el-card style="margin-top: 10px;">
        <el-button tag="div" :icon="CirclePlus" type="primary" @click="editOrCreateDialog()">新增</el-button>
        <el-table v-loading="loading" :data="videoListData" style="width: 100%;margin-top:10px;"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="id" label="ID" align="center" />
            <el-table-column prop="total" label="标题" align="center" />
            <el-table-column prop="total" label="封面" align="center">
                <template #default="scope">
                    <el-image style="width: 50px; height: 50px" :src="scope.row.cover" :zoom-rate="1.2" :max-scale="7"
                        :min-scale="0.2" :z-index="8000" :preview-src-list="[scope.row.cover]" :initial-index="0"
                        fit="cover" />
                </template>
            </el-table-column>
            <!-- <el-table-column label="视频链接">
                <template #default="scope">
                    <video controls="controls" :src="scope.row.video" style="width:150px;height:120px;" alt=""></video>
                </template>
            </el-table-column> -->
            <el-table-column label="发布者" align="center">
                <template #default="scope">
                    <div v-if="scope.row.userId == -1" style="display: flex;flex-direction: row;align-items: center;">
                        <el-image style="width: 50px; height: 50px;border-radius: 50%;" src="https://qingchuntai2.oss-cn-beijing.aliyuncs.com/2024/05/22/4c66249f-9e9f-4db4-ad10-772ad605c855spsd-admin-logo.jpg" />
                        <span style="margin-left: 10px;">管理员</span>
                    </div>
                    <div v-else style="display: flex;flex-direction: row;align-items: center;">
                        <el-image style="width: 50px; height: 50px;border-radius: 50%;" :src="scope.row.userAvatar" />
                        <span style="margin-left: 10px;">{{ scope.row.userName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="发布类型" align="center">
                <template #default="scope">
                    <span v-if="scope.row.type == 0">后台</span>
                    <span v-if="scope.row.type == 1">团长</span>
                </template>
            </el-table-column>
            <el-table-column label="点赞人数" align="center">
                <template #default="scope">
                    {{ scope.row.likeSize ? scope.row.likeSize : 0 }}
                </template>
            </el-table-column>
            <el-table-column label="分享人数" align="center">
                <template #default="scope">
                    {{ scope.row.shareSize ? scope.row.shareSize : 0 }}
                </template>
            </el-table-column>
            <el-table-column label="收藏数量" align="center">
                <template #default="scope">
                    {{ scope.row.collectionSize ? scope.row.collectionSize : 0 }}
                </template>
            </el-table-column>
            <el-table-column prop="commentSize" label="评论数量" align="center">
                <template #default="scope">
                    {{ scope.row.commentSize ? scope.row.commentSize : 0 }}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center" />
            <el-table-column prop="updateTime" label="修改时间" align="center" />
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
                    <span class="operation" @click="openPreview(scope)">预览</span>
                    <span class="operation" @click="editOrCreateDialog(scope)" :icon="Edit">编辑</span>
                    <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" cancel-button-type="info"
                        icon-color="#626AEF" title="确定要删除吗?" @confirm="deleteVideoById(scope.row.id, 1)"
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
    <el-dialog v-model="editOrCreateDialogVisible" :title="isCreate ? '新增视频' : '编辑视频'" width="600px"
        :close="clearEditForm">
        <el-form ref="videoFormRef" :rules="rules" :model="videoForm" class="demo-form-inline" label-width="100px">
            <el-form-item label="标题" prop="total">
                <el-input v-model="videoForm.total" placeholder="标题" clearable />
            </el-form-item>
            <el-form-item label="图片" prop="url">
                <el-upload ref="uploadRef" accept="image/*" v-model:file-list="fileList" class="image-uploader"
                    :show-file-list="false" :action="'https://spsd.hnliyue.cn/youth' + '/upload/oss'" :headers="{ Authorization: token }"
                    :on-success="handleSuccess1" :on-error="handleError1" :before-upload="beforeUpload1">
                    <el-image class="avatar" v-if="videoForm.cover" controls="controls"
                        :src="videoForm.cover"></el-image>
                    <el-icon v-else class="image-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="视频" prop="video">
                <el-upload accept="video/*" v-model:file-list="fileList" class="video-uploader" :show-file-list="false"
                    :action="'https://spsd.hnliyue.cn/youth' + '/upload/oss'" :headers="{ Authorization: token }" :on-success="handleSuccess"
                    :on-error="handleError" :before-upload="beforeUpload">
                    <video class="avatar" v-if="videoForm.video" controls="controls" :src="videoForm.video"></video>
                    <el-icon v-else class="video-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item class="footer">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="closeEditOrCreateDialog">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog v-model="previewVisible" :title="'正在预览&nbsp;&nbsp;&nbsp;&nbsp;' + previewData.total" width="80%"
        :close="closePreview">
        <div style="width:80%;height:600px; margin:0 auto;">
            <video style="width: 100%;height:100%;" class="previewVideo" controls="controls"
                :src="previewData.video"></video>
        </div>
    </el-dialog>
</template>
<script setup>
import { onMounted, ref, reactive, watch } from "vue";
import { videoList, deleteVideo, createVideo, leaderList } from "@/api/modules";
import { ElMessage } from "element-plus";
import dayjs from "dayjs"
import {
    CirclePlus
} from '@element-plus/icons-vue'
const BaseUrl = import.meta.env.VITE_API_BASE_URL
const token = localStorage.getItem('token')
const searchParams = {
    userId: null,
    phone: null,
    beginTime: null,
    endTime: null,
    time: null
}
const isCreate = ref(true)
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 20,
})
const total = ref(0)
let videoListData = ref([])
const videoForm = ref({
    id: 0,
    total: null,
    cover: null,
    video: null,
})
const videoFormRef = ref()
const rules = reactive({
    total: [
        { required: true, message: '标题不能为空', trigger: 'blur' },
    ],
    cover: [
        { required: true, message: '请上传视频封面', trigger: 'blur' },
    ],
    video: [
        { required: true, message: '请选择上传视频', trigger: 'blur' },
    ]
})

const editOrCreateDialogVisible = ref(false)

const getVideoList = async () => {
    loading.value = true
    const res = await videoList(Object.assign({ ...searchForm.value, ...pages.value },
        {
            beginTime: searchForm.value.beginTime ? new Date(searchForm.value.beginTime).getTime() : null,
            endTime: searchForm.value.endTime ? new Date(searchForm.value.endTime).getTime() : null
        }
    ))
    loading.value = false
    videoListData.value = res.data.list
    total.value = res.data.total
}
const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getVideoList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getVideoList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getVideoList()
}

const leaderListData = ref([])
// 团长列表
const getLeaderList = async () => {
    const res = await leaderList({ pageNo: 1, pageSize: 100000000 })
    leaderListData.value = res.data.list
}

const deleteVideoById = async (id, isDeleted) => {
    const res = await deleteVideo({ id, isDeleted })
    if (res.code === 0) {
        ElMessage({
            showClose: false,
            message: '删除成功',
            type: 'success',
        })
        getVideoList()
    }
}

const handleSuccess = (response, file, fileList) => {
    videoForm.value.video = response
    ElMessage({
        showClose: false,
        message: '上传成功',
        type: 'success',
    })
}
const handleError = (err, file, fileList) => {
    ElMessage({
        showClose: false,
        message: '上传失败',
        type: 'danger'
    })
}

const beforeUpload = (file) => {
    // 可在这里添加额外的文件校验逻辑
    const isVideo = file.type === 'video/mp4' || file.type === 'video/ogg';
    const isLt500MB = file.size / 1024 / 1024 < 500;
    if (!isVideo) {
        this.$message.error('请上传视频文件!');
    }
    if (!isLt500MB) {
        this.$message.error('上传视频大小不能超过 500MB!');
    }
    return isVideo && isLt500MB;
}

const handleSuccess1 = (response, file, fileList) => {
    videoForm.value.cover = response
    ElMessage({
        showClose: false,
        message: '上传成功',
        type: 'success',
    })
}
const handleError1 = (err, file, fileList) => {
    ElMessage({
        showClose: false,
        message: '上传失败',
        type: 'danger'
    })
}

const beforeUpload1 = (file) => {
    const fileName = file.name;
    const fileType = fileName.substring(fileName.lastIndexOf('.'));
    const isOKType =
        fileType === '.jpg' ||
        fileType === '.png' ||
        fileType === '.jpeg' ||
        fileType === '.bmp' ||
        fileType === '.gif';
    if (!isOKType) {
        this.$message.error('图片格式只能为jpeg/png/jpg/bmp/gif');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!');
    }
    return isLt2M && isOKType;
}

const editOrCreateDialog = (e) => {
    editOrCreateDialogVisible.value = true
    if (e) { //编辑
        isCreate.value = false
        videoForm.value.id = e.row.id
        videoForm.value.total = e.row.total
        videoForm.value.video = e.row.video
        videoForm.value.cover = e.row.cover

    } else { // 新增
        isCreate.value = true
    }
}

const closeEditOrCreateDialog = () => {
    editOrCreateDialogVisible.value = false
    clearEditForm()
}

const save = async () => {
    videoFormRef.value.validate(async (valid) => {
        if (valid) {
            if (isCreate.value) {//新增提交
                const res = await createVideo({ total: videoForm.value.total, video: videoForm.value.video, cover: videoForm.value.cover, userId: -1, type: 0 })
                if (res.code == 0) {
                    closeEditOrCreateDialog()
                    getVideoList()
                }
            } else { // 编辑提交
                const res = await deleteVideo({ id: videoForm.value.id, total: videoForm.value.total, video: videoForm.value.video, cover: videoForm.value.cover, userId: -1, type: 0 })
                if (res.code == 0) {
                    closeEditOrCreateDialog()
                    getVideoList()
                }
            }
        } else {
            return false
        }
    })
}

// 清空表单数据
const clearEditForm = () => {
    videoForm.value = {
        id: 0,
        total: null,
        cover: null,
        video: null,
    }
}

const previewVisible = ref(false)
const previewData = ref({
    video: null,
    total: null
})
const openPreview = (scope) => {
    previewVisible.value = true
    previewData.value.total = scope.row.total
    previewData.value.video = scope.row.video
}
const closePreview = (scope) => {
    previewVisible.value = false
    previewData.value.total = null
    previewData.value.video = null
}


onMounted(() => {
    getVideoList()
    getLeaderList()
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