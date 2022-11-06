<template>
  <div>
    <page-header-wrapper :title="false" content="">
      <!-- 设备弹框 -->
      <a-modal
      :title="$t('btn.deviceConn')" :visible="showDevice" @cancel="onCancel2"
      :footer="null"
      >
        <a-table
        :columns="deviceColumns" :data-source="deviceData"
         :loading="loading" rowKey2="id"
        >
        <span slot="index" slot-scope="text,record,index">
          {{index+1}}
        </span>
        <span slot="action" slot-scope="text,record">
          <template>
            <a @click="chooseDevice(record)">{{$t('btn.deviceConn')}}</a>
          </template>
        </span>
        </a-table>
      </a-modal>
      <!-- 新建编辑弹框 -->
      <a-modal 
      :title="isCreate?$t('btn.add'):$t('btn.updata')"
      :visible="showAtten" 
      :okText="isCreate?$t('btn.add'):$t('btn.updata')"
      :confirmLoading="attenLoading"
        @ok="()=>{isCreate?onCreateAtten():onUpdataAtten()}" @cancel="onCancel">
        <a-form :form="attenForm" :width="650" :label-col="{ span: 9 }" :wrapper-col="{ span: 14 }">
          <a-form-item :label="$t('form.ruleName')" required :laceholder="$t('form.inputRuleName')" >
            <a-input v-model="attenForm.name"/>
          </a-form-item>
          <a-form-item :label="$t
          ('form.startTime')" required p >
            <template>
              <a-time-picker
               v-model="startTime"
               :default-value="moment('00:00', 'HH:mm')" format="HH:mm" />
            </template>
          </a-form-item>
          <a-form-item :label="$t('form.endTime')" required >
           <template>
             <a-time-picker 
             v-model="endTime"
             :default-value="moment('00:00', 'HH:mm')" format="HH:mm" />
           </template>
          </a-form-item>
        </a-form>
      </a-modal>
      <a-card>
        <div style="margin-bottom: 14px;">
          <a-button type='primary' @click="()=>{isCreate=true,initsysAtten(),showAtten=true}">{{$t('btn.add')}}</a-button>
        </div>
        <div>
          <a-table :columns="columns" :data-source="attenData" :pagination="page"
           :loading="loading" rowKey="id">
            <span slot="index" slot-scope="text,record,index">
              {{index+1}}
            </span>
            <span slot="startTime" slot-scope="text,record">
              {{formatDate(record.startTime*1000)}}
            </span>
            <span slot="endTime" slot-scope="text,record">
              {{formatDate(record.endTime*1000)}}
            </span>
            <span slot="action" slot-scope="text,record">
              <template>
                <a @click="onEdit(record)">{{$t('btn.edit')}}</a>
                <a-divider type="vertical" />
                
                <!-- 关联设备 -->
               <!-- <template v-if="record.deviceId">
                  <a   @click="onOutDevice(record)" style="color:#AAAAAA">{{$t('btn.deviceOut')}}</a>
                </template>
                <template v-else>
                  <a  @click="onConnDevice(record)">{{$t('btn.deviceConn')}}</a>
                </template> 
                <a-divider type="vertical" />-->
           
                <a @click="onDelete(record)">{{$t('btn.del')}}</a>
                <a-divider type="vertical" />
              </template>
            </span>
          </a-table>
        </div>

      </a-card>
    </page-header-wrapper>
  </div>
</template>

