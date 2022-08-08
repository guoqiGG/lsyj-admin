// 引入mockjs
import Mock from "mockjs";
const Random = Mock.Random;

let menuList = [
  {
    path: "/home",
    component: "Loyout",
    meta: {
      title: "首页",
      icon: "HomeFilled",
      roles: ["sys:manage"],
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
      parentId: 0,
    },
    children: [
      {
        path: "/Department",
        component: "/system/Department",
        alwaysShow: false,
        name: "Department",
        meta: {
          title: "机构管理",
          icon: "Menu",
          roles: ["sys:dept"],
          parentId: 17,
        },
      },
      {
        path: "/UserList",
        component: "/system/UserList",
        alwaysShow: false,
        name: "UserList",
        meta: {
          title: "用户管理",
          icon: "Menu",
          roles: ["sys:user"],
          parentId: 17,
        },
      },
      {
        path: "/RoleList",
        component: "/system/RoleList",
        alwaysShow: false,
        name: "RoleList",
        meta: {
          title: "角色管理",
          icon: "Menu",
          roles: ["sys:role"],
          parentId: 17,
        },
      },
      {
        path: "/MenuList",
        component: "/system/MenuList",
        alwaysShow: false,
        name: "MenuList",
        meta: {
          title: "权限管理",
          icon: "Menu",
          roles: ["sys:menu"],
          parentId: 17,
        },
      },
    ],
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
      parentId: 0,
    },
    children: [
      {
        path: "/goodCategory",
        component: "/goods/goodCategory",
        alwaysShow: false,
        name: "goodCategory",
        meta: {
          title: "商品分类",
          icon: "Menu",
          roles: ["sys:goodsCategory"],
          parentId: 34,
        },
      },
    ],
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
      parentId: 0,
    },
    children: [
      {
        path: "/BaiduMap",
        component: "/map/BaiduMap",
        alwaysShow: false,
        name: "BaiduMap",
        meta: {
          title: "百度地图",
          icon: "Menu",
          roles: ["sys:BaiduMap"],
          parentId: 34,
        },
      },
      {
        path: "/GooleMap",
        component: "/map/GooleMap",
        alwaysShow: false,
        name: "GooleMap",
        meta: {
          title: "谷歌地图",
          icon: "Menu",
          roles: ["sys:GooleMap"],
          parentId: 34,
        },
      },
      {
        path: "/Echarts",
        component: "/map/Echarts",
        alwaysShow: false,
        name: "Echarts",
        meta: {
          title: "Ehacrts图表",
          roles: ["sys:map"],
          parentId: 34,
        },
      },
    ],
  },
  {
    path: "/able",
    component: "Loyout",
    alwaysShow: true,
    name: "able",
    meta: {
      title: "功能",
      icon: "HelpFilled",
      roles: ["sys:able"],
    },
    children: [
      {
        path: "/watermark",
        component: "/able/watermark",
        name: "watermark",
        meta: {
          title: "水印",
          icon: "Menu",
          roles: ["sys:able"],
        },
      },
      // {
      //   path: "/Drag",
      //   component: "/able/Drag",
      //   name: "Drag",
      //   meta: {
      //     title: "拖拽",
      //     icon: "Menu",
      //     roles: ["sys:able"],
      //   },
      // },
      {
        path: "/batchImport",
        component: "/able/batchImport",
        name: "batchImport",
        meta: {
          title: "文件上传",
          icon: "Menu",
          roles: ["sys:able"],
        },
      },
      {
        path: "/wangEditor",
        component: "/able/wangEditor",
        name: "wangEditor",
        meta: {
          title: "富文本编辑器",
          icon: "Menu",
          roles: ["sys:able"],
        },
      },
      {
        path: "/guide",
        component: "/able/guide",
        name: "guide",
        meta: {
          title: "引导页",
          icon: "Menu",
          roles: ["sys:able"],
        },
      },
      {
        path: "/embedded",
        component: "/able/embedded",
        name: "embedded",
        meta: {
          title: "内嵌页",
          icon: "Menu",
          roles: ["sys:able"],
        },
      },
    ],
  },
  {
    path: "/directives",
    component: "Loyout",
    alwaysShow: true,
    name: "directives",
    meta: {
      title: "自定义指令",
      icon: "Stamp",
      roles: ["sys:manage"],
      parentId: 0,
    },
    children: [
      {
        path: "/copy",
        component: "/directives/copy",
        name: "copy",
        meta: {
          title: "复制",
          icon: "Menu",
          roles: ["sys:able"],
        },
      },
      {
        path: "/Drag",
        component: "/directives/Drag",
        name: "Drag",
        meta: {
          title: "拖拽",
          icon: "Menu",
          roles: ["sys:able"],
        },
      },
    ],
  },
  {
    path: "/DataReport",
    component: "Loyout",
    alwaysShow: true,
    name: "DataReport",
    meta: {
      title: "数据统计",
      icon: "Tools",
      roles: ["sys:manage"],
      parentId: 0,
    },
    children: [
      {
        path: "/demo1",
        component: "/DataReport/demo1",
        name: "demo1",
        meta: {
          title: "项目一",
          icon: "Menu",
          roles: ["sys:able"],
        },
      },
    ],
  },
];

