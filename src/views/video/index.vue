<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="视频标题">
                        <el-input v-model="searchForm.total" placeholder="视频标题" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="团长姓名">
                        <el-input v-model="searchForm.leaderName" placeholder="团长姓名" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="团长号码">
                        <el-input v-model="searchForm.leaderMobile" placeholder="团长号码" clearable />
                    </el-form-item>
                </el-col>
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
        <el-button type="primary">新增</el-button>
        <el-table v-loading="loading" :data="videoListData" style="width: 100%;margin-top:10px;">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="total" label="视频标题" />
            <el-table-column label="视频">
                <template #default="scope">
                    <video controls="controls" :src="scope.row.video" style="width:150px;height:120px;" alt=""></video>
                </template>
            </el-table-column>

            <el-table-column prop="leaderName" label="团长" />
            <el-table-column prop="leaderMobile" label="手机号" />
            <el-table-column prop="typeStr" label="创建方式" />
            <el-table-column fixed="right" label="操作" width="180">
                <template #default="scope">
                    <el-button class="view" type="info" @click="auditLeader(scope.row.id, 1)">修改</el-button>
                    <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" :icon="InfoFilled"
                        icon-color="#626AEF" title="确定要删除吗?" @confirm="deleteVideoById(scope.row.id, 1)"
                        @cancel="cancelEvent">
                        <template #reference>
                            <el-button class="view" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                v-model:page-size="pages.pageSize" v-model:current-page="pages.current"
                :page-sizes="[10, 20, 50, 100, 200, 500]" :total="total" @size-change="tableHandleSizeChange"
                @current-change="tableHandleChange" />
        </div>
    </el-card>
    <el-dialog v-model="editOrCreateDialogVisible" title="新增视频" width="600px" :close="clearEditForm">
        <el-form :model="videoForm" class="demo-form-inline" lable-width="100px">
            <el-form-item label="视频标题">
                <el-input v-model="videoForm.total" placeholder="视频标题" clearable />
            </el-form-item>
            <el-form-item label="视频内容">
                <div><video src=""></video></div>
                <el-upload :limit="1" accept="video/*"    v-model:file-list="fileList" class="video-uploader"
                    :action="BaseUrl + '/upload/oss'" :headers="{ Authorization: token }" :on-success="handleSuccess"
                    :on-error="handleError" :before-upload="beforeUpload">
                    <el-button type="primary">请选择视频文件</el-button>
                    <template #tip>
                        <div class="el-upload__tip">
                            只能上传一个视频
                        </div>
                    </template>
                </el-upload>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="closEditLeaderDialog">关闭</el-button>
            </el-form-item>

        </el-form>
    </el-dialog>
</template>
<script setup>
import { onMounted, ref, } from "vue";
import { videoList, deleteVideo, upload } from "@/api/modules";

const BaseUrl = import.meta.env.VITE_API_BASE_URL
const token = sessionStorage.getItem('token')
console.log(BaseUrl, token)
const searchParams = {
    total: '',
    leaderName: '',
    leaderMobile: '',
    type: ''
}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 20,
})
const total = ref(0)
let videoListData = ref([])
const videoForm = ref({
    total: '',
    video: '',
})

const editOrCreateDialogVisible = ref(true)

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
    // 成功回调
    console.log('Upload success:', response, file, fileList);
}
const handleError = (err, file, fileList) => {
    // 错误回调
    console.error('Upload error:', err, file, fileList);
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

onMounted(() => {
    getVideoList()
})

</script>

<style lang="scss" scoped>
.video-uploader .el-upload__tip {
    margin-top: 0;
}
</style>