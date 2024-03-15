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
]);


// let menuList = [
//   {
//     title: "首页",
//     url: "/home",
//     icon: "HomeFilled",
//   },
//   {
//     title: "页面管理",
//     url: "/page",
//     icon: "Checked",
//     children: [
//       {
//         title: "表单页",
//         url: "/form",
//         icon: "Checked",
//         children: [
//           {
//             title: "基础表单",
//             url: "/baseForm",
//             icon: "Menu",
//           },
//           {
//             url: "/stepFrom",
//             title: "步骤表单",
//             icon: "Menu",
//           },
//           {
//             url: "/advancedForm",
//             title: "高级表单",
//             icon: "Menu",
//           },
//         ],
//       },
//       {
//         title: "/system",
//         title: "表格管理",
//         icon: "Grid",
//         children: [
//           {
//             url: "/Department",
//             title: "基础表格",
//             icon: "Menu",
//           },
//           {
//             url: "/UserList",
//             title: "内嵌表格",
//             icon: "Menu",
//           },
//           {
//             url: "/RoleList",
//             title: "滑动加载",
//             icon: "Menu",
//           },
//           {
//             url: "/MenuList",
//             title: "可编辑Table",
//             icon: "Menu",
//           },
//           {
//             url: "/importExcel",
//             title: "导入Excel",
//             icon: "Menu",
//           },
//         ],
//       },
//       {
//         url: "/goods",
//         title: "列表页",
//         icon: "List",
//         children: [
//           {
//             url: "/goodCategory",
//             title: "基础列表",
//             icon: "Menu",
//           },
//           {
//             url: "/cardList",
//             title: "卡片列表",
//             icon: "Menu",
//           },
//           {
//             url: "/searchList",
//             title: "搜索列表",
//             icon: "Menu",
//           },
//         ],
//       },
//       {
//         url: "/ErrorMessage",
//         title: "异常页面",
//         icon: "WarningFilled",
//         children: [
//           {
//             url: "/404",
//             title: "404",
//             icon: "Menu",
//           },
//           {
//             url: "/500",
//             title: "500",
//             icon: "Menu",
//           },
//         ],
//       },
//     ],
//   },

//   {
//     title: "图形图表",
//     url: "/echarts",
//     icon: "Histogram",
//     children: [
//       {
//         title: "地图",
//         url: "/echarts/map",
//         icon: "Menu",
//         children: [
//           {
//             url: "/baidumap",
//             title: "百度地图",
//             icon: "Menu",
//           },
//           // {
//           //   url: "/gaodemap",
//           //   title: "高德地图",
//           //   icon: "Menu",
//           // },
//         ],
//       },
//       {
//         title: "雷达图",
//         url: "/radar",
//         icon: "Menu",
//       },
//       {
//         title: "柱状图",
//         url: "/histogram",
//         icon: "Menu",
//       },
//       {
//         title: "折线图",
//         url: "/line",
//         icon: "Menu",
//       },
//     ],
//   },

//   {
//     url: "/able",
//     title: "功能",
//     icon: "HelpFilled",
//     children: [
//       {
//         url: "/watermark",
//         title: "水印",
//         icon: "Menu",
//       },
//       {
//         url: "/countTo",
//         title: "数字动画",
//         icon: "Menu",
//       },
//       {
//         url: "/batchImport",
//         title: "图片上传",
//         icon: "Menu",
//       },
//       {
//         url: "/markmap",
//         title: "思维导图",
//         icon: "Menu",
//       },
//       {
//         url: "/jsmind",
//         title: "可编辑的思维导图",
//         icon: "Menu",
//       },
//       {
//         url: "/fileImport",
//         title: "文件上传",
//         icon: "Menu",
//       },
//       {
//         url: "/Filepreview",
//         title: "文件预览",
//         icon: "Menu",
//       },
//       {
//         url: "markdown",
//         icon: "Platform",
//         title: "编辑器",
//         children: [
//           {
//             url: "/wangEditor",
//             title: "富文本编辑器",
//             icon: "Menu",
//           },
//           {
//             url: "/markdown",
//             title: "markdown",
//             icon: "Menu",
//           },
//         ],
//       },
//       {
//         url: "/strength",
//         title: "密码强度",
//         icon: "Menu",
//       },
//       {
//         url: "/validation",
//         title: "验证组件",
//         icon: "Menu",
//       },
//       {
//         url: "/guide",
//         title: "引导页",
//         icon: "Menu",
//       },
//       {
//         url: "/embedded",
//         title: "内嵌页",
//         icon: "Menu",
//       },
//     ],
//   },
//   {
//     url: "/directives",
//     title: "自定义指令",
//     icon: "Stamp",
//     children: [
//       {
//         url: "/copy",
//         title: "复制",
//         icon: "Menu",
//       },
//       {
//         url: "/Drag",
//         title: "拖拽",
//         icon: "Menu",
//       },
//       {
//         url: "/debounceDirect",
//         title: "防抖指令",
//         icon: "Menu",
//       },
//       {
//         url: "/throttle",
//         title: "节流指令",
//         icon: "Menu",
//       },
//       // {
//       //   url: "/longPress",
//       //   title: "长按指令",
//       //   icon: "Menu",
//       // },
//     ],
//   },
//   {
//     url: "/flow",
//     title: "图形编辑器",
//     icon: "BrushFilled",
//     children: [
//       {
//         url: "/flowCat",
//         title: "流程图",
//         icon: "Menu",
//       },
//     ],
//   },
//   {
//     url: "/video",
//     title: "视频播放器",
//     icon: "VideoCameraFilled",
//     //
//     children: [
//       {
//         url: "/video",
//         title: "视频播放器",
//         icon: "Menu",
//       },
//     ],
//   },
//   {
//     url: "/DataReport",
//     title: "数据统计",
//     icon: "TrendCharts",

//     children: [
//       {
//         url: "/demo1",
//         title: "项目一",
//         icon: "Menu",
//       },
//     ],
//   },
//   // {
//   //   url: "/material",
//   //   title: "素材中心",
//   //   icon: "PictureFilled",
//   //   children: [{
//   //     url: "/materialIndex",
//   //     title: "素材管理",
//   //     icon: "Menu",
//   //   }, ],
//   // },
//   {
//     url: "/user",
//     title: "个人中心",
//     icon: "Avatar",
//     children: [
//       {
//         url: "/user",
//         title: "关于我",
//         icon: "Menu",
//       },
//     ],
//   },
// ];

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
