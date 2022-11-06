import { axios } from '@/utils/request'
import api from './index'

//查询
export function queryDevice (parameter, page) {
  return axios({
    url: api.deviceManagement,
    method: 'get',
    params: Object.assign(parameter, page),
    formname:"device",
  })
}

//更新
export function updateDevice (id, form) {
  return axios({
    url: api.deviceManagement + "/" + id,
    method: 'put',
    // formname: api.deviceManagement,
    data: form,
    formname:"device",
  })
}

//删除
export function deleteDevice (id, form) {
  return axios({
    url: api.deviceManagement + '/' + id,
    method: 'delete',
    formname:"device",
  })
}

