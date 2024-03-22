<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="商品名称">
                        <el-input v-model="searchForm.name" placeholder="商品名称" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="商品分类">
                        <el-select v-model="searchForm.categoryId" placeholder="商品分类" style="width: 90%" clearable>
                            <el-option v-for="item in prodCategoryListData" :key="item.id" :label="item.name"
                                :value="item.id" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-form-item>
                    <el-button type="primary" @click="getProdList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </el-card>

    <el-card style="margin-top: 10px;">
        <el-button tag="div" :icon="CirclePlus" type="primary" @click="editOrCreateDialog()">新增</el-button>
        <el-table v-loading="loading" :data="prodListData" style="width: 100%;margin-top:10px;">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="name" label="名称" align="center" />
            <el-table-column label="图片" align="center">
                <template #default="scope">
                    <el-image :src="scope.row.thumbail" fit="cover" />
                </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" align="center" />
            <el-table-column prop="adminSort" label="后台排序" align="center" />
            <el-table-column prop="categoryName" label="分类" align="center" />
            <el-table-column prop="dayNum" label="今日销量" align="center" />
            <el-table-column prop="totalNum" label="总销量" align="center" />
            <el-table-column prop="goodsType" label="商品类型" align="center" />
            <el-table-column prop="code" label="code" align="center" />
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
                    <span class="operation" @click="editOrCreateDialog(scope)" :icon="Edit">编辑</span>
                    <!-- <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" cancel-button-type="info"
                        icon-color="#626AEF" title="确定要删除吗?" @confirm="deleteProdById(scope.row.id, 1)"
                        @cancel="cancelEvent">
                        <template #reference>
                            <span class="operation">删除</span>
                        </template>
                    </el-popconfirm> -->
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
    <el-dialog v-model="editOrCreateDialogVisible" :title="isCreate ? '新增商品分类' : '编辑商品分类'" width="90%"
        @close="clearEditForm">
        <el-form ref="categoryFormRef" :rules="rules" :model="prodForm" class="demo-form-inline" label-width="100px"
            :label-position="right">
            <el-form-item label="商品分类" prop="categoryId">
                <el-select v-model="prodForm.categoryId" placeholder="选择商品分类" clearable>
                    <el-option v-for="item in prodCategoryListData" :key="item.id" :label="item.name"
                        :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称" prop="goodsName">
                <el-input v-model="prodForm.goodsName" placeholder="商品名称" clearable />
            </el-form-item>
            <el-form-item label="商品图片" prop="thumbail">
                <el-upload :limit="1" accept="image/*" v-model:file-list="fileList" class="image-uploader"
                    :show-file-list="false" :action="BaseUrl + '/upload/oss'" :headers="{ Authorization: token }"
                    :on-success="handleSuccess" :on-error="handleError" :before-upload="beforeUpload">
                    <el-image class="avatar" v-if="prodForm.thumbail" controls="controls"
                        :src="prodForm.thumbail"></el-image>
                    <el-icon v-else class="image-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品类型" prop="goodsType">
                <el-radio-group v-model="prodForm.goodsType">
                    <el-radio border label="0">普通</el-radio>
                    <el-radio border label="1">特殊</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="商品简介" prop="description">
                <el-input v-model="prodForm.description" placeholder="商品卖点展示在商品详情标题下面，长度不超过100个字符" clearable />
            </el-form-item>
            <el-form-item label="默认排序" prop="sort">
                <el-input-number controls-position="right" v-model="prodForm.sort" placeholder="排序" clearable />
            </el-form-item>
            <el-form-item label="配送方式" prop="deliveryMode">
                <el-radio-group v-model="prodForm.deliveryMode">
                    <el-radio border :label="0">快递</el-radio>
                    <el-radio border :label="1">自提</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="后台排序" prop="adminSort">
                <el-input-number controls-position="right" v-model="prodForm.adminSort" placeholder="后台排序" clearable />
            </el-form-item>
            <!-- 规格 -->
            <el-form-item label="规格">
                <div style="display: block;width:100%;">
                    <template v-for="item, index in prodForm.adminGoodsSkuInputVOS" :key="index">
                        <el-tag style="background:#FFF;color:#333;border:1px solid #f0f2f5;margin-right:10px;"
                            v-if="item.specificationName !== '默认'" closable :disable-transitions="false"
                            @close="handleClose(item)">
                            {{ item.specificationName }}
                        </el-tag>
                    </template>

                    <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="w-20" style="width: 80px;"
                        size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">
                        + 添加规格
                    </el-button>
                </div>

                <el-table :data="prodForm.adminGoodsSkuInputVOS" class="sku" border style="width:auto;margin-top:10px;">
                    <el-table-column label="规格" v-if="prodForm.adminGoodsSkuInputVOS[0]?.specificationName != '默认'"
                        width="150px">
                        <template #default="scope">
                            {{ scope.row.specificationName }}
                        </template>
                    </el-table-column>
                    <el-table-column label="售价" align="center" width="150">
                        <template #default="scope">
                            <el-input-number controls-position="right"
                                v-model="prodForm.adminGoodsSkuInputVOS[scope.$index].price" min="0" size="small"
                                step="0.01" />
                        </template>
                    </el-table-column>
                    <el-table-column label="库存" align="center" width="150">
                        <template #default="scope">
                            <el-input-number controls-position="right"
                                v-model="prodForm.adminGoodsSkuInputVOS[scope.$index].stock" min="0" size="small" />
                        </template>
                    </el-table-column>
                    <el-table-column label="注水销量" align="center" width="150">
                        <template #default="scope">
                            <el-input-number controls-position="right"
                                v-model="prodForm.adminGoodsSkuInputVOS[scope.$index].virtuallyNum" min="0"
                                size="small" />
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center" width="150">
                        <template #default="scope">
                            <el-select style="width:92%" placeholder="请选择"
                                v-model="prodForm.adminGoodsSkuInputVOS[scope.$index].status" size="small">
                                <el-option label="下架" :value="0" />
                                <el-option label="上架" :value="1" />
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="限制类型(默认0不限制)" align="center" width="150">
                        <template #default="scope">
                            <el-input-number controls-position="right"
                                v-model="prodForm.adminGoodsSkuInputVOS[scope.$index].limit_type" size="small" />
                        </template>
                    </el-table-column>
                    <el-table-column label="限购数量" align="center" width="150">
                        <template #default="scope">
                            <el-input-number controls-position="right"
                                v-model="prodForm.adminGoodsSkuInputVOS[scope.$index].limitBuy" min="0" size="small" />
                        </template>
                    </el-table-column>
                    <el-table-column label="排序" align="center" width="150">
                        <template #default="scope">
                            <el-input-number controls-position="right"
                                v-model="prodForm.adminGoodsSkuInputVOS[scope.$index].sort" min="0" size="small" />
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="120">
                        <template #default="scope">
                            <el-button link type="primary" size="small" @click.prevent="handleClose(scope.row)"
                                v-if="scope.row.specificationName != '默认'">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <!-- 规格 end -->
            <el-form-item class="footer">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="closeEditOrCreateDialog">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { onMounted, ref, reactive, nextTick, isRef } from "vue";
