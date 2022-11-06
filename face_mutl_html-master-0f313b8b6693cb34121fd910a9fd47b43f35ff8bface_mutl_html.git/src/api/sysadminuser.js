import { axios } from '@/utils/request'
import api from './index'
const api2 = {
    allAss:"/api/admin/licenses",
    getAss:"/api/admin/user_point",
    
}
//查询用户
export function queryAdminUser (parameter, page) {
  return axios({
    url: api.sysAdminUser,
    method: 'get',
    params: Object.assign(parameter, page),
    formname:"adminuser",
  })
}

//创建用户
export function createAdminUser (form) {
  console.log(form)
  return axios({
    url: api.sysAdminUser,
    method: 'post',
    data: form,
    formname:"adminuser",
  })
}

//更新用户
export function updateAdminUser (id, form) {
  return axios({
    url: api.sysAdminUser + "/" + id,
    method: 'put',
    formname:"adminuser",
    data: form
  })
}

//删除管理员
export function deleteAdminUser (id, form) {
  return axios({
    url: api.sysAdminUser + '/' + id,
    method: 'delete',
    formname:"adminuser",
  })
}

//修改密码
export function putPwd (id, form) {
  return axios({
    url: api.sysAdminUser + "/" + id + "/password",
    method: 'put',
    formname:"updatepassword",
    data: form,
  })
}

//重置密码
export function postRestPassword (id) {
  return axios({
    url: api.sysAdminUser + "/" + id + "/resetpassword",
    method: "put",
    data: {},
  })
}
//授权点数
export function getAss(code){
  return axios({
    url:api2.getAss+"/"+code,
    method: "get",
  })
}
export function putAss(id,point){
  return axios({
    url:api.sysAdminUser+"/"+id+"/"+"point",
    method: "put",
    data:{point},
  })
}
export function getAllAss(){
  return axios({
    url:api2.allAss,
    method: "get",
  })
}