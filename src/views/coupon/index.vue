<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="优惠券名">
                        <el-input v-model="searchForm.name" placeholder="优惠券名" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="优惠券状态">
                        <el-select style="width:92%" v-model="searchForm.status" placeholder="请选择" clearable>
                            <el-option label="上架" value="1" />
                            <el-option label="下架" value="2" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-form-item>
                    <el-button type="primary" @click="getCouponList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </el-card>
    <el-card style="margin-top: 10px;">
        <el-button type="primary" :icon="CirclePlus" class="add" @click="add()">新增</el-button>
        <el-table v-loading="loading" :data="couponListData" style="width: 100%" class="add_dialog"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
            <el-table-column prop="name" label="优惠券名" align="center" />
            <el-table-column prop="status" label="状态" align="center">
                <template #default="scope">
                    {{ scope.row.status == 1 ? '上架' : scope.row.status == 2 ? '下架' : '' }}
                </template>
            </el-table-column>
            <el-table-column prop="deadlineType" label="生效类型" align="center">
                <template #default="scope">
                    {{ scope.row.status == 1 ? scope.row.deadlineDay + '天' : scope.row.status == 1 ?
            scope.row.deadlineTime :
            '' }}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="开始时间" align="center" />
            <el-table-column prop="updateTime" label="更新时间" align="center" />
            <el-table-column prop="amount" label="优惠券金额" align="center" />
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                v-model:page-size="pages.pageSize" v-model:current-page="pages.current"
                :page-sizes="[10, 20, 50, 100, 200, 500]" :total="total" @size-change="tableHandleSizeChange"
                @current-change="tableHandleChange" />
        </div>
    </el-card>
    <!-- 新增 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑优惠券' : '新增优惠券'" width="600px">
        <el-form ref="formRef" :model="couponForm" :rules="rules" class="add_dialog" lable-width="100px">
            <el-form-item label="优惠券名称" prop="name">
                <el-input v-model="couponForm.name" placeholder="优惠券名称" clearable />
            </el-form-item>
            <el-form-item label="优惠金额" prop="amount">
                <el-input type="number" v-model.number="couponForm.amount" placeholder="优惠金额" clearable />
            </el-form-item>
            <el-form-item label="投放状态" prop="status">
                <el-radio-group v-model="couponForm.status">
                    <el-radio :label="1">上架</el-radio>
                    <el-radio :label="2">下架</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="生效类型" prop="deadlineType">
                <el-radio-group v-model="couponForm.deadlineType" class="ml-4">
                    <el-radio :label="1">领取后几天</el-radio>
                    <el-radio :label="2">固定时间</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 领取后几天生效 -->
            <el-form-item label="生效天数" prop="deadlineDay" v-if="couponForm.deadlineType === 1">
                <el-input type="number" v-model.number="couponForm.deadlineDay" placeholder="生效天数" clearable />
            </el-form-item>
            <!-- 有效期 -->
            <el-form-item label="生效时间" prop="deadlineTime" v-if="couponForm.deadlineType === 2">
                <el-date-picker v-model="couponForm.deadlineTime" type="datetimerange" start-placeholder="开始时间"
                    end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd"
                    time-format="A hh:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
            </el-form-item>

            <el-form-item label="适用商品" prop="type">
                <!-- <el-radio-group v-model="couponForm.type" class="ml-4">
                    <el-radio :label="1" size="large">指定分类不可用</el-radio>
                    <el-radio :label="2" size="large">指定商品不可用</el-radio>
                    <el-radio :label="3" size="large">指定商品可用</el-radio>
                </el-radio-group> -->
                <el-checkbox-group v-model="couponForm.type">
                    <el-checkbox v-for="item in options" :key="item.value" :label="item.value">
                        {{ item.label }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <!-- 指定分类不可用 -->
            <el-form-item label="适用分类" prop="sortValue" v-if="couponForm.type&&couponForm.type?.includes(1)">
                <el-select v-model="couponForm.sortValue" multiple placeholder="Select" style="width: 240px">
                    <el-option v-for="item in sort_options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <!-- 指定商品不可用or 指定商品可用-->
            <el-form-item label="选定商品" prop="productValue" v-if="couponForm.type||couponForm.type?.includes(2)">
                <el-select v-model="couponForm.productValue" multiple value-key="id" placeholder="Select"
                    style="width: 240px">
                    <el-option v-for="item in product_options" :key="item.id" :label="item.label" :value="item" />
                </el-select>
            </el-form-item>
            <div class="m-4" v-if="couponForm.type === 2 || couponForm.type === 3" style="margin-left: 25px;">
                <p v-for="(item, index) in couponForm.productValue" key="index">
                    {{ item ? item.desc : 'no select' }}
                </p>
            </div>
            <el-form-item class="footer">
                <el-button type="primary" @click="submitForm(formRef)">保存</el-button>
                <el-button @click="dialogVisible = false">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import { couponList } from "../../api/modules";
import dayjs from "dayjs";
import {
    CirclePlus
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
const searchParams = {
    name: null,//优惠券名称
    status: null,//优惠券状态  1上架 2下架
}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 10,
})
const total = ref(0)
let couponListData = ref([])
const getCouponList = async () => {
    loading.value = true
    const res = await couponList({ ...searchForm.value, ...pages.value })
    loading.value = false
    couponListData.value = res.data.list
    total.value = res.data.total
}

