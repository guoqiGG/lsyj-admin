// import Mock from 'mockjs'
// export default {
//   getMenu: config => {
//     const {
//       username,
//       password
//     } = JSON.parse(config.body)
//     console.log(JSON.parse(config.body))
//     // 先判断用户是否存在
//     if (username === 'admin' || username === 'wp') {
//       // 判断账号和密码是否对应
//       if (username === 'admin' && password === '123456') {
//         return {
//           code: 20000,
//           data: {
//             menu: [{
//                 path: '/',
//                 name: 'home',
//                 label: '首页',
//                 icon: 's-home',
//                 url: 'Home/Home'
//               },
//               {
//                 path: '/video',
//                 name: 'video',
//                 label: '视频管理页',
//                 icon: 'video-play',
//                 url: 'VideoManage/VideoManage'
//               },
//               {
//                 path: '/user',
//                 name: 'user',
//                 label: '用户管理页',
//                 icon: 'user',
//                 url: 'UserManage/UserManage'
//               },
//               {
//                 label: '其他',
//                 icon: 'location',
//                 children: [{
//                     path: '/page1',
//                     name: 'page1',
//                     label: '页面1',
//                     icon: 'setting',
//                     url: 'Other/PageOne'
//                   },
//                   {
//                     path: '/page2',
//                     name: 'page2',
//                     label: '页面2',
//                     icon: 'setting',
//                     url: 'Other/PageTwo'
//                   }
//                 ]
//               }
//             ],
//             token: Mock.Random.guid(),
//             message: '获取成功'
//           }
//         }
//       } else if (username === 'wp' && password === '123456') {
//         return {
//           code: 20000,
//           data: {
//             menu: [{
//                 path: '/',
//                 name: 'home',
//                 label: '首页',
//                 icon: 's-home',
//                 url: 'Home/Home'
//               },
//               {
//                 path: '/video',
//                 name: 'video',
//                 label: '视频管理页',
//                 icon: 'video-play',
//                 url: 'VideoManage/VideoManage'
//               }
//             ],
//             token: Mock.Random.guid(),
//             message: '获取成功'
//           }
//         }
//       } else {
//         return {
//           code: -999,
//           data: {
//             message: '密码错误'
//           }
//         }
//       }
//     } else {
//       return {
//         code: -999,
//         data: {
//           message: '用户不存在'
//         }
//       }
//     }
//   }
// }


//src/mock/goods.js

// 引入mockjs
import Mock from 'mockjs'
// 获取 mock.Random 对象
const Random = Mock.Random

const produceGoodsData = function (data) {
  console.log(data, '接收post参数');
  let body = JSON.parse(data.body)
  console.log(body);
  let produceGoodsData = []
  for (let i = 0; i < 2; i++) {
    let goodsObject = {
      ...body
    }
    produceGoodsData.push(goodsObject)
  }

  return produceGoodsData
}
Mock.mock('/mock/goods', 'post', produceGoodsData)