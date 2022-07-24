<template>
  <template v-for="menu in menuList" :key="menu.path">
    <el-sub-menu
      v-if="menu.children && menu.children.length > 0"
      :index="menu.path"
    >
      <template #title>
        <el-icon>
          <component :is="menu.meta.icon"></component>
        </el-icon>
        <span>{{ menu.meta.title }}</span>
      </template>
      <el-menu-item :index="it.path" v-for="it in menu.children" :key="it.path">
        <template #title>
          <el-icon>
            <component :is="it.meta.icon"></component>
          </el-icon>
          <span>{{ it.meta.title }}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item style="color: #f4f4f5" v-else :index="menu.path">
      <el-icon>
        <component :is="menu.meta.icon"></component>
      </el-icon>
      <template #title>{{ menu.meta.title }}</template>
    </el-menu-item>
  </template>
</template>

<script setup>
defineProps(['menuList'])
</script>

<style scoped>
.icons {
  width: 24px;
  height: 18px;
}
</style>
