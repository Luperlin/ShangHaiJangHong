<template>

  <page-header-wrapper :title="false" content="">
    <!-- 告警弹框1 -->
    <a-modal :title="$t('form.sendSet')" :visible="alarmShow" @cancel="alarmCancel" @ok="()=>{sendSet()}" :width="700">
      <a-form :form="sendEform">
        <a-form-item :label="$t('form.email')" :labelCol="{span:5}" :wrapperCol="{span:16}" required>
          <a-input v-model='sendEform.email' />
        </a-form-item>
        <a-form-item :label="$t('form.pwd')" :labelCol="{span:5}" :wrapperCol="{span:16}" required>
          <a-input v-model='sendEform.pwd' type="password" />
        </a-form-item>
        <a-form-item :label="$t('form.smptServe')" :labelCol="{span:5}" :wrapperCol="{span:16}" required>
          <a-input v-model='sendEform.server' />
        </a-form-item>
        <a-form-item :label="$t('form.port')" :labelCol="{span:5}" :wrapperCol="{span:16}" required>
          <a-input v-model='sendEform.port' />
        </a-form-item>
        <a-form-item label="ssl" :labelCol="{span:5}" :wrapperCol="{span:16}" required>
          <!-- <a-input v-model='sendEform.ssl' /> -->
          <a-switch  @change="switchChange" />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 告警弹框2 -->
    <a-modal :title="$t('form.reviceSet')" :visible="alarmShow2" @cancel="alarmCancel" @ok="()=>{reviceSet()}" :width="700">
      <a-form :form="reviceEform">
        <a-form-item :label="$t('form.reviceEmail')" :labelCol="{span:5}" :wrapperCol="{span:16}" required>
          <a-input v-model='reviceEform.email' />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 告警弹框2-1 -->
    <a-modal :title="$t('form.changeEmail')" @ok="()=>{onUpEmail()}" :visible="alarmShow5" @cancel="alarmCancel">
      <a-input v-model="upEmail" />
    </a-modal>
    <!-- 告警弹框3 -->
    <a-modal :title="$t('form.alarmEvent')" :visible="alarmShow3" @ok="()=>{setWaring()}" @cancel="alarmCancel">
      <a-form :form="waringForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-form-item :label="$t('form.maxT')">
          <a-input type="number" v-model="waringForm.maxt" />
        </a-form-item>
        <a-form-item :label="$t('form.minT')">
          <a-input v-model="waringForm.mint" type="number" />
        </a-form-item>
        <a-form-item :label="$t('form.sfdkz')">
          <a-radio-group v-model="waringForm.mask" :default-value="1">
            <a-radio value="0">
              {{$t('form.yes')}}
            </a-radio>
            <a-radio value="1">
              {{$t('form.no')}}
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 告警弹框4 (内容) -->
    <a-modal :title="$t('form.alarmContent')" :visible="alarmShow4" @ok="()=>{setAlarmContent()}" @cancel="alarmCancel">
      <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }">
        <a-form-item :label="$t('form.theme')">
          <a-input v-model="contentForm.title" />
        </a-form-item>
        <!-- <a-form-item :label="$t('form.content')"> -->
        <a-form-item :label="$t('form.content')">
          <a-textarea style="min-height: 120px;" v-model="contentForm.content" />
          <div style="float: right;" @click="onDefaultModel">{{$t('form.defaultTemplate')}}</div>
        </a-form-item>
        <!-- 复制区域 -->
        <a-form-item :label="$t('form.clickCopy')" class="bianliang">
          <template>
            <a-tooltip class="copybtn" data-clipboard-text="${event}">
              <template slot="title">
                ${event}
              </template>
              <a>{{$t('form.event')}}</a>
            </a-tooltip>

            <a-tooltip class="copybtn" data-clipboard-text="${name}">
              <template slot="title">
                ${name}
              </template>
              <a>{{$t('form.name')}}</a>
            </a-tooltip>

            <a-tooltip class="copybtn" data-clipboard-text="${jobNum}">
              <template slot="title">
                ${jobNum}
              </template>
              <a>{{$t('form.gongHao')}}</a>
            </a-tooltip>

            <a-tooltip class="copybtn" data-clipboard-text="${time}">
              <template slot="title">
                ${time}
              </template>
              <a>{{$t('form.time')}}</a>
            </a-tooltip>
            <a-tooltip class="copybtn" data-clipboard-text="${deviceName}">
              <template slot="title">
                ${deviceName}
              </template>
              <a>{{$t('form.deviceName')}}</a>
            </a-tooltip>

            <a-tooltip class="copybtn" data-clipboard-text="${temperature}">
              <template slot="title">
                ${temperature}
              </template>
              <a>{{$t('form.wenDu')}}</a>
            </a-tooltip>
          </template>
          <!-- 通知事件：${event} ，姓名 ${name}， 工号：${jobNum}， 于 ${time}， 在设备 ${deviceName} 进行检测，温度为${temperature}。系统邮件，请勿回复。 -->
        </a-form-item>

      </a-form>
    </a-modal>

    <a-modal :visible="previewVisible" :footer="null" @cancel="onCancel2">
      <!-- <img style="width: 100%" :src="host+icon" /> -->
      <img style="width: 100%" :src="host+imgSrc" />
      
    </a-modal>
    <a-modal :title="$t('form.upName')" :visible="changShow" @cancel="cancel" @ok="()=>{upName()}">
      <a-form-item :label="$t('form.sysName')" :labelCol="{span:5}" :wrapperCol="{span:16}">
        <a-input v-model="sysTitle" />
      </a-form-item>
    </a-modal>
    <!-- <a-card :bordered="false" :bodyStyle="{ padding: '16px 0', height: '100%' }" :style="{ height: '100%' }"> -->
    <a-card :bordered="false" :bodyStyle="{ padding: '16px 0', height: '100%' }" :style="{ height: '100%' }">
      <div class="account-settings-info-main" :class="{ 'mobile': isMobile }">
        <div class="account-settings-info-left">
          <a-menu :mode="isMobile ? 'horizontal' : 'inline'" :style="{ border: '0', width: isMobile ? '560px' : 'auto'}"
            :selectedKeys="selectedKeys" type="inner" @click="handleClick">
            <a-menu-item key="1">
              <span>{{$t('form.basicSettings')}}</span>
            </a-menu-item>
            <a-menu-item key="2">
              <span>
                {{$t('form.passwordSettings')}}
              </span>
            </a-menu-item>
            <a-menu-item key="3">
              <span>
                {{$t('form.sysInfo')}}
              </span>
            </a-menu-item>
            <a-menu-item key="4" v-if="permission!='admin'">
              <span>
                {{$t('form.alarmSet')}}
              </span>
            </a-menu-item>
          </a-menu>
        </div>
        <div class="account-settings-info-right">
          <div class="account-settings-info-title" @click="getEmails">
            <span v-if="key=='1'">{{$t('form.basicSettings')}}</span>
            <span v-if="key=='2'">{{$t('form.passwordSettings')}}</span>
            <span v-if="key=='3'">{{$t('form.sysInfo')}}</span>
            <span v-if="key=='4'&& permission!='admin'">{{$t('form.alarmSet')}}</span>
            <!-- <span>{{key=='1'?$t('form.basicSettings'):$t('form.passwordSettings')}}</span> -->
          </div>
          <div v-if="key=='1'">
            <a-row :gutter="16">
              <a-col :md="14" :lg="16">
                <a-form :form="user">
                  <a-input :value="user.account" disabled />
                  </a-form-item>
                  <a-form-item :label="$t('form.name')" :colon="true">
                    <a-input v-model="user.name" />
                  </a-form-item>
                  <!-- <a-form-item :label="$t('form.email')" :colon="true" :validate-status="userStatus.email?'error':''" :help="userStatus.email">
                    <a-input v-model="user.email" />
                  </a-form-item> -->

                  <a-form-item :label="$t('form.phone')" :colon="true" :validate-status="userStatus.phone?'error':''"
                    :help="userStatus.phone">
                    <a-input v-model="user.phone" />
                  </a-form-item>
                  <a-form-item>
                    <a-button type="primary" @click="onPutInfo" :loading="btnloading">{{$t('btn.submit')}} </a-button>
                  </a-form-item>
                </a-form>
              </a-col>
            </a-row>

          </div>
          <div v-else-if="key=='2'">
            <a-row :gutter="16">
              <a-col :md="24" :lg="16">
                <a-form :form="password">
                  <a-form-item :label="$t('form.originalPassword')" :colon="true" :validate-status="passwordStatus.old?'error':''"
                    :help="passwordStatus.old">
                    <a-input v-model="password.old" type="password" />
                  </a-form-item>
                  <a-form-item :label="$t('form.newPassword')" :colon="true" :validate-status="passwordStatus.password?'error':''"
                    :help="passwordStatus.password">
                    <a-input v-model="password.password" type="password" />
                  </a-form-item>

                  <a-form-item :label="$t('form.repeatPassword')" :colon="true" :validate-status="passwordStatus.backpassword?'error':''"
                    :help="passwordStatus.backpassword">
                    <a-input v-model="backpassword" type="password" />
                  </a-form-item>
                  <a-form-item>
                    <a-button type="primary" @click='onResetPassword' :loading="loading.resetPassword">{{$t('btn.submit')}}
                    </a-button>
                  </a-form-item>
                </a-form>
              </a-col>
            </a-row>
          </div>
          <div v-else-if="key=='3'">
            <div :span='12' class="system">
              <span class="systitle" :span='6'>{{$t('form.host')}}</span><br />
              <span class="systitle2" v-if="dataList.host" :span='6'>{{dataList.host}}</span>
              <span class="systitle2" v-else :span='6'>{{$t('from.zanWu')}}</span>
            </div>
            <div :span='12' class="system">
              <span class="systitle" :span='6'>{{$t('form.sysName')}}</span><br />
              <span class="systitle2" :span='6'>{{title}}</span>
              <span class="systitle3" :span='3' style="float: right;margin-top: -15px;">
                <a  @click="upNameBtn">{{$t('form.updata')}}</a>
              </span>
            </div>
            <div :span='12' class="system">
              <span class="systitle" :span='6'>{{$t('form.sysIcon')}}</span>
              <span :span='3'>
                <img :src="host+imgSrc" @click="bigImg" style="margin:0 8px;" width="60px" />
              </span>
              <span class="systitle3" :span='3' style="float: right;">
                <a-upload style="color: #1890FF;cursor: pointer;" :before-upload="beforeUpload" :file-list="imglist">
                  <a>{{$t('form.updata')}}</a>
                </a-upload>
              </span>
            </div>
            <div :span='12' class="system">
              <span class="systitle" :span='6'>{{$t('form.sysVsersion')}}</span><br />
              <span class="systitle2" v-if="dataList.version" :span='6'>{{dataList.version}}</span>
              <span class="systitle2" v-else :span='6'>1.0.0.1</span>
              <!-- <span :span='6'>1.0.0.1</span> -->

            </div>
          </div>
          <!---xxxxxxxxxxxxxxxxxxx告警设置xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->
          <div v-else-if="key=='4'&&permission!='admin'">
            <div :span='12' class="system">
              <span class="systitle" :span='6'>{{$t('form.sendSet')}}</span><br />
              <div>
                <span class="systitle2" v-if="emailList.email" :span='6'>{{emailList.email}}</span>
                <span class="systitle2" v-else :span='6'>{{$t('form.unSet')}}</span>
                <span class="systitle3" :span='3' style="float: right;">
                  <a @click="sendSetBtn">{{$t('form.updata')}}</a>
                </span>
              </div>
            </div>

            <div :span='12' class="system">
              <span class="systitle" :span='6'>{{$t('form.alarmEvent')}}</span><br />
              <div>
                <span class="systitle2" :span='6'>
                  {{$t('form.maxT')}}：{{waringData.maxt}}°C,
                  {{$t('form.minT')}}{{waringData.mint}}°C,
                  <span v-if="waringData.mask=='0'">{{$t('form.ypdkz')}}</span>
                  <span v-else>{{$t('form.wpdkz')}}</span>
                </span>
                <span class="systitle3" :span='3' style="float: right;">
                  <a @click="alarmSetBtn">{{$t('form.updata')}}</a>
                </span>
              </div>
            </div>

            <div :span='12' class="system">
              <span class="systitle" :span='6'>{{$t('form.alarmContent')}}
                <a style="float: right;" @click="alarmContent">{{$t('btn.set')}}</a>
              </span><br />
       
            </div>
            <div :span='12' class="system">
              <span class="systitle" :span='6'>{{$t('form.reviceSet')}}</span><br />
              <div>
                <div v-for="(item,index) in emailList2">
                  <span class="systitle2" :span='5'>{{item}}
                    <span class="systitle3" :span='3' style="position: fixed;right: 64px;">
                      <a style="margin:0 10px;" @click="reviceSetBtn2(index)">{{$t('form.changes')}}</a>
                      <a style="color: red;" @click="delEmail(index)">{{$t('btn.del')}}</a>
                    </span>
                  </span>
                </div>
                <div style="text-align: center;font-size: 16px;">
                  <a @click="reviceSetBtn" v-if="emailList2.length<10">{{$t('form.reviceEmailSet')}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-card>
  </page-header-wrapper>

</template>
<script>
  // import { mixinDevice } from '@/utils/mixin.js'
  import {
    getUserInfo,
    putUserInfo,
    putUserPassword
  } from '@/api/userinfo.js'
  import {
    ACCESS_TOKEN,
    USER_INFO,
    USER_NAME
  } from '@/store/mutation-types'
  import {
    sysconf,
    upTitle,
    upHead,
  } from '@/api/system'
  import {
    getEmail,
    sendEmail,
    getEmailList,
    addEmailList,
    getWaring,
    setWaring,
    getContent2,
    setContent,
  } from '@/api/device'
  import {
    baseMixin
  } from '@/store/app-mixin'
  import storage from 'store'
  import 'moment/locale/zh-cn';
  var getBase64 = function(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      console.log("1111", file, reader)

      reader.onload = () => {
        console.log("ok11", reader.result)
        resolve(reader.result)
      }
      reader.onerror = error => {
        console.log(error)
        reject(error)
      };
    });
  }

  import ClipboardJS from "clipboard"
  export default {
    // mixins: [mixinDevice],
    mixins: [baseMixin],
    name: "account",
    data() {
      return {
        permission:"",
        // modelText: "通知事件：${event} ，姓名 ${name}， 工号：${jobNum}， 于 ${time}， 在设备 ${deviceName} 进行检测，温度为${temperature}。系统邮件，请勿回复。",
        modelText: this.$t('form.modelText1'),
        varData: '',
        lang: "",
        contentData: [],
        contentForm: {
          title: "",
          content: "",
        },
        waringForm: {
          mask: '0',
          maxT: '',
          minT: ''
        },
        waringData: [],
        emailList: [],
        emailList2: [],
        reviceEform: {},
        sendEform: {},
        upIndex: '',
        upEmail: '',
        send: '',
        imglist: [],
        sysTitle: '',
        alarmShow: false,
        alarmShow2: false,
        alarmShow3: false,
        alarmShow4: false,
        alarmShow5: false,
        head: '',
        host: '',
        dataList: [],
        sysImg: '',
        sysHost: '',
        changShow: false,
        changShow2: false,
        loading: {
          resetPassword: false,
        },
        mode: 'inline',
        openKeys: [],
        formList: {},
        selectedKeys: ['1'],
        key: "1",
        previewVisible: false,
        user: {
          account: "",
          name: "",
          phone: "",
          email: "",
        },
        btnloading: false,
        userStatus: {},
        password: {
          old: '',
          password: '',

        },
        backpassword: "",
        passwordStatus: {},
        imgSrc:"",
        // emailList:[],
      }
    },

    computed: {
      title: function() {
        return this.$store.getters.title
      },
      icon: function() {
        return this.$store.getters.icon
      },
      iszh() {
        return this.$store.getters.lang == 'zh'

      },
    },
    methods: {
      switchChange(e) {
        if (e == true) {
          this.sendEform.ssl = "1"
        }
      },
      // 查询
      onQuery() {
        sysconf().then(res => {
          this.dataList = res.result.data
          this.imgSrc=res.result.data.icon
          let time= new Date().getTime()
           this.imgSrc = this.imgSrc+"?v="+time
          console.log("2222", res,this.imgSrc)
        })
      },
      // 修改
      upNameBtn() {
        this.changShow = true
        // this.dataList=Object.assign({})
      },
      upName() {
        console.log("修改", this.dataList)
        this.dataList.Title = this.sysTitle
        upTitle({
          "title": this.sysTitle
        }).then(res => {
          if (res.code == 0) {
            this.$store.commit("title", this.sysTitle)
            this.changShow = false
            // this.$message.success("修改成功")
            this.$message.success(this.$t('messages.upSuccess'));
          }
        })

      },
      onUpLoadImage(res) {
        console.log("1102", res)
        if (res.file.status == "done") {
          if (res.file.response.code == 0) {
            let url = res.file.response.result.data
            console.log(url)
            this.formList.img = url
          }

        }
      },
      upImg(a) {
        console.log("修改图片",a)
        //  let time= new Date().getTime()
        //  this.imgSrc = this.imgSrc+"?v="+time
        // a=a+"?v="+time
        
        upHead({"icon": a}).then(res => {
          if (res.code == 0) {
            let _t = new Date().getTime()
            console.log("res icon",res)
            this.imgSrc = res.result.data + "?="+_t
            this.$store.commit("icon", this.imgSrc)
            // this.head = this.host + res.result.data
            this.changShow = false
            this.$message.success(this.$t('messages.upSuccess'));
            
          }
        })
      },
      beforeUpload(file) {
        console.log("before update", file)
        var self = this
        getBase64(file).then(a => {
          this.head = a
          console.log(123, a)
          // self.imglist.push({
          //   uid: '-1',
          //   name: "",
          //   status: 'done',
          //   url: a,
          // })
          this.upImg(a)
          // console.log(this.imglist)
        })
        return false
      },
      cancel() {
        this.changShow = false
      },
      handleClick(v) {
        this.selectedKeys = v.keyPath
        this.key = v.key
      },
      getInfo() {

        getUserInfo().then(res => {
          console.log(res)
          if (res.code == 0) {
            // this.user = res.result.data
            this.user = res.result.data
          } else {
            console.log("获取用户失败")
          }
        })
      },
      //修改用户信息
      onPutInfo() {
        this.userStatus = {}
        this.btnloading = true
        putUserInfo(this.user).then(res => {
          if (res.code == 0) {
            this.$message.success(this.$t('messages.upSuccess'));
          }
        }).finally(() => {
          this.btnloading = false
        })
      },
      //修改密码
      onResetPassword() {
        if (this.password.password != this.backpassword) {
          this.$message.error(this.$t('messages.pwdDiff'));
          return
        }

        this.loading.resetPassword = true
        this.passwordStatus = {}
        var self = this
        putUserPassword(this.password).then(res => {
          if (res.code == 0) {
            console.log(res)
            this.$message.success(this.$t('messages.logAgain'));
            // this.$success({
            // title: self.$t('message.logAgain'), onOk () {
            storage.remove(ACCESS_TOKEN)
            storage.remove(USER_INFO)
            storage.remove(USER_NAME)
            window.location.reload()
            // }
            // })
          }
        }).finally(() => {
          this.loading.resetPassword = false
        })
      },
      bigImg() {
        this.previewVisible = true
      },
      onCancel2() {
        this.previewVisible = false
      },


      // 告警设置
      getEmails() {
        // console.log("告警邮件获取")
        getEmail().then(res => {
          if (res.code == 0) {
            this.emailList = res.result.data
            console.log("110", res)
          }
        })
      },
      sendSetBtn() {
        this.alarmShow = true
        // console.log("告警邮件获取")
        this.sendEform.email = this.emailList.email
        this.sendEform.server = this.emailList.server
        this.sendEform.pwd = this.emailList.pwd
        this.sendEform.port = this.emailList.port
        this.sendEform.ssl = this.emailList.ssl

      },
      sendSet() {
        // console.log("告警邮件设置")
        let email = this.sendEform.email
        let server = this.sendEform.server
        let pwd = this.sendEform.pwd
        let port = this.sendEform.port
        let ssl = this.sendEform.ssl
        console.log("112", email, server, pwd, port, ssl)
        sendEmail({
          email: email,
          server: server,
          pwd: pwd,
          port: port,
          ssl: ssl
        }).then(res => {
          if (res.code == 0) {
            this.alarmShow = false
            this.getEmails()
            this.$message.success(this.$t('messages.setSuccess'));
          }
        }).finally(() => {})
      },

      // 收件
      getEmailLists() {
        console.log("接收邮件获取")
        getEmailList().then(res => {
          console.log("接收邮件获取", res)
          if (res.code == 0) {
            this.emailList2 = res.result.data
            console.log("113", this.emailList2)
            this.alarmShow5 = false
          }
        })
      },
      reviceSetBtn() {
        this.alarmShow2 = true
      },

      reviceSetBtn2(index) {
        this.upIndex = index
        this.upEmail = this.emailList2[index]
        this.alarmShow5 = true
      },


      onUpEmail() {
        let self = this
        let r = this.emailList2.splice(this.upIndex, 1, this.upEmail)
        addEmailList(this.emailList2).then(res => {
          if (res.code == 0) {
            this.alarmShow5 = false
            this.$message.success(this.$t('messages.updataSuccess'));
          }
        })
      },
      delEmail() {
        let self = this
        let b = this.emailList2
        let a = this.upEmail
        // this.emailList2[this.upIndex] = this.upEmail
        let r = this.emailList2.splice(this.upIndex, 1)
        console.log(this.emailList2)
        // this.emailList2 = this.emailList2.splice(this.upIndex,1)
        console.log("116", this.emailList2)
        addEmailList(this.emailList2).then(res => {
          if (res.code == 0) {
            this.$message.success(this.$t('messages.delSuccess'));
          }
        })
      },

      reviceSet() {
        let email = this.reviceEform.email
        this.emailList2.push(email)
        console.log("115", email)
        addEmailList(this.emailList2).then(res => {
          if (res.code == 0) {
            this.alarmShow2 = false
            this.$message.success(this.$t('messages.delSuccess'));
          }
        }).finally(() => {})
      },
      //告警事件
      getWaring() {
        // console.log("获取告警使事件")
        getWaring().then(res => {
          console.log("获取告警使事件", res)
          if (res.code == 0) {
            this.waringData = res.result.data
            console.log("118", this.waringData)
            this.alarmShow3 = false
          }
        })
      },
      alarmSetBtn() {
        this.alarmShow3 = true
        this.waringForm.maxt = this.waringData.maxt
        this.waringForm.mint = this.waringData.mint
        // this.waringForm.mask="0"
      },
      setWaring() {
        let maxt = this.waringForm.maxt
        let mint = this.waringForm.mint
        let mask = this.waringForm.mask
        if (maxt < mint) {
          this.$message.error(this.$t('messages.theLowT'));
          return
        }
        console.log("112", maxt, mint, mask)
        setWaring({
          maxt: maxt,
          mint: mint,
          mask: mask,
        }).then(res => {
          if (res.code == 0) {
            // this.alarmShow2 = false
            this.alarmShow3 = false
            this.getWaring()
            this.$message.success(this.$t('messages.setSuccess'));
          }
        }).finally(() => {})
      },


      //告警内容
      // 查询
      onGetContent() {
        console.log("1111111111111111")
        getContent2().then(res => {
          // console.log("120",res)
          if (res.code == 0) {
            this.contentData = res.result.data
            console.log("120", res)
            this.alarmShow4 = false

          }
        })
      },

      // alarmSet() {
      //   // this.alarmShow3 = true
      // },
      alarmContent() {
        this.alarmShow4 = true
        this.contentForm.title = this.contentData.title
        this.contentForm.content = this.contentData.content
      },
      setAlarmContent() {
        let title = this.contentForm.title
        let content = this.contentForm.content
        let local = this.$store.getters.lang
        // this.emailList2.push(email)
        // console.log("115", email)
        setContent({
          content: content,
          title: title,
          local: local
        }).then(res => {
          if (res.code == 0) {
            this.alarmShow4 = false
            this.$message.success(this.$t('messages.setSuccess'));
            this.onGetContent()
          }
        }).finally(() => {})
      },
      // 默认模板
      onDefaultModel() {
        console.log(this.contentForm)
        // modelText: this.$t('form.modelText1'),
        this.contentForm.content = this.$t('form.modelText1') + '：${event} ，' + this.$t('form.modelText2') + '${name}，' +
          this.$t('form.modelText3') + '：${jobNum}， ' + this.$t('form.modelText4') + '${time}，' + this.$t(
            'form.modelText5') + '${deviceName} ' + this.$t('form.modelText6') + '${temperature}。' + this.$t(
            'form.modelText7')
        // this.contentForm.content = "通知事件：${event} ，姓名 ${name}， 工号：${jobNum}， 于 ${time}，"
        // +" 在设备 ${deviceName} 进行检测，温度为${temperature}。系统邮件，请勿回复。"
        console.log(this.contentForm)
        //this.contentForm.content = this.contentForm.content
        // this.alarmContent()
        // console.log(this.contentForm.content)
      },
      // copy
      // copyText(n) {
      //   // console.log(this)
      //   console.log(window)
      //   // this.$window.clipboardData.setData("Text",n)
      // },
      //模板复制
      // oCopy(obj) {
      //   obj.select();
      //   js = obj.createTextRange();
      //   js.execCommand("Copy")
      //   alert("复制成功!");
      // },

      alarmCancel() {
        this.alarmShow = false
        this.alarmShow2 = false
        this.alarmShow3 = false
        this.alarmShow4 = false
        this.alarmShow5 = false
      }
    },
    mounted() {
      let userinfo = storage.get(USER_INFO)
      this.permission=userinfo.role
      console.log("用户信息",userinfo,"权限",this.permission)
      let self = this
      this.lang = this.$store.getters.lang
      console.log("124", this.lang)
      this.host = process.env.VUE_APP_API_BASE_URL
      console.log("host", this.host)
      this.getInfo()
      // this.doCopy()
      this.onQuery()
      this.getEmails()
      this.getEmailLists()
      this.onGetContent()
      // this.alarmSet()
      this.getWaring()
      console.log("mounted")
      this.$nextTick(() => {
        let clipboard = new ClipboardJS('.copybtn');

        clipboard.on('success', function(e) {
          // self.$message.success(this.$t('messages.setSuccess'));
          e.clearSelection();
        });

        clipboard.on('error', function(e) {

        });

      })
    },

  }
