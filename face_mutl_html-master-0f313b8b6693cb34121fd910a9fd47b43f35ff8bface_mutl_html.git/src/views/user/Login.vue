<template>
  <div class="main">
   <a-form id="formLogin" class="user-layout-login" :form="form">
      <!-- <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" :message="message" /> -->
      <a-form-item>
        <a-input v-model="form.account" 
		size="large" type="text" :placeholder="$t('form.inputAcc')" 
		
    >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model="form.password" 
		size="large" type="password" :placeholder="$t('form.inputPwd')" 
		
    >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>
      <a-form-item style="margin-top:24px">
        <a-button size="large" type="primary" htmlType="submit" class="login-button" 
		:loading="state.loginBtn" :disabled="state.loginBtn" @click="handleSubmit">{{$t('btn.ok')}}</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
 
<script>
import md5 from 'md5'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
  import storage from 'store'
  import {
    ACCESS_TOKEN,
    USER_INFO,
    USER_NAME
  } from '@/store/mutation-types'
// import { getSmsCaptcha, get2step, getInfo, sysconf} from '@/api/login'
import {sysconf as sysconf2} from '@/api/system'
export default {
  data () {
    return {
      code:"",
      message: "",
      inputStatus: {
        account: "",
        password: "",
      },
      form: {
        account: "",
        password: "",
      },
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      // form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    }
  },
  created () {
  },
  methods: {
    ...mapActions(['Login', 'Logout', 'GetInfo']),

    handleSubmit (e) {
      // e.preventDefault()
      this.state.loginBtn = true
      this.inputStatus.account = ""
      this.inputStatus.password = ""
      this.isLoginError = false
      var ok = true
      if (!this.form.account || this.form.account == "") {
        this.inputStatus.account = this.$t('form.inputAcc')
        ok = false
      }
      if (!this.form.password || this.form.password == "") {
        this.inputStatus.password = this.$t('form.inputPwd')
        ok = false
      }
      if (!ok) {
        this.state.loginBtn = false
        return
      }
      this.Login(this.form).then(res => {
        // console.log(res,"11")
        // console.log(res)
        // alert("aaaa")
        if (res.code == 0) {
          this.GetInfo().then(res2 => {
            if(res2.code==0){
              this.$router.push({ path: '/' })
              
              //标题 icon
              let host = process.env.VUE_APP_API_BASE_URL
              
              sysconf2().then(res=>{
                console.log("sysconf===",res)
                let data = res.result.data
                if(data){
                  let title = data.title
                  let icon = data.icon
                  // if(title){
                    console.log(title,icon)
                    storage.set("title",title)
                    this.$store.commit("title",title)
                  // }
                  // if(icon){
                    storage.set("icon",icon)
                    this.$store.commit("icon",icon)
                  // }
                }
                // alert("aaa")
              })
              // alert("aaaa")
              
              
              
              setTimeout(() => {
                this.$notification.success({
                  message: this.$t('messages.welcome'),
                  description: this.$t('messages.welcomeBack')
                })
              }, 1000)
            }
    
          })
          
        } 
      }).finally(_=>{
        this.state.loginBtn = false
      })
    },
    getQueryVariable (variable) {
      // console.log(window.location.search)
      var query = window.location.search.substring(1);
      console.log("query",query)
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
      }
      return "";
    }
  },
  mounted() {
    let ul=window.location.href
    let userinfo = storage.get(USER_INFO)
    // let aa=localstorage.getItem
    let code = this.getQueryVariable("code")
    this.code=code
    // ul=ul.substring(ul.length-12)
    console.log("用户信息2",userinfo,"code",this.code)
    
    // this.onQuery()
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
