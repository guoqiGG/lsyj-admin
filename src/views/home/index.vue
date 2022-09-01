<template>
  <el-row class="data-lists">
    <el-col :span="9"
      ><div class="data-item-one flx-row">
        <div class="item-left">
          <img src="../../assets/home.png" alt="" srcset="" />
        </div>
        <div class="item-right">
          <div class="item-right-top">
            <div class="tit">本期活动GMX</div>
            <div class="num">1523.53w</div>
          </div>
          <div class="line"></div>
          <div class="item-right-bottom flx-row">
            <div class="item">
              <div class="tit">类目一</div>
              <div class="num">53w</div>
            </div>
            <div class="item">
              <div class="tit">类目一</div>
              <div class="num">53w</div>
            </div>
            <div class="item">
              <div class="tit">类目一</div>
              <div class="num">53w</div>
            </div>
          </div>
        </div>
      </div></el-col
    >
    <el-col :span="9"
      ><div class="data-item-two">
        <div class="item">
          <div class="item-des flx-row">
            <img src="../../assets/icon1.png" alt="" />
            <div class="right">
              <div class="num">934.7w <span>29.74</span></div>
              <div class="txt">今日DAU</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-des flx-row" style="margin-right: 0px">
            <img src="../../assets/icon2.png" alt="" />
            <div class="right">
              <div class="num">264.7w <span>29.74</span></div>
              <div class="txt">今日DAU</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-des flx-row">
            <div class="right border-right-1px">
              <div class="num">24.93w</div>
              <div class="txt">今日DAU</div>
            </div>
            <div class="right">
              <div class="num">984.52w</div>
              <div class="txt">总用户数</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-des flx-row" style="margin-right: 0px">
            <div class="right border-right-1px">
              <div class="num">84.52w</div>
              <div class="txt">GPS</div>
            </div>
            <div class="right">
              <div class="num">84.52w</div>
              <div class="txt">特权</div>
            </div>
          </div>
        </div>
      </div></el-col
    >
    <el-col :span="6">
      <div class="data-item-three">
        <div class="tit">待处理</div>
        <div class="content">
          <div class="item">
            <div class="item-data">
              <div class="tit">退款申请</div>
              <div class="num">89 <span>条</span></div>
              <el-icon class="icon"><ArrowRight /></el-icon>
            </div>
          </div>
          <div class="item">
            <div class="item-data">
              <div class="tit">退款申请</div>
              <div class="num">89 <span>条</span></div>
              <el-icon class="icon"><ArrowRight /></el-icon>
            </div>
          </div>
          <div class="item">
            <div class="item-data">
              <div class="tit">退款申请</div>
              <div class="num">89 <span>条</span></div>
              <el-icon class="icon"><ArrowRight /></el-icon>
            </div>
          </div>
          <div class="item">
            <div class="item-data">
              <div class="tit">退款申请</div>
              <div class="num">89 <span>条</span></div>
              <el-icon class="icon"><ArrowRight /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row class="dataLayer">
    <el-col :span="18">
      <div class="flx-row">
        <div class="datalayer-echarts"><GMVnearly></GMVnearly></div>
        <div class="datalayer-echarts"><linenearly></linenearly></div>
      </div>
      <div class="table-data">
        <div class="tit">主题页列表</div>
        <el-table :data="tableData"> </el-table>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="data-item-three">
        <div class="tit">常用功能</div>
        <div class="content">
          <div class="item">
            <div class="item-data">
              <div class="tit">退款申请</div>
              <div class="num">89 <span>条</span></div>
              <el-icon class="icon"><ArrowRight /></el-icon>
            </div>
          </div>
          <div class="item">
            <div class="item-data">
              <div class="tit">退款申请</div>
              <div class="num">89 <span>条</span></div>
              <el-icon class="icon"><ArrowRight /></el-icon>
            </div>
          </div>
          <div class="item">
            <div class="item-data">
              <div class="tit">退款申请</div>
              <div class="num">89 <span>条</span></div>
              <el-icon class="icon"><ArrowRight /></el-icon>
            </div>
          </div>
          <div class="item">
            <div class="item-data">
              <div class="tit">退款申请</div>
              <div class="num">89 <span>条</span></div>
              <el-icon class="icon"><ArrowRight /></el-icon>
            </div>
          </div>
          <div class="item">
            <div class="item-data">
              <div class="tit">退款申请</div>
              <div class="num">89 <span>条</span></div>
              <el-icon class="icon"><ArrowRight /></el-icon>
            </div>
          </div>
          <div class="item">
            <div class="item-data">
              <div class="tit">退款申请</div>
              <div class="num">89 <span>条</span></div>
              <el-icon class="icon"><ArrowRight /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from "vue";
import GMVnearly from "./components/GMVnearly.vue";
import linenearly from "./components/linenearly.vue";
const tableData = ref([]);
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
