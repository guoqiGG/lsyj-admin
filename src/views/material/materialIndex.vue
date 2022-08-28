<template>
  <el-row style="height: 90vh">
    <el-col :span="6" style="border-right: 10px solid #f0f2f5"> </el-col>
    <el-col :span="18"></el-col>
  </el-row>
</template>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
  background-color: #fff;
  /* margin-right: 20px; */
  height: 100%;
}
</style>
