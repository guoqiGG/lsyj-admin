import Mock from "mockjs";

import { getMenu, UserList } from "./permission.js";

Mock.mock("/permission/getMenu", "post", getMenu);
Mock.mock("/permission/UserList", "get", UserList);
