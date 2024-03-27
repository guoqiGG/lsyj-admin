<template>
    <el-card>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="用户名称">
                        <el-input v-model="searchForm.userName" placeholder="用户名称" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="用户手机号">
                        <el-input v-model="searchForm.userMobile" placeholder="用户手机号" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="团长名称">
                        <el-input v-model="searchForm.leaderName" placeholder="团长名称" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="团长手机号">
                        <el-input v-model="searchForm.leaderMobile" placeholder="团长手机号" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="商品名称">
                        <el-input v-model="searchForm.goodsName" placeholder="商品名称" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="退款状态">
                        <el-select style="width:92%" v-model="searchForm.refundStatus" placeholder="请选择" clearable>
                            <el-option label="申请中" value="1" />
                            <el-option label="已退款" value="2" />
                            <el-option label="已拒绝" value="3" />
                            <el-option label="后台手动退款成功" value="4" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="订单号">
                        <el-input v-model="searchForm.orderNumber" placeholder="订单号" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="订单类型">
                        <el-select style="width:92%" v-model="searchForm.orderType" placeholder="请选择" clearable>
                            <el-option label="配送单" value="1" />
                            <el-option label="自提单" value="2" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-form-item>
                    <el-button type="primary" @click="getRefundList">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </el-card>
    <el-card style="margin-top: 10px;">
        <el-table v-loading="loading" :data="refundData" style="width: 100%"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
            <el-table-column prop="userName" label="用户名称" align="center" />
            <el-table-column prop="userMobile" label="用户手机号" align="center" />
            <el-table-column prop="leaderName" label="团长名称" align="center" />
            <el-table-column prop="leaderMobile" label="团长手机号" align="center" />

            <el-table-column prop="orderGoodsList[0].title" label="商品名称" align="center" />
            <el-table-column prop="orderGoodsList[0].picAddr" label="商品图片" align="center">
                <template #default="scope">
                    <img style="width: 60px;height: 60px;" :src="scope.row.orderGoodsList[0].picAddr" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="orderNumber" label="订单号" align="center" />
            <el-table-column prop="orderType" label="订单类型" align="center">
                <template #default="scope">
                    {{ scope.row.orderType == 1 ? '配送单' : scope.row.refundStatus == 2 ? '自提单' : '' }}
                </template>
            </el-table-column>
            <el-table-column prop="refundAmount" label="申请金额" align="center" />
            <el-table-column prop="realRefundAmount" label="审批退款金额" align="center" />
            <el-table-column prop="refundStatus" label="退款状态" align="center">
                <template #default="scope">
                    {{ scope.row.refundStatus == 1 ? '申请中' : scope.row.refundStatus == 2 ? '已退款' :
            scope.row.refundStatus
                == 3 ? '已拒绝' : scope.row.refundStatus == 4 ? '后台手动退款成功' : '' }}
                </template>
            </el-table-column>

            <el-table-column prop="remark" label="备注" align="center" />
            <el-table-column prop="refundReason" label="退款原因" align="center">
                <template #default="scope">
                    {{ scope.row.refundReason == 1 ? '拍错' : scope.row.refundReason == 2 ? '协商一致退款' :
            scope.row.refundReason
                == 3 ? '其他' : '' }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
                    <span v-loading.fullscreen.lock="fullscreenLoading" class="operation"
                        @click="handleDetail(scope.row)">退款详情</span>
                    <span class="operation" @click="handleClick(scope.row, 1)">通过</span>
                    <span class="operation" @click="handleClick(scope.row, 2)">拒绝</span>
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
    <!-- 详情弹框 -->
    <el-dialog v-model="dialogVisible" title="订单详情" width="900px">
        <div class="detail_dialog">
            <div class="orderNumber">
                <p>订单编号：<span class="num">{{ detail.payTransId }}</span></p>
                <p>下单时间：<span class="num">{{ detail.statusPayedTime }}</span></p>

            </div>
            <div class="orderStatus">
                <!-- 订单状态:1000-待付款,1001-已支付(待发货),2001-待收货,2002-后台确认收货（已完成),3001-用户点击确认收货(已完成),9000-已取消,-8000-错误 -->
                <p class="big">
                    {{ detail.orderStatus === 1000 ? '待付款' : detail.orderStatus === 1001 ? '已支付' : detail.orderStatus
            ===
            2001 ?
            '待收货' : detail.orderStatus === 2002 ? '后台确认收货（已完成' : detail.orderStatus === 3001 ? '用户点击确认收货' :
                detail.orderStatus === 9000 ? '已取消' : detail.orderStatus === 8000 ? '错误' : '' }}
                </p>
            </div>
            <div class="order_status">
                <div class="status_box">
                    <p class="yuan"
                        :class="detail.orderStatus >= 1000 && detail.orderStatus <= 9000 ? 'borderColor' : ''">1
                    </p>
                    <p :class="detail.orderStatus >= 1000 && detail.orderStatus <= 9000 ? 'color' : ''">待付款</p>
                    <p :class="detail.orderStatus >= 1000 && detail.orderStatus <= 9000 ? 'color' : ''">{{
            detail.statusCreateTime }}</p>
                </div>
                <p class="line"
                    :class="(detail.orderStatus >= 1001 && detail.orderStatus < 8000) || detail.orderStatus === 9000 ? 'bg_color' : ''">
                </p>
                <div class="status_box" v-if="detail.orderStatus === 9000" style=" color: #f1300e;">
                    <p class="yuan" :class="detail.orderStatus === 9000 ? 'redColor' : ''">2
                    </p>
                    <p>已取消</p>
                    <p>{{
            detail.statusPayedTime || '暂无时间信息' }}</p>
                </div>
                <div class="status_box" v-else>
                    <p class="yuan"
                        :class="detail.orderStatus >= 1001 && detail.orderStatus < 8000 ? 'borderColor' : ''">2
                    </p>
                    <p :class="detail.orderStatus >= 1001 && detail.orderStatus < 8000 ? 'color' : ''">已支付</p>
                    <p :class="detail.orderStatus >= 1001 && detail.orderStatus < 8000 ? 'color' : ''">{{
            detail.statusPayedTime || '暂无时间信息' }}</p>
                </div>
                <p class="line" :class="detail.orderStatus >= 2001 && detail.orderStatus < 8000 ? 'bg_color' : ''"></p>
                <div class="status_box">
                    <p class="yuan"
                        :class="detail.orderStatus >= 2001 && detail.orderStatus < 8000 ? 'borderColor' : ''">3
                    </p>
                    <p :class="detail.orderStatus >= 2001 && detail.orderStatus < 8000 ? 'color' : ''">待收货</p>
                    <p :class="detail.orderStatus >= 2001 && detail.orderStatus < 8000 ? 'color' : ''">{{
            detail.statusFinishedTime || '暂无时间信息' }}</p>
                </div>
                <p class="line"
                    :class="(detail.orderStatus >= 2002 || detail.orderStatus >= 3001) && detail.orderStatus < 8000 ? 'bg_color' : ''">
                </p>
                <div class="status_box">
                    <p class="yuan"
                        :class="(detail.orderStatus >= 2002 || detail.orderStatus >= 3001) && detail.orderStatus < 8000 ? 'borderColor' : ''">
                        4</p>
                    <p
                        :class="(detail.orderStatus >= 2002 || detail.orderStatus >= 3001) && detail.orderStatus < 8000 ? 'color' : ''">
                        已完成</p>
                    <p
                        :class="(detail.orderStatus >= 2002 || detail.orderStatus >= 3001) && detail.orderStatus < 8000 ? 'color' : ''">
                        {{ detail.statusFinishedTime || '暂无时间信息' }}</p>
                </div>
            </div>
            <div class="orderDetail">
                <div class="left">
                    <p class="blod">配送信息</p>
                    <p>提货人:<span class="num">{{ detail.leaderName }}</span></p>
                    <p>联系电话:<span class="num">{{ detail.leaderMobile }}</span></p>
                </div>
                <div class="left">
                    <p class="blod">收货人信息</p>
                    <p>配送方式:<span class="num">{{ detail.orderType === 0 ? '快递' : detail.orderType === 1 ? '自提' : ''
                            }}</span></p>
                    <p>发货时间:<span class="num"
                            v-if="detail.orderStatus >= '2001' && detail.orderStatus != '9000' && detail.orderStatus != '8000'">{{
            detail.statusDeliveringTime }}</span></p>
                    <p>门店名称:<span class="num">{{ detail.leaderAddress }}</span></p>
                </div>
                <div class="left">
                    <p class="blod">付款信息</p>
                    <p>实付金额:<span class="num">{{ detail.payCallback }}</span></p>
                    <p>付款方式:<span class="num">微信支付</span></p>
                    <p>付款时间:<span class="num">{{ detail.statusPayedTime }}</span></p>

                </div>
                <div class="left">
                    <p class="blod">买家信息</p>
                    <p>买家昵称:<span class="num">{{ detail.userName }}</span></p>
                    <p>买家留言:<span class="num">{{ detail.comment }}</span></p>

                </div>
            </div>
            <div class="product" style="margin-top: 20px;">
                <el-table :data="detail.orderRefundAdminList" style="width: 100%"
                    :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
                    <el-table-column prop="type" label="商品" align="center">
                        <template #default="scope">
                            <img v-for="item in scope.row.imgList" class="product_img"
                                style="width: 40px;height: 40px;margin: 0px 5px;" :src="item" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column prop="goodsName" label="商品名称" align="center" />
                    <el-table-column prop="applyRefundNum" label="申请退款数量" align="center" />
                    <el-table-column prop="refundAmount" label="申请金额" align="center" />
                    <el-table-column prop="realRefundAmount" label="同意退款金额" align="center" />
                    <el-table-column prop="remark" label="申请退款备注" align="center" />
                </el-table>
            </div>
        </div>

    </el-dialog>
    <!-- 拒绝退款弹框 -->
    <el-dialog v-model="dialogAuditing" title="审核" width="500px" :close="clearEditForm">
        <el-form ref="formRef" :rules="rules" :model="form" class="demo-form-inline" lable-width="100px">
            <el-form-item label="退款备注" prop="remark">
                <el-input v-model="form.remark" placeholder="退款备注" clearable />
            </el-form-item>
            <el-form-item class="footer">
                <el-button type="primary" @click="submitForm(formRef)">保存</el-button>
                <el-button @click="dialogAuditing = false">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import { refundList, refundAudit, orderDetail } from "../../api/modules";
