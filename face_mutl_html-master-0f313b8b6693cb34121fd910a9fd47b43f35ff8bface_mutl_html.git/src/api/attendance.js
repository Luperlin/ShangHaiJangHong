import { axios } from '@/utils/request'
// import api from './index'
const api = {
  // employee:'/api/workuser',
    attendance:'/api/attendance',
    attendanceBind:'/api/attendance_bind',//访客绑定
    attendanceUnbind:'/api/attendance_ubind',//访客解绑
    device:"/api/device",//设备
}
export default api
//查询
export function queryAttendance (param, page) {
  return axios({
    url: api.attendance,
    method: 'get',
    params: Object.assign(param, page)
  })
}
export function queryDevice (param, page) {
  return axios({
    url: api.device ,
    method: 'get',
    params: Object.assign(param, page)
  })
}

//创建
export function createAttendance (form) {
  console.log(form)
  return axios({
    url: api.attendance,
    method: 'post',
    data: form
  })
}

//更新
export function updateAttendance (id, form) {
  return axios({
    url: api.attendance + "/" + id,
    method: 'put',
    formname: api.attendance,
    data: form
  })
}

//删除
export function deleteAttendance (id, form) {
  return axios({
    url: api.attendance + '/' + id,
    method: 'delete',
  })
}
//绑定
export function bindAttendance (id, deviceid) {
  return axios({
    url: api.attendanceBind + "/" + id,
    method: 'put',
    formname: api.attendance,
    data:  {"deviceId":deviceid}
  })
}
//解绑
export function unbindAttendance (id, deviceid) {
  return axios({
    url: api.attendanceUnbind + "/" + id,
    method: 'put',
    formname: api.attendance,
    // data: {"deviceId":deviceid}
  })
}
