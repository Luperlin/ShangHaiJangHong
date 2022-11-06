import { axios } from '@/utils/request'
import api from './index'

//查询
export function queryHome (parameter, page) {
  return axios({
    url: api.home,
    method: 'get',
    params: Object.assign(parameter, page),
    formname:"device",
  })
}

