
import api from '@/api'

export const zh_ctr_code = {
    "login": {
        form_name: {
            name: "账号",
            password: "密码",
        },
        form_code: {
            // 2210:"账号不存在"
        },
        code: {
            2201: "账号不存在"
        }

    },
    "updatepassword": {
        form_name: {
            password: "新密码",
            old: "原始密码",
        },
    },
    "adminuser": {
        form_name: {
            account: "账号",
            name: '用户名',
            phone: '手机号',
            email: "邮箱",
            idCard: "证件号",
            status: '状态',
            password: '密码',
            old: "原始密码"
        },
        form_code: {
            2113: '请输入有效手机号',
            2114: '请输入有效邮箱',
        },
        code: {},
    },
    "device": {
        form_name: {
            "name": "设备名称",
            "path": "组织",
            "mac": "MAC",
            "ip": "IP",
            "firmwareVersion": "固件版本",
            "deviceVersion": "软件版本",
            "recognitionMode": "识别模式",
            "infraredThermometer": "红外测温",
            "alarm": "高温报警",
            "alarmValue": "报警阀值",
            "relayOperationMode": "继电器工作模式",
            "pwd": "设备密码",
            "waitShutDownTime": "等待关闭时间",
            "temperatureUnit": "温度单位",
            "lowTemperatureRetest": "低温重测开关",
            "recognitionMode": "识别模式",
            "recognitionRate": "识别率",
            "faceMode": "人脸模式",
            "fastMovingDetection": "快速移动检测",
            "isSaveRecord": "是否保存记录",
            "workUserId": "员工ID",
            "VisitorUserId": "访客ID",
        }
    },
    "workuser": {
        "form_name": {
            "job_num":"工号",
            "jobNum": "工号",
            "name": "姓名",
            "phone": "电话",
            "email": "邮箱",
            "idCard": "证件号",
            "gender": "性别",
            "status": "状态",
            "groupId": "部门",
            "img": "头像",
            "deviceId": "设备",
             "address":"地址",
        },
        "form_code":{

        },
        "code":{
           2:"设备不存在",
           3:"访客不存在",
           4:"删除失败",
        },
    },
    "visitor":{
        "form_name": {
            "job_num":"工号",
            "jobNum": "工号",
            "name": "姓名",
            "phone": "电话",
            "email": "邮箱",
            "idCard": "证件号",
            "gender": "性别",
            "status": "状态",
            "img": "头像",
            "deviceId": "设备",
             "address":"地址",
        },
      code:{
        2:"设备不存在",
        3:"访客不存在",
        4:"删除失败",
      }
    },
    "workuser":{
      code:{
        // 40001:"账号已存在,{0}"
      }
    }


}