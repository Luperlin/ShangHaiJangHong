<template>

  <page-header-wrapper :title="false" content="" id="devicesuser">
    <a-modal :visible="previewVisible" :footer="null" @cancel="onCancel" style="text-align: center;">
      <img :src="host+bigimg" style="max-height: 500px;max-width:400px ;margin: 0 auto;" />
    </a-modal>
    <!-- 添加弹框(user) -->
    <a-modal :title="devname+$t('form.tianJia')" v-model="show.workuser" :width="750" :footer="null" :maskClosable="true">
      <div class="userbox">
        <div class="l">
          <a-space direction="vertical">
            <div>
              <span class="devname" @click="onGroup('',-1)">
                <a-icon v-if="userGroupIndex==-1" type="check-square" />
                <a-icon v-else type="border" />
                <span style="padding-left:5px" :class="{actName:userGroupIndex==-1}">{{$t('form.suoYou')}}</span>
              </span>
            </div>
            <div v-for="(v,k) in workUserGroup" :key="k">
              <span class="devname" @click="onGroup(v,k)">
                <a-icon v-if="k==userGroupIndex" type="check-square" />
                <a-icon v-else type="border" />
                <span style="padding-left:5px" :class="{actName:k==userGroupIndex}">{{v.name}}</span>
              </span>
            </div>
          </a-space>
        </div>
        <div class="r">
          <div style="padding:0 10px">
            <a-row>
              <a-col :span="10">
                <a-form-item style="margin:0" :label="$t('form.name')" :labelCol="{span:4}" :wrapperCol="{span:14}">
                  <a-input size="small" v-model="groupUserParam.name" />
                </a-form-item>
              </a-col>
              <a-col :span="10">
                <a-form-item style="margin:0" :label="$t('form.gongHao')" :labelCol="{span:4}" :wrapperCol="{span:14}">
                  <a-input size="small" v-model="groupUserParam.jobNum" />
                </a-form-item>
              </a-col>
              <a-col :span="4">
                <a-form-item style="margin:0">
                  <a-button style="margin:0" type="primary" size="small" @click="getGroupUser()">
                    {{$t('btn.query')}}
                  </a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </div>
          <div  style="margin:0 10px 10px">
            <a-button type="primary"  :disabled="!hasSelected2" :loading="loading" @click="start2">
              {{$t('btn.batchBind')}}
            </a-button>
            <span style="margin-left: 8px">
              <template v-if="hasSelected2">
                {{  $t('btn.batchBind')+ selectedRowKeys2.length+$t('form.ge') }}
              </template>
            </span> 
          </div>
          <a-table 
          :row-selection="{ selectedRowKeys: selectedRowKeys2, onChange: onSelectChange2 }"
          :columns="groupConfig" rowKey="id" 
          :data-source="groupUsers" 
          :pagination="groupUserPage" 
          :loading="load.groupUser" size="small">
            <span slot="index" slot-scope="_, record,index">
              {{index+1}}
            </span>
            <span slot="add" slot-scope="text,record">
              <!-- <a-icon type="plus-circle" /> -->
              <a-button @click="onBindUser(record)" size="small" type="primary" icon="plus" />
            </span>
          </a-table>
        </div>
      </div>
    </a-modal>
    <!-- 添加弹框2(visitor) -->
    <a-modal :title="devname+$t('form.visitor')" v-model="show.visitor" :width="750" :footer="null" :maskClosable="true">
      <div>
        <div>
          <a-row>
            <a-col :span="10">
              <a-form-item style="margin:0" :label="$t('form.name')" :labelCol="{span:4}" :wrapperCol="{span:12}">
                <a-input size="small" v-model="visitorParam.name" />
              </a-form-item>
            </a-col>
            <a-col :span="10">

              <a-form-item style="margin:0" :label="$t('form.phone')" :labelCol="{span:4}" :wrapperCol="{span:12}">
                <a-input size="small" v-model="visitorParam.phone" />
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item style="margin:0">
                <a-button style="margin:0" type="primary" size="small" @click="onQuereyVisitor()">
                  {{$t('btn.query')}}
                </a-button>
              </a-form-item>

            </a-col>
          </a-row>
        </div>
        <div  style="margin:0 10px 10px">
          <a-button type="primary"  :disabled="!hasSelected4" :loading="loading" @click="start4">
            {{$t('btn.batchBind')}}
          </a-button>
          <span style="margin-left: 8px">
            <template v-if="hasSelected4">
              {{  $t('btn.batchBind')+ selectedRowKeys4.length+$t('form.ge') }}
            </template>
          </span> 
        </div>
        <a-table 
        :row-selection="{ selectedRowKeys: selectedRowKeys4, onChange: onSelectChange4 }"
        :columns="visitorClumns" rowKey="id" 
        :data-source="visitorDate" :pagination="visitorPage"  size="small" >
          <span slot="index" slot-scope="_, record,index">
            {{index+1}}
          </span>
          <div slot="address" slot-scope="text,record">
            <a-tooltip trigger="click">
              <template slot="title">
                {{text}}
              </template>
              <div class="notes slh">
                {{text}}
              </div>
            </a-tooltip>
            <!-- <div v-else>
                {{text}}
              </div> -->
          </div>

          <span slot="add2" slot-scope="text,record">
            <!-- <a-icon type="plus-circle" /> -->
            <a-button @click="onBindVisitor(record)" size="small" type="primary" icon="plus" />
          </span>
        </a-table>
      </div>
    </a-modal>

    <a-card :bordered="false">
      <div class="box">
        <!-- 左边部分 -->
        <div class="leftb">
          <div class="devname" style="padding-top:3px;font-weight:600">
            <a-icon type="appstore" style="font-size:20px" /> 
            <span style="padding-left:5px">{{$t('form.sheBei')}}</span>
          </div>
          <!-- <hr> -->
          <a-divider style="margin:15px 0" />

          <a-space direction="vertical" size="middle">
            <div v-for="(v,k) in deviceList" :key="k">
              <span class="devname" @click="ondev(k)">
                <a-icon v-if="k==nameindex" type="check-square" />
                <a-icon v-else type="border" />
                <span style="padding-left:5px" :class="{actName:k==nameindex}">{{v.name}}</span>
              </span>
            </div>
          </a-space>
        </div>
        <!-- 右边table部分 -->
        <div class="rightb">
          <!-- tabs切换条 -->
          <a-tabs @change="onSearchUser2()" type="card">
            <!-- 切换1 -->
            <a-tab-pane key="1" :tab="$t('form.renZhengRenYuan')" >
              <a-row>
                <a-col :span="8">
                  <a-form-item :label="$t('form.name')" :labelCol="{span:4}" :wrapperCol="{span:14}">
                    <a-input v-model="workUserParam.name" />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item :label="$t('form.gongHao')" :labelCol="{span:4}" :wrapperCol="{span:14}">
                    <a-input v-model="workUserParam.jobNum" />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-space>
                    <a-button type="primary" @click="onSearchUser">
                      {{$t('btn.query')}}
                    </a-button>
                    <a-button @click="onReset"> {{$t('btn.reset')}}</a-button>

                    <a-button @click="onUserBox()">
                      <a-icon type="plus" /> {{$t('btn.add')}}
                    </a-button>

                  </a-space>
                </a-col>
              </a-row>
              <a-row>
                <div>
                  <div  style="margin:10px 0px">
                    <a-button type="danger" :disabled="!hasSelected" :loading="loading" @click="start">
                      {{$t('form.piLiangShanChu')}}
                    </a-button>
                    <span style="margin-left: 8px">
                      <template v-if="hasSelected">
                        {{  $t('form.piLiangShanChu')+ selectedRowKeys.length+$t('form.ge') }}
                      </template>
                    </span> 
                  </div>
                  <a-table 
                  :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                  :columns="userConf" 
                  :data-source="userData" 
                  rowKey="id" 
                  :pagination="workUserPage" 
                  :loading="load.workuser">
                    <span slot="index" slot-scope="_, record,index">
                      {{index+1}}
                    </span>

                    <span slot="imgs" slot-scope="text,record">
                      <div style="height:60px;width:100px; text-align: center;margin:0 auto">
                        <img @click="onPreview(record)" :src="host+text" alt="" height="100%" style="margin:0 auto">
                      </div>
                      <!-- <img src="" alt="" height="120px" width=""> -->
                    </span>
                    <span slot="action" slot-scope="text,record">
                      <a-button type="primary" @click="onDelUserFromDev(record)">
                        {{$t('btn.del')}}
                      </a-button>
                    </span>
                  </a-table>
                  
                </div>

              </a-row>
            </a-tab-pane>

            <!-- 切换2 -->
            <a-tab-pane key="2" :tab="$t('form.visitor')" >
              <a-row>
                <a-col :span="8">
                  <a-form-item :label="$t('form.name')" :labelCol="{span:4}" :wrapperCol="{span:14}">
                    <a-input v-model="visitorParam.name" />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item :label="$t('form.phone')" :labelCol="{span:4}" :wrapperCol="{span:14}">
                    <a-input v-model="visitorParam.phone" />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-space>
                    <a-button type="primary" @click="onSearchUser2">
                      {{$t('btn.query')}}
                    </a-button>
                    <a-button @click="onReset">{{$t('btn.reset')}}</a-button>

                    <a-button @click="onVisitorBox()">
                      <a-icon type="plus" />{{$t('btn.add')}}
                    </a-button>
 
                  </a-space>
                </a-col>
              </a-row>
              <a-row>
                <!-- 表格2 -->
                <div>
                  <div  style="margin:10px 0px">
                    <a-button type="danger" :disabled="!hasSelected3" :loading="loading" @click="start3">
                      {{$t('form.piLiangShanChu')}}
                    </a-button>
                    <span style="margin-left: 8px">
                      <template v-if="hasSelected3">
                        {{  $t('form.piLiangShanChu')+ selectedRowKeys3.length+$t('form.ge') }}
                      </template>
                    </span> 
                  </div>
                  <a-table 
                  :row-selection="{ selectedRowKeys: selectedRowKeys3, onChange: onSelectChange3 }"
                  :columns="visitorClumns2" 
                  :data-source="outVisitorlist" rowKey="id" 
                  :pagination="outPage" :loading="load.workuser">
                    <span slot="index" slot-scope="_, record,index">
                      {{index+1}}
                    </span>
                    <span slot="dateTime" slot-scope="text,record">
                      {{formatDate(record.startDate*1000)}}~{{formatDate(record.endDate*1000)}}
                    </span>
                    <span slot="imgs" slot-scope="text,record">
                      <div style="height:60px;width:100px; text-align: center;margin:0 auto">
                        <img @click="onPreview2(record)" :src="host+text" alt="" height="100%" style="margin:0 auto">
                      </div>
                    </span>
                    <span slot="action" slot-scope="text,record">
                      <a-button type="primary" @click="onDleVIsitor(record)">
                        {{$t('btn.del')}}
                      </a-button>
                    </span>
                  </a-table>
                </div>

              </a-row>
            </a-tab-pane>
          </a-tabs>

        </div>
      </div>
      <!-- </a-form> -->

    </a-card>

  </page-header-wrapper>
