import * as msgBox from '@/core/msg'
var other = []
export default other

function _f (url, data, title, codeList) {
    let code = data.code
    let msg = ''
    if (data.result.data) {
        msg = codeList[code].format(data.data)
    } else {
        msg = codeList[code]
    }
    msgBox.msgErr(title, msg)
    return true
}
other.push(_f)
