import {zh_code,zh_form_name,zh_form_code} from './baseCode/zh_base_code'
import {zh_ctr_code} from './controlCode/zh_control_code'
import {en_code,en_form_name,en_form_code} from './baseCode/en_base_code'
import {en_ctr_code} from './controlCode/en_control_code'


// 
var codeDatas={
    "zh":{
        err_title:"错误",
        code:zh_code,
        form_name:zh_form_name,
        form_code:zh_form_code,
        ctr_code:zh_ctr_code,
    },
    "en":{
        err_title:"error",
        code:en_code,
        form_name:en_form_name,
        form_code:en_form_code,
        ctr_code:en_ctr_code,
    }
}

export default codeDatas
