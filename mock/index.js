import Mock from 'mockjs'
import homeApi from './home'
import userApi from './user'
import permissionApi from './permission'

// 设置mock响应时间为200-2000毫秒范围
Mock.setup({
  timeout: '200-2000'
})

// ----------------------首页mock接口数据----------------------
/* 
  1.使用官网提供的mock方法返回接口数据
    - mock方法的参数：
      rurl：表示需要拦截的 URL，可以是 URL 字符串或 URL 正则。例如 /\/domain\/list\.json/
      rtype：表示需要拦截的 Ajax 请求类型。例如 GET、POST、PUT、DELETE 等。
      function(option)：表示用于生成响应数据的函数。该函数由业务配置文件提供，例如home.js文件
*/
Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)

// ----------------------用户相关----------------------
Mock.mock(/\/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/\/user\/del/, 'get', userApi.deleteUser)
Mock.mock(/\/user\/batchremove/, 'get', userApi.batchremove)
Mock.mock(/\/user\/add/, 'post', userApi.createUser)
Mock.mock(/\/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)

// ----------------------权限相关----------------------
Mock.mock(/\/permission\/getMenu/, 'post', permissionApi.getMenu)

