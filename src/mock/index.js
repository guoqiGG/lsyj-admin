import Mock from "mockjs";

import { UserList, addUserList, listUpdate, LoginInfo, getMenuLsit } from "./permission.js";

Mock.mock("/permission/LoginInfo", "post", LoginInfo);
Mock.mock("/permission/getMenuLsit", "get", getMenuLsit);
Mock.mock("/permission/UserList", "get", UserList);
Mock.mock("/permission/addUserList", "post", addUserList);
Mock.mock("/permission/listUpdate", "post", listUpdate);
