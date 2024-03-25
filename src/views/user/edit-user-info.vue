<template>
    <el-dialog v-model="editOrCreateDialogVisible" title="编辑" width="70%" @close="close">
        <el-divider class="divider" content-position="left">用户信息</el-divider>
        <div class="userInfo">
            <el-image :src="userInfo.avatar" style="width: 80px; border-radius: 10px"></el-image>
            <div class="info">
                <div>用户昵称：{{ userInfo.name }}</div>
                <div>用户手机：{{ userInfo.mobile }}</div>
                <div>注册时间：{{ userInfo.regTime }}</div>
                <div>会员等级：{{ userInfo.levelName }}</div>
            </div>

            <div class="info">
                <div>团长姓名：{{ userInfo.leaderName || "null" }}</div>
                <div>团长手机：{{ userInfo.leaderMobile || "null" }}</div>
            </div>
            <div class="info" style="display: flex; flex-deriction: row; align-items: center">
                <el-button type="primary" @click="openCouponDialog">送优惠券</el-button>
                <el-button style="margin-left: 10px" type="primary" @click="openGiftDialog">送礼品券</el-button>
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
                            <el-image :src="scope.row.thumbail" style="width: 35px"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column prop="goodsCount" label="数量"></el-table-column>
                    <el-table-column prop="amount" label="金额"></el-table-column>
                    <el-table-column prop="orderTypeStr" label="订单类型"></el-table-column>
                    <el-table-column prop="orderStatus" label="订单状态">
                        <template #default="scope">
                            {{
        scope.row.orderStatus == 1000
            ? "待付款"
            : scope.row.status == 1001
                ? "待发货"
                : scope.row.status == 2001
                    ? "待收货"
                    : scope.row.status == 2002
                        ? "后台确认收货"
                        : scope.row.status == 3001
                            ? "用户确认收货"
                            : scope.row.status == 9000
                                ? "已取消"
                                : "错误"
    }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="refundStatus" label="退款状态">
                        <template #default="scope">
                            {{
        scope.row.refundStatus == 0
            ? "未申请退款"
            : scope.row.refundStatus == 1
                ? "申请退款"
                : scope.row.refundStatus == 2
                    ? "退款中"
                    : scope.row.refundStatus == 3
                        ? "退款失败"
                        : scope.row.refundStatus == 4
                            ? "退款成功"
                            : "后台退款成功"
    }}
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
                            {{
        scope.row.status == 0
            ? "未合成"
            : scope.row.status == 1
                ? "已合成"
                : "已过期"
    }}
                        </template>
                    </el-table-column>
                    <el-table-column label="类型">
                        <template #default="scope">
                            {{ scope.row.type == 0 ? "系统发放" : "后台赠送" }}
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
                            {{ scope.row.status == 0 ? "未合成" : "已核销" }}
                        </template>
                    </el-table-column>
                    <el-table-column label="类型">
                        <template #default="scope">
                            {{ scope.row.type == 0 ? "系统发放" : "后台赠送" }}
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
                    <el-table-column prop="couponName" label="名称"></el-table-column>
                    <el-table-column label="优惠券状态">
                        <template #default="scope">
                            {{ scope.row.couponStatus == "1" ? "上架" : "下架" }}
                        </template>
                    </el-table-column>
                    <el-table-column label="获得类型">
                        <template #default="scope">
                            {{
        scope.row.type == 0
            ? "下单"
            : scope.row.type == 1
                ? "后台补发"
                : "系统延迟发放"
    }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="获得时间"></el-table-column>
                    <el-table-column label="使用状态">
                        <template #default="scope">
                            {{
        scope.row.userCouponStatus == 0
            ? "未使用"
            : scope.row.userCouponStatus == 1
                            ? "已使用"
                            : scope.row.userCouponStatus == 2
                            ? "已过期"
                            : "已回收"
                            }}
                        </template>
                    </el-table-column>
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
    <send-gift ref="giftFormRef" :userInfo="userInfo" :giftDialogVisible="giftDialogVisible" :giftForm="giftForm" @closeGiftDialog="closeGiftDialog"></send-gift>
    <send-coupon ref="couponFormRef" :userInfo="userInfo" :couponDialogVisible="couponDialogVisible" :couponForm="couponForm" @closeCouponDialog="closeCouponDialog"></send-coupon>
</template>
<script setup>
import SendGift from './send-gift.vue'
import SendCoupon from './send-coupon.vue'
import { orderList, userGiftList, userCompositeList, userCouponList } from "@/api/modules";
import { ref, defineExpose, defineEmits } from 'vue'

const props = defineProps({
    editOrCreateDialogVisible: { type: Boolean },
    userInfo: { type: Object },
    active: { type: String }
});
const emit = defineEmits(['closeDialog'])
const pages2 = ref({
    pageNo: 1,
    pageSize: 20,
    total: 0
})
const loading2 = ref(false)
const tabChange = (e) => {
    props.active = e.props.name
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
    const res = await orderList({ userId: props.userInfo.id, ...pages2.value })
    orderListData.value = res.data.list
    pages2.value.total = res.data.total
    loading2.value = false
}

const userGiftListData = ref([])
const getUserGiftList = async () => {
    loading2.value = true
    const res = await userGiftList({ userId: props.userInfo.id, ...pages2.value })
    userGiftListData.value = res.data.list
    pages2.value.total = res.data.total
    loading2.value = false
}

const compositeCardListData = ref([])
const getCompositeCardList = async () => {
    loading2.value = true
    const res = await userCompositeList({ userId: props.userInfo.id, ...pages2.value })
    compositeCardListData.value = res.data.list
    pages2.value.total = res.data.total
    loading2.value = false
}

const userCouponListData = ref([])
const getUserCouponList = async () => {
    loading2.value = true
    const res = await userCouponList({ userId: props.userInfo.id, ...pages2.value })
    userCouponListData.value = res.data.list
    pages2.value.total = res.data.total
    loading2.value = false
}

const tableHandleSizeChange2 = (e) => {
    pages2.value.pageSize = e
}
const tableHandleChange2 = (e) => {
    pages2.value.pageNo = e
    if (props.active == '1') {
        getOrderList()
    }
    if (props.active == '2') {
        getUserGiftList()
    }
    if (props.active == '3') {
        getCompositeCardList()
    }
    if (props.active == '4') {
        getUserCouponList()
    }
}
const close = () => {
    emit('closeDialog')
}


const giftDialogVisible = ref(false)
const giftFormRef = ref()
const giftForm = ref({ giftId: '', num: '' })

const openGiftDialog = () => {
    giftDialogVisible.value = true
    giftFormRef.value.getGiftList()
}

const closeGiftDialog = () => {
    giftForm.value.num = ''
    giftForm.value.giftId = ''
    giftDialogVisible.value = false
}

const couponDialogVisible = ref(false)
const couponFormRef = ref()
const openCouponDialog = () => {
    couponDialogVisible.value = true
    couponFormRef.value.getCouponList()
}
const couponForm = ref({ couponId: '', num: '' })
const closeCouponDialog = () => {
    couponForm.value.num = ''
    couponForm.value.giftId = ''
    couponDialogVisible.value = false
}

defineExpose({
    getOrderList
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
            white-space: nowrap;

            &:nth-child(1) {
                margin-top: 0;
            }
        }
    }
}
</style>
