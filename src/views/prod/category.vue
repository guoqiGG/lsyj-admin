<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="分类名称">
                        <el-input v-model="searchForm.name" placeholder="分类名称" clearable />
                    </el-form-item>
                </el-col>
                <el-form-item>
                    <el-button type="primary" @click="getProdCategoryList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </el-card>

    <el-card style="margin-top: 10px;">
        <el-button tag="div" :icon="CirclePlus" type="primary" @click="editOrCreateDialog()">新增</el-button>
        <el-table v-loading="loading" :data="prodCategoryListData" style="width: 100%;margin-top:10px;">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="name" label="名称" align="center" />
            <el-table-column label="图片" align="center">
                <template #default="scope">
                    <el-image :src="scope.row.url" fit="cover" />
                </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" align="center" />
            <el-table-column prop="createTime" label="创建时间" />
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
    <el-dialog v-model="editOrCreateDialogVisible" :title="isCreate ? '新增商品分类' : '编辑商品分类'" width="600px"
        @close="clearEditForm">
        <el-form ref="categoryFormRef" :rules="rules" :model="categoryForm" class="demo-form-inline"
            lable-width="100px">
            <el-form-item label="标题" prop="name">
                <el-input v-model="categoryForm.name" placeholder="标题" clearable />
            </el-form-item>
            <el-form-item label="图片" prop="url">
                <el-upload :limit="1" accept="image/*" v-model:file-list="fileList" class="image-uploader"
                    :show-file-list="false" :action="BaseUrl + '/upload/oss'" :headers="{ Authorization: token }"
                    :on-success="handleSuccess" :on-error="handleError" :before-upload="beforeUpload">
                    <el-image class="avatar" v-if="categoryForm.url" controls="controls"
                        :src="categoryForm.url"></el-image>
                    <el-icon v-else class="image-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input-number controls-position="right" v-model="categoryForm.sort" placeholder="排序" clearable />
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
import { prodCategoryList, deleteProdCategory, prodCategoryAdd } from "@/api/modules";
import { ElMessage } from "element-plus";
import {
    CirclePlus
} from '@element-plus/icons-vue'
const BaseUrl = import.meta.env.VITE_API_BASE_URL
const token = sessionStorage.getItem('token')
const searchParams = {
    name: ''
}
const isCreate = ref(true)
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 20,
})
const total = ref(0)
let prodCategoryListData = ref([])
const categoryForm = ref({
    id: 0,
    name: '',
    url: '',
    sort: 50,
})
const categoryFormRef = ref()
const rules = reactive({
    name: [
        { required: true, message: '分类名称不能为空', trigger: 'blur' },
    ],
    url: [
        { required: true, message: '请选择上传图片', trigger: 'blur' },
    ],
    sort: [
        { required: true, message: '请输入排序', trigger: 'blur' },
    ]
})

const editOrCreateDialogVisible = ref(false)

const getProdCategoryList = async () => {
    loading.value = true
    const res = await prodCategoryList({ ...searchForm.value, ...pages.value })
    loading.value = false
    prodCategoryListData.value = res.data.list
    total.value = res.data.total
}
const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getProdCategoryList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
}

const deleteVideoById = async (id, isDeleted) => {
    const res = await deleteProdCategory({ id, isDeleted })
    console.log(res)
    if (res.code === 0) {
        getProdCategoryList()
    }
}

const handleSuccess = (response, file, fileList) => {
    categoryForm.value.url = response
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
        console.log(e)
        isCreate.value = false
        categoryForm.value.id = e.row.id
        categoryForm.value.name = e.row.name
        categoryForm.value.url = e.row.url
        categoryForm.value.sort = e.row.sort
    } else { // 新增
        isCreate.value = true
    }
}

const closeEditOrCreateDialog = () => {
    editOrCreateDialogVisible.value = false
    clearEditForm()
}

const save = async () => {
    categoryFormRef.value.validate(async (valid) => {
        if (valid) {
            if (isCreate.value) {//新增提交
                const res = await prodCategoryAdd({ name: categoryForm.value.name, url: categoryForm.value.url, sort: categoryForm.value.sort })
                if (res.code == 0) {
                    closeEditOrCreateDialog()
                    getProdCategoryList()
                }
            } else { // 编辑提交
                const res = await deleteProdCategory({ id: categoryForm.value.id, name: categoryForm.value.name, url: categoryForm.value.url, sort: categoryForm.value.sort })
                if (res.code == 0) {
                    closeEditOrCreateDialog()
                    getProdCategoryList()
                }
            }
        } else {
            return false
        }
    })
}

// 清空表单数据
const clearEditForm = () => {
    console.log(1)
    categoryForm.value = {
        id: 0,
        name: '',
        url: '',
        sort: 50
    }
}



onMounted(() => {
    getProdCategoryList()
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

.footer {
    padding-left: 50px;
}

:deep(.el-popconfirm .el-popconfirm__action span){
    padding:  5px 10px;
}
</style>