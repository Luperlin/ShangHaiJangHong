import request from '@/utils/request'

const api = {
    headImg: "/api/icon",
    sysTitle:"/api/title",
    sysconf:"/api/sysconf"
}

export function sysconf () {
    return request({
        url: api.sysconf,
        method: 'get',
        // params: Object.assign(data, page)
    })
}
export function upTitle (data) {
    return request({
        url: api.sysTitle,
        method: 'post',
        data: Object.assign(data)
    })
}
export function upHead (data) {
    return request({
        url: api.headImg,
        method: 'post',
        data: Object.assign(data)
    })
}