
import storage from 'store'
import codeDatas from './confLang'
import * as msg from '@/core/msg'
import { ACCESS_TOKEN,USER_INFO,USER_NAME } from '@/store/mutation-types'


function getLocalCode(){
    let lang = storage.get('lang')
    let _t = codeDatas[lang]
    if(!_t){
        throw("ERR_ENGIN lack lang template '"+ lang+"'")
    }
    return _t
}

function getCode(name){
    let _code = getLocalCode()
    if(!_code){
        console.log("ERR_ENGIN code is empty ","color:red")
        _code = codeDatas["zh"]
    }
    let _ctr_code = _code["ctr_code"]
    let ctr_code = _ctr_code[name]
    if(!ctr_code){
        ctr_code = {}
    }

    let code = _code["code"]
    let form_name = _code["form_name"]
    let form_code = _code["form_code"]
    let err_title = _code["err_title"]
    if(!ctr_code){
        console.log("%cERR_ENGIN there is no ctr_code '"+ name+"'","color:red")
        return {
            err_title,
            code,
            form_name,
            form_code,
        }
    }else{
        return {
            err_title,
            code:Object.assign({...code},ctr_code["code"] ||{}),
            form_name:Object.assign({...form_name},ctr_code["form_name"] ||{}),
            form_code:Object.assign({...form_code},ctr_code["form_code"]||{}),
        }
    }
}

function errE(response){
/*
data struct
2. {code:xx,result:{data:dd}}
*/
    //解析data
    let data = response.data
    let config = response.config
    let formname = config.formname
    console.log("%cformname:"+formname,"color:blue")
    console.log("%curl:"+config.url,"color:blue")
    console.log("%cconfig:",config,"%c formname:"+formname,"color:red")

    let code = data.code
    let baseCode = getCode(formname)
    console.log("basecode:",baseCode)
    let err_title = baseCode.err_title
    console.log("%cERR_ENGIN code:"+code,"color:blue")
    if(code == 404){
        E404(config.method,config.url,baseCode.code[404],err_title)
        return
    }
    //401 处理
    if(code == 401){
        E401(baseCode,err_title)
        return
    }

    if(code == 2100){
        E2100(data,baseCode,err_title)
        return 
    }

    E(baseCode,data,err_title)
    return
}

// err function 
function E401(baseCode,title){
    storage.remove(ACCESS_TOKEN)
    storage.remove(USER_INFO)
    storage.remove(USER_NAME)
    msg.msgErr(title, baseCode.code[401])
    // alert("will logout")
    setTimeout(() => {
        window.location.reload()
    }, 1500)
}


function E404(method,url,tpl,title){
    console.log(method,url,tpl,title)
    msg.msgErr(title,tpl.format(method,url))

}
function E2100(data,baseCode,title){
    console.log(data,baseCode)
    /* 
    {code:xx,
        result:{
            name1:{code:xx,data:xx},
            name2:{code:xx.data:xx},
            name3:{code:xx,data:xx},
        }s
    }
    */
    let results = data.result
    for( let name in results){
        console.log(name)
        let item = results[name]
        console.log("========",baseCode)
        let _name = baseCode.form_name[name] || name
        let _tpl = baseCode.form_code[item.code]
        if(!_tpl){
            _tpl="{0}"
            console.log("%cERR_ENGIN this is no code"+item.code,"color:red")
        }
        let _data = item.data || ""
        msg.msgErr(title,_tpl.format(_name,_data))
    }
}

function E(baseCode,data,title){
    let code = data.code
    let d = (data.result && data.result.data || "" ) || "" 
   if(baseCode.code[code]){
     msg.msgErr(title,baseCode.code[code].format(d))
   }
}

export default errE
