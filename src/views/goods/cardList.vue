<template>
  <el-card class="box-card" shadow="never"> 卡片列表 🍓🍇🍈🍉 </el-card>

  <el-row
    class="mt10"
    style="height: 75vh; overflow: auto"
    v-infinite-scroll="load"
  >
    <el-col :span="6" v-for="item in listData" :key="item" offset="1">
      <el-card shadow="hover" class="card-lists">
        <div>
          🍓🍇🍈🍉
          <div style="padding-top: 10px">
            <div class="time" style="padding-bottom: 10px">
              创建人：{{ item.createUser }}
            </div>
            <div style="flex: 1">发布时间：{{ item.createTime }}</div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
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
.infinite-list-card {
  background-color: #fff;
  flex-wrap: wrap;
  .infinite-list-item {
    flex: 20%;
    margin-left: 2.5%;
    // margin-bottom: 2.5%;
  }
}
.card-lists {
  margin-right: 10px;
  margin-bottom: 10px;
  &:nth-child(4n) {
    margin-right: 0;
  }
}
</style>
