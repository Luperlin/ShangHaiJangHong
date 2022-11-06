import storage from 'store'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN,USER_INFO,USER_NAME,ROLE,CODE } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    unit:'',
    roles: [],
    info: {},
    code:"",
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_UNIT: (state, unit) => {
      state.unit = unit
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_CODE:(state,code)=>{
      state.code = code
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          // console.log(response)
          if (response.code == 0) {
            const token = response.result.data.token
            // console.log("login",response,token)
            storage.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000)
            storage.set(ROLE,response.result.data.role)
            storage.set(CODE,response.result.data.code)
            // commit("SET_ROLES",response.result.data.role)
            commit("SET_CODE",response.result.data.code)
            commit('SET_TOKEN', token)
          }
          resolve(response)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          if(response.code==0){
            let info = response.result.data
            commit('SET_INFO', info)
            commit('SET_UNIT', info)
            commit('SET_NAME', { name: info.name, welcome: welcome() })
            commit('SET_AVATAR', info.avatar)
            storage.set(USER_NAME,info.name)
            // commit("SET_ROLES",info.role)
            console.log("write info",ACCESS_TOKEN,USER_INFO,info)
            storage.set(USER_INFO,info)
          }
          // const result = response.result

          // if (result.role && result.role.permissions.length > 0) {
          //   const role = result.role
          //   role.permissions = result.role.permissions
          //   role.permissions.map(per => {
          //     if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
          //       const action = per.actionEntitySet.map(action => { return action.action })
          //       per.actionList = action
          //     }
          //   })
          //   role.permissionList = role.permissions.map(permission => { return permission.permissionId })
          //   commit('SET_ROLES', result.role)
          //   commit('SET_INFO', result)
          // } else {
          //   reject(new Error('getInfo: roles must be a non-null array !'))
          // }

          // commit('SET_NAME', { name: result.name, welcome: welcome() })
          // commit('SET_AVATAR', result.avatar)

          resolve(response)
        })
      })
    },
    SetRole({commit},roles){
      commit("SET_ROLES",roles)
    },
    // 登出
    Logout ({ commit }) {
      return new Promise((ok,resolve) => {
        logout().then().finally(() => {
          ok()
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
          storage.remove(USER_INFO)
          storage.remove(USER_NAME)
        })
      })
    }

  }
}

export default user
