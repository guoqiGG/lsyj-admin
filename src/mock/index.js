import Mock from "mockjs";

import {
  getMenu,
  UserList,
  addUserList,
  listUpdate
} from "./permission.js";

Mock.mock("/permission/getMenu", "post", getMenu);
Mock.mock("/permission/UserList", "get", UserList);
Mock.mock("/permission/addUserList", 'post', addUserList);
Mock.mock("/permission/listUpdate", 'post', listUpdate);