//src/api/user/index.js

import service from "../request.js";


export function getNewsList(query) {
  return service({
    method: 'get',
    url: '/mock/news',
    params: query
  })
}
export function getGoodsList(query) {
  return service({
    method: 'post',
    url: '/mock/goods',
    data: query
  })
}