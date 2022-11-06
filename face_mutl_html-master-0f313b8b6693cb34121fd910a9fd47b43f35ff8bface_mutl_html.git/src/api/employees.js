import request from '@/utils/request'
// import api from './index'
const api = {
  employee:'/api/workuser',
  employeeStatus:'/api/workuser_status',
  employeeBind:'/api/workuser_bind',
  employeeUbind:'/api/workuser_ubind',
  employeeGroup:'/api/workusergroup',
  image:'/api/image',
  moveGroup:'/api/workuser_group',
  workuserBatch:'/api/workuser_batch',
} 

export default api
// 图片上传
// export function upLoadImage (form) {
//   return request({
//     url: api.image,
//     method: 'post',
//     data:form
//   })
// }

//查询
export function queryEmployees (parameter, page) {
  return request({
    url: api.employee,
    method: 'get',
    params: Object.assign(parameter, page),
    formname:"workuser",
  })
}
//更新
export function updateEmployees (id, form) {
  return request({
    url: api.employee + "/" + id,
    method: 'put',
    // formname: api.deviceManagement,
    data: form,
    formname:"workuser",
  })
}
//删除
export function deleteEmployees (id, form) {
  return request({
    url: api.employee + '/' + id,
    method: 'delete',
    formname:"workuser",
  })
}
//新增
export function createEmployees (form) {
  return request({
    url: api.employee,
    method: 'post',
    data: form,
    formname:"workuser",
  })
}

//批量上传
export function addEmployees (formData) {
  return request({
    url: api.workuserBatch,
    method: 'post',
    data: formData,
    formname:"workuser",
  })
}
//__________________________________________________________

// 修改状态
export function employeeStatus (id, status) {
  return request({
    url: api.employeeStatus + "/" + id,
    method: 'put',
    formname: api.employeeStatus,
    data: { "status": status },
    formname:"workuser",
  })
}

//修改组织________________________GROUP__________________________

//修改组织________________________GROUP__________________________

//group 查
export function queryGroup (parameter, page) {
  return request({
    url: api.employeeGroup,
    method: 'get',
    params: Object.assign(parameter, page),
    formname:"workuser",
  })
}
// 改
export function updataGroup (id, form) {
  return request({
    url: api.employeeGroup + "/" + id,
    method: 'put',
    // formname: api.employeeGroup,
    data: form,
    formname:"workuser",
  })
}

//新增
export function createGroup (form) {
  return request({
    url: api.employeeGroup,
    method: 'post',
    data: form,
    formname:"workuser",
  })
}
//删除
export function deleteGruop (id, form) {
  return request({
    url: api.employeeGroup + '/' + id,
    method: 'delete',
    formname:"workuser",
  })
}

// 绑定
export function employeeBind (id, deviceid) {
  return request({
    url: api.employeeBind + "/" + id,
    method: 'put',
    // formname: api.employeeBind,
    data: { "deviceId": deviceid },
    formname:"workuser",
  })
}
// 解绑
export function employeeUbind (id, deviceid) {
  return request({
    url: api.employeeUbind + "/" + id,
    method: 'put',
    formname: api.employeeUbind,
    data: { "deviceId": deviceid },
    formname:"workuser",
  })
}
//移动分组
export function moveGroup (id, groupId) {
  return request({
    url: api.moveGroup + "/" + id,
    method: 'put',
    formname: api.moveGroup,
    data:{groupId:groupId},
    formname:"workuser",
  })
}