const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getCouponList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getCouponList()
}
// 新增
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null);
const couponForm = ref({
    name: '',
    amount: null,//优惠金额
    status: 1,//1上架 2下架
    deadlineType: 1,//1领取后 2固定时间
    deadlineDay: null,//为1时 领取后几天生效
    deadlineTime: null,//为2时 的有效期
    // couponConstraintList: [
    // {
    type: [1,2,3],//类型 1指定分类不可用 2指定商品不可用  3指定商品可用
    // conditionValue: null,//为1时分类id 为2和为3时商品id
    sortValue: null,//为1时分类id
    productValue: null,// 为2和为3时商品id
    // ]


})
const options = [
    { label: '指定分类不可用', value: 1 },
    { label: '指定商品不可用', value:2 },
    { label: '指定商品可用', value: 3 }
]
const sort_options = [
    {
        value: '分类1',
        label: '分类1-id',
    },
    {
        value: '分类2',
        label: '分类2-id',
    },
    {
        value: '分类3',
        label: '分类3-id',
    },
]
const product_options = [
    { id: '商品1-id', label: '商品1', desc: '商品1——描述' },
    { id: '商品2-id', label: '商品1', desc: '商品2——描述' },
]
const rules = reactive({
    name: [{ required: true, message: '请输入优惠券名称', trigger: 'blur' }],
    amount: [{ required: true, message: '请输入优惠金额', trigger: 'blur' }],
    status: [{ required: true, message: '请选择投放状态', trigger: 'blur' }],
    deadlineType: [{ required: true, message: '请选择生效类型', trigger: 'blur' }],
    deadlineDay: [{ required: true, message: '请输入生效天数', trigger: 'blur' }],
    deadlineTime: [{ required: true, message: '请选择生效时间', trigger: 'blur' }],
    type: [{ required: true, message: '请选择适用商品', trigger: 'blur' }],
    sortValue: [{ required: true, message: '请选择适用分类', trigger: 'blur' }],
    productValue: [{ required: true, message: '请选定商品', trigger: 'blur' }],
})
// 新增
const add = () => {
    dialogVisible.value = true
    isEdit.value = false
    couponForm.value = {}
}
// 新增弹框-保存按钮
const submitForm = () => {
    formRef.value.validate(async (valid) => {
        console.log(couponForm.value)
        if (valid) {
            const res = ref()
            let coupon = {
                type: 1,
                name: couponForm.value.name,
                amount: couponForm.value.amount,//金额
                status: couponForm.value.status,//1上架 2下架
                deadlineType: couponForm.value.deadlineType,//1领取后 2固定时间
                deadlineDay: couponForm.value.deadlineDay,
                deadlineTime: couponForm.value.deadlineTime,
            }
            let couponConstraintList = [

            ]
            couponForm.value.ruleIds.map((item, index) => {
                if (index < couponForm.value.ruleIds.length) {
                    obj.ruleIds += item + ','
                } else {
                    obj.ruleIds += item
                }
            })
            // 修改
            if (couponForm.value.id) {
                res.value = await compositeCardUpdate(JSON.stringify(obj))
            } else {
                // 新增
                res.value = await compositeCardAdd(JSON.stringify(obj))
            }
            if (res.value.code == 0) {
                dialogVisible.value = false
                ElMessage.success('提交成功');
                geCompositeCardList()
            }

        } else {
            ElMessage.error('表单验证失败');
            return false;
        }
    });
};
//  修改
const handleEditor = (item) => {
    isEdit.value = true
    couponForm.value.name = item.parentName
    couponForm.value.number = item.parentNumber
    couponForm.value.ruleIds = item.ruleIds
    dialogVisible.value = true
}
onMounted(() => {
    getCouponList()
})
</script>
<style lang="scss" scoped>
.add {
    margin-bottom: 20px;
}

.pagination {
    margin-top: 20px;
}

.operation {
    color: #4060c7;
    margin: 0px 5px;
}

.footer {
    margin-left: 80px;
}

.add_dialog {
    :deep(.el-form-item__label) {
        width: 95px !important;
    }
}
</style>
