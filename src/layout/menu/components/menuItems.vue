<template>
  <template v-for="item in menuList" :key="item.path">
    <el-sub-menu
      :key="index"
      :index="item.path"
      v-if="item.children && item.children.length > 0"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <template v-for="child in item.children">
        <menu-items
          v-if="child.children && child.children.length > 0"
          :key="child.path"
        />
        <el-menu-item v-else :key="child.id" :index="child.path">
          <el-icon>
            <component :is="child.meta.icon"></component>
          </el-icon>
          <span>{{ child.meta.title }}</span>
        </el-menu-item>
      </template>
      <!-- <el-sub-menu
      :key="index"
      :index="item.path"
      v-if="item.children && item.children.length > 0"
    ></el-sub-menu> -->
      <!-- <menu-items :menuList="item.children"></menu-items> -->
    </el-sub-menu>
    <el-menu-item v-else :index="item.path">
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-menu-item>
    <!-- <el-menu-item-group title="Group One">
      <el-menu-item index="1-1">item one</el-menu-item>
      <el-menu-item index="1-2">item two</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="Group Two">
      <el-menu-item index="1-3">item three</el-menu-item>
    </el-menu-item-group>
    <el-sub-menu index="1-4">
      <template #title>item four</template>
      <el-menu-item index="1-4-1">item one</el-menu-item>
    </el-sub-menu> -->
    <!-- </el-sub-menu> -->
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
