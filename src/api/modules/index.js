//src/api/user/index.js

import service from "../request.js";

export function getMenuList(query) {
  return service({
    method: "POST",
    url: "/permission/getMenu",
    data: query,
  });
}

export function getUserList(query) {
  return service({
    method: "get",
    url: "/permission/UserList",
    data: query,
  });
}
