
import api from '@/api'
import {api as deviceapi} from '@/api/device'

// console.log("api=======",api)
var zh_CN_form_name = {
    "login":{
        noname:"账号不存在",
        name:"账号",
        password:"密码",
    },
    [api.UserInfo]: {
        id: 'ID',
        account: '账号',
        name: '姓名',
        phone: '手机号',
        email: '电子邮箱',
        status: '状态',
        password: '密码',
        created_at: '创建时间',
        updated_at: '更新时间'
    },
    [api.sysAdminUser]:{
        id: 'ID',
        account: '账号',
        name: '用户名',
        phone: '手机号',
        email: '邮箱',
        status: '状态',
        password: '密码',
        created_at: '创建时间',
        updated_at: '更新时间'
    },
    "updatepassword":{
        password:"新密码",
        old:"原始密码",
    },
    [api.UserInfoPassword]:{
        old:"原始密码",
        password:"新密码"
    },
    [deviceapi.device]:{
       "name":"设备",
        "path":"组织",
        "mac":"MAC",
        "ip":"IP",
        "firmwareVersion":"固件版本",
        "deviceVersion":"软件版本",
        "recognitionMode":"识别模式",
        "infraredThermometer":"红外测温",
        "alarm":"高温报警",
        "alarmValue":"报警阀值",
        "relayOperationMode":"继电器工作模式",
        "pwd":"设备密码",
        "waitShutDownTime":"等待关闭时间",
        "temperatureUnit":"温度单位",
        "lowTemperatureRetest":"低温重测开关",
        "recognitionMode":"识别模式",
        "recognitionRate":"识别率",
        "faceMode":"人脸模式",
        "fastMovingDetection":"快速移动检测",
        "isSaveRecord":"是否保存记录",
        "workUserId":"员工ID",
        "VisitorUserId":"访客ID",
    },
    [deviceapi.user]:{
    }
    


}
var en_US_form_name = {

}

export { zh_CN_form_name, en_US_form_name }