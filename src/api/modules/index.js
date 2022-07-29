//src/api/user/index.js

import service from "../request.js";

export function getMenuList(query) {
  console.log(query);
  return service({
    method: "get",
    url: "/permission/getMenu",
    data: query,
  });
}


export function getUserlist(query) {
  return service({
    method: 'get',
    url: '/permission/Userlist',
    data: query
  })
}