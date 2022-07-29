import Mock from "mockjs";

import {
  getMenu,
  Userlist
} from "./permission.js";

Mock.mock("/permission/getMenu", "get", getMenu);
Mock.mock("/permission/Userlist", "get", Userlist);