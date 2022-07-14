// 引入mockjs
import Mock from "mockjs";
// 获取 mock.Random 对象
const Random = Mock.Random;

const getMenu = function (data) {
  console.log(data, "接收post参数");
  let body = JSON.parse(data.body);
  const { username, password } = JSON.parse(data.body);
  console.log(JSON.parse(data.body));
  if (username === "admin" || username === "wp") {
    if (username === "admin" && password === "123456") {
      return {
        code: 200,
        data: {
          menu: [
            {
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
            {
              path: "/user",
              name: "user",
              label: "用户管理页",
              icon: "user",
              url: "UserManage/UserManage",
            },
            {
              label: "其他",
              icon: "location",
              children: [
                {
                  path: "/page1",
                  name: "page1",
                  label: "页面1",
                  icon: "setting",
                  url: "Other/PageOne",
                },
                {
                  path: "/page2",
                  name: "page2",
                  label: "页面2",
                  icon: "setting",
                  url: "Other/PageTwo",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else if (username === "wp" && password === "123456") {
      return {
        code: 200,
        data: {
          menu: [
            {
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