import { prodList, prodCategoryList, deleteProd, prodAdd, prodInfoById } from "@/api/modules";
import { ElMessage, ElInput } from "element-plus";
import {
    CirclePlus
} from '@element-plus/icons-vue'
const BaseUrl = import.meta.env.VITE_API_BASE_URL
const token = sessionStorage.getItem('token')
const searchParams = {
    name: '',
    categoryId: ''
}
const isCreate = ref(true)
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 20,
})
const total = ref(0)
let prodListData = ref([])
let prodCategoryListData = ref([])
const prodForm = ref({
    id: 0,
    categoryId: '', //分类id
    goodsName: '', // 商品名称
    goodsType: 0,//订单类型
    thumbail: '', //大图
    description: '',//配送类型
    sort: 0, //排序
    deliveryMode: 1,//配送类别
    adminSort: 0, //后台排序
    adminGoodsSkuInputVOS: [], //商品详情相关
    // goodsCoupon: { // 发放优惠券相关
    //     couponId: '', //优惠券id
    //     couponNum: '',//发放数量
    //     rule: '' //发放规则  0一次发放 1按月发放
    // },
})

const skuObj = ref({
    price: 0,
    specificationName: '默认',
    stock: 0,
    virtuallyNum: 0,
    status: 1,
    limit_type: 0, // 0 不限购 1 限购 2今日限购
    limitBuy: 0,
    sort: 0
})

const inputValue = ref('')
const categoryFormRef = ref()
const inputVisible = ref(false)
const InputRef = ref()
const handleClose = (item) => {
    if (prodForm.value.adminGoodsSkuInputVOS.length > 1) {
        prodForm.value.adminGoodsSkuInputVOS.splice(prodForm.value.adminGoodsSkuInputVOS.indexOf(item), 1)
    } else {
        prodForm.value.adminGoodsSkuInputVOS = []
        skuObj.value.specificationName = '默认'
        prodForm.value.adminGoodsSkuInputVOS.push(Object.assign({}, skuObj.value))
    }
}
const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value.input.focus()
    })
}

const handleInputConfirm = () => {
    if (inputValue.value) {
        if (prodForm.value.adminGoodsSkuInputVOS.length == 1 && prodForm.value.adminGoodsSkuInputVOS[0].specificationName == '默认') {
            prodForm.value.adminGoodsSkuInputVOS[0].specificationName = inputValue.value
            inputVisible.value = false
            inputValue.value = ''
            return
        }

        if (prodForm.value.adminGoodsSkuInputVOS[0].specificationName !== '默认') {
            skuObj.value.specificationName = inputValue.value
            prodForm.value.adminGoodsSkuInputVOS.push(Object.assign({}, skuObj.value))
            inputVisible.value = false
            inputValue.value = ''
            return
        }
    }

}

