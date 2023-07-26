<template>
  <el-card>
    <svg class="flexSvg" ref="svgRef" />
    <div class="flx-row pos">
      放大  编辑 下载
    </div>
  </el-card>
  <el-card class="mt20">
    <el-input v-model="inputValue" type="text" placeholder="Please input">
      <template #prepend>
        <div @click="dialogVisible = true">
          <el-icon><Document /></el-icon> 模板库
        </div>
      </template>
      <template #append
        ><el-button class="btn" icon="Promotion" :loading="Iconloading" @click="createMind"> 生成</el-button></template
      >
    </el-input>
  </el-card>
  <el-dialog v-model="dialogVisible" title="模板库" width="60%" draggable>
    <div class="flx-row dialog-content">
      <div class="flx1 dialog-lists">
        <div v-for="item in list" :key="item.id" class="drag-item" @click="sendItem(item)">
          {{ item.name }}
        </div>
      </div>
      <div class="flx1 dialog-right">
        <textarea class="dialog-input" v-model="md"></textarea>
        <el-button class="pos-btn" round @click="UseTemplates"
          ><el-icon><EditPen /></el-icon> 使用模板</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view";
import { Toolbar } from "markmap-toolbar";
const markmap = ref();
const transformer = new Transformer();
const svgRef = ref("");
const dialogVisible = ref(false);
const Iconloading = ref(false);
const inputValue = ref("");
const md = ref("");
const selectTemp = ref("");
const markdown = ref(`## 思维导图
### 笔记总结
### 日程安排
### 项目管理
### 头脑风暴
### 框架梳理
### 一键生成
`);

const list = ref([
  { name: "2023年度计划", md: "" },
  { name: "运营知识地图", md: "" },
  { name: "考试复习规划", md: "" },
  { name: "总结内容框架", md: "" },
  { name: "项目管理方案", md: "" },
  { name: "用户旅程地图", md: "" },
  { name: "魔兽世界风格", md: "" },
  { name: "产品思维导图", md: "" },
  { name: "创业策划思维导图", md: "" },
  { name: "市场营销思维导图", md: "" },
  { name: "学习笔记思维导图", md: "" },
  { name: "组织架构思维导图", md: "" },
  { name: "个人成长思维导图", md: "" },
  { name: "教学计划思维导图", md: "" },
  { name: "网站架构思维导图", md: "" },
  { name: "企业战略思维导图", md: "" },
]);

const sendItem = (item) => {
  console.log(item.name);
  md.value = `## ${item.name} 
  ### 二级标题 
   - 描述。。。
   - jkjshgs
  ### 三级标题
   - 12131
   - 1333
    - 13131
  `;
  selectTemp.value = `生成${item.name}的思维导图`;
};
const UseTemplates = () => {
  inputValue.value = selectTemp.value;
  dialogVisible.value = false;
};

const createMind = () => {
  Iconloading.value = true;
  markdown.value = md.value ? md.value : markdown.value;
  initData();
  inputValue.value = "";
  Iconloading.value = false;
};
const initData = () => {
  const { root } = transformer.transform(markdown.value);
  markmap.value.setData(root);
  markmap.value.fit();
};

onMounted(() => {
  markmap.value = Markmap.create(svgRef.value);
  console.log(markmap)
  initData();
});
</script>

<style lang="scss" scoped>
.flexSvg {
  width: 100%;
  height: 72vh;
}
.mt20 {
  padding: 10px 0;
}
.dialog-content {
  width: 100%;
  height: 40vh;
  overflow: hidden;
  .dialog-lists {
    overflow: scroll;
    height: 40vh;
    .drag-item {
      padding: 10px 0;
      border-bottom: 1px solid #f5f5f5;
    }
  }
  .dialog-right {
    margin-left: 10px;
    background-color: #f7f8fa;
    height: 100%;
    position: relative;
    .dialog-input {
      width: 95%;
      height: 95%;
      padding: 2.5%;
      border: none;
      background-color: #f7f8fa;
    }
    .pos-btn {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }
}
</style>
