<template>
    <el-card class="box-card" shadow="never">
      <div class="box-card-title">文件预览 🍱🍱🍱🍱🍱</div>
      <el-input
        v-model="input3"
        placeholder="Please input"
        class="input-with-select"
        >
        <template #prepend>
            <el-select v-model="select" placeholder="Select" style="width: 115px"  >
            <el-option v-for="item in selectList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </template>
      <template #append>
        <el-button :icon="Search" />
      </template>
    </el-input>
    <div class="lists">
        
    </div>
    </el-card>
  </template>
  
  <script setup>
//   .doc,.docx,.pdf,.ppt,.pptx,.xlsx,.xls,.jpg,.JPEG,.png,.gif
 import { ref ,reactive} from 'vue'
    import { Search } from '@element-plus/icons-vue'
    
    const selectList= reactive([
        {label:'world文档',value:'1'},
        {label:'PDF文件',value:'2'},
        {label:'ELEXL表格',value:'3'},
        {label:'PPT文件',value:'4'},
    ])
    const input1 = ref('')
    const input2 = ref('')
    const input3 = ref('')
    const select = ref('world文档')

  </script>
  
  <style lang="scss" scoped>
  .box-card {
    width: 100%;
    .box-card-title {
      padding-bottom: 20px;
    }
  }
  .upload-demo {
    width: 50%;
  }
  </style>
  