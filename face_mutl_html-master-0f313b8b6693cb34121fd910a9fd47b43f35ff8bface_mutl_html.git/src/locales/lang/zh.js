import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

const components = {
  antLocale: antd,
  momentName: 'zh',
  momentLocale: momentCN
}

const locale = {
  header: {
    my: "个人中心",
    set: "个人设置",
    logout: "退出登录",
  },
  menu: {
    home: "主页",
    sysadmin: {
      title: "系统管理",
      user: "组织管理",
      set: "系统设置",
    },
    deviceManagement: "设备管理",
    personnel: {
      title: "人员管理",
      employees: '认证人员',
      visitor: "访客",
    },

    device: {
      title: "通行管理",
      user: "通行授权",
      record: "通行记录"
    },
    // workManagement:{
    workManagement: "考勤管理",
    attendance: "考勤规则",
    attenRecord: "考勤记录",
    // },


  },
  btn: {
    ok: "确定",
    edit: "编辑",
    del: "删除",
    cancel: "取消",
    query: "查询",
    reset: "重置",
    add: "新建",
    updata: "更新",
    pwdReOk: "确认修改密码",
    resetPassword: "重置密码",
    submit: "提交",
    save: "保存",
    deviceConn: "关联设备",
    deviceOut: "解绑设备",
    batchAdd: '批量添加',
    batchBind: '批量绑定',
    BatchExport: '批量导出',
    set: "设置",
    // batchUnbind:'批量绑定',

  },
  form: {
    account: "账号",
    name: "姓名",
    userName: "用户名",
    pwd: "密码",
    idCard: "证件号",
    email: "邮箱",
    phone: "手机",
    status: "状态",
    action: "操作",
    enable: "启用",
    disable: "禁用",
    effective: "有效",
    invalid: "无效",
    basicSettings: "基本设置",
    passwordSettings: "密码设置",
    originalPassword: "原始密码",
    newPassword: "新密码",
    changePwd: "修改密码",
    repeatPassword: "重复密码",

    deviceInfo: "设备信息",
    deviceName: "设备名称",
    deviceId: "设备ID",
    devicePwd: "设备密码",
    lastOnline: "最近上线",
    firmwareVersion: "固件版本",
    softwareVersion: "软件版本",
    recognitionPattern: "识别模式",
    infraredTemperatureMeasurement: "红外测温",
    support: "支持",
    unsupport: "不支持",
    temperatureUnit: "温度单位",
    highTemperatureAlarm: "高温报警",
    alarmThreshold: "报警阈值",
    lowTemperatureWeightMeasurement: "低温重测",
    relayOperationMode: "继电器工作模式",
    validationStartedSuccessfully: "验证成功开启",
    ValidationFailedToOpen: "验证失败开启",
    normallyOpen: "常开",
    normallyClose: "常关",
    fangKeTongXingMa: '访客通行码',
    biaoTi: "标题",
    youXiaoShiJian: "有效时间",
    tian: '天',
    sheBei: "设备",
    shengCheng: "生成",
    fangKeTongXing: "访客通行",
    zhucCeShiJian: "注册时间",
    zuiJinShangXian: "最近上线",
    renLian: "人脸",
    ceWen: "测温",
    kouZhao: '口罩',
    zhiChi: "支持",
    buZhiChi: "不支持",
    dengDaiGuanBiShiJian: "等待关闭时间",
    shiBieMoShi: "识别模式",
    jingZhun: '精准',
    kauiSu: "快速",
    shiBieLv: "识别率",
    kuaiSuYiDongJianCe: "快速移动检测",
    shiBieJiLu: "识别记录",
    piLiangShanChu: "批量删除",
    ge: "个",
    zaiXian: "在线",
    buZaiXian: '离线',
    chaKan: "查看",
    sheZhi: "设置",
    shanChu: "删除",

    buMen: "部门",
    gongHao: "工号",
    gender: '性别',
    baoMi: "保密",
    nan: "男",
    nv: "女",
    img: "照片",
    shuoMing: "说明",
    text1: '1-文件大小不超过240KB，支持jpg、jpeg、png格式',
    text2: '2-人脸需占照片1/3以上面积，建议使用证件照',
    text3: '3-照片避免模糊、佩戴墨镜、过度美颜、头像旋转等情况',
    text4: '人员禁用后，关联设备不做识别认证，请确认是否禁用',
    groupName: '分组名称',
    moveEmployee: "移动人员到",
    company: "公司",
    restCompany: '重命名分组',
    move: '移动',
    address: '地址',
    youXiaoQi: "有效期",
    taday: '今天',
    week: "本周",
    month: "本月",

    tianJia: "添加人员",
    suoYou: '所有',
    visitor: "访客",
    renZhengRenYuan: "认证人员",
    queDingTianJia: "确定从添加人员",
    zhiSheBei: "至设备",
    zhiSheBeishanChu: '中删除人员',
    queDingTianJiaFK: "确定从添加访客",
    zhiSheBeishanChuFK: '中删除访客',
    queDingCongSheBei: "确定从设备",
    jieGuo: '结果',
    yanZhengSuccess: "验证成功",
    yanZhengError: "验证失败",
    model: "模式",
    time: "时间",
    search: "搜索",
    shouQi: "收起",
    zhanKai: "展开",
    fail: "失败",
    success: "成功",
    all: '全部',
    wenDu: "温度",
    ruleName: "规则名称",
    startTime: "开始时间",
    endTime: "结束时间",
    inputRuleName: "请输入规则名称",
    workRule: '考勤规则',
    attendance: "考勤",
    upName: '修改名称',
    sysName: '系统名称',
    sysInfo: '系统信息',
    host: '访问地址',
    updata: '修改',
    sysIcon: '系统图标',
    sysVsersion: '系统版本',

    inputAcc: "请填写账号",
    inputPwd: "请填写密码",
    dwIndex: "序号",
    ICCard: "IC卡号",
    sendSet: '发送设置',
    sendEmail: '发送邮件',
    port: "端口",
    smptServe: "SMPT服务器",
    reviceSet: "接收设置",
    reviceEmail: '接收邮箱',
    changeEmail: "修改邮箱",
    alarmEvent: "告警事件",
    maxT: "最高温",
    minT: "最低温",
    sfdkz: "是否戴口罩",
    yes: '是',
    no: "否",
    alarmContent: '告警内容',
    theme: "主题",
    content: "内容",
    alarmSet: "告警设置",
    zanWu: "暂无",
    unSet: "未设置",
    ypdkz: "已佩戴口罩",
    wpdkz: "未佩戴口罩",
    changes: "修改",
    reviceEmailSet: "设置收件邮箱",
    others: "其他人员",
    lowTemperatureValue: '低温重测',
    clickUp: '点击上传',
    upLoad: '上传',
    bataddText1: "点击下载",
    bataddText2: "导入模板",
    bataddText3: "按导入模板格式进行填写人员信息",
    bataddText4: "将人员数据文件与人员照片合并为zip格式压缩文件",
    bataddText5: "压缩文件大小不超过200MB",
    bataddText6: "压缩文件下为csv文件与图片并将压缩文件命名为users，csv文件命名为user",
    dark: '黑',
    white: '白',
    zi: '紫',
    unFlsh: "未刷新数据",
    unregistered: '未注册',
    devStatus: '设备状态',
    devCount: '设备详情',
    rldev: '人脸识别设备',
    onlinDev: '在线设备',
    offlinDev: '离线设备',
    tadayData: "人脸识别数据",
    rlssData: '设备数量',
    rlssData2: '人脸实时数据',
    count: "总数",
    weirz: "未认证人员",
    sqds:"授权点数",
    ky:"可用",
    yy:"已用",
    numOfFace:'系统人数',
    clickCopy:"点击复制变量",
    defaultTemplate:"默认模板",
    event:'事件',
    modelText1:'通知事件',
    modelText2:'姓名',
    modelText3:'工号',
    modelText4:'于',
    modelText5:'在设备',
    modelText6:'进行检测，温度为',
    modelText7:'系统邮件，请勿回复。',
    modelText8:'组织的',
    addGruop:'添加组织',
    groupName:'组织名称',
    systemName:"系统名称",
    connecter:'联系人',
    groupJname:'组织简称',
    assignTo:'分配到',
    canUse:"我的可用点数",
    gruopNum:'组织点数',
    groupInfo:'组织信息',
    feedback:"请将以下信息反馈给组织人员",
    loginAccount:"登录账号",
    InitialPassword:"初始密码",
    close:"关闭",
    copy:"复制",
    authorizedPoints:'授权点数',
    allocated:'已分配',
    allocation:'分配',
    visitUrl:'访问路径',
    memo:"备注",
    countFace:"共识别",
    ci:"次"





  },
  messages: {
    pwdDiff: "两次输入密码不一样",
    upSuccess: "修改成功",
    logAgain: "修改成功,即将重新登录！",
    delSuccess: "删除成功",
    toDelete: "确定删除",
    retPwdMes: "确定重置密码么？此操作不可恢复！",
    newPwd: "新密码",
    pwdShow: "注意:此密码只显示一次",
    retPwdSuccess: "密码重置成功",
    updataSuccess: "更新成功",
    qingShuRUShiJian: "请输入时间",
    sheZhiChengGong: "设置成功",
    imgError: "图片上传失败",
    creatSuccess: "创建成功",
    creatError: "创建失败",
    moveSuccess: '移动成功',
    updataSuccess: '修改成功',
    addSuccess: '添加成功',
    bindSuccess: '绑定成功',
    unbindSuccess: "解绑成功",
    welcome: '欢迎',
    welcomeBack: '欢迎回来',
    loginOut: "确定退出登录吗?",
    toBatchDel: "确定要批量删除吗？",
    toBatchExport: "确定批量导出吗？",
    exportSuccess: "导出成功",
    setSuccess: "设置成功",
    theLowT:'最低温不能大于最高温',
    importSuccess:"导入成功",
    isCard:'工号已存在',
    importDef:"导入失败",
    IncorrectFormat:"压缩文件格式不正确",
    tooLarge:"压缩文件超过200M",
    depNotExist:"部门不存在",
    queryError: "查询失败",
    assError:"分配失败",
    copySuss:"复制成功",
    outUse:"不能超过可用点数"
    
  },
  page: {
    total: "共",
    tiao: "条",
  },


  'message': '-',
  // 'menu.home': '主页',
  // 'menu.dashboard': '仪表盘',
  // 'menu.dashboard.analysis': '分析页',
  // 'menu.dashboard.monitor': '监控页',
  // 'menu.dashboard.workplace': '工作台'
}

export default {
  ...components,
  ...locale
}