export const LoginInfo = (options) => {
  console.log(options, "接收post参数");
  const { username, password } = JSON.parse(options.body);
  if (username == "admin" && password != "123456") {
    return {
      code: "-200",
      data: {
        message: "用户不存在",
      },
    };
  } else {
    return {
      code: "200",
      data: {
        user_id: Random.id(),
        name: Random.cname(),
        token: Random.guid(),
        image: "https://img2.baidu.com/it/u=2859542338,3761174075&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1660064400&t=6fe6057370cbe369654ff2e132d02a37",
      },
    };
  }
};

export const getMenuLsit = (options) => {
  const obj = JSON.parse(options.body);
  if (obj.user_id) {
    return {
      code: 200,
      data: {
        menuList: menuList,
      },
    };
  }
};
// export const getMenu = function (data) {
//   console.log(data, "接收post参数");
//   let body = JSON.parse(data.body);
//   const {
//     username,
//     password
//   } = JSON.parse(data.body);
//   console.log(JSON.parse(data.body));
//   if (username === "admin" || username === "wp") {
//     if (username === "admin" && password === "123456") {
//       return {
//         code: 200,
//         data: {
//           menu: menuList,
//           token: Mock.Random.guid(),
//           message: "获取成功",
//         },
//       };
//     } else if (username === "wp" && password === "123456") {
//       return {
//         code: 200,
//         data: {
//           menu: [{
//               path: "/",
//               name: "home",
//               label: "首页",
//               icon: "s-home",
//               url: "Home/Home",
//             },
//             {
//               path: "/video",
//               name: "video",
//               label: "视频管理页",
//               icon: "video-play",
//               url: "VideoManage/VideoManage",
//             },
//           ],
//           token: Mock.Random.guid(),
//           message: "获取成功",
//         },
//       };
//     } else {
//       return {
//         code: -999,
//         data: {
//           message: "密码错误",
//         },
//       };
//     }
//   } else {
//     return {
//       code: -999,
//       data: {
//         message: "用户不存在",
//       },
//     };
//   }
// };
// 用户列表
let userList = [];
for (let index = 0; index < 50; index++) {
  let obj = {
    id: Random.id(),
    username: Random.cname(),
    email: Random.email(),
    date: Random.date(),
    address: Random.city(true),
    content: Random.csentence(),
  };
  userList.push(obj);
}
const param2Obj = (url) => {
  let obj = JSON.parse(url);
  let page = obj.page;
  console.log(page);
  return page;
};

export const UserList = (options) => {
  const currentPage = param2Obj(options.body);
  let cameraData = userList.filter((item, index) => {
    return index >= (currentPage - 1) * 10 && index < currentPage * 10;
  });
  return {
    code: 200,
    data: {
      total: userList.length,
      userList: cameraData,
    },
  };
};

export const addUserList = (options) => {
  console.log("传过来的数据" + JSON.parse(options.body));
  let obj = JSON.parse(options.body);
  obj.id = Random.id();
  userList.unshift(obj); // 将前台返回来的数据，拼接到数组中。
  return {
    data: userList,
    id: obj.id,
  };
};

// 数据的修改操作
export const listUpdate = (options) => {
  let obj = JSON.parse(options.body);
  userList = userList.map((val) => {
    return val.id == obj.id ? obj : val;
  });
  return {
    data: userList,
  };
};

// export const DeleteUser = (index) => {
//   let UserList = UserList();
//   return UserList.splice(index, 1);
// };

// export const UserInfo = (item) => {};
