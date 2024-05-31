<template>
  <div id="guide" class="menu" :style="{
    width: store.getters.isCollapse == true ? '' : '200px',
    height: '100%',
    color: themeConfig.textColor,
  }">
    <div class="logo" v-if="!store.getters.isCollapse">
      <img src="../../assets/logo.png" alt="" style="margin-right: 5px" />
      邻舍云集管理后台
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

const menuList2 = ref([
  {
    title: "首页",
    url: "/home",
    icon: "HomeFilled",
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
      {
        title: "佣金明细",
        url: "/commissionDetails",
        icon: "Menu",
      },
      {
        title: "分组列表",
        url: "/leaderGroup",
        icon: "Menu",
      },
      {
        title: "团长分组",
        url: "/leaderUserGroup",
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
        url: "/levelList",
        icon: "Menu",
      },
      {
        title: "分组列表",
        url: "/groupList",
        icon: "Menu",
      },
      {
        title: "用户分组",
        url: "/userGroupList",
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
      },
      {
        title: "用户优惠券列表",
        url: "/userCouponList",
        icon: "Menu",
      },
      {
        title: "用户领取记录",
        url: "/userReceiveCouponRecord",
        icon: "Menu",
      },
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
    title: "兑换管理",
    url: "/exchange",
    icon: "Ticket",
    children: [
      {
        title: "兑换列表",
        url: "/exchangeList",
        icon: "Menu",
      },
      {
        title: "兑换记录",
        url: "/exchangeRecord",
        icon: "Menu",
      },
      {
        title: "转账列表",
        url: "/transferList",
        icon: "Menu",
      },
    ],
  },
  {
    title: "直播管理",
    url: "/live",
    icon: "VideoCameraFilled",
    children: [
      // {
      //   title: "直播间列表",
      //   url: "/liveList",
      //   icon: "Menu",
      // },
      {
        title: "抖音",
        url: "/douyin",
        icon: "Menu",
      },
      // {
      //   title: "欢拓直播间列表",
      //   url: "/huantuo",
      //   icon: "Menu",
      // },
      {
        title: "观看时长",
        url: "/huantuouserviewtime",
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
      },
      {
        title: "评论列表",
        url: "/commentList",
        icon: "Menu",
      }
    ],
  },
  {
    title: "系统设置",
    url: "/setup",
    icon: "Tools",
    children: [
      {
        title: "管理员列表",
        url: "/adminList",
        icon: "Menu",
      },
      {
        title: "角色列表",
        url: "/roleList",
        icon: "Menu",
      }
    ],
  },
  {
    title: "配置管理",
    url: "/config",
    icon: "Setting",
    children: [
      {
        title: "配置列表",
        url: "/configList",
        icon: "Menu",
      },
      {
        title: "轮播图",
        url: "/carousel",
        icon: "Menu",
      },
    ],
  }
]);
const routerList = JSON.parse(localStorage.getItem("routerList"))
const menuList = ref([])
if (routerList && routerList.length > 0) {
  menuList.value = [...routerList]
} else {
  menuList.value = [...menuList2.value]
}
// localStorage.setItem("routerList", JSON.stringify(res.data));
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
