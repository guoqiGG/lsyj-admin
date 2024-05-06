<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="类型">
                        <el-select v-model="searchForm.type" placeholder="类型" style="width: 240px">
                            <el-option label="优惠券" :value="0" />
                            <el-option label="礼品卡" :value="1" />
                            <el-option label="红包" :value="2" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-form-item>
                    <el-button type="primary" @click="getExchangeList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </el-card>

    <el-card style="margin-top: 10px;">
        <el-button tag="div" :icon="CirclePlus" type="primary" @click="openDialog('add')">新增</el-button>
        <el-table v-loading="loading" :data="exchangeListData" style="width: 100%;margin-top:10px;"
            :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column align="center" prop="id" label="ID" />
            <el-table-column align="center" prop="name" label="名称" />
            <el-table-column align="center" prop="url" label="图片">
                <template #default="scope">
                    <img style="width: 40px;height: 40px;margin: 0px 10px 0 5px;" :src="scope.row.url" alt="">
                </template>
            </el-table-column>
            <el-table-column align="center" prop="type" label="兑换类型">
                <template #default="scope">
                    {{ scope.row.type === 0 ? '优惠券' : scope.row.type === 1 ? '礼品卡' : '红包' }}
                </template>
            </el-table-column>

            <el-table-column align="center" prop="key" label="ID/金额">
                <template #default="scope">
                    {{ scope.row.type == 2 ? scope.row.key + '(元)' : scope.row.key + '(ID)' }}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="value" label="需多少豆" />
            <el-table-column align="center" prop="num" label="兑换数量" />
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
                    <span class="operation" @click="openDialog('edit', scope)" :icon="Edit">编辑</span>
                    <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" cancel-button-type="info"
                        icon-color="#626AEF" title="确定要删除吗?" @confirm="deleteExchange(scope)" @cancel="cancelEvent">
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
    <el-dialog v-model="dialogVisible" :title="isCreate ? '新增兑换规则' : '编辑兑换规则'" width="600px" @close="closeDialog">
        <el-form ref="exchangeFormRef" :rules="rules" :model="exchangeForm" class="demo-form-inline" label-width="100px"
            :label-position="right">
            <el-form-item label="类型" prop="type">
                <el-radio-group v-model="exchangeForm.type" @change="typeChange">
                    <el-radio :label="0" border>优惠券</el-radio>
                    <el-radio :label="1" border>礼品卡</el-radio>
                    <el-radio :label="2" border>红包</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="图片" prop="url">
                <el-upload ref="uploadRef" accept="image/*" v-model:file-list="fileList" class="image-uploader"
                    :show-file-list="false" :action="BaseUrl + '/upload/oss'" :headers="{ Authorization: token }"
                    :on-success="handleSuccess" :on-error="handleError" :before-upload="beforeUpload">
                    <el-image class="avatar" v-if="exchangeForm.url" controls="controls"
                        :src="exchangeForm.url"></el-image>
                    <el-icon v-else class="image-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item :label="exchangeForm.type == 1 ? '礼品卡' : '优惠券'" prop="key" v-if="exchangeForm.type !== 2">
                <el-select v-model="exchangeForm.key" filterable remote reserve-keyword
                    :placeholder="exchangeForm.type == 1 ? '请选择礼品卡' : '请选择优惠券'" remote-show-suffix
                    :remote-method="getCouponOrGiftListByName" clearable @clear="clearType" @change="changeKey">
                    <el-option v-for="item in couponOrGiftListData" :key="item.id" :label="item.name"
                        :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="exchangeForm.name" placeholder="名称" clearable style="width: 200px;" />
            </el-form-item>
            <el-form-item label="红包金额" prop="key" v-if="exchangeForm.type == 2">
                <el-input-number controls-position="right" v-model="exchangeForm.key" placeholder="红包金额" :precision="2"
                    min="0.01" clearable />
            </el-form-item>
            <el-form-item label="所需豆" prop="value">
                <el-input-number controls-position="right" v-model="exchangeForm.value" placeholder="需要多少豆" min="1"
                    clearable />
            </el-form-item>
            <el-form-item class="footer">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="closeDialog">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import { exchangeList, couponList, giftList, addExchange, editExchange } from "@/api/modules";
import { ElMessage } from "element-plus";
import {
    CirclePlus
} from '@element-plus/icons-vue'
const BaseUrl = import.meta.env.VITE_API_BASE_URL
const token = localStorage.getItem('token')
const searchParams = {
    type: null
}
const isCreate = ref(true)
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 20,
})
const total = ref(0)
let exchangeListData = ref([])
const exchangeForm = ref({
    id: null,
    type: 0, // 0兑换优惠券，1兑换礼品券 2兑换红包
    key: null, // 0优惠券id 1礼品券id 2红包金额 两位小数（1.22）
    name: null, // 此名称 红包才有
    value: null, // 需要多少豆兑换
    url: null  // 图片
})
const exchangeFormRef = ref()
const rules = reactive({
    type: [
        { required: true, message: '请选择兑换类型', trigger: 'blur' },
    ],
    key: [
        { required: true, message: 'key不能为空', trigger: 'blur' },
    ],
    name: [
        { required: true, message: '红包名称不能为空', trigger: 'blur' },
    ],
    value: [
        { required: true, message: '所需豆不能为空', trigger: 'blur' },
    ],
    url: [
        { required: true, message: '图片不能为空', trigger: 'blur' },
    ],
})

