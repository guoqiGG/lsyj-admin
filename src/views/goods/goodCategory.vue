<template>
  <el-card class="box-card" shadow="never"> 基础列表 🍓🍇🍈🍉 </el-card>
  <el-card class="box-card mt10" shadow="never">
    <div v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
      <div v-for="i in listData" :key="i" class="infinite-list-item">
        <div class="infinite-list-item-top">
          {{ i.title }}
        </div>
        <div class="infinite-list-item-main flx-row">
          <div style="flex: 1">创建人：{{ i.createUser }}</div>
          <div style="flex: 1">发布时间：{{ i.createTime }}</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { Newslist } from '../../api/modules/index.js'

import { onMounted, ref } from 'vue'
const listData = ref([])
const load = () => {
  Newslist().then((res) => {
    listData.value = listData.value.concat(res.data.data)
  })
  // count.value += 2
}

const getListData = () => {
  Newslist().then((res) => {
    listData.value = res.data.data
  })
}
onMounted(() => {
  getListData()
})
</script>

<style lang="scss" scoped>
.box-card {
  width: 100%;
  .box-card-title {
    margin-bottom: 20px;
  }
}

.infinite-list {
  height: 72vh;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list {
  .infinite-list-item {
    background: #f0f2f5;
    margin: 10px;
    padding: 10px 10px 0 10px;
    // color: var(--el-color-primary);
    .infinite-list-item-top {
      padding-bottom: 10px;
    }
    .infinite-list-item-main {
      padding-bottom: 10px;
    }
  }
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
