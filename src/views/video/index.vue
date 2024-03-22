<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="视频标题">
                        <el-input v-model="searchForm.total" placeholder="视频标题" clearable />
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="6">
                    <el-form-item label="团长姓名">
                        <el-input v-model="searchForm.leaderName" placeholder="团长姓名" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="团长号码">
                        <el-input v-model="searchForm.leaderMobile" placeholder="团长号码" clearable />
                    </el-form-item>
                </el-col> -->
                <el-col :span="6">
                    <el-form-item label="创建方式">
                        <el-select style="width:92%" v-model="searchForm.type" placeholder="请选择" clearable>
                            <el-option label="后台" value="0" />
                            <el-option label="团长" value="1" />
                        </el-select>
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
        <el-table v-loading="loading" :data="videoListData" style="width: 100%;margin-top:10px;">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="total" label="视频标题" />
            <el-table-column label="视频">
                <template #default="scope">
                    <video controls="controls" :src="scope.row.video" style="width:150px;height:120px;" alt=""></video>
                </template>
            </el-table-column>

            <!-- <el-table-column prop="leaderName" label="团长" />
            <el-table-column prop="leaderMobile" label="手机号" /> -->
            <el-table-column prop="typeStr" label="创建方式" />
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
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
        <el-form ref="videoFormRef" :rules="rules" :model="videoForm" class="demo-form-inline" lable-width="100px">
            <el-form-item label="视频标题" prop="total">
                <el-input v-model="videoForm.total" placeholder="视频标题" clearable />
            </el-form-item>
            <el-form-item label="视频内容" prop="video">
                <el-upload :limit="1" accept="video/*" v-model:file-list="fileList" class="video-uploader"
                    :show-file-list="false" :action="BaseUrl + '/upload/oss'" :headers="{ Authorization: token }"
                    :on-success="handleSuccess" :on-error="handleError" :before-upload="beforeUpload">
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
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import { videoList, deleteVideo, createVideo } from "@/api/modules";
import { ElMessage } from "element-plus";
import {
    CirclePlus
} from '@element-plus/icons-vue'
const BaseUrl = import.meta.env.VITE_API_BASE_URL
const token = sessionStorage.getItem('token')
const searchParams = {
    total: '',
    leaderName: '',
    leaderMobile: '',
    type: ''
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
    total: '',
    video: '',
})
const videoFormRef = ref()
const rules = reactive({
    total: [
        { required: true, message: '视频标题不能为空', trigger: 'blur' },
    ],
    video: [
        { required: true, message: '请选择上传视频', trigger: 'blur' },
    ]
})

const editOrCreateDialogVisible = ref(false)

const getVideoList = async () => {
    loading.value = true
    const res = await videoList({ ...searchForm.value, ...pages.value })
    loading.value = false
    videoListData.value = res.data.list
    total.value = res.data.total
}
const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getVideoList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
}

const deleteVideoById = async (id, isDeleted) => {
    const res = await deleteVideo({ id, isDeleted })
    console.log(res)
    if (res.code === 0) {
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

const editOrCreateDialog = (e) => {
    editOrCreateDialogVisible.value = true
    if (e) { //编辑
        console.log(e)
        isCreate.value = false
        videoForm.value.id = e.row.id
        videoForm.value.total = e.row.total
        videoForm.value.video = e.row.video
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
                const res = await createVideo({ total: videoForm.value.total, video: videoForm.value.video })
                if (res.code == 0) {
                    closeEditOrCreateDialog()
                    getVideoList()
                }
            } else { // 编辑提交
                const res = await deleteVideo({ id: videoForm.value.id, total: videoForm.value.total, video: videoForm.value.video })
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
        total: '',
        video: ''
    }
}



onMounted(() => {
    getVideoList()
})

</script>

<style scoped>
.video-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.video-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.video-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.video-uploader-icon {
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
</style>