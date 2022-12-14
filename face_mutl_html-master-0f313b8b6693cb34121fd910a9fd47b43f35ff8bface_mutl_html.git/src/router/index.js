import Vue from 'vue'
import Router from 'vue-router'
// import { constantRouterMap } from '@/config/router.config'
import {
  constantRouterMap,
  asyncRouterMap
} from '@/config/router.config'
// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// let routes = constantRouterMap.concat(asyncRouterMap)
Vue.use(Router)
export default new Router({
  mode: 'hash',
  routes: constantRouterMap,
})
