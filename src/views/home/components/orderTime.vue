<template>
  <div class="con">
    <div class="top">
      <div class="top-title">订单</div>
      <el-date-picker @change="getHomeOrderTime" v-model="searchForm.date" type="daterange"
        start-placeholder="开始时间" end-placeholder="结束时间" format="YYYY-MM-DD" value-format="YYYY-MM-DD" default-time />
    </div>
    <div id="linenearly" style="width: 100%; height: 250px"></div>
  </div>

</template>

<script setup name="GMVnearly">
import * as echarts from 'echarts'
import dayjs from 'dayjs'

import { onMounted, ref, watch } from 'vue'
import { homeOrderTime } from '../../../api/modules'
const searchForm = ref({
  date: [dayjs(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD'), dayjs(new Date(new Date().toLocaleDateString()).getTime()).format('YYYY-MM-DD')],
  startDate: dayjs(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD'),
  endDate: dayjs(new Date(new Date().toLocaleDateString()).getTime()).format('YYYY-MM-DD')
})

const getHomeOrderTime = async () => {
  let startDate = dayjs(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
  let endDate = dayjs(new Date(new Date().toLocaleDateString()).getTime()).format('YYYY-MM-DD')
  try {
    const res = await homeOrderTime({
      startDate: searchForm.value.startDate ? searchForm.value.startDate : startDate,
      endDate: searchForm.value.endDate ? searchForm.value.endDate : endDate,
    })
  } catch (error) {
  }
}

const getEcharts = () => {
  var chartDom = document.getElementById('linenearly')
  var myChart = echarts.init(chartDom)

  const option = {
    tooltip: {
      //鼠标悬停时显示对应数据
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    color: ['#87A2E8FF', '#74CCCCFF', '#73c0de', '#3ba272', '#409eff'],
    // title: {
    //   text: '近一年的DAU/DNU',
    //   top: '8px',
    //   left: '10px',
    //   bottom: '8px',
    //   textStyle: {
    //     color: '#191e24',
    //     fontSize: '14',
    //   },
    // },
    legend: {
      // 图例
      data: ['订单数量', '商品数量', '订单金额', '商品总金额', '优惠后商品金额'],
      top: 8,
      right: 16, // 修改位置
      icon: 'circle', //原型
      textStyle: {
        color: '#191e2480', //字体颜色
      },
    },
    grid: {
      // 上下左右 边距
      top: '8%',
      left: '3%',
      right: '3%',
      bottom: '8%',
      top: '15%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: [
          '3月27日',
          '3月28日',
          '3月28日',
          '3月29日',
          '3月30日',
          '3月31日',
          '4月1日',
        ],
        axisLine: {
          // 轴线的颜色以及宽度
          lineStyle: {
            color: '#A6A6A628',
          },
        },
        axisLabel: {
          // 轴文字的配置
          show: true,
          textStyle: {
            color: '#191e2480',
          },
        },
        splitLine: {
          // 分割线配置
          lineStyle: {
            color: '#A6A6A628',
            // type: "dashed", // 虚线
          },
        },
      },
    ],
    yAxis: [
      {
        min: 0, // 最小值
        // splitNumber: 3, //划分3格
        type: 'value',
        axisLine: {
          // 轴线的颜色以及宽度
          show: false,
        },
        axisLabel: {
          // 轴文字的配置
          show: true,
          //   textStyle: {
          //     color: "#fff",
          //   },
        },
        splitLine: {
          // 分割线配置
          lineStyle: {
            color: '#A6A6A628',
            // type: "dashed",
          },
        },
      },
    ],
    series: [
      {
        name: '订单数量',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: '商品数量',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: '订单金额',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: '商品总金额',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: '优惠后商品金额',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
    ],
  }
  option && myChart.setOption(option)
  window.onresize = () => {
    myChart.resize()
  }
}
onMounted(() => {
  getHomeOrderTime()
  setTimeout(() => {
    getEcharts()
  }, 1000)
})
</script>
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
