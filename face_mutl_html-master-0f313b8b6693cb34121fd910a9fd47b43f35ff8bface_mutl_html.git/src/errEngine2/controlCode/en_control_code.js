
import api from '@/api'

export const en_ctr_code = {
    "login": {
        form_name: {
            name: "Account",
            password: "Password",
        },
        form_code:{
            2210:"Account does not exist"
        },
        code: {
            2201: "Account does not exist"
        }
    },
    "updatepassword": {
        form_name: {
            password: "New Password",
            old: "Old Password",
        },
    },
    "adminuser": {
        form_name: {
            account: "Account",
            name: 'Name',
            phone: 'Phone',
            email: "Email",
            idCard: "ID NO.",
            status: 'Status',
            password: 'Password',
            old: "Old Password",
        },
        form_code: {
          2113: 'Please input true phone number',
          2114: 'Please input true email',
        },
        code: {},
    },
    "device": {
        form_name: {
            "name": "DeviceId",
            "path": "Group",
            "mac": "MAC",
            "ip": "IP",
            "firmwareVersion": "Firmware Version",
            "deviceVersion": "Device Version",
            "recognitionMode": "Recognition Mode",
            "infraredThermometer": "Infrared Thermometer",
            "alarm": "High temperature alarm",
            "alarmValue": "Alarm threshold",
            "relayOperationMode": "Relay Operation Mode",
            "pwd": "Decvice Password",
            "waitShutDownTime": "Wait Shut Down Time",
            "temperatureUnit": "Temperature Unit",
            "lowTemperatureRetest": "low Temperature Retest",
            "recognitionRate": "Recognition Rate",
            "faceMode": "Face Mode",
            "fastMovingDetection": "Fast Moving Detection",
            "isSaveRecord": "Is Save Record",
            "workUserId": "Work User ID",
            "VisitorUserId": "Visitor User ID",
        }
    },
    "workuser": {
        "form_name": {
            "job_num":"Job ID",
            "jobNum": "Job ID",
            "name": "Name",
            "phone": "Phone",
            "email": "Email",
            "idCard": "ID NO.",
            "gender": "Gender",
            "status": "Status",
            "groupId": "Department",
            "img": "Head",
            "deviceId": "Device",
             "address":"address",
        },
        "form_code":{
    
        },
        "code":{
           2:"Device does not exist",
           3:"Visitor does not exist",
           4:"Deletion failed",
        },
    },
    "visitor":{
        "form_name": {
           "job_num":"Job ID",
           "jobNum": "Job ID",
           "name": "Name",
           "phone": "Phone",
           "email": "Email",
           "idCard": "ID NO.",
           "gender": "Gender",
           "status": "Status",
           "img": "Head",
           "deviceId": "Device",
           "address":"address",
        },
      code:{
         2:"Device does not exist",
         3:"Visitor does not exist",
         4:"Deletion failed",
      },
    }

}