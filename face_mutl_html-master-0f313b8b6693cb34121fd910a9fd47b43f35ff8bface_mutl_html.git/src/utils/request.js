import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import errE from '@/errEngine2'
import * as msgBox from '@/core/msg'
// import { config } from 'c:/users/dang/appdata/local/microsoft/typescript/3.9/node_modules/rxjs/index'
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  // console.log(error)
  // alert()
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  msgBox.msgErr(error.message)
  console.log("res err",error)
  return Promise.resolve({code:-1})
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['token'] = token
  }
  if(!config.headers["Content-Type"]){
    config.headers["Content-Type"] = 'application/json;charset=UTF-8'
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  //添加 token处理
  var token = response.headers["token"]
  if (response.data && response.code == 0 && token) {
    //token刷新
    storage.set(ACCESS_TOKEN, token)
  }
  //
  console.log("response",response)
  if(response.data.code != 0){
    errE(response)
  }
  
  // if (!response.config.noerr && response.data && response.data.code != 0) {

  //   errE(response.data, response.config.formname || response.config.url)
  // }
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
