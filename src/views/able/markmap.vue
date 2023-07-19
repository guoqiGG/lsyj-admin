<template> 
  <el-card>
    <svg class="flexSvg" ref="svgRef" />
  </el-card>
  <el-card class="mt20">
    <el-input v-model="value" placeholder="Please input">
      <template #prepend>
        <el-icon><Document /></el-icon> 模板库</template
      >
      <template #append><el-button class="btn" icon="Promotion" @click="update"> 生成</el-button></template>
    </el-input>
  </el-card>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view";

const transformer = new Transformer();
const initValue = ref("");
const mm = ref();
const value = ref("");
const svgRef = ref();
const update = () => {
  const { root } = transformer.transform(value.value);
  mm.value.setData(root);
  mm.value.fit();
};

watch(
  () => value.value,
  (n) => {
    // 监听输入变化更新思维导图
    update();
  }
);
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
</style>
