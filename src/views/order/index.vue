<template>
  <el-card>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12">
          <el-form-item label="订单编号">
            <el-input v-model="searchForm.orderNumber" placeholder="订单编号" clearable />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12">
          <el-form-item label="用户名称">
            <el-input v-model="searchForm.userName" placeholder="用户名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12">
          <el-form-item label="用户号码">
            <el-input v-model="searchForm.userMobile" placeholder="用户手机号" clearable />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12">
          <el-form-item label="团长名称">
            <el-input v-model="searchForm.leaderName" placeholder="团长名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12">
          <el-form-item label="团长号码">
            <el-input v-model="searchForm.leaderMobile" placeholder="团长手机号" clearable />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12">
          <el-form-item label="订单类型">
            <el-select v-model="searchForm.orderType" placeholder="请选择" clearable>
              <el-option label="自提" value="1" />
              <el-option label="快递" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12">
          <el-form-item label="订单状态">
            <el-select v-model="searchForm.orderStatus" placeholder="请选择" clearable>
              <el-option label="待付款" value="1000" />
              <el-option label="待发货" value="1001" />
              <el-option label="待收货" value="2001" />
              <el-option label="后台确认收货(已完成)" value="2002" />
              <el-option label="用户确认收货(已完成)" value="3001" />
              <el-option label="已取消" value="9000" />
              <el-option label="错误" value="8000" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12">
          <el-form-item label="退款状态">
            <el-select v-model="searchForm.refundStatus" placeholder="请选择" clearable>
              <el-option label="未申请退款" value="0" />
              <el-option label="申请退款" value="1" />
              <el-option label="退款中" value="2" />
              <el-option label="退款失败" value="3" />
              <el-option label="退款成功" value="4" />
              <el-option label="后台手动退款成功" value="5" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12">
          <el-form-item label="所属团长">
            <el-select v-model="searchForm.pUid" filterable placeholder="请选择所属团长" style="width: 90%" clearable>
              <el-option v-for="item in pUidOptions" :key="item.puid" :label="item.leaderName" :value="item.puid" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12">
          <el-form-item label="商品名称">
            <el-select v-model="searchForm.goodsId" filterable remote reserve-keyword placeholder="请输入商品名称"
              remote-show-suffix :remote-method="getProdListByName" clearable>
              <el-option v-for="item in prodListData" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :lg="12" :md="12" :sm="24">
          <el-form-item label="时间 ">
            <el-date-picker v-model="searchForm.time" type="daterange" start-placeholder="开始时间" end-placeholder="结束时间"
              format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" default-time />
          </el-form-item>
        </el-col>
        <el-form-item>
          <el-button type="primary" @click="getOrderList">查询</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-upload style="margin: 0px 20px 0px 0px;" v-model:file-list="fileList" class="upload-demo"
            :show-file-list="false" :action="BaseUrl + '/upload/order/delivery'" :headers="{ Authorization: token }"
            :multiple="false" :on-success="handleSuccess" :on-error="handleError">
            <el-button :icon="Upload" type="primary">批量上传发货</el-button>
          </el-upload>
          <el-button :icon="Download" @click="hamdleDownload('send')">下载批量发货模板</el-button>
          <el-upload style="margin: 0px 20px 0px 20px;" v-model:file-list="fileList" class="upload-demo"
            :show-file-list="false" :action="BaseUrl + '/upload/order/take/delivery'"
            :headers="{ Authorization: token }" :multiple="false" :on-success="handleSuccess2" :on-error="handleError2">
            <el-button :icon="Upload" type="primary">批量上传收货</el-button>
          </el-upload>
          <el-button :icon="Download" @click="hamdleDownload('receive')">下载批量收货模板</el-button>
        </el-form-item>
      </el-row>

    </el-form>

  </el-card>
  <el-card style="margin-top: 10px;">
    <el-button type="primary" :class="!isDisabled ? 'button-class' : 'button_false'" style="margin-bottom: 20px;"
      :disabled="isDisabled" @click="hamdleBatchSend">批量发货</el-button>
    <el-button type="primary" :class="!isDisabled ? 'button-class' : 'button_false'" style="margin-bottom: 20px;"
      :disabled="isDisabled" @click="hamdleBatchReceive">批量收货</el-button>
    <el-button :icon="Download" style="margin-bottom: 20px" @click="exportExcel">导出</el-button>


    <el-table v-loading="loading" :data="orderListData" style="width: 100%" ref="multipleTableRef"
      :header-cell-style="{ background: '#f7f8fa', color: '#000' }" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单信息" width="235">
        <template #default="scope">
          <div class="order">
            <div>订单编号：{{ scope.row.orderId }}</div>
            <div class="time">下单时间：{{ scope.row.statusPayedTime }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="支付单号" align="center" width="200">
        <template #default="scope">
          <div class="leader">
            <div> {{ scope.row.payTransId }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="商品信息" width="250">
        <template #default="scope">
          <div class="goodsInfo">
            <el-image style="width: 60px;height:60px;border-radius:5px;" :src="scope.row.thumbail" lazy></el-image>
            <div class="left" style="width:130px;">
              <div class="goodsName" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{
      scope.row.goodsName }}</div>
              <div :class="['info', scope.row.orderTypeStr == '自提' ? 'blue' : '']">{{ scope.row.orderTypeStr }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单价(元)/数量" align="center" width="100">
        <template #default="scope">
          <div class="price">
            <div class="price-title">{{ scope.row.amount }}</div>
            <div>共&nbsp;{{ scope.row.goodsCount }}&nbsp;件</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="买家/收货人" align="center" width="150">
        <template #default="scope">
          <div class="buyer">
            <div>{{ scope.row.userName }}</div>
            <div class="top">{{ scope.row.userMobile }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="团长" width="200">
        <template #default="scope">
          <div class="leader">
            <div> 团长：{{ scope.row.leaderName }}</div>
            <div> 手机：{{ scope.row.leaderMobile }}</div>
            <div> 地址：{{ scope.row.address }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="orderStatus" label="订单状态" align="center" width="120">
        <template #default="scope">
          <div> {{ scope.row.orderStatus === 1000 ? '待付款' : scope.row.orderStatus === 1001 ? '已支付' :
      scope.row.orderStatus === 2001 ? '待收货' : scope.row.orderStatus === 2002 ? '后台确认收货' : scope.row.orderStatus
        === 3001 ? '用户确认收货' : scope.row.orderStatus === 9000 ? '已取消' : scope.row.orderStatus === 8000 ? '错误' : ''
            }}</div>
        </template>
      </el-table-column>

      <el-table-column prop="refundStatus" label="订单退款状态" align="center" width="120">
        <template #default="scope">
          <div> {{ scope.row.refundStatus === 0 ? '未申请退款' : scope.row.refundStatus === 1 ? '申请退款' :
      scope.row.refundStatus === 2 ? '退款中' : scope.row.refundStatus === 3 ? '退款失败' : scope.row.refundStatus === 4
        ? '退款成功' : scope.row.orderStatus === 5 ? '后台手动退款成功' : '' }}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template #default="scope">
          <span class="operation" v-if="scope.row.orderStatus === 1001"
            @click="hamdleBatchSend(scope.row.orderId, 'single')">发货</span>
            <span class="operation" v-if="scope.row.payStatus === 1"
            @click="hamdleRefund(scope.row.orderId, 'single')">退款</span>
          <span class="operation" v-if="scope.row.orderStatus === 2001"
            @click="hamdleBatchReceive(scope.row.orderId, 'single')">收货</span>
          <span v-loading.fullscreen.lock="fullscreenLoading" class="operation"
            @click="handleDetail(scope.row.id)">查看详情</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" v-model:page-size="pages.pageSize"
        v-model:current-page="pages.pageNo" :page-sizes="[10, 20, 50, 100, 200, 500]" :total="total"
        @size-change="tableHandleSizeChange" @current-change="tableHandleChange" />
    </div>
  </el-card>
  <!-- 详情弹框 -->
  <el-dialog v-model="dialogVisible" title="订单详情" width="900px">
    <div class="detail_dialog">
      <div class="orderNumber">
        <p>订单编号：<span class="num">{{ detail.orderNumber }}</span></p>
        <p>下单时间：<span class="num" v-if="detail.statusPayedTime">{{ detail.statusPayedTime }}</span></p>
      </div>
      <div class="orderStatus">
        <!-- 订单状态:1000-待付款,1001-已支付(待发货),2001-待收货,2002-后台确认收货（已完成),3001-用户点击确认收货(已完成),9000-已取消,-8000-错误 -->
        <p class="big">
          {{ detail.orderStatus === 1000 ? '待付款' : detail.orderStatus === 1001 ? '已支付' : detail.orderStatus === 2001 ?
      '待收货' : detail.orderStatus === 2002 ? '后台确认收货（已完成' : detail.orderStatus === 3001 ? '用户点击确认收货' :
        detail.orderStatus === 9000 ? '已取消' : detail.orderStatus === 8000 ? '错误' : '' }}
        </p>
      </div>
      <div class="order_status">
        <div class="status_box">
          <p class="yuan" :class="detail.orderStatus >= 1000 && detail.orderStatus <= 9000 ? 'borderColor' : ''">1
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
          <p class="yuan" :class="detail.orderStatus >= 1001 && detail.orderStatus < 8000 ? 'borderColor' : ''">2
          </p>
          <p :class="detail.orderStatus >= 1001 && detail.orderStatus < 8000 ? 'color' : ''">已支付</p>
          <p :class="detail.orderStatus >= 1001 && detail.orderStatus < 8000 ? 'color' : ''">{{
      detail.statusPayedTime || '暂无时间信息' }}</p>
        </div>
        <p class="line" :class="detail.orderStatus >= 2001 && detail.orderStatus < 8000 ? 'bg_color' : ''"></p>
        <div class="status_box">
          <p class="yuan" :class="detail.orderStatus >= 2001 && detail.orderStatus < 8000 ? 'borderColor' : ''">3
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
          <p>配送方式:<span class="num">{{ detail.orderType === 1 ? '快递' : detail.orderType === 2 ? '自提' : '' }}</span></p>
          <p v-if="detail.orderStatus >= '2001' && detail.orderStatus != '9000' && detail.orderStatus != '8000'">
            发货时间:<span class="num">{{
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
      <p style="color: #101010;font-size: 16px;font-weight: 600;"
        v-if="detail.orderGoods && detail.orderGoods.length > 0">
        商品明细</p>
      <div class="product" style="margin-top: 20px;" v-if="detail.orderGoods && detail.orderGoods.length > 0">
        <el-table :data="detail.orderGoods" style="width: 100%"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
          <el-table-column prop="type" label="商品" align="center">
            <template #default="scope">
              <img style="width: 40px;height: 40px;margin: 0px 5px;" :src="scope.row.thumbail" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="salePrice" label="单价" align="center" />
          <el-table-column prop="number" label="数量" align="center" />
          <el-table-column prop="couponAmt" label="优惠金额" align="center" />
          <el-table-column prop="amount" label="总价" align="center" />
        </el-table>
      </div>
      <p style="color: #101010;font-size: 16px;font-weight: 600;"
        v-if="detail.orderSettlePuts && detail.orderSettlePuts.length > 0">结算佣金</p>
      <div class="product" style="margin-top: 20px;" v-if="detail.orderSettlePuts && detail.orderSettlePuts.length > 0">
        <el-table :data="detail.orderSettlePuts" style="width: 100%"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
          <el-table-column prop="settleAmount" label="结算佣金" align="center" />
          <el-table-column prop="status" label="结算状态" align="center">
            <template #default="scope">
              <span>{{ scope.row.status === 0 ? '未结算' : scope.row.status === 1 ? '已结算' :
      scope.row.status === 2 ?
        '已退回' : '' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="settleType" label="结算类型" align="center">
            <template #default="scope">
              <span>{{ scope.row.settleType === 1 ? '邀请购买' :scope.row.settleType===2?'团长自购': '' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" align="center" />
          <el-table-column prop="remark" label="备注" align="center" />
        </el-table>
      </div>


      <p style="color: #101010;font-size: 16px;font-weight: 600;"
        v-if="detail.coupons && detail.coupons.length > 0">优惠券信息</p>
      <div class="product" style="margin-top: 20px;" v-if="detail.coupons && detail.coupons.length > 0">
        <el-table :data="detail.coupons" style="width: 100%"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
          <el-table-column prop="name" label="优惠券名称" align="center" />
          <el-table-column prop="amount" label="优惠券金额" align="center"/>
          <el-table-column prop="createTime" label="创建时间" align="center"/>
          <el-table-column prop="updateTime" label="更新时间" align="center" />
        </el-table>
      </div>
    </div>
  </el-dialog>

</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { prodList, orderList, orderDetail, orderBatchSend, orderBatchReceive, leaderList, exportOrder ,orderRefund} from "../../api/modules";
import dayjs from "dayjs";
import {
  Download, Upload
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRoute } from "vue-router";
const route = useRoute()

const BaseUrl = import.meta.env.VITE_API_BASE_URL
const pUidOptions = ref()
const getLeaderList = async () => {
  const res = await leaderList({
    pageNo: 1,
    pageSize: 10000,
  })
  pUidOptions.value = res.data.list
}
const searchParams = {
  orderNumber: null,
  pUid: null,
  userName: null,
  leaderName: null,
  leaderMobile: null,
  userMobile: null,
  goodsName: null,
  orderType: null,
  orderStatus: null,
  refundStatus: null,
  startDate: null,
  endDate: null,
  time: null,
  userId: null,
  goodsId: null
}

const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
  pageNo: 1,
  pageSize: 20,

})
const total = ref(0)
let orderListData = ref([])
const getOrderList = async () => {
  loading.value = true
  const res = await orderList({
    orderNumber: searchForm.value.orderNumber,
    pUid: searchForm.value.pUid,
    userName: searchForm.value.userName,
    leaderName: searchForm.value.leaderName,
    leaderMobile: searchForm.value.leaderMobile,
    userMobile: searchForm.value.userMobile,
    goodsName: searchForm.value.goodsName,
    orderType: searchForm.value.orderType,
    orderStatus: searchForm.value.orderStatus,
    refundStatus: searchForm.value.refundStatus,
    startDate: searchForm.value.startDate,
    endDate: searchForm.value.endDate,
    userId: searchForm.value.userId,
    goodsId: searchForm.value.goodsId
    , ...pages.value
  })
  loading.value = false
  console.log(res,'res============>')
  orderListData.value = res.data.list
  total.value = res.data.total
}

const tableHandleSizeChange = (e) => {
  pages.value.pageSize = e
  getOrderList()
}
const tableHandleChange = (e) => {
  pages.value.pageNo = e
  getOrderList()
}
const resetForm = () => {
  searchForm.value = { ...searchParams }
  getOrderList()
}
// 全选
const isDisabled = ref(true)
const multipleTableRef = ref()
const multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
  if (multipleSelection.value && multipleSelection.value.length > 0) {
    isDisabled.value = false
  } else {
    isDisabled.value = true
  }
}
//退款 
const hamdleRefund = async (orderNumber) => {
  const res = await orderRefund(orderNumber)
  if (res.code === 0) {
    ElMessage.success('退款 成功');
    getOrderList()
  } else {
    ElMessage.error(res.msg);
  }

}
// 批量发货
const hamdleBatchSend = async (e, type) => {
  let orderIds = []
  if (type === 'single') {// 单个发货
    orderIds.push(e)
  } else if (multipleSelection.value && multipleSelection.value.length > 0) {
    multipleSelection.value.map(item => {
      orderIds.push(item.orderId)
    })
  }
  const res = await orderBatchSend(JSON.stringify({ orderIds: orderIds }))
  if (res.code === 0) {
    ElMessage.success('发货成功');
    isDisabled.value = true
    multipleTableRef.value.clearSelection()
    getOrderList()
  } else {
    ElMessage.error(res.msg);
  }

}
// 批量收货
const hamdleBatchReceive = async (e, type) => {
  let orderIds = []
  if (type === 'single') {// 单个收货
    orderIds.push(e)
  } else if (multipleSelection.value && multipleSelection.value.length > 0) {
    multipleSelection.value.map(item => {
      orderIds.push(item.orderId)
    })
  }
  const res = await orderBatchReceive(JSON.stringify({ orderIds: orderIds }))
  if (res.code === 0) {
    ElMessage.success('收货成功');
    isDisabled.value = true
    multipleTableRef.value.clearSelection()
    getOrderList()
  } else {
    ElMessage.error(res.msg);
  }
}
// 批量上传发货
const handleSuccess = (response, file, fileList) => {
  if (response.code === 0) {
    ElMessage.success('上传成功');
  } else {
    ElMessage.error(response.msg);
  }
  getOrderList()

}
const handleError = (err, file, fileList) => {
  ElMessage.error('上传失败');

}
// 批量上传收货
const handleSuccess2 = (response, file, fileList) => {
  if (response.code === 0) {
    ElMessage.success('上传成功');
  } else {
    ElMessage.error(response.msg);
  }
  getOrderList()

}
const handleError2 = (err, file, fileList) => {
  ElMessage.error('上传失败');
}
// 下载模板
const hamdleDownload = (type) => {
  let url
  if (type === 'send') {
    url = 'https://qingchuntai2.oss-cn-beijing.aliyuncs.com/2024/02/20/%E6%89%B9%E9%87%8F%E5%8F%91%E8%B4%A7.xlsx'
  } else {
    url = 'https://qingchuntai2.oss-cn-beijing.aliyuncs.com/2024/02/20/%E6%89%B9%E9%87%8F%E6%94%B6%E8%B4%A7%E6%93%8D%E4%BD%9C%E8%A1%A8.xlsx'
  }
  window.location.href = url
}


// 订单详情
const dialogVisible = ref(false)
const detail = ref()
const fullscreenLoading = ref(false)
const handleDetail = async (id) => {
  fullscreenLoading.value = true
  const res = await orderDetail(id)
  if (res.code === 0) {
    detail.value = res.data
    detail.value.orderGoods[0].couponAmt = detail.value.couponAmt
    fullscreenLoading.value = false
    dialogVisible.value = true
  }

}
const prodListData = ref([])

const getProdListByName = async (query) => {
  const res = await prodList({ name: query, pageNo: 1, pageSize: 100000000 })
  prodListData.value = res.data.list
}

const getProdList = async () => {
  const res = await prodList({ pageNo: 1, pageSize: 10 })
  prodListData.value = res.data.list
}

const exportExcel = async () => {
  loading.value = true
  const res = await exportOrder({
    orderNumber: searchForm.value.orderNumber,
    pUid: searchForm.value.pUid,
    userName: searchForm.value.userName,
    leaderName: searchForm.value.leaderName,
    leaderMobile: searchForm.value.leaderMobile,
    userMobile: searchForm.value.userMobile,
    goodsName: searchForm.value.goodsName,
    orderType: searchForm.value.orderType,
    orderStatus: searchForm.value.orderStatus,
    refundStatus: searchForm.value.refundStatus,
    startDate: searchForm.value.startDate,
    endDate: searchForm.value.endDate,
    userId: searchForm.value.userId,
    goodsId: searchForm.value.goodsId
  })

  loading.value = false
  var blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
  const fileName = '订单信息表'
  const elink = document.createElement('a')
  if ('download' in elink) { // 非IE下载
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
  } else { // IE10+下载
    navigator.msSaveBlob(blob, fileName)
  }
}

onMounted(() => {
  getLeaderList()
  if (route.query.userId) {
    searchForm.value.userId = route.query.userId
  }
  if (route.query.orderId) {
    searchForm.value.orderNumber = route.query.orderId
  }
  getOrderList()
  getProdList()
})

watch(searchForm.value, (newValue, oldValue) => {
  // console.log(newValue, oldValue)
if(newValue.time&&newValue.time[0]){
  searchForm.value.startDate = dayjs(newValue.time[0]).format('YYYY-MM-DD HH:mm:ss')
  searchForm.value.endDate = dayjs(newValue.time[1]).format('YYYY-MM-DD HH:mm:ss')
}
}
  , { deep: true })

</script>
<style lang="scss" scoped>
.order {
  text-align: left;
}

.goodsInfo {
  display: flex;
  flex-direction: row;

  .el-image__inner {
    width: 60px;
    height: 60px;
  }

  .left {
    margin-left: 20px;

    .goodsName {
      white-space: nowrap;
    }

    .info {
      display: block;
      width: 40px;
      line-height: 20px;
      margin-top: 10px;
      text-align: center;
      border: 1px solid #F53F3F;
      border-radius: 3px;
      padding: 0 5px;

      &.blue {
        border: 1px solid blue;
      }
    }
  }
}

.price {
  text-align: center;

  .price-title {
    color: #F53F3F;
  }
}

.demo-form-inline {
  ::deep(.el-form-item__content .el-input) {
    width: 100%;
  }
}
</style>

<style lang="scss" scoped>
.button-class {
  color: #ffffff;
  background-color: #155bd4;
  border-color: #155bd4;
}

.button_false {
  background-color: #ffffff;
  color: #155bd4;
}

.pagination {
  margin-top: 20px;
}

.operation {
  color: #4060c7;
  margin: 0px 5px;
  cursor: pointer;
}

.detail_dialog {
  font-size: 16px;
  font-weight: 500;
  color: #101010;
  margin-top: -20px;

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
      width: 200px;
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

    .left {
      width: 25%;

    }

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