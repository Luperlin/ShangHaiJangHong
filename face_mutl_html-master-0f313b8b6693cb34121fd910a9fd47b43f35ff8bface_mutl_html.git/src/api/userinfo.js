import { axios } from '@/utils/request'
import api from './index'

export function getUserInfo () {
    return axios({
        url: api.UserInfo,
        method: 'get',
        formname:"adminuser"
    })
}

export function putUserInfo (params) {
    return axios({
        url: api.UserInfo,
        method: "put",
        formname:"adminuser",
        data: params
    })
}

export function putUserPassword (params) {
    return axios({
        url: api.UserInfoPassword,
        method: "put",
        data: params,
        formname:"adminuser",
    })
}