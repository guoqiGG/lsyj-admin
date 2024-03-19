<template>

  <el-card>

    <el-form :inline="true" :model="searchForm" class="demo-form-inline" lable-width="100px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="订单编号">
            <el-input v-model="searchForm.orderNumber" placeholder="订单编号" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户名称">
            <el-input v-model="searchForm.userName" placeholder="用户名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户号码">
            <el-input v-model="searchForm.userMobile" placeholder="用户手机号" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="团长名称">
            <el-input v-model="searchForm.leaderName" placeholder="团长名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="团长号码">
            <el-input v-model="searchForm.leaderMobile" placeholder="团长手机号" clearable />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
           <el-form-item label="商品名称">
        <el-input v-model="searchForm.goodsName" placeholder="商品名称" clearable />
      </el-form-item> 
        </el-col> -->
        <el-col :span="6">
          <el-form-item label="订单类型">
            <el-select style="width:92%" v-model="searchForm.orderType" placeholder="请选择" clearable>
              <el-option label="自提" value="1" />
              <el-option label="快递" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单状态">
            <el-select style="width:92%" v-model="searchForm.orderStatus" placeholder="请选择" clearable>
              <el-option label="待付款" value="1" />
              <el-option label="待发货" value="2" />
              <el-option label="待收货" value="1" />
              <el-option label="后台确认收货(已完成)" value="2" />
              <el-option label="用户确认收货(已完成)" value="1" />
              <el-option label="已取消" value="2" />
              <el-option label="错误" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="退款状态">
            <el-select style="width:92%" v-model="searchForm.refundStatus" placeholder="请选择" clearable>
              <el-option label="未申请退款" value="1" />
              <el-option label="申请退款" value="2" />
              <el-option label="退款中" value="1" />
              <el-option label="退款失败" value="2" />
              <el-option label="退款成功" value="1" />
              <el-option label="后台手动退款成功" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-form-item label="时间">
          <el-date-picker v-model="searchForm.time" type="datetimerange" range-separator="-" start-placeholder="开始时间"
            end-placeholder="结束时间" />
        </el-form-item> -->

        <el-form-item>
          <el-button type="primary" @click="getOrderList">查询</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>

  </el-card>
  <el-card style="margin-top: 10px;">
    <el-table v-loading="loading" :data="orderListData" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column label="订单信息">
        <template #default="scope">
          <div class="order">
            <div>订单编号：{{ scope.row.orderNumber }}</div>
            <div class="time">下单时间：{{ scope.row.statusPayedTime }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品信息">
        <template #default="scope">
          <div class="goodsInfo">
            <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" lazy></el-image>
            <div class="left">
              <div class="goodsName">{{ scope.row.goodsName }}</div>
              <div :class="['info', scope.row.orderTypeStr == '自提' ? 'blue' : '']">{{ scope.row.orderTypeStr }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单价(元)/数量" align="center">
        <template #default="scope">
          <div class="price">
            <div class="price-title">{{ scope.row.amount }}</div>
            <div>共&nbsp;{{ scope.row.goodsCount }}&nbsp;件</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="买家/收货人">
        <template #default="scope">
          <div class="buyer">
            <div>{{ scope.row.userName }}</div>
            <div class="top">{{ scope.row.userMobile }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="团长">
        <template #default="scope">
          <div class="leader">
            <div> 团长：{{ scope.row.leaderName }}</div>
            <div> 手机：{{ scope.row.leaderMobile }}</div>
            <div> 地址：{{ scope.row.address }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="orderStatus" label="订单状态" />
      <el-table-column prop="refundStatus" label="订单退款状态" />
      <el-table-column label="支付单号">
        <template #default="scope">
          <div class="leader">
            <div> {{ scope.row.payTransId }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default>
          <div class="view">查看详情</div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" v-model:page-size="pages.pageSize"
        v-model:current-page="pages.current" :page-sizes="[10, 20, 50, 100, 200, 500]" :total="pages.total"
        @size-change="tableHandleSizeChange" @current-change="tableHandleChange" />
    </div>
  </el-card>

</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { orderList } from "../../api/modules";
import dayjs from "dayjs";
const searchParams = {
  orderNumber: '',
  userName: '',
  leaderName: '',
  leaderMobile: '',
  userMobile: '',
  goodsName: '',
  orderType: '',
  orderStatus: '',
  refundStatus: '',
  startTime: '',
  endTime: '',
  time: ''
}
const loading = ref(false)
const searchForm = ref({ ...searchParams })
const pages = ref({
  pageNo: 1,
  pageSize: 20,
  total: 0
})
let orderListData = ref([])
const getOrderList = async () => {
  loading.value = true
  const res = await orderList({ ...searchForm.value, ...pages.value })
  loading.value = false
  orderListData.value = res.data.list
  pages.value.total = res.data.total
}

const tableHandleSizeChange = (e) => {
  pages.value.pageSize = e
}
const tableHandleChange = (e) => {
  pages.value.pageNo = e
  getOrderList()
}
const resetForm = () => {
  searchForm.value = { ...searchParams }
}

onMounted(() => {
  getOrderList()
})

watch(searchForm.value, (newValue, oldValue) => {
  searchForm.value.startTime = dayjs(newValue.time[0]).format('YYYY-MM-DD hh:mm:ss')
  searchForm.value.endTime = dayjs(newValue.time[1]).format('YYYY-MM-DD hh:mm:ss')
}
  , { deep: true })

</script>
<style lang="scss">
.order {
  text-align: left;}

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