const dialogVisible = ref(false)
const couponOrGiftListData = ref()
const getExchangeList = async () => {
    loading.value = true
    const res = await exchangeList({ ...searchForm.value, ...pages.value })
    loading.value = false
    exchangeListData.value = res.data.list
    total.value = res.data.total
}
const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
    getExchangeList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getExchangeList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getExchangeList()
}

const openDialog = (opt, scope) => {
    opt == 'add' ? isCreate.value = true : isCreate.value = false
    dialogVisible.value = true
    if (opt == 'edit') {
        exchangeForm.value.id = scope.row.id
        exchangeForm.value.type = scope.row.type
        exchangeForm.value.key = scope.row.type !== 2 ? Number(scope.row.key) : scope.row.key
        exchangeForm.value.name = scope.row.name
        exchangeForm.value.value = scope.row.value
        exchangeForm.value.url = scope.row.url
        if (exchangeForm.value.type != 2) {
            getCouponOrGiftListById()
        }
    } else {
        getCouponList()
    }
}

const handleSuccess = (response, file, fileList) => {
    exchangeForm.value.url = response
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

// 优惠券 或 礼品卡 根据名称查询
const getCouponOrGiftListByName = async (query) => {
    if (exchangeForm.value.type === 0) {
        const res = await couponList({ name: query, pageNo: 1, pageSize: 100000000 })
        couponOrGiftListData.value = res.data.list
    }
    if (exchangeForm.value.type === 1) {
        const res = await giftList({ name: query, pageNo: 1, pageSize: 100000000 })
        couponOrGiftListData.value = res.data.list
    }
}
// 优惠券 
const getCouponList = async () => {
    const res = await couponList({ pageNo: 1, pageSize: 10 })
    couponOrGiftListData.value = res.data.list
}
const getCouponOrGiftListById = async () => {
    if (exchangeForm.value.type === 0) {
        const res = await couponList({ id: exchangeForm.value.key, pageNo: 1, pageSize: 1 })
        couponOrGiftListData.value = res.data.list
    }
    if (exchangeForm.value.type === 1) {
        const res = await giftList({ id: exchangeForm.value.key, pageNo: 1, pageSize: 1 })
        couponOrGiftListData.value = res.data.list
    }
}
// 礼品卡
const getGiftList = async () => {
    const res = await giftList({ pageNo: 1, pageSize: 10 })
    couponOrGiftListData.value = res.data.list
}

const typeChange = () => {
    exchangeForm.value.key = null
    exchangeForm.value.name = null
    if (exchangeForm.value.type === 0) {
        couponOrGiftListData.value = []
        getCouponList()
    }
    if (exchangeForm.value.type === 1) {
        couponOrGiftListData.value = []
        getGiftList()
    }
    if (exchangeForm.value.type === 2) {
        couponOrGiftListData.value = []
    }
}

const clearType = () => {
    if (exchangeForm.value.type === 0) {
        couponOrGiftListData.value = []
        getCouponList()
    }
    if (exchangeForm.value.type === 1) {
        couponOrGiftListData.value = []
        getGiftList()
    }
}


const changeKey = (e) => {
    couponOrGiftListData.value.forEach(c => {
        if (e == c.id) {
            exchangeForm.value.name = c.name
        }
    });
}
const save = () => {
    exchangeFormRef.value.validate(async (valid) => {
        if (valid) {
            try {
                if (isCreate.value) { // 新增
                    let params = {
                        type: exchangeForm.value.type,
                        key: exchangeForm.value.key,
                        name: exchangeForm.value.name,
                        value: exchangeForm.value.value,
                        url: exchangeForm.value.url
                    }
                    const res = await addExchange({ ...params })
                    if (res?.code === 0) {
                        ElMessage({
                            showClose: false,
                            message: '添加兑换规则成功',
                            type: 'success',
                        })
                        closeDialog()
                        getExchangeList()
                    }
                } else {  // 编辑
                    let params = {
                        id: exchangeForm.value.id,
                        type: exchangeForm.value.type,
                        key: exchangeForm.value.key,
                        name: exchangeForm.value.name,
                        value: exchangeForm.value.value,
                        url: exchangeForm.value.url
                    }
                    const res = await editExchange({ ...params })
                    if (res?.code === 0) {
                        ElMessage({
                            showClose: false,
                            message: '编辑兑换规则成功',
                            type: 'success',
                        })
                        closeDialog()
                        getExchangeList()
                    }
                }
            } catch (error) {

            }
        } else {
            return false
        }
    })
}

const closeDialog = () => {
    dialogVisible.value = false
    clearExchangeForm()
}

const clearExchangeForm = () => {
    exchangeForm.value.id = null
    exchangeForm.value.type = 0
    exchangeForm.value.key = null
    exchangeForm.value.name = null
    exchangeForm.value.value = null
    exchangeForm.value.url = null
}

const deleteExchange = async (scope) => {
    let params = {
        id: scope.row.id,
        type: scope.row.type,
        key: scope.row.key,
        name: scope.row.name,
        value: scope.row.value,
        url: scope.row.url,
        isDeleted: 1
    }
    const res = await editExchange({ ...params })
    if (res?.code === 0) {
        ElMessage({
            showClose: false,
            message: '删除兑换规则成功',
            type: 'success',
        })
        getExchangeList()
    }
}

onMounted(() => {
    getExchangeList()
})

</script>
<style scoped>
.operation {
    color: #4060c7;
    margin: 0px 5px;
    cursor: pointer;
}

.pagination {
    margin-top: 20px;
}

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
