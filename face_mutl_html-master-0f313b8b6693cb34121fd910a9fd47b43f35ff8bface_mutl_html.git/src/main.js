// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'


import axios from "axios"

//标题 icon
// let host = process.env.VUE_APP_API_BASE_URL
// axios.get(host+"/sysconf").then(res=>{
//   console.log("sysconf",res)
//   let data = res.data.result.data
//   if(data){
//     let title = data.Title
//     let icon = data.Icon
//     if(title){
//       console.log(title,icon)
//       store.commit("title",title)
//     }
//     if(icon){
//       store.commit("icon",icon)
//     }
//   }
// })

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
// import './permission' // permission control
import './nopermission' // permission control

import './utils/filter' // global filter
import './global.less'

Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
Vue.component('pro-layout', ProLayout)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

String.prototype.format = function () {
  var args = arguments;
  return this.replace(/\{(\d+)\}/g,
    function (m, i) {
      return args[i]
    })
}

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