const rules = reactive({
    categoryId: [
        { required: true, message: '请选择商品分类', trigger: 'blur' },
    ],
    goodsName: [
        { required: true, message: '分类名称不能为空', trigger: 'blur' },
    ],
    thumbail: [
        { required: true, message: '请选择上传图片', trigger: 'blur' },
    ],
    goodsType: [
        { required: true, message: '请选择商品类型', trigger: 'blur' },
    ],
    sort: [
        { required: true, message: '请输入排序', trigger: 'blur' },
    ],
    deliveryMode: [
        { required: true, message: '请选择配送方式', trigger: 'blur' },
    ],
    adminSort: [
        { required: true, message: '请输入后台排序', trigger: 'blur' },
    ]
})

const editOrCreateDialogVisible = ref(false)

const getProdCategoryList = async () => {
    const res = await prodCategoryList({
        pageNo: 1,
        pageSize: 1000000,
    })
    prodCategoryListData.value = res.data.list
}

const getProdList = async () => {
    loading.value = true
    const res = await prodList({ ...searchForm.value, ...pages.value })
    loading.value = false
    prodListData.value = res.data.list
    total.value = res.data.total
}
const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getProdList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
}

const deleteProdById = async (id, isDeleted) => {
    const res = await deleteProd({ goodsId:id, isDeleted })
    console.log(res)
    if (res.code === 0) {
        getProdList()
    }
}

const handleSuccess = (response, file, fileList) => {
    prodForm.value.thumbail = response
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

const editOrCreateDialog = async (e) => {
    editOrCreateDialogVisible.value = true
    if (e) { //编辑
        isCreate.value = false
        const res = await prodInfoById({ goodsId: e.row.id })
        prodForm.value.id = res.data.id
        prodForm.value.categoryId = res.data.categoryId
        prodForm.value.goodsName = res.data.name
        prodForm.value.goodsType = Number(res.data.goodsType)
        prodForm.value.thumbail = res.data.thumbail
        prodForm.value.goodsType = res.data.goodsType
        prodForm.value.description = res.data.description
        prodForm.value.sort = res.data.sort
        prodForm.value.deliveryMode = res.data.deliveryMode
        prodForm.value.adminSort = res.data.adminSort
        prodForm.value.adminGoodsSkuInputVOS = res.data.adminGoodsSkuInputVOS
        console.log(prodForm.value.goodsType)
    } else { // 新增
        isCreate.value = true
        // if (prodForm.value.adminGoodsSkuInputVOS.length < 1) {
        prodForm.value.adminGoodsSkuInputVOS = []
        prodForm.value.adminGoodsSkuInputVOS.push(Object.assign({}, skuObj.value))
        // }
    }
}

const closeEditOrCreateDialog = () => {
    editOrCreateDialogVisible.value = false
    clearEditForm()
}

const save = async () => {
    console.log(prodForm.value)
    categoryFormRef.value.validate(async (valid) => {
        if (valid) {
            if (isCreate.value) {//新增提交
                const res = await prodAdd({
                    categoryId: prodForm.value.categoryId,
                    goodsName: prodForm.value.goodsName,
                    goodsType: prodForm.value.goodsType,
                    thumbail: prodForm.value.thumbail,
                    description: prodForm.value.description,
                    sort: prodForm.value.sort,
                    deliveryMode: prodForm.value.deliveryMode,
                    adminSort: prodForm.value.adminSort,
                    adminGoodsSkuInputVOS: prodForm.value.adminGoodsSkuInputVOS,
                })
                console.log(res)
                if (res.code == 0) {
                    closeEditOrCreateDialog()
                    getProdList()
                }
            } else { // 编辑提交
                const res = await deleteProd({
                    goodsId: prodForm.value.id,
                    categoryId: prodForm.value.categoryId,
                    goodsName: prodForm.value.goodsName,
                    goodsType: prodForm.value.goodsType,
                    thumbail: prodForm.value.thumbail,
                    description: prodForm.value.description,
                    sort: prodForm.value.sort,
                    deliveryMode: prodForm.value.deliveryMode,
                    adminSort: prodForm.value.adminSort,
                    adminGoodsSkuInputVOS: prodForm.value.adminGoodsSkuInputVOS,
                })
                if (res.code == 0) {
                    closeEditOrCreateDialog()
                    getProdList()
                }
            }
        } else {
            return false
        }
    })
}

// 清空表单数据
const clearEditForm = () => {
    prodForm.value = {
        id: 0,
        categoryId: '', //分类id
        goodsName: '', // 商品名称
        goodsType: 0,//订单类型
        thumbail: '', //大图
        description: '',//配送类型
        sort: 0, //排序
        deliveryMode: 1,//配送类别
        adminSort: 0, //后台排序
        adminGoodsSkuInputVOS: [], //商品详情相关
    }
}



onMounted(() => {
    getProdCategoryList()
    getProdList()
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

<style scoped lang="scss">
.pagination {
    margin-top: 20px;
}

.operation {
    color: #4060c7;
    margin: 0px 5px;
    cursor: pointer;
}

.footer {
    padding-left: 0px;
}

:deep(.el-popconfirm .el-popconfirm__action span) {
    padding: 5px 10px;
}
</style>