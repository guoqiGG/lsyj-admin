<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="用户昵称">
                        <el-input v-model="searchForm.name" placeholder="用户昵称" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="用户手机">
                        <el-input v-model="searchForm.mobile" placeholder="用户手机" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="团长名称">
                        <el-input v-model="searchForm.leaderName" placeholder="团长名称" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="团长手机">
                        <el-input v-model="searchForm.leaderMobile" placeholder="团长手机" clearable />
                    </el-form-item>
                </el-col>
                <el-form-item>
                    <el-button type="primary" @click="getUserList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>

    </el-card>
    <el-card style="margin-top: 10px;">
        <el-table v-loading="loading" :data="userListData" style="width: 100%">
            <el-table-column prop="name" label="用户昵称"></el-table-column>
            <el-table-column prop="avatar" label="头像">
                <template #default="scope">
                    <el-image style="width: 35px;border-radius:50%;" :src="scope.row.avatar" lazy></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="mobile" label="用户手机" />
            <el-table-column label="团长" align="center">
                <template #default="scope">
                    {{ scope.row.leaderName ? scope.row.leaderName + ':' + scope.row.leaderMobile : '无' }}
                </template>
            </el-table-column>
            <el-table-column label="用户类型" align="center">
                <template #default="scope">
                    <div :class="['info', scope.row.type == 0 ? 'blue' : '']">{{ scope.row.type == 0 ? '普通用户' : '团长' }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="levelName" label="用户等级" />
            <el-table-column prop="regTime" label="注册时间" />
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
                    <span class="operation" @click="editOrCreateDialog(scope)" :icon="Edit">编辑</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                v-model:page-size="pages.pageSize" v-model:current-page="pages.pageNo"
                :page-sizes="[10, 20, 50, 100, 200, 500]" :total="pages.total" @size-change="tableHandleSizeChange"
                @current-change="tableHandleChange" />
        </div>
    </el-card>

    <el-dialog v-model="editOrCreateDialogVisible" title="编辑" width="70%" :close="closeDialog">
        <el-divider class="divider" content-position="left">用户信息</el-divider>
        <div class="userInfo">
            <el-image :src="userInfo.avatar" style="width:80px; border-radius: 10px;"></el-image>
            <div class="info">
                <div>用户昵称：{{ userInfo.name }}</div>
                <div>用户手机：{{ userInfo.mobile }}</div>
                <div>注册时间：{{ userInfo.regTime }}</div>
                <div>会员等级：{{ userInfo.levelName }}</div>
            </div>

            <div class="info">
                <div>团长姓名：{{ userInfo.leaderName || 'null' }}</div>
                <div>团长手机：{{ userInfo.leaderMobile || 'null' }}</div>
            </div>
            <div class="info" style="display: flex;flex-deriction:row; align-items:center;">
                <el-button type="primary" @click="openCouponDialog">送优惠券</el-button>
                <el-button style="margin-left: 10px;" type="primary" @click="openGiftDialog">送礼品券</el-button>
            </div>
        </div>
        <el-divider class="divider" content-position="left">其他信息</el-divider>
        <el-tabs v-model="active" class="demo-tabs" @tab-click="tabChange">
            <el-tab-pane label="交易明细" name="1">
                <el-table :loading="loading2" :data="orderListData" style="width: 100%">
                    <el-table-column prop="orderId" label="订单编号"></el-table-column>
                    <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                    <el-table-column label="图片">
                        <template #default="scope">
                            <el-image :src="scope.row.thumbail" style="width:35px;"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column prop="goodsCount" label="数量"></el-table-column>
                    <el-table-column prop="amount" label="金额"></el-table-column>
                    <el-table-column prop="orderTypeStr" label="订单类型"></el-table-column>
                    <el-table-column prop="orderStatus" label="订单状态">
                        <template #default="scope">
                            {{ scope.row.orderStatus == 1000 ? '待付款' : scope.row.status == 1001 ? '待发货' :
            scope.row.status == 2001 ? '待收货' : scope.row.status == 2002 ? '后台确认收货' : scope.row.status ==
                3001 ? '用户确认收货' : scope.row.status ==
                    9000 ? '已取消' : '错误' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="refundStatus" label="退款状态">
                        <template #default="scope">
                            {{ scope.row.refundStatus == 0 ? '未申请退款' : scope.row.refundStatus == 1 ? '申请退款'
            : scope.row.refundStatus == 2 ? '退款中' : scope.row.refundStatus == 3 ? '退款失败'
                : scope.row.refundStatus == 4 ? '退款成功' : '后台退款成功' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="statusCreateTime" label="创建时间"></el-table-column>
                    <el-table-column prop="statusPayedTime" label="支付时间"></el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="礼品卡明细" name="2">
                <el-table :loading="loading2" :data="userGiftListData" style="width: 100%">
                    <el-table-column prop="giftName" label="礼品卡名称"></el-table-column>
                    <el-table-column label="状态">
                        <template #default="scope">
                            {{ scope.row.status == 0 ? '未合成' : scope.row.status == 1 ? '已合成' : '已过期' }}
                        </template>
                    </el-table-column>
                    <el-table-column label="类型">
                        <template #default="scope">
                            {{ scope.row.type == 0 ? '系统发放' : '后台赠送' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="领取时间"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="180" align="center" />
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="合成卡明细" name="3">
                <el-table :loading="loading2" :data="compositeCardListData" style="width: 100%">
                    <el-table-column prop="giftRuleName" label="合成卡名称"></el-table-column>
                    <el-table-column label="状态">
                        <template #default="scope">
                            {{ scope.row.status == 0 ? '未合成' : '已核销' }}
                        </template>
                    </el-table-column>
                    <el-table-column label="类型">
                        <template #default="scope">
                            {{ scope.row.type == 0 ? '系统发放' : '后台赠送' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注"></el-table-column>
                    <el-table-column prop="createTime" label="合成时间"></el-table-column>
                    <el-table-column prop="cancelTime" label="核销时间"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="180" align="center" />
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="优惠券明细" name="4">
                <el-table :loading="loading2" :data="userCouponListData" style="width: 100%">

                </el-table>
            </el-tab-pane>
        </el-tabs>
        <div class="pagination">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper" small
                v-model:page-size="pages2.pageSize" v-model:current-page="pages2.pageNo"
                :page-sizes="[10, 20, 50, 100, 200, 500]" :total="pages2.total" @size-change="tableHandleSizeChange2"
                @current-change="tableHandleChange2" />
        </div>
    </el-dialog>

    <el-dialog v-model="giftDialogVisible" title="送礼品券" width="70%" :close="closeGiftDialog">
        <el-form ref="giftFormRef" :rules="giftRules" :model="giftForm" class="demo-form-inline" label-width="100px"
            :label-position="right">
            <el-form-item label="礼品卡" prop="giftId">
                <el-select v-model="giftForm.giftId" placeholder="请选择礼品卡" clearable>
                    <el-option v-for="item in giftListData" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="赠送数量" prop="num">
                <el-input-number v-model="giftForm.num" placeholder="赠送数量" controls-position="right" clearable
                    min="1" />
            </el-form-item>
            <el-form-item class="footer">
                <el-button type="primary" @click="giftSave">保存</el-button>
                <el-button @click="closeGiftDialog">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog v-model="couponDialogVisible" title="送优惠券" width="70%" :close="closeCouponDialog">
        <el-form ref="couponFormRef" :rules="couponRules" :model="couponForm" class="demo-form-inline"
            label-width="100px" :label-position="right">
            <el-form-item label="优惠券" prop="couponId">
                <el-select v-model="couponForm.couponId" placeholder="请选择优惠券" clearable>
                    <el-option v-for="item in couponListData" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="赠送数量" prop="num">
                <el-input-number v-model="couponForm.num" placeholder="赠送数量" controls-position="right" clearable
                    min="1" />
            </el-form-item>
            <el-form-item class="footer">
                <el-button type="primary" @click="couponSave">保存</el-button>
                <el-button @click="closeCouponDialog">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import { userList, orderList, userGiftList, userCompositeList, userCouponList, giftList, userGiftAdd, couponList, userCouponAdd } from "../../api/modules";
const searchParams = {
    name: '',
    mobile: '',
    type: '', // 0 普通团长 1 团长
    leaderName: '',
    leaderMobile: '',
}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
    pageNo: 1,
    pageSize: 20,
    total: 0
})
const userInfo = ref({
    id: 0,
    name: '',
    avatar: '',
    mobile: '',
    leaderName: '',
    leaderMobile: '',
    levelName: '',
    regTime: ''
})
const editOrCreateDialogVisible = ref(false)
let userListData = ref([])

const active = ref('1') // tab 1购物明细 2礼品卡明细 3合成卡明细 4优惠券明细
const pages2 = ref({
    pageNo: 1,
    pageSize: 20,
    total: 0
})
const loading2 = ref(false)
const tabChange = (e) => {
    active.value = e.props.name
    pages2.value = {
        pageNo: 1,
        pageSize: 20,
        total: 0
    }
    if (e.props.name == '1') {
        getOrderList()
    }
    if (e.props.name == '2') {
        getUserGiftList()
    }
    if (e.props.name == '3') {
        getCompositeCardList()
    }
    if (e.props.name == '4') {
        getUserCouponList()
    }

}
const orderListData = ref([])
const getOrderList = async () => {
    loading2.value = true
    const res = await orderList({ userId: userInfo.value.id, ...pages2.value })
    orderListData.value = res.data.list
    pages.value.total = res.data.total
    loading2.value = false
}

const userGiftListData = ref([])
const getUserGiftList = async () => {
    loading2.value = true
    const res = await userGiftList({ userId: userInfo.value.id, ...pages2.value })
    userGiftListData.value = res.data.list
    pages.value.total = res.data.total
    loading2.value = false
}

const compositeCardListData = ref([])
const getCompositeCardList = async () => {
    loading2.value = true
    const res = await userCompositeList({ userId: userInfo.value.id, ...pages2.value })
    compositeCardListData.value = res.data.list
    pages.value.total = res.data.total
    loading2.value = false
}

const userCouponListData = ref([])
const getUserCouponList = async () => {
    loading2.value = true
    const res = await userCouponList({ userId: userInfo.value.id, ...pages2.value })
    userCouponListData.value = res.data.list
    pages.value.total = res.data.total
    loading2.value = false
}

const getUserList = async () => {
    loading.value = true
    const res = await userList({ ...searchForm.value, ...pages.value })
    userListData.value = res.data.list
    pages.value.total = res.data.total
    loading.value = false
}

const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getUserList()
}
const tableHandleSizeChange2 = (e) => {
    pages2.value.pageSize = e
}
const tableHandleChange2 = (e) => {
    pages2.value.pageNo = e
    if (active.value == '1') {
        getOrderList()
    }
    if (active.value == '2') {
        getUserGiftList()
    }
    if (active.value == '3') {
        getCompositeCardList()
    }
    if (active.value == '4') {
        getUserCouponList()
    }
}
const resetForm = () => {
    searchForm.value = { ...searchParams }
}

const editOrCreateDialog = (scope) => {
    editOrCreateDialogVisible.value = true
    userInfo.value.id = scope.row.id
    userInfo.value.name = scope.row.name
    userInfo.value.avatar = scope.row.avatar
    userInfo.value.mobile = scope.row.mobile
    userInfo.value.leaderName = scope.row.leaderName
    userInfo.value.leaderMobile = scope.row.leaderMobile
    userInfo.value.levelName = scope.row.levelName
    userInfo.value.regTime = scope.row.regTime
    getOrderList()
}

const closeDialog = () => {
    editOrCreateDialogVisible.value = false
}


const giftDialogVisible = ref(false)
const openGiftDialog = () => {
    giftDialogVisible.value = true
    getGiftList()
}
const giftFormRef = ref()
const giftForm = ref({ giftId: '', num: '' })
const giftRules = reactive({
    giftId: [{ required: true, message: '请选择礼品卡', trigger: 'blur' }],
    num: [{ required: true, message: '赠送数量不能为空', trigger: 'blur' }],
})

const giftListData = ref([])
const getGiftList = async () => {
    const res = await giftList({ pageNo: 1, pageSize: 1000000 })
    giftListData.value = res.data.list
}

const closeGiftDialog = () => {
    giftForm.value.num = ''
    giftForm.value.giftId = ''
    giftDialogVisible.value = false
}
const giftSave = async () => {
    giftFormRef.value.validate(async (valid) => {
        if (valid) {
            const res = await userGiftAdd({ userId: userInfo.value.id, type: 1, ...giftForm.value })
            if (res.code == 0) {
                closeGiftDialog()
            }
        } else {
            return false
        }
    })
}

const couponDialogVisible = ref(false)
const openCouponDialog = () => {
    couponDialogVisible.value = true
    getCouponList()
}
const couponFormRef = ref()
const couponForm = ref({ couponId: '', num: '' })
const couponRules = reactive({
    couponId: [{ required: true, message: '请选择优惠券', trigger: 'blur' }],
    num: [{ required: true, message: '赠送数量不能为空', trigger: 'blur' }],
})

const couponListData = ref([])
const getCouponList = async () => {
    const res = await couponList({ pageNo: 1, pageSize: 1000000 })
    couponListData.value = res.data.list
}

const closeCouponDialog = () => {
    couponForm.value.num = ''
    couponForm.value.giftId = ''
    couponDialogVisible.value = false
}
const couponSave = async () => {
    couponFormRef.value.validate(async (valid) => {
        if (valid) {
            const res = await userCouponAdd({ userId: userInfo.value.id, type: 1, ...couponForm.value })
            if (res.code == 0) {
                closeCouponDialog()
            }
        } else {
            return false
        }
    })
}


onMounted(() => {
    getUserList()
})
</script>
<style lang="scss" scoped>
.info {
    display: block;
    width: auto;
    line-height: 20px;
    margin-top: 10px;
    text-align: center;
    color: red;
    padding: 0 5px;

    &.blue {
        color: blue;
    }
}

.userInfo {
    display: flex;
    flex-direction: row;
    align-items: center;

    .info {
        margin-left: 50px;
        font-size: 12px;
        text-align: left;
        color: #010101;

        div {
            margin-top: 10px;

            &:nth-child(1) {
                margin-top: 0;
            }
        }
    }
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
    padding-left: 0;
}
</style>