import {
    CirclePlus
} from '@element-plus/icons-vue'
import { ElMessage, } from 'element-plus';
const loading = ref(false)
const searchForm = ref({
    userName: null,//用户名称
    userMobile: null,
    leaderName: null,//团长名称
    leaderMobile: null,
    goodsName: null,//商品名称
    refundStatus: null,//退款状态
    orderNumber: null,//订单号
    orderType: null,//订单类型
})
const pages = ref({
    pageNo: 1,
    pageSize: 10,
})
const total = ref(0)
let refundData = ref([])
// 列表数据
const getRefundList = async () => {
    loading.value = true
    const res = await refundList({ ...searchForm.value, ...pages.value })
    loading.value = false
    refundData.value = res.data.list
    total.value = res.data.total
}
// 分页
const tableHandleSizeChange = (e) => {
    pages.value.pageSize = e
}
const tableHandleChange = (e) => {
    pages.value.pageNo = e
    getRefundList()
}
// 重置
const resetForm = () => {
    searchForm.value = {}
    getRefundList()
}

// 订单详情
const dialogVisible = ref(false)
const detail = ref()
const fullscreenLoading = ref(false)
const handleDetail = async (item) => {
    fullscreenLoading.value = true
    const res = await orderDetail(item.orderId)
    if (res.code === 0) {
        detail.value = res.data
        fullscreenLoading.value = false
        dialogVisible.value = true
    }
}
const dialogAuditing = ref(false)
const formRef = ref(null);
const form = ref({
    id: null,
    remark: null,
})

