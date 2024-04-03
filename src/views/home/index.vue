<template>
  <el-row class="data-lists">
    <div class="flx-row">
      <div class="top">
        <div class="top-title">某段时间内商品销量</div>
        <el-date-picker @change="getHomeOrderTimeData" v-model="searchForm.date" type="date"
         placeholder="日期" format="YYYY-MM-DD"  />
      </div>
    </div>
    
  </el-row>
  <el-row class="dataLayer">
    <el-col :span="24">
      <div class="flx-row">
        <div class="datalayer-echarts"  :class="{ shake: disabled }">
          <order></order>
        </div>
        <div class="datalayer-echarts"  :class="{ shakeRight: disabled }">
          <GoodsAmount></GoodsAmount>
        </div>
      </div>
    </el-col>
    <!-- <el-col :span="6">
      <div class="data-item-three" :class="{ shakeRight: disabled }">
        <div class="tit">常用功能</div>
        <div class="content">
          <div class="item">
            <div class="item-data flx-row">
              <div class="tit">
                <el-icon>
                  <Histogram />
                </el-icon>订单列表
              </div>
              <el-icon class="icon">
                <ArrowRight />
              </el-icon>
            </div>
          </div>
          <div class="item">
            <div class="item-data flx-row">
              <div class="tit">
                <el-icon>
                  <Avatar />
                </el-icon>用户列表
              </div>
              <el-icon class="icon">
                <ArrowRight />
              </el-icon>
            </div>
          </div>
          <div class="item">
            <div class="item-data">
              <div class="tit">
                <el-icon>
                  <HomeFilled />
                </el-icon>首页配置
              </div>
              <el-icon class="icon">
                <ArrowRight />
              </el-icon>
            </div>
          </div>
          <div class="item">
            <div class="item-data">
              <div class="tit">
                <el-icon>
                  <PictureFilled />
                </el-icon>主题配置
              </div>
              <el-icon class="icon">
                <ArrowRight />
              </el-icon>
            </div>
          </div>
          <div class="item">
            <div class="item-data">
              <div class="tit">
                <el-icon>
                  <Menu />
                </el-icon>活动管理
              </div>
              <el-icon class="icon">
                <ArrowRight />
              </el-icon>
            </div>
          </div>
          <div class="item">
            <div class="item-data">
              <div class="tit">
                <el-icon>
                  <Tools />
                </el-icon>退款申请
              </div>
              <el-icon class="icon">
                <ArrowRight />
              </el-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="notice">
        <div class="notice-news">
          <img src="../../assets/homebg.jpeg" alt="" />
          <div class="txt one-cut-txt">
            查看更多查看更多查看更多查看更查看更多查看更多查看更多查看更
          </div>
        </div>
      </div>
      <div class="data-item-three" :class="{ shakeRight: disabled }">
        <div class="tit">公告栏</div>
        <div class="notice-lists">
          <div class="item one-cut-txt" v-for="item in notList" :key="item.id">
            <span class="type">通知</span> {{ item.text }}
          </div>
        </div>
      </div>
    </el-col> -->
    <el-col :span="24">
      <div class="flx-row">
        <div class="datalayer-echarts" :class="{ shake: disabled }">
          <LeaderTopSales10></LeaderTopSales10>
        </div>
        <div class="datalayer-echarts" :class="{ shakeRight: disabled }">
          <GoodsTopSales10></GoodsTopSales10>
        </div>
      </div>
      <!-- <div class="table-data" :class="{ shake: disabled }">
        <div class="tit">主题页列表</div>
        <div class="table-box">
          <el-table :data="tableData" :header-cell-style="{
      background: '#FAFBFDFF',
      fontWeight: '400',
      fontSize: '14px',
      padding: '0',
      fontHeight: '36px',
      height: '36px',
    }" :row-style="{
      fontWeight: '400',
      fontSize: '14px',
      padding: '0',
      fontHeight: '44px',
      height: '44px',
    }">
            <el-table-column v-for="item in options" :key="item.type" :prop="item.props" :label="item.label"
              :width="item.width" :align="item.align" show-overflow-tooltip :fixed="item.fixed">
              <template v-slot:default="scope" v-if="item.props === 'type'">
                <span class="type" v-if="scope.row[item.props] == true">外部链接</span>
                <span class="type error-type" v-if="scope.row[item.props] == false">内部链接</span>
              </template>
              <template v-slot:default="scope" v-if="item.props === 'state'">
                <span v-if="scope.row[item.props] == true">
                  <i class="state"></i>已上线</span>
                <span v-if="scope.row[item.props] == false">
                  <i class="state error-state"></i>已下线</span>
              </template>
              <template v-slot:default="scope" v-if="item.props === 'actions'">
                <el-icon class="icon-edit" @click="editorClick(scope.row)">
                  <Edit />
                </el-icon>
                <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled" icon-color="#626AEF"
                  title="确认删除该主题?" @confirm="DeleteItem(index)">
                  <template #reference>
                    <el-icon class="icon-dele">
                      <Delete />
                    </el-icon>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div> -->
    </el-col>

  </el-row>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import LeaderTopSales10 from './components/leaderTopSales10.vue'
import GoodsTopSales10 from './components/goodsTopSales10.vue'
import GoodsAmount from './components/goodsAmount.vue'
import Order from './components/order.vue'
import {homeOrderTime} from '../../api/modules'
import { options } from './options.js'
const tableData = ref([])
const notList = ref([])
const disabled = ref(false)

const searchForm=ref({
  date:null
})
const dataList=ref(null)
const DeleteItem = (index) => {
  tableData.value.splice(index, 1)
}
const getHomeOrderTimeData= async()=>{
  const res= await homeOrderTime()
  console.log(res)
  dataList.value=res.data
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
  justify-content: space-between;

  .top-title {
    font-size: 16px;
    flex: 1;
  }

  .el-date-picker {
    flex: 1;
  }

  :deep(.el-range-editor) {
    &.el-input__inner {
      width: 200px;
    }
  }
}
</style>

