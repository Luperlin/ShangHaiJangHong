import request from '@/utils/request'

export const api={
    device:"/api/device",
    user:"/api/workuser",
    deviceLicense:"/api/device_license",
    batchBind:"/api/workuser_batch_bind",
    batchUbind:"/api/workuser_batch_ubind",
    vbatchBind:"/api/visitor_batch_bind",
    vbatchUbind:"/api/visitor_batch_ubind",
    workuserBatch:"/api/workuser_batch",//认证人员批量
    vBatch:"/api/visitor_batch",//访客批量
    //通行记录
    traff:"/api/traffics" ,//认证人员通行记录批量
    vtraff:"/api/traffics_visitor" ,
    downBatch:"/api/traffic_csv" ,//批量导出
    vdownBatch:"/api/traffic_visitor_csv" ,//批量导出
    //告警设置
    getEmail:"/api/waring/email",//发件邮箱
    getEmailList:"/api/waring/emailList",//收件邮箱
    getWaring:"/api/waring/waring",//告警事件
    getContent:"/api/waring/tpl",//获取报警内容
    // getContent:"/api/waring/tplInfo",//获取报警内容
}
//报警内容
export function getContent2 () {
    return request({
      url: api.getContent,
      method: 'get',
    })
}
export function setContent (param) {
    return request({
      url: api.getContent,
      method: 'post',
      data: param,
    })
}


//告警事件
export function getWaring () {
    return request({
      url: api.getWaring,
      method: 'get',
    })
}
export function setWaring (param) {
    return request({
      url: api.getWaring,
      method: 'post',
      data: param,
    })
}

//发件邮箱
export function getEmail () {
    return request({
      url: api.getEmail,
      method: 'get',
      // data: param,
      // formname:"device",
    })
}
export function sendEmail (param) {
    return request({
      url: api.getEmail,
      method: 'post',
      data: param,
    })
}
//收件邮箱
export function getEmailList () {
    return request({
      url: api.getEmailList,
      method: 'get',
      // data: param,
      // formname:"device",
    })
}
export function addEmailList (param) {
    return request({
      url: api.getEmailList,
      method: 'post',
      data: param,
    })
}


export function getDevice (parameter, page) {
    return request({
      url: api.device,
      method: 'get',
      params: Object.assign(parameter, page),
      formname:"device",
    })
}
export function deviceLicense () {
    return request({
      url: api.deviceLicense,
      method: 'get',
      formname:"device",
    })
}

export function getUser (parameter, page) {
    return request({
      url: api.user,
      method: 'get',
      params: Object.assign(parameter, page),
      // formdata:"device",
    })
}
//批量绑定认证人员
export function batchBindEmp (form) {
  console.log(form)
  return request({
    url: api.batchBind,
    method: 'post',
    data: form
  })
}
//删除
export function batchUbindEmp (form) {
  return request({
    url: api.batchUbind,
    method: 'delete',
    data: form
  })
}
//批量绑定认证人员
export function vbatchBindEmp (form) {
  console.log(form)
  return request({
    url: api.vbatchBind,
    method: 'post',
    data: form
  })
}
//删除
export function vbatchUbindEmp (form) {
  return request({
    url: api.vbatchUbind,
    method: 'delete',
    data: form
  })
}

//批量
// 认证人员
//删除
export function workuserBatch (form) {
  return request({
    url: api.workuserBatch,
    method: 'delete',
    data: form
  })
}
//访客
//删除
export function vBatch (form) {
  return request({
    url: api.vBatch,
    method: 'delete',
    data: form
  })
}
//通行记录

//////////////////////////////////////////////////////////
//认证人员
export function traff (form) {
  return request({
    url: api.traff,
    method: 'delete',
    data: form
  })
}
//访客
export function vtraff (form) {
  return request({
    url: api.vtraff,
    method: 'delete',
    data: form
  })
}

//批量导出

export function downBatch (param) {
    return request({
      url: api.downBatch,
      method: 'get',
      params: Object.assign(param),
      // formdata:"device",
    })
}

export function vdownBatch (param) {
    return request({
      url: api.vdownBatch,
      method: 'get',
      params: Object.assign(param),
      // formdata:"device",
    })
}