<script>
  import moment from 'moment';
  import storage from 'store'
  import page from '@/utils/page'
  import {
    queryAttendance,
    createAttendance,
    updateAttendance,
    deleteAttendance,
    bindAttendance,
    unbindAttendance,
    queryDevice
  } from '@/api/attendance'
  export default {
    name: 'attendance',
    data() {
      // let self = this
      return {
        moment,
        attenData: [],
        deviceData:[],
        deviceColumns:[
          {
              title: "#",
              scopedSlots: {
                customRender: 'index'
              },
              },
          {
            title:"设备名称",
            dataIndex:"name"
          },
          {
            title: ()=>{return this.$t('form.action')},
            dataIndex: 'action',
            align: 'center',
            scopedSlots: {
              customRender: 'action'
            },
            }
        ],
        showAtten: false,
        isCreate: true,
        AttenId: null,
        loading: false,
        ruleId:'',
        queryLoading: false,
        queryParam:{},
        attenLoading: false,
        showDevice:false,
        deviceId:'',
        deviceId2:'',
        columns: [{
            title: "#",
            scopedSlots: {
              customRender: 'index'
            },
          },
          {
            title: ()=>{return this.$t('form.workRule')},
            // title: "考勤规则",
            dataIndex: 'name'
          },
          {
            title: ()=>{return this.$t('form.startTime')},
            dataIndex: 'startTime'
          },
          {
            title: ()=>{return this.$t('form.endTime')},
            dataIndex: 'endTime'
          },
          {
            title: ()=>{return this.$t('form.action')},
            dataIndex: 'action',
            align: 'center',
            scopedSlots: {
              customRender: 'action'
            }
          }
        ],
        attenForm: {},
        startTime:null,
        endTime:null,
        //分页配置
        page: page(this, this.onQueryAtten),
      }
    },
    methods: {
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
       initsysAtten () {
        this.attenForm = {
          name: '',
          startTime:'',
          endTime:'',
          
        },
        this.startTime='',
        this.endTime='',
        this.sysAttenState = {
          name: ''
        }
      },
      //查
      onQueryDevice() {
        queryDevice(this.queryParam, {current: 1,size: 9999}).then(res => {
          console.log('111', res)
          if (res.code == 0) {
            this.deviceData = res.result.data
            // this.page.total = res.result.page.total
            // this.queryLoading = false
          }
        }).finally(() => {
          // this.queryLoading = false
        })
      },
      onQueryAtten() {
        queryAttendance(this.queryParam, 
        {current: this.page.current,size: this.page.pageSize}).then(res => {
          console.log('110', res)
          if (res.code == 0) {
            this.attenData = res.result.data
            this.page.total = res.result.page.total
            this.queryLoading = false
          }
        }).finally(() => {
          this.queryLoading = false
        })
      },
      //增
      onCreateAtten() {
        this.showAtten = true
        // 时间---》字符串
        this.attenForm.startTime = this.startTime.format("HH:mm")
        this.attenForm.endTime = this.endTime.format("HH:mm")
        console.log("表单数据11",this.attenForm)
        createAttendance(this.attenForm).then(res=>{
          if(res.code == 0){
            this.$message.success(this.$t('messages.creatSuccess'));
            this.showAtten=false
            this.onQueryAtten()
          }else{
            // this.$message.error(this.$t('messages.creatError'));
          }
        })
      },
      //删
      onDelete(record) {
        var d = Object.assign({}, record)
        var self = this
        this.$confirm({
         title: this.$t("messages.toDelete") +'[ ' + d.name + ' ]',
         cancelText: this.$t("btn.cancel"),
          onOk() {
            return deleteAttendance(d.id).then(res => {
              if (res.code == 0) {
                self.$message.success(self.$t('messages.delSuccess'));
                self.onQueryAtten()
              }
            })
          },
          oncancel() {
            console.log("删除后")
          }
        })
      },
      //改
      onEdit(record){
        this.showAtten = true
        this.isCreate=false
        // 字符串转时间
        // moment("20120620", "YYYYMMDD")
        this.startTime=moment(record.startTime,"h:mm")
        this.endTime=moment(record.endTime,"h:mm")
        this.attenForm = Object.assign({}, record)
        
        console.log("表单数据2",record)
  
      },
      onUpdataAtten() {
        // 时间转字符串
       this.attenForm.startTime = this.startTime.format("HH:mm")
       this.attenForm.endTime = this.endTime.format("HH:mm")
        console.log("表单数据3",this.startTime)
        updateAttendance(this.attenForm.id,this.attenForm).then(res=>{
          if(res.code==0){
            this.showAtten=false
            this.$message.success(this.$t('messages.updataSuccess'));
            this.onQueryAtten()
          }
        })
      },
      onCancel() {
        this.showAtten = false
        this.Loading = false
      },
      // 绑定设备
      onConnDevice(record){
        this.showDevice=true
        this.ruleId=record.id
        this.onQueryDevice()
        console.log("绑定设备")
      },
      chooseDevice(record){
        console.log("112",record)
        this.deviceId=record.deviceId
        bindAttendance(this.ruleId,this.deviceId).then(res=>{
          if(res.code==0){
            this.$message.success(this.$t('messages.bindSuccess'));
            this.onQueryAtten()
            this.onQueryDevice()
            this.showDevice=false
          }
        })
      },
      onCancel2(){
        this.showDevice=false
      },
      //解绑设备
      onOutDevice(record){
        console.log("解绑设备")
        console.log("112",record)
        this.deviceId2=record.deviceId
        console.log("113",record.id)
        unbindAttendance(record.id,this.deviceId2).then(res=>{
          if(res.code==0){
            // this.$message.success(this.$t('messages.creatSuccess'));
            this.$message.success(this.$t('messages.unbindSuccess'));
            this.onQueryAtten()
            this.onQueryDevice()
            this.showDevice=false
          }
        })
      },
    },
    mounted() {
      this.onQueryAtten()
    }
  }
</script>

<style>


</style>
