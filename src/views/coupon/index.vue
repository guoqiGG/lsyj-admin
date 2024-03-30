<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="优惠券名">
                        <el-input v-model="searchForm.name" placeholder="优惠券名" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12">
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
        :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
            <el-table-column prop="name" label="优惠券名" align="center" />
            <el-table-column prop="status" label="状态" align="center">
                <template #default="scope">
                    {{ scope.row.status == 1 ? '上架' : scope.row.status == 2 ? '下架' : '' }}
                </template>
            </el-table-column>
            <el-table-column prop="deadlineType" label="生效类型" align="center">
                <template #default="scope">
                    {{ scope.row.deadlineType == 1 ? scope.row.deadlineDay + '天' : scope.row.deadlineType == 2 ?
            scope.row.deadlineTime :
            '' }}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="开始时间" align="center" />
            <el-table-column prop="updateTime" label="更新时间" align="center" />
            <el-table-column prop="amount" label="优惠券金额" align="center" />
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
                    <span class="operation" @click="handleEditor(scope.row)">修改</span>
                    <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" cancel-button-type="info"
                        icon-color="#626AEF" title="确定要删除吗?" @confirm="handleDel(scope.row)" @cancel="cancelEvent">
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
                <el-date-picker v-model="couponForm.deadlineTime" type="date" placeholder="生效时间" format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD" />
            </el-form-item>

            <el-form-item label="适用商品" prop="type">
                <el-checkbox-group v-model="couponForm.type">
                    <el-checkbox v-for="item in options" :key="item.value" :label="item.value">
                        {{ item.label }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <!-- 指定分类不可用 -->
            <el-form-item label="不可用分类" prop="sortValue" v-if="couponForm.type && couponForm.type?.includes(1)">
                <el-select v-model="couponForm.sortValue" multiple placeholder="请选择不可用分类" style="width: 240px">
                    <el-option v-for="item in prodCategoryData" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <!-- 指定商品不可用-->
            <el-form-item label="不可用商品" prop="productValue1" v-if="couponForm.type && couponForm.type?.includes(2)">
                <el-select v-model="couponForm.productValue1" multiple value-key="id" placeholder="请选择不可用商品"
                    style="width: 240px">
                    <el-option v-for="item in prodData" :key="item.id" :label="item.name" :value="item" />
                </el-select>
            </el-form-item>
            <!-- 指定商品可用 -->
            <el-form-item label="可用商品" prop="productValue2" v-if="couponForm.type && couponForm.type?.includes(3)">
                <el-select v-model="couponForm.productValue2" multiple value-key="id" placeholder="请选择可用商品"
                   style="width: 240px">
                    <el-option v-for="item in prodData" :label="item.name" :key="item.id"
                        :value="item"></el-option>
                </el-select>
            </el-form-item>
            <!-- 满多少可用 -->
            <el-form-item label="满足金额" prop="fullAmount" v-if="couponForm.type && couponForm.type?.includes(4)">
                <el-input type="number" v-model.number="couponForm.fullAmount" placeholder="请输入满足金额" clearable />
            </el-form-item>
            <!-- 不可用商品展示 -->
            <div style="margin-left: 25px;border-bottom: 2px dashed #E6E6E6" v-if="couponForm.productValue1&&couponForm.productValue1.length>0">
                <p style="margin: 5px 0px;">不可用商品</p>
                <div style="display: flex;flex-wrap: wrap;">
                    <div class="m-4" style="width: 80px;margin: 0px 10px 10px 0px;text-align: center"
                        v-for="(item, index) in couponForm.productValue1" :key="item.id">
                        <p>
                            {{ item ? item.name : 'no select' }}
                        </p>
                        <img :src="item.thumbail" alt="" style="width: 80px;height: 80px">
                    </div>
                </div>
            </div>
            <!-- 可用商品展示 -->
            <div style="margin-left: 25px;" v-if="couponForm.productValue2&&couponForm.productValue2.length>0">
                <p style="margin: 5px 0px;">可用商品</p>
                <div style="display: flex;flex-wrap: wrap;">
                    <div class="m-4" style="width: 80px;margin: 0px 10px 10px 0px;text-align: center"
                        v-for="(item, index) in couponForm.productValue2" :key="item.id">
                        <p>
                            {{ item ? item.name : 'no select' }}
                        </p>
                        <img :src="item.thumbail" alt="" style="width: 80px;height: 80px">
                    </div>
                </div>
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
import { couponList, prodCategoryList, prodList, addCouponList, updateCouponList } from "../../api/modules";
import dayjs from "dayjs";
import {
    CirclePlus
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
const searchParams = {
    name: null,
    puid:null,
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
    getCouponList()
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getCouponList()
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
    getCouponList()
}
// 获取商品分类
const prodCategoryData = ref([])
const getProdCategoryList = async () => {
    const res = await prodCategoryList({
        pageNo: 1,
        pageSize: 10000,
    })
    prodCategoryData.value = res.data.list
}

// 获取商品
const prodData = ref([])
const getProdList = async () => {
    const res = await prodList({
        pageNo: 1,
        pageSize: 10000,
    })
    let aa= res.data.list
    aa.forEach(e => {
        e.label=e.name
    });
    prodData.value =aa
}


// 新增
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null);
const couponForm = ref({
    id: null,
    name: null,
    amount: null,//优惠金额
    fullAmount:null,//满足金额
    status: 1,//1上架 2下架
    deadlineType: 1,//1领取后 2固定时间
    deadlineDay: null,//为1时 领取后几天生效
    deadlineTime: null,//为2时 的有效期
    type: [],//类型 1指定分类不可用 2指定商品不可用  3指定商品可用
    sortValue: null,//为1时分类id
    productValue1: null,// 为2时商品id
    productValue2: null,// 为3时商品id
})
const options = [
    { label: '指定分类不可用', value: 1 },
    { label: '指定商品不可用', value: 2 },
    { label: '指定商品可用', value: 3 },
    { label: '满多少可用', value: 4 }

]
const rules = reactive({
    name: [{ required: true, message: '请输入优惠券名称', trigger: 'blur' }],
    amount: [{ required: true, message: '请输入优惠金额', trigger: 'blur' }],
    fullAmount: [{ required: true, message: '请输入满足金额', trigger: 'blur' }],
    status: [{ required: true, message: '请选择投放状态', trigger: 'blur' }],
    deadlineType: [{ required: true, message: '请选择生效类型', trigger: 'blur' }],
    deadlineDay: [{ required: true, message: '请输入生效天数', trigger: 'blur' }],
    deadlineTime: [{ required: true, message: '请选择生效时间', trigger: 'blur' }],
    type: [{ required: true, message: '请选择适用商品', trigger: 'blur' }],
    sortValue: [{ required: true, message: '请选择不可用分类', trigger: 'blur' }],
    productValue1: [{ required: true, message: '请选择不可用商品', trigger: 'blur' }],
    productValue2: [{ required: true, message: '请选择可用商品', trigger: 'blur' }],

})


// 新增
const add = () => {
    dialogVisible.value = true
    isEdit.value = false
    couponForm.value = {
        name: '',
        amount: null,
        fullAmount: null,
        status: 1,
        deadlineType: 1,//1领取后 2固定时间
        deadlineDay: null,
        deadlineTime: null,
        type: [1],//类型 1指定分类不可用 2指定商品不可用  3指定商品可用
        sortValue: null,
        productValue1: null,
        productValue2: null,
    }
}
// 新增弹框-保存按钮
const submitForm = () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            const res = ref()
            let coupon = {
                type: 1,
                isDeleted: 0,
                id: couponForm.value.couponId,
                couponId: couponForm.value.couponId,
                name: couponForm.value.name,
                amount: couponForm.value.amount,
                // fullAmount: couponForm.value.fullAmount,
                status: couponForm.value.status,
                deadlineType: couponForm.value.deadlineType,
                deadlineDay: couponForm.value.deadlineDay,
                deadlineTime: couponForm.value.deadlineTime,
            }
            let couponConstraintList = []
            // 1指定分类不可用 
            if (couponForm.value.type?.includes(1)) {
                couponForm.value.sortValue.map(item => {
                    let obj = {
                        type: 1,
                        conditionValue: item,
                    }
                    couponConstraintList.push(obj)
                })
            }
            // 2指定商品不可用 
            if (couponForm.value.type?.includes(2)) {
                couponForm.value.productValue1.map(item => {
                    let obj = {
                        type: 2,
                        conditionValue: item.id,
                    }
                    couponConstraintList.push(obj)
                })
            }
            //  3指定商品可用
            if (couponForm.value.type?.includes(3)) {
                couponForm.value.productValue2.map(item => {
                    let obj = {
                        type: 3,
                        conditionValue: item.id,
                    }
                    couponConstraintList.push(obj)
                })
            }
            //  4满多少可用
            if (couponForm.value.type?.includes(4)) {
                    let obj = {
                        type: 4,
                        conditionValue:couponForm.value.fullAmount,
                    }
                   couponConstraintList.push(obj)
               
            }
   
            couponConstraintList.id=couponForm.value.couponId
            console.log(couponConstraintList,'couponConstraintList')
            // 传递参数
            let params = {
                coupon: coupon,
                couponConstraintList:[...couponConstraintList] 
            }
            console.log(params,'params')
            // 修改
            if (couponForm.value.couponId) {
                params.couponConstraintList.id=couponForm.value.couponId
                res.value = await updateCouponList(JSON.stringify(params))
            } else {
                //新增
                res.value = await addCouponList(JSON.stringify(params))
            }
            if (res.value.code == 0) {
                dialogVisible.value = false
                ElMessage.success('提交成功');
                getCouponList()
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
    couponForm.value.couponId = item.id
    couponForm.value.name = item.name
    couponForm.value.amount = item.amount
    couponForm.value.status = item.status
    couponForm.value.deadlineType = item.deadlineType
    couponForm.value.deadlineDay = item.deadlineDay
    couponForm.value.deadlineTime = item.deadlineTime
    couponForm.value.type = []
    couponForm.value.sortValue = []
    couponForm.value.productValue1 = []
    couponForm.value.productValue2 = []

    let num1 = 0
    let num2 = 0
    let num3 = 0
    let num4 = 0
    couponForm.value.fullAmount = item.fullAmount

    item.couponConstraintList.map((item, index) => {
        if (item.type === 1) {
            couponForm.value.sortValue.push(Number(item.conditionValue))
            num1 += 1
        }
        if (item.type === 2) {
            couponForm.value.productValue1.push({ id: Number(item.conditionValue), name: item.goodsName,  label: item.goodsName,thumbail: item.thumbail })
            num2 += 1
        }
        if (item.type === 3) {
            couponForm.value.productValue2.push({ id: Number(item.conditionValue), name: item.goodsName,label: item.goodsName, thumbail: item.thumbail })
            num3 += 1
        }
        if (item.type === 4) {
            couponForm.value.fullAmount=item.conditionValue
            num4 += 1
        }
    })
    if (num1 > 0) {
        couponForm.value.type.push(1)
    }
    if (num2 > 0) {
        couponForm.value.type.push(2)
    }
    if (num3 > 0) {
        couponForm.value.type.push(3)
    }
    if (num4 > 0) {
        couponForm.value.type.push(4)
    }
    console.log(couponForm,'couponForm')
    dialogVisible.value = true
}
// 删除
const handleDel = async (item) => {
    const res = await updateCouponList({ coupon: { id: item.id, isDeleted: 1 } })
    if (res.code === 0) {
        ElMessage.success('删除成功');
        getCouponList()
    } else {
        ElMessage.error(res.msg);
        return false;
    }
}
onMounted(() => {
    getCouponList()
    getProdCategoryList()
    getProdList()

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
