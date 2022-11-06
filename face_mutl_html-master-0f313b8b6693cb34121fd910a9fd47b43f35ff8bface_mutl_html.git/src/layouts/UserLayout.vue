<template>
  <div id="userLayout" :class="['user-layout-wrapper', isMobile && 'mobile']">
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <img :src="host+imgSrc" class="logo" alt="logo">
            <span class="title">{{title}}</span>
          </a>
        </div>
        <div class="desc">
         
        </div>
      </div>

      <router-view />
    <!--
      <div class="footer">
        <div class="links">
          <a href="_self">帮助</a>
          <a href="_self">隐私</a>
          <a href="_self">条款</a>
        </div>
        <div class="copyright">
          Copyright &copy; 2018 vueComponent
        </div>
      </div>
      -->
    </div>
  </div>
</template>

<script>
import { deviceMixin } from '@/store/device-mixin'

 import {  sysconf} from '@/api/login'
export default {
  name: 'UserLayout',
  data:function(){return{
    title:"",
    icon:"",
    host:"",
    imgSrc:"",
  }},
  mixins: [deviceMixin],
  computed:{
    // title:function(){
      // return this.$store.getters.title
    // },
    // icon:function(){
       // return this.$store.getters.icon
    // }

  },
  methods:{
    // 查询
    getQueryVariable (variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
      }
      return "";
    },
    onQuery() {
      let ul=window.location.href
      // let userinfo = storage.get(USER_INFO)
      // let aa=localstorage.getItem
      // ul =ul.split("/")
      // ul=ul[3]
      // ul=ul.split("=")
      // ul=ul[1]
      // ul=ul.split("#")
      // ul=ul[0]
      // // this.code=ul
      // console.log("inuserlog",ul)
      sysconf(this.getQueryVariable()).then(res => {
        this.dataList = res.result.data
        this.imgSrc=res.result.data.icon
        this.title = res.result.data.title
      })
    },
  },
  mounted () {
    let r = process.env.VUE_APP_API_BASE_URL
    this.host = r
    this.onQuery()
    console.log(r)
    console.log(this)
    document.body.classList.add('userLayout')
    console.log(this.$store.getters)

  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
    height: 100%;

    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    .container {
      width: 100%;
      min-height: 100%;
      background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
      background-size: 100%;
      padding: 110px 0 144px;
      position: relative;

      a {
        text-decoration: none;
      }

      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }

      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }
  }
</style>
