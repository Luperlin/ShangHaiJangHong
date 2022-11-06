<template>
  <page-header-wrapper :title="false" content="">
    <!-- 密码展示 -->
    <a-modal v-model="showPassw" :title="$t('messages.retPwdSuccess')">
      <p>{{$t('messages.newPwd')}}：<a style="cursor: text;">{{newPass}}</a></p>
      <p>{{$t('messages.pwdShow')}}</p>
      <template slot="footer">
        <div style="padding:10px 0">
          <a-button key="back" @click="showPassw=false">{{$t('form.close')}}</a-button>
        </div>
      </template>
    </a-modal>
    <!-- 修改密码 -->
    <a-modal v-model="showPwd" width="500px" :title="$t('form.changePwd')">
      <template slot="footer">
        <div style="padding:10px 0">
          <a-button key="back" @click="showPwd=false">{{$t('btn.cancel')}}</a-button>
          <a-button key="submit" type="primary" :loading="loadPwd" @click="onUpdatePwd(formPwd.id)">{{$t('btn.reset')}}</a-button>
        </div>
      </template>
      <a-form :form="formPwd">
        <a-form-item :label="$t('form.originalPassword')" :colon="true" :labelCol="{span:6}" :wrapperCol="{span:18}"
          required>
          <a-input v-model='formPwd.old'></a-input>
        </a-form-item>
        <a-form-item :label="$t('form.newPassword')" :colon="true" :labelCol="{span:6}" :wrapperCol="{span:18}"
          required>
          <a-input v-model='formPwd.password'></a-input>
        </a-form-item>
        <a-form-item :label="$t('form.repeatPassword')" :colon="true" :labelCol="{span:6}" :wrapperCol="{span:18}"
          required>
          <a-input v-model='formPwd.pwd2'></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 新建 修改 -->
    <a-modal :title="isCreate?$t('form.addGruop'):$t('btn.updata')" :width="700" :visible="showSysUser" :maskClosable="false"
      :okText="isCreate?$t('btn.add'):$t('btn.updata')" :confirmLoading="userLoading" @ok="()=>{isCreate?onCreateSysUser():onUpdateSysUser()}"
      @cancel="onCancelSysUser">
      <a-spin :spinning="userLoading">
        <a-form :form="sysUser" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <!--  <a-form-item :label="$t('form.groupName')" :validate-status="sysUserStatus.account?'error':''" :help="sysUserStatus.account" :colon="true" required>
            <a-input v-model="sysUser.account"  />
          </a-form-item> -->
          <a-form-item :label="$t('form.groupJname')" required>
            <a-input v-model="sysUser.code" :disabled="isCreate?false:true" />
          </a-form-item>
          <a-form-item :label="$t('form.groupName')" :validate-status="sysUserStatus.name?'error':''" :help="sysUserStatus.name"
            :colon="true" required>
            <a-input v-model="sysUser.name" />
          </a-form-item>
          <a-form-item :label="$t('form.account')" :validate-status="sysUserStatus.account?'error':''" :help="sysUserStatus.account"
            :colon="true" required>
            <a-input v-model="sysUser.account" />
          </a-form-item>
          <a-form-item :label="$t('form.pwd')" v-if="isCreate" :validate-status="sysUserStatus.password?'error':''"
            :help="sysUserStatus.password" :colon="true" required>
            <a-input v-model="sysUser.password" />
          </a-form-item>
          <a-form-item :label="$t('form.phone')" :validate-status="sysUserStatus.phone?'error':''" :help="sysUserStatus.phone"
            :colon="true" required>
            <a-input v-model="sysUser.phone" />
          </a-form-item>
          <a-form-item :label="$t('form.idCard')" :validate-status="sysUserStatus.account?'error':''" :help="sysUserStatus.account"
            :colon="true" required>
            <a-input v-model="sysUser.idCard" />
          </a-form-item>
          <a-form-item required :label="$t('form.connecter')" :validate-status="sysUserStatus.account?'error':''" :help="sysUserStatus.account"
            :colon="true">
            <a-input v-model="sysUser.contacts" />
          </a-form-item>
          <a-form-item :label="$t('form.memo')" :validate-status="sysUserStatus.account?'error':''" :help="sysUserStatus.account"
            :colon="true">
            <a-input type="textarea" v-model="sysUser.memo" />
          </a-form-item>
        <!--  <a-form-item :label="$t('form.status')">
            <a-switch :checked-children="$t('form.effective')" :un-checked-children="$t('form.invalid')"
              default-checked v-model="sysUser.status" /> -->
            <!-- </br><span v-if="isCreate?false:true" style="color: #a6a6a6;">{{$t('form.visitUrl')}}：{{lUrl2}}</span> -->
          <!-- </a-form-item> -->
           <a-form-item :label="$t('form.status')" required>
             <a-radio-group v-model="sysUser.status">
               <a-radio value="1">
                 {{$t('form.effective')}}
               </a-radio>
               <a-radio value="0">
                 {{$t('form.invalid')}}
               </a-radio>
              <!-- <a-radio value="2">
                 qq
               </a-radio> -->
             </a-radio-group>
           </a-form-item>
          <!-- <a-form-item :label="$t('form.systemName')" :validate-status="sysUserStatus.name?'error':''" :help="sysUserStatus.name" :colon="true" required>
            <a-input v-model="sysUser.sysName" />
          </a-form-item> -->
          <!--  <a-form-item :label="$t('form.connecter')" v-if="isCreate" :validate-status="sysUserStatus.password?'error':''" :help="sysUserStatus.password" :colon="true" required>
            <a-input v-model="sysUser.password" />
          </a-form-item> -->
          <!--    <a-form-item :label="$t('form.phone')" :validate-status="sysUserStatus.phone?'error':''" :help="sysUserStatus.phone" :colon="true" required>
            <a-input v-model="sysUser.phone" />
          </a-form-item> -->

        </a-form>
      </a-spin>
    </a-modal>
    <!-- 分配 -->
    <a-modal v-model="showAss" width="500px" :title="$t('form.assignTo')" @ok="()=>onAssign()">
      <a-form :form="formAss" :labelCol="{span:8}" :wrapperCol="{span:14}">
        <div style="text-align: center;font-size: 14px;color: rgba(0, 0, 0, 0.85);margin-bottom: 20px;">
          <span style="margin-right: 50px;">{{$t('form.canUse')}}:{{canAss}}</span>
          <span>{{$t('form.gruopNum')}}：{{canAss}}/{{perPoint}}</span>
        </div>
        <a-form-item :label="$t('form.gruopNum')" required>
          <a-input v-model='assNum'></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 查看 -->
    <a-modal :title="$t('form.groupInfo')" v-model="showCheck">

      <!-- <a-divider></a-divider> -->
      <!-- <p>{{$t('form.feedback')}} :</p> -->
      <div id="text">
        <p>{{$t('form.visitUrl')}}: {{lUrl2}}</p>
        <p>{{$t('form.groupName')}}: {{checkData.name}}</p>
        <p>{{$t('form.phone')}}: {{checkData.phone}}</p>
        <p>{{$t('form.loginAccount')}}: {{checkData.account}}</p>
        <p>{{$t('form.idCard')}}: {{checkData.idCard}}</p>
        <p>{{$t('form.connecter')}}: {{checkData.contacts}}</p>
      </div>

      <template slot="footer">
        <div style="padding:10px 0">
          <a-button key="back" @click="closeCheck">{{$t('form.close')}}</a-button>
          <!-- <a-button key="back" @click="showCheck=false">{{$t('form.close')}}</a-button> -->
          <a-button key="submit" type="primary" :loading="loadPwd" @click="onCopy('text')">{{$t('form.copy')}}</a-button>
        </div>
      </template>
    </a-modal>

    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="5" :sm="24">
              <a-form-item :label="$t('form.groupName')">
                <a-input v-model="queryParam.name" placeholder />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('form.groupJname')">
                <a-input v-model="queryParam.code" placeholder />
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item :label="$t('form.status')">
                <a-select v-model="queryParam.status">
                  <a-select-option value=''>{{$t('form.all')}}</a-select-option>
                  <a-select-option :value='true'>{{$t('form.enable')}}</a-select-option>
                  <a-select-option :value='false'>{{$t('form.disable')}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-button type="primary" @click="queryUser">{{$t('btn.query')}}</a-button>
              <a-button style="margin-left: 8px" @click="() => (queryParam = {account:'',phone:''})">{{$t('btn.reset')}}</a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <!-- //table -->
      <div>
        <a-button style="margin: 8px 0" type="primary" icon="plus" @click="()=>{isCreate=true, initSysUser(),showSysUser=true}">{{$t('form.addGruop')}}</a-button>
        <div style="display: inline-block;float: right;margin: 8px 0px 0 0;font-size: 14px;font-weight: 600;">
          <span style="margin-right: 50px;">{{$t('form.authorizedPoints')}}：{{assData.license}}</span>
          <span style="margin-right: 50px;">{{$t('form.ky')}}：{{canAss}}</span>
          <span style="margin-right: 50px;">{{$t('form.allocated')}}：{{assData.used}}</span>
        </div>
        <a-table align="left" ref="table" size="default" :loading='queryLoading' :columns="columns" :data-source="adminUser"
          :pagination="page" rowKey='id'>
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
          <span slot="status" slot-scope="text">
            <a-badge v-if="text==true" status="success" :text="$t('form.effective')"></a-badge>
            <a-badge v-else status="default" :text="$t('form.invalid')"></a-badge>
          </span>

          <span slot="action" slot-scope="text, record">

            <template v-if='record.id!=userId'>
              <a @click="onCheck(record)">{{$t('form.chaKan')}}</a>
              <a-divider type="vertical" />
              <a @click="onEdit(record)">{{$t('form.updata')}}</a>
              <a-divider type="vertical" />
              <a @click="assignBtn(record)">{{$t('form.allocation')}}</a>
              <a-divider type="vertical" />
              <a @click="onResetPassword(record)">{{$t('btn.resetPassword')}}</a>
              <a-divider type="vertical" />
              <!-- <a @click="onChangeStatus(record)">
                <span v-if="record.status=='1'">
                  {{$t('form.disable')}}
                </span>
                <span v-else="record.status=='0'">
                  {{$t('form.enable')}}
                </span>
              </a> -->
            </template>

          </span>

        </a-table>
      </div>

    </a-card>

  </page-header-wrapper>
</template>
<script>
  import page from '@/utils/page'
  import {
    createAdminUser,
    deleteAdminUser,
    postRestPassword,
    putPwd,
    queryAdminUser,
    updateAdminUser,
    putAss,
    getAss,
    getAllAss,
  } from '@/api/sysadminuser'
  import onCopy from '@/utils/myUtil'
  import {
    ACCESS_TOKEN,
    USER_INFO,
    USER_NAME
  } from '@/store/mutation-types'
  import storage from 'store'


  export default {
    name: 'Sysadminuser',
    data() {
      let self = this
      return {
        lUrl: "",
        lUrl2: "",
        loading: {},
        show: {},
        adminId: "",
        userId: null,
        showSysUser: false,
        showPassw: false,
        newPass: "",
        showAss: false,
        showCheck: false,
        userLoading: false,
        loadPwd: false,
        queryLoading: false,
        isCreate: true,
        showPwd: false,
        queryParam: {
          sysName: '',
          code: '',
          status: ''
        },
        columns: [
          {
            title: () => {
              return self.$t('form.account')
            },
            dataIndex: 'account',
            width: '120px',
          },
          {
            // title: '账号',
            title: () => {
              return self.$t('form.groupName')
            },
            width: '140px',
            dataIndex: 'name'
          },
          {
            // title: '状态',
            title: () => {
              return self.$t('form.status')
            },
            dataIndex: 'status',
            width: '120px',
            scopedSlots: {
              customRender: 'status'
            }
          },
          {
            title: () => {
              return self.$t('form.groupJname')
            },
            dataIndex: 'code',
            width: '120px',
          },
          {
            // title: '状态',
            title: () => {
              return self.$t('form.connecter')
            },
            dataIndex: 'contacts',
            width: '140px',
          },
          {
            // title: '状态',
            title: () => {
              return self.$t('form.authorizedPoints')
            },
            dataIndex: 'point',
            width: '100px',
          },
          {
            // title: '操作',
            title: () => {
              return self.$t('form.action')
            },
            dataIndex: 'action',
            width: '260px',
            align: 'center',
            scopedSlots: {
              customRender: 'action'
            }
          }
        ],
        //分页配置
        page: page(this, this.queryUser),
        adminUser: [],
        assNum: '',
        //用户
        sysUser: {},
        sysUserStatus: {},
        //总授权点数
        assData: {},
        canAss: "",
        perPoint: "",
        //密码
        formPwd: {},
        //分配
        formAss: {},
        //系统信息
        system: {

        },
        checkData: {},

      }
    },
    methods: {
      //init
      initSysUser() {
        this.sysUser = {
          account: '',
          name: '',
          phone: '',
          status: true,
          password: '',
          memo:'',
          email: '',
        }
        this.sysUserStatus = {
          memo:'',
          account: '',
          name: '',
          phone: '',
          email: '',
          password: '',
        }
      },
      initPwd() {
        this.formPwd = {
          id: '',
          old: '',
          password: '',
          pwd2: '',
        }
      },
      queryUser() {
        this.queryLoading = true
        console.log("current", this.page.current)
        console.log("size", this.page.pageSize)
        queryAdminUser(this.queryParam, {
          current: this.page.current,
          size: this.page.pageSize
        }).then(res => {
          console.log(res, 'sysadminuser')
          //去除admin角色
          // let alluser = []
          // console.log("res",res)
          // res.result.data && res.result.data.forEach(e => {
          //   console.log("110",alluser)
          //   if(e.code != "admin"){
          //     alluser.push(e)
          //     console.log("111",alluser)
          //   }
          // });
          if (res.code == 0) {
            // this.adminUser = alluser
            this.adminUser = res.result.data
            this.page.total = res.result.page.total
          }
        }).finally(() => {
          this.queryLoading = false
        })
      },
      // 查询总授权点数
      queryAss() {
        getAllAss().then(res => {
          if (res.code == 0) {
            this.assData = res.result.data
            this.canAss = this.assData.license - this.assData.used
            console.log("总点数", this.assData, this.canAss)
          }

        })
      },
      //组织授权点数
      assignBtn(recode) {
        this.adminId = recode.id
        this.perPoint = recode.point
        console.log("分配", recode)
        this.showAss = true
        getAss(this.adminId).then(res => {
          if (res.code == 0) {
            this.formAss = res.result.data
            console.log("查询点数", this.formAss)
          } else{
            this.$message.success(this.$t('messages.queryError'))
          }

        })
      },
      onAssign() {
        putAss(this.adminId, this.assNum).then(res => {
          if (res.code == 0) {
            this.showAss = false
            this.queryAss()
            this.queryUser()
            this.$message.success(
              "ok",
              2,
            );
          }else if(res.code==3001){
            this.$message.error(this.$t('messages.outUse'))
            // this.$message.error(this.$t('messages.assError'))
          }else{
            // this.$message.error(this.$t('messages.assError'))
          }
        })
      },
      onCheck(recode) {
        let url = ""
        url = this.lUrl
        console.log("查看2", url)
        this.checkData = recode
        url = this.lUrl + '?code=' + this.checkData.code
        this.lUrl2 = url
        console.log("查看", recode, this.checkData.code)
        this.showCheck = true
      },
      closeCheck() {
        this.lUrl2 = ""
        this.showCheck = false

      },
      onEdit(recode) {
        // let url=this.lUrl+'?code='+recode.code
        // this.lUrl=url
        console.log("修改", recode)
        this.initSysUser()
        this.isCreate = false
        this.sysUser = Object.assign({}, recode)
        this.showSysUser = true
      },
      onCopy(b) {
        console.log(1, b);
        var Url2 = document.getElementById(b).innerText;
        console.log(2, Url2);
        var oInput = document.createElement('input'); //创建一个隐藏input
        console.log(oInput);
        oInput.value = Url2; //赋值
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.className = 'oInput';
        oInput.style.display = 'none';

        this.$message.success(this.$t('messages.copySuss'),2);
      },
      onUpdateSysUser() {
        this.userLoading = true
        updateAdminUser(this.sysUser.id, this.sysUser).then(res => {
          if (res.code == 0) {
            this.showSysUser = false
            this.$message.success(this.$t('messages.upSuccess'));
            // this.$success({
            // title: "更新成功",
            // onOk: () => {
            this.queryUser()
            // }
            // })
          }
        }).finally(() => {
          this.userLoading = false
        })
      },
      onDelete(recode) {
        console.log(recode)

        var d = Object.assign({}, recode)
        var self = this
        this.$confirm({
          title: this.$t("messages.toDelete") + '[ ' + d.name + ' ]',

          onOk() {
            return deleteAdminUser(d.id).then(
              res => {
                if (res.code == 0) {
                  // self.$success({ title: "删除成功" })
                  self.$message.success(self.$t('messages.delSuccess'));
                  self.queryUser()
                }
              }
            )
          },
          onCancel() {
            console.log('Cancel')
          },
        })
      },
      onPassword(recode) {
        this.initPwd()
        this.formPwd.id = recode.id
        this.showPwd = true
      },
      onResetPassword(recode) {
        this.$confirm({
          // title: '确定重置 [ ' + recode.name + ' ] 的密码么？此操作不可恢复！',
          title: this.$t("messages.retPwdMes"),
          onOk: () => {
            console.log('click')
            var self = this
            return postRestPassword(recode.id).then((res) => {
              console.log("restpwd", res)
              this.newPass = res.result.data.password
              if (res.code == 0) {
                this.showPassw = true
                // self.$confirm({
                //   title: this.$t("messages.retPwdSuccess"),
                //   content: this.$t("messages.newPwd") +res.result.data.password + this.$t("messages.pwdShow"),
                // })
              }
              // if (res.code == 0) {
              //   this.$success({
              //     title: this.$t("messages.retPwdSuccess"),
              //     // JSX support
              //     content: this.$t("messages.newPwd") +res.result.data.password + this.$t("messages.pwdShow"),
              //   })
              // }
            })
          },
          onCancel() {

          },
          // class: 'test',
        })
      },
      onUpdatePwd(id) {
        if (this.formPwd.password != this.formPwd.pwd2) {
          this.$error({
            // title: '两次输入新密码不一致',
            title: this.$t("messages.pwdDiff"),
          })
          return
        }
        this.loadPwd = true
        putPwd(id, this.formPwd).then(res => {
          this.loadPwd = false
          if (res.code == 0) {
            this.$message.success(this.$t('messages.upSuccess'));
            this.showPwd = false
          }
        }).finally(() => {
          this.loadPwd = false
        })
      },
      //创建用户
      onCreateSysUser() {
        this.Loading = true
        console.log('create')
        createAdminUser(this.sysUser).then(res => {
          if (res.code == 0) {
            this.showSysUser = false
            this.$message.success(this.$t('messages.creatSuccess'))
            this.queryUser()
          }
        }).finally(() => {
          this.userLoading = false
        })
      },
      onCancelSysUser() {
        this.showSysUser = false
        this.Loading = false
      },

    },
    mounted() {
      this.queryUser()
      this.queryAss()
      // let url = process.env.VUE_APP_API_BASE_URL
      let url=window.location.host
      let proto = window.location.protocol
      this.lUrl = proto+ "//"+url
      console.log("路径", this.lUrl)
      let userinfo = storage.get(USER_INFO)
      if (userinfo) {
        this.userId = userinfo.id
      }
      console.log("userinfo", userinfo)

    },

  }
</script>
