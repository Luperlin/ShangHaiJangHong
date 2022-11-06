
import { zh_CN_form_name, en_US_form_name } from './errFormName'

import { en_form_code, zh_form_code } from './errFormCode'
import baseFilter from './filterList/baseFilter'
import { zh_CN_code, en_US_code } from './errCodeList'
import formFilter from './filterList/formFilter'
import otherFilter from './filterList/otherFilter'

import storage from 'store'
var zh_CN = 'zh'
var en_US = 'en'
function errE (data, url) {
    // 国际化处理
    let lang = storage.get('lang')
    let codeList = []
    let form_name = {}
    let form_code = []
    let title = ""
    isover = false
    if (lang == zh_CN) {
        codeList = zh_CN_code
        form_name = zh_CN_form_name
        form_code = zh_CN_code
        title = "错误"
    } else if (lang == en_US) {
        codeList = en_US_code
        form_name = en_US_form_name
        form_code= en_US_code
        title = "ERROR"
    }

    title = "错误"
    let isover = false
    // 遍历基础
    // console.log(codeList)
    for (let i = 0; i < baseFilter.length; i++) {
        isover = baseFilter[i](url, data, title, codeList, form_name,form_code)
        if (isover) {
            break
        }
    }
    // 遍历form
    if (!isover && data.code == 2100) {// 对form 错误进行解析并处理
        for (let i = 0; i < formFilter.length; i++) {
            isover = formFilter[i](url, data, title, codeList, form_name,form_code)
            if (isover) {
                break
            }
        }
    }
    // 遍历其他
    if (!isover) {
        for (let i = 0; i < otherFilter.length; i++) {
            isover = otherFilter[i](url, data, title, codeList, form_name)
            if (isover) {
                break
            }
        }
    }
}

export default errE