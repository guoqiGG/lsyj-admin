<template>
  <el-tag
    v-for="tag in tags"
    :key="tag.title"
    class="mR10 tabs"
    :closable="tag.close"
    :effect="tag.checked ? 'dark' : 'plain'"
    @click="tagChange(tag)"
    @close="delectTag(tag, index)"
  >
    <el-icon class="tabs-icon">
      <component :is="tag.icon"></component>
    </el-icon>
    {{ tag.title }}
  </el-tag>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import store from '../../store/index.js'
import { useStore } from 'vuex'
const tabsMenuValue = ref('')
const route = useRoute()
const router = useRouter()
const globalStore = useStore() // 该方法用于返回store 实例
// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
  () => route.path,
  () => {
    let params = {
      title: route.meta.name,
      url: route.path,
      icon: 'Menu',
      close: true,
      checked: true,
    }
    globalStore.dispatch('tabs/addTabs', params)
  },
  {
    immediate: true,
  }
)
const tags = store.getters.tabsMenuList

const tagChange = (item) => {
  item.checked = true
  router.push(item.url)
}
const delectTag = (item, index) => {
  globalStore.dispatch('tabs/delectTag', item)
}
onMounted(() => {
  console.log()
})
</script>

<style lang="scss" scoped>
.tabs {
  height: 30px;
}
</style>
