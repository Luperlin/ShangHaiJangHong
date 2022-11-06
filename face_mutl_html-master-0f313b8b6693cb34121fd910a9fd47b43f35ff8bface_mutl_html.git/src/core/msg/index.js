import notification from 'ant-design-vue/es/notification'

notification.config({
    // placement: 'bottomRight',
    // bottom: '50px',
    duration: 3,
  });

function msgErr (title, msg) {
    notification.error({
        message: title,
        description: msg
    })
}
function msgOk (title, msg) {
    notification.success({
        message: title,
        description: msg
    })
}

function msgInfo (title, msg) {
    notification.info({
        message: title,
        description: msg
    })
}
function msgWarn (title, msg) {
    notification.warn({
        message: title,
        description: msg
    })
}
function msgWarning (title, msg) {
    notification.warning({
        message: title,
        description: msg
    })
}

export { msgErr, msgOk, msgInfo, msgWarn, msgWarning }