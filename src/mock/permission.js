// 引入mockjs
import Mock from "mockjs";
// 获取 mock.Random 对象
const Random = Mock.Random;

let menuList = [{
    path: '/home',
    component: 'Loyout',
    meta: {
      title: '首页',
      icon: 'HomeFilled',
      roles: ['sys:manage'],
    },
  },
  {
    path: "/system",
    component: "Loyout",
    alwaysShow: true,
    name: "system",
    meta: {
      title: "系统管理",
      icon: "Tools",
      roles: ["sys:manage"],
      parentId: 0
    },
    children: [{
        path: "/Department",
        component: "/system/Department",
        alwaysShow: false,
        name: "Department",
        meta: {
          title: "机构管理",
          // icon: "ZoomOut",
          roles: ["sys:dept"],
          parentId: 17
        }
      },
      {
        path: "/UserList",
        component: "/system/UserList",
        alwaysShow: false,
        name: "UserList",
        meta: {
          title: "用户管理",
          // icon: "ZoomOut",
          roles: ["sys:user"],
          parentId: 17
        }
      },
      {
        path: "/RoleList",
        component: "/system/RoleList",
        alwaysShow: false,
        name: "RoleList",
        meta: {
          title: "角色管理",
          // icon: "ZoomOut",
          roles: ["sys:role"],
          parentId: 17
        }
      },
      {
        path: "/MenuList",
        component: "/system/MenuList",
        alwaysShow: false,
        name: "MenuList",
        meta: {
          title: "权限管理",
          // icon: "ZoomOut",
          roles: ["sys:menu"],
          parentId: 17
        }
      }
    ]
  },
  {
    path: "/goods",
    component: "Loyout",
    alwaysShow: true,
    name: "goods",
    meta: {
      title: "商品管理",
      icon: "Briefcase",
      roles: ["sys:goods"],
      parentId: 0
    },
    children: [{
      path: "/goodCategory",
      component: "/goods/goodCategory",
      alwaysShow: false,
      name: "goodCategory",
      meta: {
        title: "商品分类",
        // icon: "ZoomOut",
        roles: ["sys:goodsCategory"],
        parentId: 34
      }
    }]
  },
  {
    path: "/map",
    component: "Loyout",
    alwaysShow: true,
    name: "map",
    meta: {
      title: "图表功能",
      icon: "Histogram",
      roles: ["sys:map"],
      parentId: 0
    },
    children: [{
        path: "/BaiduMap",
        component: "/map/BaiduMap",
        alwaysShow: false,
        name: "BaiduMap",
        meta: {
          title: "百度地图",
          // icon: "ZoomOut",
          roles: ["sys:BaiduMap"],
          parentId: 34
        }
      },
      {
        path: '/GooleMap',
        component: '/map/GooleMap',
        alwaysShow: false,
        name: "GooleMap",
        meta: {
          title: "谷歌地图",
          // icon: "ZoomOut",
          roles: ["sys:GooleMap"],
          parentId: 34
        }
      },
      {
        path: '/Echarts',
        component: '/map/Echarts',
        alwaysShow: false,
        name: 'Echarts',
        meta: {
          title: "Ehacrts图表",
          roles: ["sys:map"],
          parentId: 34
        }
      }
    ]
  },
  {
    path: '/able',
    component: "Loyout",
    alwaysShow: true,
    name: 'able',
    meta: {
      title: '功能呢公布',
      icon: 'HelpFilled',
      roles: ['sys:able']
    },
    children: [{
        path: '/watermark',
        component: '/able/watermark',
        name: 'watermark',
        meta: {
          title: "水印",
          roles: ['sys:able']
        }
      },
      {
        path: '/Drag',
        component: '/able/Drag',
        name: 'Drag',
        meta: {
          title: "拖拽",
          roles: ['sys:able']
        }
      },
      {
        path: '/Guidepage',
        component: '/able/Guidepage',
        name: 'Guidepage',
        meta: {
          title: "引导页",
          roles: ['sys:able']
        }
      }
    ]
  }
]

const getMenu = function (data) {
  console.log(data, "接收post参数");
  let body = JSON.parse(data.body);
  const {
    username,
    password
  } = JSON.parse(data.body);
  console.log(JSON.parse(data.body));
  if (username === "admin" || username === "wp") {
    if (username === "admin" && password === "123456") {
      return {
        code: 200,
        data: {
          menu: menuList,
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else if (username === "wp" && password === "123456") {
      return {
        code: 200,
        data: {
          menu: [{
              path: "/",
              name: "home",
              label: "首页",
              icon: "s-home",
              url: "Home/Home",
            },
            {
              path: "/video",
              name: "video",
              label: "视频管理页",
              icon: "video-play",
              url: "VideoManage/VideoManage",
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else {
      return {
        code: -999,
        data: {
          message: "密码错误",
        },
      };
    }
  } else {
    return {
      code: -999,
      data: {
        message: "用户不存在",
      },
    };
  }
};
Mock.mock("/permission/getMenu", "post", getMenu);