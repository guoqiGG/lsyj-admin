import Mock from "mockjs";

import {
  getMenu,
  UserList,
  addUserList
} from "./permission.js";

Mock.mock("/permission/getMenu", "post", getMenu);
Mock.mock("/permission/UserList", "get", UserList);
Mock.mock("/permission/addUserList", 'post', addUserList);