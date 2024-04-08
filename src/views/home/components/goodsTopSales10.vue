<template>
  <div class="con">
    <div class="top">
      <div class="top-title">商品销量top10</div>
      <el-date-picker @change="getHomeGoodsTopSales10" v-model="searchForm.date" type="daterange"
        start-placeholder="开始时间" end-placeholder="结束时间" format="YYYY-MM-DD" value-format="YYYY-MM-DD" default-time />
    </div>
    <el-table v-loading="loading" :data="dataList" style="width: 100%;min-height: 300px;margin-top: 20px;"
      :header-cell-style="{ background: '#f7f8fa', color: '#000' }">
      <el-table-column prop="goodsName" label="商品名称" />
      <el-table-column prop="goodsPreferentialAmount" label="优惠后金额" align="center" />
      <el-table-column prop="goodsTotalAmount" label="总金额" align="center" />
      <el-table-column prop="goodsNumber" label="商品数量" align="center" />
    </el-table>
  </div>
</template>

<script setup name="leaderTopSales10">
import dayjs from 'dayjs'

import { onMounted, ref, watch } from 'vue'
import { homeGoodsTopSales10 } from '../../../api/modules'
import { Loading } from 'element-plus/es/components/loading/src/service';
const searchForm = ref({
  date: [dayjs(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD'), dayjs(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')],
  startDate: dayjs(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD'),
  endDate: dayjs(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
})
const loading = ref(false)
const dataList = ref([])
const getHomeGoodsTopSales10 = async () => {
  let startDate = dayjs(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
  let endDate = dayjs(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
  loading.value = true
  try {
    const res = await homeGoodsTopSales10({
      startDate: searchForm.value.startDate ? searchForm.value.startDate : startDate,
      endDate: searchForm.value.endDate ? searchForm.value.endDate : endDate,
    })
    dataList.value = res.data.dayPutVOS
    loading.value = false
  } catch (error) {
    loading.value = false
  }


}

onMounted(() => {
  getHomeGoodsTopSales10()
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