</template>
<script>
  import {
    getDevice,
    getUser
  } from "@/api/device"
  import page from '@/utils/page'
  import {
    Progress
  } from 'ant-design-vue'
  import {queryGroup, queryEmployees, employeeBind,  employeeUbind} from "@/api/employees"
  import {batchUbindEmp,batchBindEmp,vbatchUbindEmp,vbatchBindEmp, } from "@/api/device"
  import {
    queryVisitor,
    createVisitor,
    updateVisitor,
    deleteVisitor,
    bindVisitor,
    unbindVisitor
  } from '@/api/visitor'
  export default {
    name: 'devicesuser',
    data: function() {
      return {
        selectedRowKeys: [],
        selectedRowKeys2: [],
        selectedRowKeys3: [],
        selectedRowKeys4: [],
        loading: false,
        host: "",
        bigimg: '',
        status: {},
        previewVisible: false,
        show: {
          user: false,
          workuser: false,
          visitor: false,
        },
        load: {
          workuser: false,
          groupUser: false,
        },
        deviceList: [],
        nameindex: 0,
        devname: "",
        userConf: [{
            title: "#",
            width:50,
            scopedSlots: {
              customRender: 'index'
            },
          },

          {
            title: () => {
              return this.$t('form.img')
            },
            dataIndex: "img",
            width:300,
            align: "center",
            key:'imgs',
            scopedSlots: {
              customRender: 'imgs'
            },
          },
          {
            title: () => {
              return this.$t('form.name')
            },
            width:300,
            dataIndex: "name",
          },
          {
            title: () => {
              return this.$t('form.gongHao')
            },
            dataIndex: "jobNum",
            width:300,
          },

          {
            title: () => {return this.$t('form.action')},
            width:200,
            scopedSlots: {
              customRender: 'action'
            },

          }
        ],
        userData: [],
        workUserParam: {
          jobNum: "",
          deviceId: "",
          name: "",
        },

        workUserPage: page(this, this.getWorkUser),
        workUserGroup: [],
        userGroupIndex: -1,
        groupConfig: [{
            title: "#",
            scopedSlots: {
              customRender: 'index'
            },
          },
          
          {
            title: () => {
              return this.$t('form.name')
            },
            dataIndex: "name",
          },
          {
            title: () => {
              return this.$t('form.gongHao')
            },
            dataIndex: "jobNum",
          },
          {
            title: () => {
              return this.$t('btn.add')
            },
            scopedSlots: {
              customRender: 'add'
            },

          }
        ],
        groupUsers: [],
        groupUserPage: (() => {
          let p = page(this, this.getGroupUser);
          p.showSizeChanger = false;
          p.pageSize = 5;
          return p
        })(),
        groupUserParam: {
          name: '',
          jobNum: "",
          groupId: "",
        },

        // visitor
        // 弹框访客数据
        visitorPage: page(this, this.onQuereyVisitor),
        outPage: page(this, this.getOutVisitor),
        
        outVisitorlist: [],
        visitorDate: [],
        visitorParam: {
          phone: "",
          name: "",
        },
        visitorClumns: [{
            title: "#",
            scopedSlots: {
              customRender: 'index'
            },
          },
          {
            title:()=>{
              return this.$t('form.name')
            },
            dataIndex: "name",
          },
          {
            title: () => {
              return this.$t('form.phone')
            },
            dataIndex: "phone"
          },
          {
            title: () => {
              return this.$t('form.address')
            },
            dataIndex: "address",
            width: "200px",
            overflow: 'hidden',
            scopedSlots: {
              customRender: 'address'
            }
          },
          {
            title: () => {
              return this.$t('btn.add')
            },
            scopedSlots: {
              customRender: 'add2'
            },

          },
        ],
        // ==========================授权后数据
        visitorClumns2: [{
            title: "#",
            width:50,
            scopedSlots: {
              customRender: 'index'
            },
          },
          {
            title: () => {
              return this.$t('form.img')
            },
            width:300,
            dataIndex: "img",
            align: "center",
            scopedSlots: {
              customRender: 'imgs'
            },
          },
          {
            title: () => {
              return this.$t('form.name')
            },
            width:150,
            dataIndex: "name",
          },
          {
            title: () => {
              return this.$t('form.phone')
            },
            width:150,
            dataIndex: "phone"
          },
          {
            title: () => {
              return this.$t('form.youXiaoQi')
            },
            width:350,
            scopedSlots: {
              customRender: 'dateTime'
            }
          },

          {
            title: () => {
              return this.$t('form.action')
            },
            align:"rigth",
            scopedSlots: {
              customRender: 'action'
            },
          }
        ],
      }
    },
    computed: {
    
      hasSelected () {
        return this.selectedRowKeys.length > 0;
      },
      hasSelected2 () {
        return this.selectedRowKeys2.length > 0;
      },
      hasSelected3 () {
        return this.selectedRowKeys3.length > 0;
      },
      hasSelected4 () {
        return this.selectedRowKeys4.length > 0;
      },
    },
    methods: {
      // 全选批量绑定
      onSelectChange (selectedRowKeys, selectedRows) {
        console.log('批量删除', selectedRowKeys,selectedRows);
        this.selectedRowKeys = selectedRowKeys;
        let deivceId=this.deviceList[this.nameindex].deviceId
        console.log("设备id",deivceId)
      },
      onSelectChange2 (selectedRowKeys2, selectedRows2) {
        console.log('批量绑定', selectedRowKeys2);
        this.selectedRowKeys2 = selectedRowKeys2;
        let deivceId=this.deviceList[this.nameindex].deviceId
        console.log("设备id",deivceId)
      },
      // 全选批量绑定
      onSelectChange3 (selectedRowKeys3, selectedRows3) {
        console.log('批量删除', selectedRowKeys3,selectedRows3);
        this.selectedRowKeys3 = selectedRowKeys3;
        let deivceId=this.deviceList[this.nameindex].deviceId
        console.log("设备id",deivceId)
      },
      onSelectChange4 (selectedRowKeys4, selectedRows4) {
        console.log('批量绑定', selectedRowKeys4);
        this.selectedRowKeys4 = selectedRowKeys4;
        let deivceId=this.deviceList[this.nameindex].deviceId
        console.log("设备id",deivceId)
      },
      
      onSearchUser2(){
        // this.getOutVisitor()
        this.selectedRowKeys=[]
        this.selectedRowKeys2=[]
        this.selectedRowKeys3=[]
        this.selectedRowKeys4=[]
        console.log("去除选中状态")
      },
//—————————————————————————————————————————————————
      //认证人员批量删除
      start () {
        this.$confirm({
          title:this.$t('messages.toBatchDel'),
          onOk:()=>{
            // console.log('OK');
            this.loading = true;
             setTimeout(() => {
               this.loading = false;
               console.log("删除了",this.selectedRowKeys)
               // this.selectedRowKeys = [];
               let deviceId2=this.deviceList[this.nameindex].deviceId
               console.log("删除了...",deviceId2,this.selectedRowKeys)
               batchUbindEmp({deviceId:deviceId2,userIds:this.selectedRowKeys}).then(res=>{
                if(res.code==0){
                  this.getWorkUser()
                  this.selectedRowKeys = [];
                  console.log("批量绑定成功")
                  this.$message.success(this.$t('messages.delSuccess'));
                }
              }).finally(()=>{
                this.loading=false
              })
            }, 1000);
          },
          onCancel () { }
        })
       
      },
        //认证人员   批量添加
      start2 () {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          console.log("绑定了",this.selectedRowKeys2)
          let deviceId=this.deviceList[this.nameindex].deviceId
          console.log("设备id",deviceId)
          batchBindEmp({deviceId:deviceId,userIds:this.selectedRowKeys2}).then(res=>{
            if(res.code==0){
              this.getWorkUser()
              this.selectedRowKeys2 = [];
              console.log("批量绑定成功")
            }
          })
        }, 1000);
      },
    //认证人员批量删除
    start3 () {
      this.$confirm({
        title:this.$t('messages.toBatchDel'),
        onOk:()=>{
          // console.log('OK');
          this.loading = true;
           setTimeout(() => {
             this.loading = false;
             console.log("删除了",this.selectedRowKeys3)
             // this.selectedRowKeys = [];
             let deviceId2=this.deviceList[this.nameindex].deviceId
             console.log("删除了...",deviceId2,this.selectedRowKeys3)
             vbatchUbindEmp({deviceId:deviceId2,userIds:this.selectedRowKeys3}).then(res=>{
              if(res.code==0){
                this.getOutVisitor()
                this.selectedRowKeys3 = [];
                console.log("批量绑定成功")
                this.$message.success(this.$t('messages.delSuccess'));
              }
            }).finally(()=>{
              this.loading=false
            })
          }, 1000);
        },
        onCancel () { }
      })
     
    },
      //认证人员   批量添加
    start4 () {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        console.log("绑定了",this.selectedRowKeys4)
        let deviceId=this.deviceList[this.nameindex].deviceId
        console.log("设备id",deviceId)
        vbatchBindEmp({deviceId:deviceId,userIds:this.selectedRowKeys4}).then(res=>{
          if(res.code==0){
            this.getOutVisitor()
            this.selectedRowKeys4 = [];
            console.log("批量绑定成功")
          }
        })
      }, 1000);
    },
      // 批量添加
      // start2 () {
      //   this.loading = true;
      //   setTimeout(() => {
      //     this.loading = false;
      //     console.log("绑定了",this.selectedRowKeys2)
      //     this.selectedRowKeys2 = [];
      //   }, 1000);
      // },
     
      //
      onPreview(record) {
        console.log("9002")
        this.previewVisible = true
        this.bigimg = record.img
        // alert("预览")
        console.log("9002", this.host + record.img)
      },
      onPreview2(record) {
        this.previewVisible = true
        console.log("9003", record)
        this.bigimg = record.img
        // this.bigimg=record.img
        // alert("预览")
        // console.log("9002",this.host+record.img)
      },
      onCancel() {
        this.previewVisible = false
      },

      //时间戳转时间格式
      formatDate(date) {
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD + " " + hh + mm + ss;
      },
      getDevice(callBack) {
        // this.load.workuser = true
        getDevice({}, {
          current: "1",
          size: 100
        }).then(res => {
          if (res.code == 0) {
            this.deviceList = res.result.data
            console.log("设备id",this.deviceList)
            if (callBack) {
              callBack()
            }
          }
        }).finally(r => {
          // this.load.workuser = false
        })
      },
      getWorkUser() {
        this.load.workuser = true
        var slef = this
        let _id = this.deviceList[this.nameindex].deviceId
        this.workUserParam.deviceId = _id

        getUser(this.workUserParam, {
          "current": this.workUserPage.current,
          "size": this.workUserPage.pageSize
        }).then(res => {
          if (res.code == 0) {
            console.log("workuser:", res)
            this.userData = res.result.data
            this.workUserPage.total = res.result.page.total
          }
        }).finally(r => {
          this.load.workuser = false
        })
      },
      getWorkUserGroup() {

      },
      ondev(i) {
        this.nameindex = i
        this.workUserParam.name = ""
        this.workUserParam.jobNum = ""
        this.getWorkUser()
        this.getOutVisitor()
      },
      onShowUser() {
        console.log("show user")
        this.show.user = true
      },
      onSearchUser() {
        this.getWorkUser()
      },
      onReset() {
        this.workUserParam.name = ""
        this.workUserParam.jobNum = ""
        this.visitorParam.name = ""
        this.visitorParam.phone = ""
      },
      onGroup(v, k) {
        this.userGroupIndex = k
        if (k == -1) {
          this.groupUserParam.groupId = ""
        } else {
          this.groupUserParam.groupId = v.id
        }
        this.getGroupUser()
      },
      onUserBox() {
        console.log(1111)
        this.groupUserParam.groupId = ""
        this.groupUserParam.name = ""
        this.groupUserParam.jobNum = ""
        this.userGroupIndex = -1
        this.workUserGroup = []
        this.selectedRowKeys = []
        this.groupUsers = []
        this.devname = this.deviceList[this.nameindex].name
        this.show.workuser = true
        this.getUserGroup()
        this.getGroupUser()

      },
      //绑定用户sa
      onBindUser(record) {
        // console.log(r)
        var self = this
        let username = record.name
        let devname = this.deviceList[this.nameindex].name
        this.$confirm({
          title: self.$t('form.queDingTianJia') + username + self.$t('form.zhiSheBei') + devname,
          onOk() {
            console.log(self.deviceList, self.nameindex)
            let device = self.deviceList[self.nameindex].deviceId
            console.log("deviceid", device)
            employeeBind(record.id, device).then(res => {
              if (res.code == 0) {
                self.$message.success(self.$t('messages.addSuccess'));
                // self.$messages.success('添加成功');
                // self.$success({
                //   "title": "添加成功"
                // })
                self.getWorkUser()
              }
            })
          },
          onCancel() {
            console.log('Cancel');
          },

        });

      },
      onDelUserFromDev(r) {
        var self = this
        console.log(r)
        let userid = r.id
        let username = r.name
        let devname = this.deviceList[this.nameindex].name
        this.$confirm({
          title: self.$t('form.queDingTianJia') + devname + self.$t('form.zhiSheBeishanChu') + username,
          onOk() {
            employeeUbind(userid, self.deviceList[self.nameindex].deviceId).then(res => {
              if (res.code == 0) {
                self.$message.success(self.$t('messages.delSuccess'));
                // self.$success({
                //   "title": "删除成功"
                // })
                self.getWorkUser()
              }
            })

          }
        })
      },
      getUserGroup() {
        queryGroup({}, {
          current: 1,
          size: 1000
        }).then(res => {
          console.log(res)
          if (res.code == 0) {
            this.workUserGroup = res.result.data
          }
        }).catch(res => {
          console.log("ger group err", res)
        })
      },
      getGroupUser() {
        queryEmployees(this.groupUserParam, {
          current: this.groupUserPage.current,
          size: this.groupUserPage.pageSize
        }).then(res => {
          if (res.code == 0) {
            this.groupUsers = res.result.data
            this.groupUserPage.total = res.result.page.total
          }
        })
      },

      // =====================================================  

      // ======================访客==============================================================================

      // =====================================================
      onVisitorBox() {
        this.visitorDate.phone = ""
        this.visitorDate.name = ""
        this.devname = this.deviceList[this.nameindex].name
        this.show.visitor = true
        this.onQuereyVisitor()
        this.onSearchUser2()
        // this.onBindVisitor()
      },
      //绑定
      onBindVisitor(record) {
        console.log("add 1006", record)
        var self = this
        let visitorName = record.name
        let devname = this.deviceList[this.nameindex].name
        this.$confirm({
          title: self.$t('form.queDingTianJiaFK') + devname + self.$t('form.zhiSheBei') + devname,
          onOk() {
            console.log("1005", self.deviceList, self.nameindex)
            let deviceId = self.deviceList[self.nameindex].deviceId
            console.log("deviceid", deviceId)
            bindVisitor(record.id, deviceId).then(res => {
              if (res.code == 0) {
                // self.$message.success('添加成功');
                self.$message.success(self.$t('messages.addSuccess'));
                // self.$success({
                //   "title": "添加成功"
                // })
                self.getOutVisitor()
                // self.onQuereyVisitor(deviceId)
              }
            })
          },
          onCancel() {
            console.log('Cancel');
          },

        });

      },

      //查
      onQuereyVisitor(devid) {
        // let _id = ""
        this.visitorParam.deviceId = devid

        queryVisitor(this.visitorParam, {
          
          current: this.visitorPage.current,
          size: this.visitorPage.pageSize
        }).then(res => {
          if (res.code == 0) {
            this.visitorPage.total = res.result.page.total
            console.log("visitor10011:", res)
            this.visitorDate = res.result.data
          }
        }).finally(r => {
          this.load.workuser = false
        })
      },
      
      // 外表格
      getOutVisitor() {
        // this.load.workuser = true
        let self=this
        let _id = self.deviceList[self.nameindex].deviceId
        console.log(1212,_id)
        this.visitorParam.deviceId = _id
        queryVisitor(this.visitorParam, {
          current: this.outPage.current,
          size: this.outPage.pageSize
        }).then(res => {
          if (res.code == 0) {
            console.log("workuser:", res)
            this.outVisitorlist = res.result.data
            this.outPage.total = res.result.page.total
          }
        }).finally(r => {
          // this.load.workuser = false
        })
      },

      //删
      onDleVIsitor(record) {
        var self = this
        console.log("1004", record)
        let visitorId = record.id
        let username = record.name
        let devname = this.deviceList[this.nameindex].name

        this.$confirm({
          title: self.$t('form.queDingCongSheBei') + username + self.$t('form.zhiSheBeishanChuFK') + devname,
          // title: `确定从设备[${devname}]中删除访客 [${username}]?`,
          onOk() {
            unbindVisitor(visitorId, self.deviceList[self.nameindex].deviceId).then(res => {
              if (res.code == 0) {
                // self.$message.success('删除成功');
                self.$message.success(self.$t('messages.delSuccess'));
                // self.$success({
                //   "title": "删除成功"
                // })
                self.getOutVisitor()
              }
            })

          }
        })
      }
    },

    mounted() {
      let self=this
      this.host = process.env.VUE_APP_API_BASE_URL
      // var self = this
      this.getDevice(() => {
       self.getOutVisitor()
       self.getWorkUser()
      })
    }
  }
</script>
<style lang="less" scoped>
  #devicesuser {
    .leftb {
      border-right: 1px solid #ddd;
      // flex: 250px;
      width: 150px;
    }

    .box {
      display: flex;
    }

    .rightb {
      flex: auto;
      padding: 0 10px;
      // display: inline-block;
    }

    .devname {
      display: block;
      width: 140px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
      cursor: pointer;
    }

    .actName {
      // background: #409EFF;
      color: #409eff;
      font-size: 600;
    }
  }

  .userbox {
    height: 350px;
    width: 700px;
    display: flex;

    .l {
      width: 140px;
      border-right: 1px solid #ddd;
      height: 350px;
      overflow: auto;
    }

    .r {
      flex: 1;
      height: 350px;
    }

    .actName {
      // background: #409EFF;
      color: #409eff;
      font-size: 600;
    }

    .devname {
      display: block;
      width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
      cursor: pointer;
    }

  }

  .slh {
    height: 20px;
    white-space: nowrap;
    /*设置不换行*/
    overflow: hidden;
    /*设置隐藏*/
    text-overflow: ellipsis;
    width: 200px;
    cursor: pointer;
  }
</style>
