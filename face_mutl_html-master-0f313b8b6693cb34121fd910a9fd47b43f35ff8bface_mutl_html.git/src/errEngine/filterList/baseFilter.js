import * as msg from '@/core/msg'
import store from '@/store'
import storage from 'store'
import { ACCESS_TOKEN,USER_INFO,USER_NAME } from '@/store/mutation-types'

var base = []
export default base


// 登陆处理
function Elogin(url, data, title,codeList,formname){
    console.log(url,data)
    if(data.code==2201 && url == "login"){
        msg.msgErr(title,formname["login"].noname)
        return true
    }
}
base.push(Elogin)
//404 处理
//data list
function E404 (url, data, title, codeList) {

    if (data.code == 404) {
        // console.log("404", url, data)
        msg.msgErr(title, codeList[404].format(url))
        return true
    }
}

base.push(E404)
function E401 (url, data, title, codeList) {
    if (data.code == 401) {
        // console.log(data)
        // console.log(401)
        storage.remove(ACCESS_TOKEN)
        storage.remove(USER_INFO)
        storage.remove(USER_NAME)
        msg.msgErr(title, codeList[401])
        // alert("will logout")
        setTimeout(() => {
            window.location.reload()
        }, 1500)
        
        return true
    }
}
base.push(E401)
function E2117(url, data, title,codeList,formname){
    if (data.code == 2117) {
        let name = formname[url][data.result.data]
        msg.msgErr(title,codeList[2117].format(name))
        return trueF
    }
}
base.push(E2117)
