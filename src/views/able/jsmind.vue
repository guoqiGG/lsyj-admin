<template>
  <el-card>
    <div class="card-title">在线编辑思维导图🍬🍬🍬🍭🍭🍭</div>
    <el-button-group class="ml-4">
      <el-button :icon="Edit" />
      <el-button :icon="Share" />
      <el-button :icon="Delete" />
    </el-button-group>
    <div id="jsmind_container"></div>
  </el-card>
</template>
<script setup>
import "jsmind/style/jsmind.css";
import jsMind from "jsmind/js/jsmind.js";
import { onMounted, ref } from "vue";
import { Edit, Share, Delete, } from "@element-plus/icons-vue";

var options = ref({
    // options 将在下一章中详细介绍
    container: "jsmind_container", // [必选] 容器的ID，或者为容器的对象
    editable: true, // [可选] 是否启用编辑
    theme: null, // [可选] 主题
  direction: "left",
  view: {
    // engine: "canvas", // 思维导图各节点之间线条的绘制引擎
    hmargin: 15, // 思维导图距容器外框的最小水平距离
    vmargin: 15, // 思维导图距容器外框的最小垂直距离
    line_width: 2, // 思维导图线条的粗细
    line_color: "#5382de", // 思维导图线条的颜色
  },
  layout: {
    hspace: 30, // 节点之间的水平间距
    vspace: 20, // 节点之间的垂直间距
    pspace: 20, // 节点与连接线之间的水平间距（用于容纳节点收缩/展开控制器）
    cousin_space: 10, // 相邻节点的子节点之间的额外的垂直间距
  },
});
// const jm = new jsMind({
//   container: "jsmind_container",
//   theme: "orange",
//   editable: true,
// });

onMounted(() => {
    let jm = new jsMind(options.value);
  console.log(jm)
  jm.show({
    meta: {
      name: "jsMind-demo-tree",
      author: "hizzgdev@163.com",
      version: "0.2",
    },
    /* 数据格式声明 */
    format: "node_tree",
    /* 数据内容 */
    data: {
      id: "root",
      topic: "jsMind",
      children: [
        {
          id: ".121",
          topic: "Easy",
          direction: "right",
          expanded: false,
          children: [
            { id: "easy1", topic: "Easy to show" },
            { id: "easy2", topic: "Easy to edit" },
            { id: "easy3", topic: "Easy to store" },
            { id: "easy4", topic: "Easy to embed" },
          ],
        },
        {
          id: "open",
          topic: "Open Source",
          direction: "right",
          expanded: true,
          children: [
            { id: "open1", topic: "on GitHub" },
            { id: "open2", topic: "BSD License" },
          ],
        },
        {
          id: "powerful",
          topic: "Powerful",
          direction: "right",
          children: [
            { id: "powerful1", topic: "Base on Javascript" },
            { id: "powerful2", topic: "Base on HTML5" },
            { id: "powerful3", topic: "Depends on you" },
          ],
        },
        {
          id: "other",
          topic: "test node",
          direction: "right",
          children: [
            { id: "other1", topic: "I'm from local variable" },
            { id: "other2", topic: "I can do everything" },
            { id: "other3", topic: "I can do everything" },
          ],
        },
      ],
    },
  });
});
</script>
<style lang="scss" >
@import './index.scss';
.card-title {
  padding-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  span {
    color: #673ab7;
    cursor: pointer;
  }
}
#jsmind_container {
  width: 100%;
  height: 80vh;
}
</style>
