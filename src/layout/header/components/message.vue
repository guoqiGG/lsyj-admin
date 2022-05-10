<template>
  <el-popover
    v-model:visible="visible"
    placement="bottom"
    title="消息通知"
    :width="200"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <el-icon class="icon-style" @click="visible = !visible"><bell /></el-icon>
    </template>
  </el-popover>
</template>
<script setup name="messages">
import { Bell } from '@element-plus/icons-vue'
import { ref } from 'vue'
const visible = ref(false)
</script>
<style scoped>
.icon-style {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.75);
  cursor: pointer;
  margin: 0 11px;
}
</style>
