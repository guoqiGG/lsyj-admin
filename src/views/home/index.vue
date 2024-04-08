<template>
  <el-row>
    <div class="order-all-num white-basic">
      <el-col :span="24">
        <div class="top">
          <div class="top-title">某段时间内商品销量</div>
          <el-date-picker style="margin-left: 20px;" @change="getHomeOrderTimeData" v-model="searchForm.date"
            type="date" placeholder="日期" format="YYYY-MM-DD" />
        </div>
      </el-col>
      <div class="row-bg" style="margin-top: 10px;">
        <div class="num-item-box">
          <div class="wait-payment-num order-num-item">
            <div class="item-box">
              <div class="words">商品数量</div>
              <div class="number"><span class="text">{{ dataList.goodsNumber || 0 }}</span></div>
            </div>
            <div class="item-img">
              <img src="~@/assets/wait-payment-num.png">
            </div>
          </div>
        </div>

        <div class="num-item-box">
          <div class="wait-receiving-goods-num order-num-item">
            <div class="item-box">
              <div class="words">商品总金额</div>
              <div class="number"><span class="text">{{ dataList.goodsTotalAmount || 0 }}</span></div>
            </div>
            <div class="item-img">
              <img src="~@/assets/wait-receiving-goods-num.png">
            </div>
          </div>
        </div>
        <div class="num-item-box">
          <div class="wait-delivery-num order-num-item">
            <div class="item-box">
              <div class="words">优惠过后的商品金额</div>
              <div class="number"><span class="text">{{ dataList.goodsPreferentialAmount || 0 }}</span></div>
            </div>
            <div class="item-img">
              <img src="~@/assets/wait-delivery-num.png">
            </div>
          </div>
        </div>
        <div class="num-item-box">
          <div class="wait-evaluate-num order-num-item">
            <div class="item-box">
              <div class="words">订单金额</div>
              <div class="number"><span class="text">{{ dataList.orderAmount || 0 }}</span></div>
            </div>
            <div class="item-img">
              <img src="~@/assets/wait-evaluate-num.png">
            </div>
          </div>
        </div>
        <div class="num-item-box">
          <div class="wait-after-sales-num order-num-item">
            <div class="item-box">
              <div class="words">订单数量</div>
              <div class="number"><span class="text">{{ dataList.orderNumber || 0 }}</span></div>
            </div>
            <div class="item-img">
              <img src="~@/assets/wait-after-sales-num.png">
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-row>
  <el-row class="dataLayer" style="margin-top: 10px;">
    <el-col :lg="12" :md="12" :sm="24">
      <div class="datalayer-echarts" :class="{ shake: disabled }">
        <order></order>
      </div>
    </el-col>
    <el-col :lg="12" :md="12" :sm="24">
      <div class="datalayer-echarts" :class="{ shakeRight: disabled }">
        <GoodsAmount></GoodsAmount>
      </div>
    </el-col>
    <el-col :lg="12" :md="12" :sm="24">
      <div class="datalayer-echarts" :class="{ shake: disabled }">
        <LeaderTopSales10></LeaderTopSales10>
      </div>
    </el-col>
    <el-col :lg="12" :md="12" :sm="24">
      <div class="datalayer-echarts" :class="{ shakeRight: disabled }">
        <GoodsTopSales10></GoodsTopSales10>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import LeaderTopSales10 from './components/leaderTopSales10.vue'
import GoodsTopSales10 from './components/goodsTopSales10.vue'
import GoodsAmount from './components/goodsAmount.vue'
import Order from './components/order.vue'
import { homeOrderTime } from '../../api/modules'
import { options } from './options.js'
import dayjs from 'dayjs'
const tableData = ref([])
const notList = ref([])
const disabled = ref(false)

const searchForm = ref({
  date: dayjs(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
})
const dataList = ref({})
const DeleteItem = (index) => {
  tableData.value.splice(index, 1)
}
const getHomeOrderTimeData = async () => {
  const res = await homeOrderTime({
    date: searchForm.value.date
  })
  dataList.value = res.data
  dataList.value = {
    goodsNumber: res.data?.goodsNumber ? res.data?.goodsNumber : 0,
    goodsPreferentialAmount: res.data?.goodsPreferentialAmount ? res.data?.goodsPreferentialAmount : 0,
    goodsTotalAmount: res.data?.goodsTotalAmount ? res.data?.goodsTotalAmount : 0,
    orderAmount: res.data?.orderAmount ? res.data?.orderAmount : 0,
    orderNumber: res.data?.orderNumber ? res.data?.orderNumber : 0,
  }
}
const initData = () => {
  getHomeOrderTimeData()
}

onMounted(() => {
  initData()
  disabled.value = true
  setTimeout(() => {
    disabled.value = false
  }, 1500)
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

<style lang="scss" scoped>
.con {
  padding: 20px;
  box-sizing: border-box;
}

.top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  .top-title {
    font-size: 16px;
  }

  .el-date-picker {}

  :deep(.el-range-editor) {
    &.el-input__inner {
      width: 200px;
    }
  }
}

// 订单栏项
.order-all-num {
  width: 100%;

  .row-bg {
    width: 100%;
    display: flex;
    .num-item-box {
      position: relative;
      flex: 1;
      padding-right: 20px;
      box-sizing: border-box;
    }

    .num-item-box:last-child {
      padding-right: 0;
    }
  }

  // 基本信息样式
  .order-num-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 4px;
    .item-box {
      position: absolute;
      z-index: 1;
      left: 30px;

      .words {
        font-size: 14px;
        font-weight: bold;
        color: #fff;
      }

      .number {
        width: 160px;
        word-break: break-all;
        font-size: 26px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #fff;
        margin-top: 10px;

        .text {
          padding-right: 20px;
        }

        // .ratio{
        //   font-size: 12px;
        //   font-weight: 400;
        //   color: #FFFFFF;
        //   opacity: 0.7;
        // }
      }

      // .ratio{
      //   font-size: 12px;
      //   font-weight: 400;
      //   color: #FFFFFF;
      //   opacity: 0.7;
      // }
      .seq {
        display: flex
      }

      .up {
        color: #3DD598;
      }

      .up-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin: 0 12px 0 4px;
        background: url('~@/assets/ic-arrow-narrow-up.png')
      }

      .down {
        color: #F0142F;
      }

      .down-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin: 0 12px 0 4px;
        background: url('~@/assets/ic-arrow-narrow-down.png')
      }

      .compare {
        font-size: 14px;
      }
    }

    .item-img {
      position: relative;
      display: block;
      margin-top: 10px;
      width: 100%;
      height: 150px;

      // transition: .35s;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
}

// 白色背景 标题样式
.white-basic {
  background: #fff;
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 20px;

  .title-basic {
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: bold;
    line-height: 24px;
    color: #333333;
    opacity: 1;
  }
}
</style>
