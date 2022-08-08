//src/api/user/index.js

import service from "../request.js";

export function LoginInfo(query) {
  return service({
    method: "POST",
    url: "/permission/LoginInfo",
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
export function addUserList(query) {
  return service({
    method: "post",
    url: "/permission/addUserList",
    data: query,
  });
}
export function listUpdate(query) {
  return service({
    method: "post",
    url: "/permission/listUpdate",
    data: query,
  });
}
