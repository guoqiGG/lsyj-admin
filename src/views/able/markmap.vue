<template>
  <el-card>
    <svg class="flexSvg" ref="svgRef" />
  </el-card>
  <el-card class="mt20">
    <el-input v-model="inputValue"  type="text" placeholder="Please input">
      <template #prepend>
        <div @click="dialogVisible = true">
          <el-icon><Document /></el-icon> 模板库
        </div>
      </template>
      <template #append><el-button class="btn" icon="Promotion" @click="update"> 生成</el-button></template>
    </el-input>
  </el-card>
  <el-dialog v-model="dialogVisible" title="模板库" width="60%" draggable>
    <div class="flx-row dialog-content">
      <div class="flx1 dialog-lists">
        <div v-for="item in list" :key="item.id" class="drag-item">{{ item }}</div>
      </div>
      <div class="flx1 dialog-right">
        <textarea  class="dialog-input"></textarea>
        <el-button class="pos-btn" round><el-icon><EditPen /></el-icon> 使用模板</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view";
const dialogVisible = ref(true);
const list = ref([
  "2023年度计划",
  "运营知识地图",
  "考试复习规划",
  "总结内容框架",
  "项目管理方案",
  "用户旅程地图",
  "魔兽世界风格",
  "产品思维导图",
  "创业策划思维导图",
  "市场营销思维导图",
  "学习笔记思维导图",
  "组织架构思维导图",
  "个人成长思维导图",
  "教学计划思维导图",
  "网站架构思维导图",
  "企业战略思维导图",
]);
const transformer = new Transformer();
const initValue = ref("");
const inputValue = `
# 开源小分队

## 节点1
- 节点1.1
  - 节点1.1.1

## 节点2
## 节点3
## 节点4
`;
const mm = ref();
const value = ref(
  `
# 开源小分队

## 节点1
- 节点1.1
  - 节点1.1.1

## 节点2
## 节点3
## 节点4
`
);
const svgRef = ref();
const update = () => {
  const { root } = transformer.transform(value.value);
  mm.value.setData(root);
  mm.value.fit();
};
//watch(()=>value.value,(n)=>{
	// 监听输入变化更新思维导图
	//update()
//})
onMounted(() => {
  // 初始化markmap思维导图
  mm.value = Markmap.create(svgRef.value);
   value.value = initValue.value;
  // 更新思维导图渲染
  update();
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
  .dialog-right{
    margin-left:10px;
    background-color: #f7f8fa;
    height: 100%;
    position: relative;
    .dialog-input{
      width:95%;
      height:95%;
      padding: 2.5%;
      border: none;
      background-color: #f7f8fa;
    }
    .pos-btn{
     position: absolute;
     right:10px;
     bottom: 10px;
    }
  }

}
</style>
