import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN,ROLE } from '@/store/mutation-types'
import { i18nRender } from '@/locales'
// import { ACCESS_TOKEN,USER_INFO,USER_NAME,ROLE,CODE } from '@/store/mutation-types'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
const loginRoutePath = '/user/login'
const defaultRoutePath = '/sysadmin/user'

router.beforeEach((to, from, next) => {
    // console.log("beforeeach")
    console.log("router::",from,to)
    NProgress.start() // start progress bar
    to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`))
  
    if (storage.get(ACCESS_TOKEN)) {
        if (to.path === loginRoutePath) {
            next({ path: defaultRoutePath })
            NProgress.done()
        } else {
            
            if(store.getters.roles.length === 0){
                let role = storage.get(ROLE)
                console.log("role",role)
                let r={
                    permissionList:[role],
                }
                store.dispatch("SetRole",[r])
                store.dispatch('GenerateRoutes', { roles:r }).then(() => {
                    // 根据roles权限生成可访问的路由表
                    // 动态添加可访问路由表
                    console.log("add router",store.getters.addRouters)
                    router.addRoutes(store.getters.addRouters)
                    // 请求带有 redirect 重定向时，登录自动重定向到该地址
                    const redirect = decodeURIComponent(from.query.redirect || to.path)
                    
                    let title = storage.get("title")
                    let icon = storage.get("icon")
                    if(icon!=undefined){
                      store.commit("icon",icon)
                    }
                    if(title!=undefined){
                      store.commit("title",title)
                    }
                    
                    console.log("title,icon",title,icon)
                    if (to.path === redirect) {
                      // set the replace: true so the navigation will not leave a history record
                      next({ ...to, replace: true })
                    } else {
                      // 跳转到目的路由
                      next({ path: redirect })
                    }
                }) 

            }else{
                next()
            }

            // console.log("next==",to,from)
            // const redirect = decodeURIComponent(from.query.redirect || to.path)
            // if (to.path === redirect) {
            //   // set the replace: true so the navigation will not leave a history record
            //   next({ ...to, replace: true })
            // } else {
            //   // 跳转到目的路由
            //   next({ path: redirect })
            // }
        }
    } else {
        // console.log("before 2")
        if (whiteList.includes(to.name)) {
            // 在免登录白名单，直接进入
            next()
        } else {
            // console.log("before 3")
            next({ path: loginRoutePath })
            //   next({ path: loginRoutePath, query: { redirect: to.fullPath } })
            NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
        }
    }
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})
