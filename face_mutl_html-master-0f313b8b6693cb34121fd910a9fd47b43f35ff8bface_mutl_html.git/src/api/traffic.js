import request from '@/utils/request'

const api = {
    traffic: "/api/traffic",
    trVisitor:"/api/traffic/visitor" ,
    delVisitor:"/api/traffic_visitor",
    getUnregistered:"/api/traffic/undef",//获取未注册信息
    delUnregistered:"/api/traffic_undef",//单个删除
    delUnregistereds:"/api/traffics_undef",//批量删除
    csvUnregistereds:"/api/traffic_undef_csv"//批量导出
}
//未注册
//获取
export function getUndf (data, page) {
    return request({
        url: api.getUnregistered,
        method: 'get',
        params: Object.assign(data, page)
    })
}
//单删
export function delUndf (id, form) {
  return request({
    url: api.delUnregistered + '/' + id,
    method: 'delete',
    // formname:"traffic",
  })
}
//批量删除
export function delsUndf (form) {
  return request({
    url: api.delUnregistereds,
    method: 'delete',
    data:form
    // formname:"traffic",
  })
}
//导出
export function cvsUndf (param) {
    return request({
        url: api.csvUnregistereds,
        method: 'get',
        params: Object.assign(param)
    })
}










//
//
export function _queryTraffic (data, page) {
    return request({
        url: api.traffic,
        method: 'get',
        params: Object.assign(data, page)
    })
}
export function querytrVisitor (data, page) {
    return request({
        url: api.trVisitor,
        method: 'get',
        params: Object.assign(data, page)
    })
}
//删除认证人员
export function delTraffic (id, form) {
  return request({
    url: api.traffic + '/' + id,
    method: 'delete',
    formname:"traffic",
  })
}
//删除访客
export function del_Visitor (id, form) {
  return request({
    url: api.delVisitor + '/' + id,
    method: 'delete',
    formname:"traffic_visitor",
  })
}