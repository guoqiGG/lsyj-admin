<template>
  <div id="guide" class="menu" :style="{
    width: store.getters.isCollapse == true ? '' : '200px',
    height: '100%',
    color: themeConfig.textColor,
  }">
    <div class="logo" v-if="!store.getters.isCollapse">
      <img src="../../assets/logo.png" alt="" style="margin-right: 5px" />
      氢春态管理后台
    </div>
    <div class="logo" v-else>
      <img src="../../assets/logo.png" alt="" />
    </div>
    <el-scrollbar style="height: 100%">
      <el-menu :default-active="activeMenu" :router="true" :collapse="store.getters.isCollapse"
        :collapse-transition="false" :unique-opened="true" :background-color="themeConfig.backgroundColor"
        :text-color="themeConfig.textColor" :active-text-color="themeConfig.primary">
        <menuItems :menuList="menuList"></menuItems>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import store from "../../store/index.js";
import menuItems from "./components/menuItems.vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter()
const activeMenu = computed(() => {
  return route.path;
});
const menuList = ref([
  {
    title: "首页",
    url: "/home",
    icon: "HomeFilled",
  },
  {
    title: "订单管理",
    url: "/order",
    icon: "Checked",
    children: [
      {
        title: "订单列表",
        url: "/orderList",
        icon: "Menu",
      },
      {
        title: "退款列表",
        url: "/refundList",
        icon: "Menu",
      },
    ],
  },
  {
    title: "团长管理",
    url: "/leader",
    icon: "Avatar",
    children: [
      {
        title: "团长列表",
        url: "/leaderList",
        icon: "Menu",
      },
      {
        title: "审批团长",
        url: "/applyList",
        icon: "Menu",
      },
      {
        title: "提现列表",
        url: "/withdrawList",
        icon: "Menu",
      },
    ],
  },
  {
    title: "用户管理",
    url: "/user",
    icon: "UserFilled",
    children: [
      {
        title: "用户列表",
        url: "/userList",
        icon: "Menu",
      },
      {
        title: "等级列表",
        url: "/userLevelList",
        icon: "Menu",
      }
    ],
  },
  {
    title: "直播管理",
    url: "/live",
    icon: "VideoCameraFilled",
    children: [
      {
        title: "直播间列表",
        url: "/liveList",
        icon: "Menu",
      }
    ],
  },
  {
    title: "视频管理",
    url: "/video",
    icon: "VideoCamera",
    children: [
      {
        title: "视频列表",
        url: "/videoList",
        icon: "Menu",
      }
    ],
  },
  {
    title: "优惠券管理",
    url: "/coupon",
    icon: "Postcard",
    children: [
      {
        title: "优惠券",
        url: "/couponList",
        icon: "Menu",
      }
    ],
  },
  {
    title: "礼品卡管理",
    url: "/gift",
    icon: "Postcard",
    children: [
      {
        title: "礼品卡",
        url: "/giftList",
        icon: "Menu",
      },
      {
        title: "用户礼品卡",
        url: "/userGiftCardList",
        icon: "Menu",
      },
    ],
  },
  {
    title: "合成卡管理",
    url: "/compositeCard",
    icon: "Postcard",
    children: [
      {
        title: "合成卡",
        url: "/compositeCardList",
        icon: "Menu",
      },
    
      {
        title: "用户合成卡",
        url: "/userCompositeCardList",
        icon: "Menu",
      }
    ],
  },
  {
    title: "商品管理",
    url: "/prod",
    icon: "Shop",
    children: [
      {
        title: "商品列表",
        url: "/prodList",
        icon: "Menu",
      },
      {
        title: "商品分类",
        url: "/proCategoryList",
        icon: "Menu",
      }
    ],
  },


]);

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
const themeConfig = store.getters.themeConfig;
</script>

<style scoped lang="scss">
.menu {

  // width: 200px;
  .logo {
    height: 48px;
    line-height: 48px;
    padding: 0 20px;
    list-style: none;
    cursor: pointer;
    position: relative;

    img {
      width: 25px;
      vertical-align: middle;
    }
  }
}
</style>
