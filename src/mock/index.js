import Mock from "mockjs";

import {
  UserList,
  addUserList,
  listUpdate,
  LoginInfo,
  Newslist,
  orderLists,
  cardlists
} from "./permission.js";

Mock.mock("/permission/LoginInfo", "post", LoginInfo);
Mock.mock("/permission/UserList", "get", UserList);
Mock.mock("/permission/addUserList", "post", addUserList);
Mock.mock("/permission/listUpdate", "post", listUpdate);
Mock.mock("/permission/Newslist", "get", Newslist);
Mock.mock("/permission/orderLists", "get", orderLists);
Mock.mock("/permission/cardlists", "get", cardlists);