</script>
<style lang="less" scoped>
  .system {
    border-bottom: 1px solid #f3f3f3;
    margin: 30px 0;
    // font-weight: 600;
    color: #262626;
    font-size: 14px;
    padding-bottom: 10px;
  }

  .systitle {
    // margin-bottom: 40px;
    // padding-bottom: 20px;
  }

  .systitle2 {
    margin-top: 16px;
    // margin-left:60px ;
    color: #a6a6a6;
    // font-weight: 350;
    font-size: 14px;
  }

  .systitle3 {}

  .system span {
    // padding: 8px 0;
    // margin:8px 100px;
  }

  .bianliang a {
    margin: 0 4px;
    font-size: 12px;
  }

  .sysSpan1 {}

  .sysSpan2 {}

  .account-settings-info-main {
    width: 100%;
    display: flex;
    height: 100%;
    overflow: auto;

    &.mobile {
      display: block;

      .account-settings-info-left {
        border-right: unset;
        border-bottom: 1px solid #e8e8e8;
        width: 100%;
        height: 50px;
        overflow-x: auto;
        overflow-y: scroll;
      }

      .account-settings-info-right {
        padding: 20px 40px;
      }
    }

    .account-settings-info-left {
      border-right: 1px solid #e8e8e8;
      width: 224px;
    }

    .account-settings-info-right {
      flex: 1 1;
      padding: 8px 40px;

      .account-settings-info-title {
        color: rgba(0, 0, 0, 0.85);
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        margin-bottom: 12px;
      }

      .account-settings-info-view {
        padding-top: 12px;
      }
    }
  }
</style>