const rules = reactive({
    remark: [{ required: true, message: '请输入退款备注', trigger: 'blur' }],
})
// 通过or拒绝
const handleClick = async (item, type) => {
    if (type === 2) {
        form.value = {}
        form.value.id = item.id
        dialogAuditing.value = true
    } else if (type === 1) {
        const res = await refundAudit({
            id: item.id,
            auditStatus: 1,//1:通过 2:拒绝
        })
        if (res.code === 0) {
            ElMessage.success('审核通过');
            getRefundList()
        } else {
            ElMessage.error(res.msg);
            return false;
        }
    }
}
const submitForm = () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            const res = await refundAudit({
                remark: form.value.remark,
                id: form.value.id,
                auditStatus: 2,//1:通过 2:拒绝
            })
            if (res.code === 0) {
                ElMessage.success('拒绝成功');
                getRefundList()
            } else {
                ElMessage.error(res.msg);
                return false;
            }
            dialogAuditing.value = false
        } else {
            return false;
        }
    });
};



onMounted(() => {
    getRefundList()
})


</script>
<style lang="scss" scoped>
.add {
    margin-bottom: 20px;
}

.operation {
    color: #4060c7;
    margin: 0px 5px;
    cursor: pointer;
}

.pagination {
    margin-top: 20px;
}

.footer {
    margin-left: 80px;
}

.detail_dialog {
    font-size: 16px;
    font-weight: 500;
    color: #101010;

    .orderNumber {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        font-weight: 500;
        border-bottom: 1px dashed #E6E6E6;
        color: #101010;

        .num {
            color: #3D3D3D;
        }
    }

    .orderStatus {
        p {
            padding: 0;
            margin: 10px 0px;
        }

        .big {
            font-size: 18px;
            font-weight: 600;
        }
    }

    .order_status {
        width: 98%;
        background-color: rgb(238, 241, 246);
        padding: 10px;
        margin: 10px 0;
        display: flex;
        justify-content: space-between;

        .status_box {
            width: 55%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;

            p {
                padding: 0;
                margin: 5px 0;
            }
        }

        .yuan {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid #9E9E9E;
            text-align: center;
            color: #9E9E9E;
        }

        .color {
            color: #025BFF;
        }

        .borderColor {
            border: 1px solid #025BFF;
            color: #025BFF;
        }

        .redColor {
            border: 1px solid #f1300e;
            color: #f1300e;
        }

        .line {
            width: 160px;
            height: 1px;
            background-color: #9E9E9E;
        }

        .bg_color {
            background-color: #025BFF;
        }

    }

    .orderDetail {
        width: 98%;
        display: flex;
        justify-content: space-between;
        border: 1px solid #E6E6E6;
        padding: 10px;

        .blod {
            font-weight: 600;
        }

    }

    .product {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 5px;

        .product_img {
            width: 120px;
            height: 120px;
        }
    }

}
</style>
