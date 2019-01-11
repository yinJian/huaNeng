import axios from 'axios'
import _confg from '@/config'
import store from '@/store'
import { getToken } from '@/libs/util'
import { Message } from 'iview'

const service = axios.create({
  baseURL: _confg.baseUrl.pro,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers['TENANT_ID'] = 1
    if (store.getters.token && (!config.headers || !config.headers['Authorization'])) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['Cookie'] = 'x-access-token= ' + getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    Message.error('faild')
    return Promise.reject(error)
  }
)

export function request (options) {
  return new Promise((resolve, reject) => {
    service(options)
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
