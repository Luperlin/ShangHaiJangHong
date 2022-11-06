import { axios } from '@/utils/request'
// import api from './index'
const api = {
  // employee:'/api/workuser',
    visitor:'/api/visitor',
    visitorBind:'/api/visitor_bind',//访客绑定
    visitorUnbind:'/api/visitor_ubind'//访客解绑
}
export default api
//查询
export function queryVisitor (param, page) {
  return axios({
    url: api.visitor,
    method: 'get',
    params: Object.assign(param, page),
    formname:"visitor",
  })
}

//创建
export function createVisitor (form) {
  console.log(form)
  return axios({
    url: api.visitor,
    method: 'post',
    data: form,
        formname:"visitor",
    
  })
}

//更新
export function updateVisitor (id, form) {
  return axios({
    url: api.visitor + "/" + id,
    method: 'put',
    
    data: form,
        formname:"visitor",
  })
}

//删除
export function deleteVisitor (id, form) {
  return axios({
    url: api.visitor + '/' + id,
    method: 'delete',
        formname:"visitor",
  })
}
//绑定
export function bindVisitor (id, deviceid) {
  return axios({
    url: api.visitorBind + "/" + id,
    method: 'put',
    
    data:  {"deviceId":deviceid},
        formname:"visitor",
  })
}
//解绑
export function unbindVisitor (id, deviceid) {
  return axios({
    url: api.visitorUnbind + "/" + id,
    method: 'put',
    
    data: {"deviceId":deviceid},
        formname:"visitor",
  })
}
