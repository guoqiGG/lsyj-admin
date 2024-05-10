<template>
    <el-card>
        <el-button tag="div" :icon="CirclePlus" type="primary" @click="editOrCreateDialog()">新增</el-button>
        <el-table v-loading="loading" :data="carouselListData" style="width: 100%;margin-top:10px;"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="id" label="ID" align="center" />
            <el-table-column label="图片" align="center" width="350">
                <template #default="scope">
                    <el-image v-if="scope.row.type == 0" style="width: 300px;height:100px;border-radius: 10px;"
                        :src="scope.row.url" fit="cover" />
                    <video v-else controls="controls" :src="scope.row.url"
                        style="width: 300px;height:100px;border-radius: 10px;" alt=""></video>

                </template>
            </el-table-column>
            <el-table-column label="类型" align="center">
                <template #default="scope">
                    {{ scope.row.type == 0 ? '图片' : '视频' }}
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
                <template #default="scope">
                    <el-switch v-model="scope.row.state" :active-value="0" :inactive-value="1"
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                        @change="editState(scope)" />
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="250" align="center" />
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
                    <span class="operation" @click="editOrCreateDialog(scope)" :icon="Edit">编辑</span>
                    <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" cancel-button-type="info"
                        icon-color="#626AEF" title="确定要删除吗?" @confirm="deleteCarouselById(scope, 1)"
                        @cancel="cancelEvent">
                        <template #reference>
                            <span class="operation">删除</span>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <el-dialog v-model="editOrCreateDialogVisible" :title="isCreate ? '添加轮播图' : '编辑轮播图'" width="600px"
        @close="closeEditOrCreateDialog">
        <el-form ref="carouselFormRef" :rules="rules" :model="carouselForm" class="demo-form-inline"
            label-width="100px">
            <el-form-item label="类型" prop="type">
                <el-radio-group v-model="carouselForm.type" @change="typeChange" :disabled="isCreate == false">
                    <el-radio border label="0">图片</el-radio>
                    <el-radio border label="1">视频</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="图片" prop="url">
                <el-upload :accept="carouselForm.type == 0 ? 'image/*' : 'video/*'" v-model:file-list="fileList"
                    class="image-uploader" :show-file-list="false" :action="BaseUrl + '/upload/oss'"
                    :headers="{ Authorization: token }" :on-success="handleSuccess" :on-error="handleError"
                    :before-upload="beforeUpload">
                    <div v-if="carouselForm.url">
                        <el-image class="avatar" style="width:350px;" v-if="carouselForm.type == 0" controls="controls"
                            :src="carouselForm.url"></el-image>
                        <video class="avatar" style="width:350px;" v-if="carouselForm.type == 1" controls="controls"
                            :src="carouselForm.url"></video>
                    </div>
                    <el-icon v-else class="image-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="状态" prop="state">
                <el-radio-group v-model="carouselForm.state">
                    <el-radio border :label="0">上架</el-radio>
                    <el-radio border :label="1">下架</el-radio>
                </el-radio-group>
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
import { carouselList, carouselAdd, carouselUpdate } from "@/api/modules";
import { ElMessage } from "element-plus";
import {
    CirclePlus
} from '@element-plus/icons-vue'
const BaseUrl = import.meta.env.VITE_API_BASE_URL
const token = localStorage.getItem('token')

const loading = ref(false)
let carouselListData = ref([])
const carouselForm = ref({
    id: null,
    type: '0',
    url: null,
    state: 0
})
const carouselFormRef = ref()
const rules = reactive({
    url: [
        { required: true, message: '请选择上传图片', trigger: 'blur' },
    ],
    type: [
        { required: true, message: '请选择上传类型', trigger: 'blur' },
    ],
    state: [
        { required: true, message: '请选择状态', trigger: 'blur' },
    ]
})
const isCreate = ref(false)
const editOrCreateDialogVisible = ref(false)

const getCarouselList = async () => {
    loading.value = true
    const res = await carouselList()
    loading.value = false
    carouselListData.value = res.data
}

const deleteCarouselById = async (scope, isDeleted) => {
    const res = await carouselUpdate({ id: scope.row.id, type: scope.row.type, url: scope.row.url, state: scope.row.state, isDeleted })
    if (res.code === 0) {
        ElMessage({
            showClose: false,
            message: '删除成功',
            type: 'success',
        })
        getCarouselList()
    }
}

const handleSuccess = (response, file, fileList) => {
    carouselForm.value.url = response
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
    if (carouselForm.value.type == 0) {
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
    } else {
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

}

const editOrCreateDialog = (e) => {
    editOrCreateDialogVisible.value = true
    if (e) { //编辑
        isCreate.value = false
        carouselForm.value.id = e.row.id
        carouselForm.value.type = e.row.type
        carouselForm.value.url = e.row.url
        carouselForm.value.state = e.row.state
    } else { // 新增
        isCreate.value = true
    }
}

const closeEditOrCreateDialog = () => {
    editOrCreateDialogVisible.value = false
    clearEditForm()
}

const save = async () => {
    carouselFormRef.value.validate(async (valid) => {
        if (valid) {
            if (isCreate.value) {//新增提交
                const res = await carouselAdd({ type: carouselForm.value.type, url: carouselForm.value.url, state: carouselForm.value.state })
                if (res.code == 0) {
                    ElMessage({
                        showClose: false,
                        message: '添加成功',
                        type: 'success',
                    })
                    closeEditOrCreateDialog()
                    getCarouselList()
                }
            } else { // 编辑提交
                const res = await carouselUpdate({ id: carouselForm.value.id, type: carouselForm.value.type, url: carouselForm.value.url, state: carouselForm.value.state })
                if (res.code == 0) {
                    ElMessage({
                        showClose: false,
                        message: '编辑成功',
                        type: 'success',
                    })
                    closeEditOrCreateDialog()
                    getCarouselList()
                }
            }
        } else {
            return false
        }
    })
}

const typeChange = (e) => {
    carouselForm.value.url = null
}

const editState = async (scope) => {
    console.log(scope.row.state)
    const res = await carouselUpdate({ id: scope.row.id, type: scope.row.type, url: scope.row.url, state: scope.row.state })
    if (res.code === 0) {
        ElMessage({
            showClose: false,
            message: scope.row.state == 0 ? '已上架' : '已下架',
            type: 'success',
        })
        getCarouselList()
    }
}

// 清空表单数据
const clearEditForm = () => {
    carouselForm.value = {
        id: null,
        type: '0',
        url: null,
        state: 0
    }
}

onMounted(() => {
    getCarouselList()
})

</script>

<style scoped>
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

<style scoped>
.pagination {
    margin-top: 20px;
}

.operation {
    color: #4060c7;
    margin: 0px 5px;
    cursor: pointer;
}



:deep(.el-popconfirm .el-popconfirm__action span) {
    padding: 5px 10px;
}
</style>