import * as msgBox from '@/core/msg'
var form = []
export default form


//最终处理
function _f (url, data, title, codeList, formname,formcode) {
    let names = formname[url] ? formname[url]:{}
    let codetpl = formcode[url]?formcode[url]:{}
    let _d = data.result
    for (let name in _d) {
        let _data = _d[name]
        // let _dt = []
        // if (_data.data) { _dt.push(_data.data) }
        let _name = names[name] ? names[name]: name
        let _format = codetpl[_data.code]?codetpl[_data.code] : codeList[_data.code]
        let _msg = ""
        if (_format) {
            _msg = codeList[_data.code].format(_name, _data.data)
        } else {
            _msg = _data.code
        }
        msgBox.msgErr(title, _msg)

    }
    return true
}
form.push(_f)