import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import router from '@/router'

const service = axios.create({
  baseURL: '/admin/', // url = base url + request url
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    config.headers['Accept'] = 'application/json'

    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code === 1) {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
        showClose: true
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    if (error.response && error.response.status !== 400 && error.response.status !== 401 && error.response.status !== 409) {
      ElMessage({
        message: error.response && error.response.data && error.response.data.message || error.message,
        type: 'error',
        duration: 5 * 1000,
        showClose: true
      })
    }
    if (error.response && error.response.status === 401) {
      ElMessage({
        message: '登录已经失效!',
        type: 'error',
        duration: 5 * 1000,
        showClose: true
      })
      setTimeout(removeToken(), 2000)
      setTimeout(router.push('/login'), 1000);
    }
    if (error.response && error.response.status === 400) {
      ElMessage({
        message: error.response.data.message,
        type: 'error',
        duration: 5 * 1000,
        showClose: true
      })
    }
    return Promise.reject(error)
  }
)

export default service