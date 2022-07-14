//src/api/user/index.js

import service from "../request.js";

export function getMenuList(query) {
  console.log(query);
  return service({
    method: "post",
    url: "/permission/getMenu",
    body: query,
  });
}
