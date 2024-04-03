<template>
  <div class="con">
    <div class="top">
      <div class="top-title">订单</div>
      <el-date-picker @change="getHomeOrder" v-model="searchForm.date" type="daterange" start-placeholder="开始时间"
        end-placeholder="结束时间" format="YYYY-MM-DD" value-format="YYYY-MM-DD" default-time />
    </div>
    <div id="main" style="width: 100%; height: 250px">
    </div>
  </div>
</template>

<script setup name="leaderTopSales10">
import * as echarts from 'echarts'
import dayjs from 'dayjs'

import { onMounted, ref, watch } from 'vue'
import { homeOrder } from '../../../api/modules'
const searchForm = ref({
  date: [dayjs(new Date(new Date().toLocaleDateString()).getTime() - 6 * 24 * 60 * 60 * 1000).format('YYYY-MM-DD'), dayjs(new Date(new Date().toLocaleDateString()).getTime()).format('YYYY-MM-DD')],
  startDate: dayjs(new Date(new Date().toLocaleDateString()).getTime() - 6 * 24 * 60 * 60 * 1000).format('YYYY-MM-DD'),
  endDate: dayjs(new Date(new Date().toLocaleDateString()).getTime()).format('YYYY-MM-DD')
})
const date = ref([])
const dataList = ref([])
const getHomeOrder = async () => {
  let startDate = dayjs(new Date(new Date().toLocaleDateString()).getTime() - 6 * 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
  let endDate = dayjs(new Date(new Date().toLocaleDateString()).getTime()).format('YYYY-MM-DD')
  try {
    const res = await homeOrder({
      startDate: searchForm.value.startDate ? searchForm.value.startDate : startDate,
      endDate: searchForm.value.endDate ? searchForm.value.endDate : endDate,
    })
    let data = res.data
    data.forEach((e) => {
      e.date = e.date.split(' ')[0]
    })
    // 获取选择范围内的日期数量(简称天数)
    let day = (new Date(searchForm.value.endDate).getTime() - new Date(searchForm.value.startDate).getTime()) / (24 * 60 * 60 * 1000) + 1
    let date = [] //日期数组
    for (let i = 0; i < day; i++) {
      if (i == 0) {
        date.push(searchForm.value.startDate)
      } else {
        date.push(dayjs(new Date(searchForm.value.startDate).getTime() + i * 24 * 60 * 60 * 1000).format('YYYY-MM-DD'))
      }
    }
    let dataList = []
    date.forEach((e, i) => {
      data.forEach((d) => {
        if (e == d.date) {
          dataList[i] = d.orderNumber
        } else {
          dataList[i] = { orderNumber: 0 }
        }
      })
    })
    dataList.value = dataList
    date.value = date
    console.log(date.value, dataList.value)
  } catch (error) {
  }
}

const getEcharts = () => {
  var chartDom = document.getElementById('main')
  var myChart = echarts.init(chartDom)

  const option = {
    tooltip: {
      //鼠标悬停时显示对应数据
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    // title: {
    //   text: '订单数据',
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
      data: ['订单数量'],
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
        data: date.value,
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
        max: 500, //最大值
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
        type: 'bar',
        barWidth: 10, // 柱图宽度
        barGap: '30%',
        // label: labelOption,
        emphasis: {
          focus: 'series',
        },
        data: dataList.value,
        // ↓ 这里可以改变渐变色的方向
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          {
            offset: 0,
            color: '#6E48E6',
          },
        ]),
      },
    ],
  }
  option && myChart.setOption(option)
  window.onresize = () => {
    myChart.resize()
  }
}
onMounted(() => {
  getHomeOrder()
  setTimeout(() => {
    getEcharts()
  }, 1000)
})

watch(searchForm.value, (newValue, oldValue) => {
  searchForm.value.startDate = dayjs(newValue.date[0]).format('YYYY-MM-DD')
  searchForm.value.endDate = dayjs(newValue.date[1]).format('YYYY-MM-DD')
}
  , { deep: true })
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