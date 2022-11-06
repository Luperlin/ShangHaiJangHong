<template>
  <page-header-wrapper id="deviceManage" >
    <!-- 弹框部分 -->
    <a-modal v-model="qrcodeShow" @ok="()=>{onQrcode()}" 
      :maskClosable="false"
      :title="$t('form.fangKeTongXingMa')  " :width="450" :footer="null">
      <a-form :form="qrcodeData">
        <a-form-item :label="$t('form.biaoTi')" :labelCol="{span:6}" :wrapperCol="{span:14}">
          <a-input  v-model="qrcodeData.title"/>
        </a-form-item>
        <a-form-item :label="$t('form.youXiaoShiJian')" :labelCol="{span:6}" :wrapperCol="{span:14}">
          <a-input :suffix="$t('form.tian')" :defaultValue='0' v-model="qrcodeData.time" type="number" :min="0"/>
        </a-form-item>
        <a-form-item>
          <div  ref="qrCodeUrl" style="width: 250px;height: 250px;border: 1px solid #d1d1d1;margin: 0 auto; ">
            <img :src="base64" alt="">
          </div>
        </a-form-item>
        <a-form-item   style="text-align: center;">
           <a-space size="large" >
          <span style="font-size: 20px;" :labelCol="{span:4}" :wrapperCol="{span:18}"> {{$t('form.sheBei')}}：{{name}}</span>
          <span style="font-size: 20px;" :labelCol="{span:4}" :wrapperCol="{span:18}">{{$t('form.youXiaoShiJian')}}：{{time}}{{$t('form.tian')}}</span>
          </a-space >
        </a-form-item>
        <a-form-item   style="text-align: center;">
         <a-button @click="onCreateCode">{{$t('form.shengCheng')}}</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 显示框 -->
    <a-modal  v-model="visible" :title="$t('form.deviceInfo')" @ok="handleOk" width="60%" :okText="$t('btn.ok')" 
    style="min-width: 520px;" :cancel-button-props="{style:{display:'none'}}">
      <template>
        <a-descriptions layout="horizontal" DescriptionItems="2" :column="24">
          <a-descriptions-item :label="$t('form.deviceName')" span="12">
            {{devinfo.name}}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('form.deviceId')" span="12">
            {{devinfo.deviceId}}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('form.zhucCeShiJian')" span="12">
            {{devinfo.createdAt}}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('form.zuiJinShangXian')" span="12">
            {{devinfo.last_online_at}}
          </a-descriptions-item>
          <a-descriptions-item label="IP" span="12">
            {{devinfo.ip}}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('form.firmwareVersion')" span="12">
            {{devinfo.firmwareVersion}}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('form.softwareVersion')" span="12">
            {{devinfo.DeviceVersion}}
          </a-descriptions-item>
          <a-descriptions-item  :label="$t('form.recognitionPattern')" span="12">
            <!-- ”1” 人脸 +测温，”2” 口罩+测温，”3” 测温，” 4” 人脸+口罩+测温，”5” 人脸，”6” 口罩，”7” 人脸+口罩 -->
            <span v-if="devinfo.recognitionMode=='1'">
              {{$t('form.renLian')}}+{{$t('form.ceWen')}}
            </span>
            <span v-else-if="devinfo.recognitionMode=='2'">
              口罩+测温
              {{$t('form.kouZhao')}}+{{$t('form.ceWen')}}
            </span>
            <span v-else-if="devinfo.recognitionMode=='3'">
                {{$t('form.ceWen')}}
            </span>
            <span v-else-if="devinfo.recognitionMode=='4'">
               {{$t('form.renLian')}} + {{$t('form.kouZhao')}} + {{$t('form.ceWen')}}
            </span>
                 <span v-else-if="devinfo.recognitionMode=='5'">
              {{$t('form.renLian')}}
            </span>
            <span v-else-if="devinfo.recognitionMode=='6'">
              {{$t('form.kouZhao')}}
            </span>
            <span v-else-if="devinfo.recognitionMode=='7'">
               {{$t('form.renLian')}}+{{$t('form.kouZhao')}}
            </span>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('form.infraredTemperatureMeasurement')" span="12">
            <span v-if="devinfo.infraredThermometer=='1'">
               {{$t('form.zhiChi')}}
            </span>
            <span v-else>
              {{$t('form.buZhiChi')}}
            </span>
          </a-descriptions-item>

        </a-descriptions>

      </template>
    </a-modal>
    <!-- 设置框 -->
    <a-modal :maskClosable="false" v-model="visible2" :title="$t('btn.set')" 
    :cancelText="$t('btn.cancel')" :okText="$t('btn.ok')" 
    @ok="()=>{onUpdateSysDevice()}" width="650px" 
    >
      <div style="height:500px;overflow-x: hidden;overflow-y: auto;">
        <a-form :form="devForm" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
          <a-form-item :label="$t('form.deviceName')" required>
            <a-input v-model="devForm.name"></a-input>
          </a-form-item>
          <a-form-item :label="$t('form.devicePwd')" required>
            <a-input v-model="devForm.pwd"></a-input>
          </a-form-item>
          <!-- 温度单位切换 -->
          <a-form-item :label="$t('form.temperatureUnit')">
            <a-radio-group v-model="devForm.temperatureUnit" @change="changeUnit">
              <a-radio value="0">
                ℃
              </a-radio>
              <a-radio value="1">
                ℉
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item :label="$t('form.highTemperatureAlarm')">
            <a-switch :checked="this.devForm.alarm=='1'" @change="(d)=>{d?this.devForm.alarm='1':this.devForm.alarm='0'}" />
          </a-form-item>
          <a-form-item :label="$t('form.alarmThreshold')" required v-if="this.devForm.alarm==true">
              <!-- <a-input v-model="devForm.alarmValue"/> -->
              <a-row>
                <a-col :span="6">
                  <a-input v-if="devForm.temperatureUnit==0" v-model="devForm.alarmValue" :min="0" :max="9999" style="marginLeft: 16px" suffix="℃" />
                  <a-input v-else v-model="alarmValue2" :min="0" :max="9999" style="marginLeft: 16px" suffix="℉" />
                </a-col>
              </a-row>
          </a-form-item>
          <a-form-item :label="$t('form.lowTemperatureWeightMeasurement')" >
            <a-switch :checked="this.devForm.lowTemperatureRetest=='1'" @change="(d2)=>{d2?this.devForm.lowTemperatureRetest='1':this.devForm.lowTemperatureRetest='0'}" />
          </a-form-item>
          <a-form-item :label="$t('form.lowTemperatureValue')" v-if="this.devForm.lowTemperatureRetest==true">
             <!-- <a-input v-model="devForm.lowTemperatureValue" /> -->
             <a-row>
               <a-col :span="6">
                 <a-input v-if="devForm.temperatureUnit==0" v-model="devForm.lowTemperatureValue" :min="0" :max="9999" style="marginLeft: 16px" suffix="℃" />
                 <a-input v-else v-model="lowTemperatureValue2" :min="0" :max="9999" style="marginLeft: 16px" suffix="℉" />
               </a-col>
             </a-row>
          </a-form-item>
          <a-form-item :label="$t('form.relayOperationMode')">
            <a-radio-group v-model="devForm.relayOperationMode">
              <a-radio value="1">
                 {{$t('form.validationStartedSuccessfully')}}
              </a-radio>
              <a-radio value="2">
                {{$t('form.ValidationFailedToOpen')}}
              </a-radio>
              <a-radio value="3">
                {{$t('form.normallyOpen')}}
              </a-radio>
              <a-radio value="4">
                {{$t('form.normallyClose')}}
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item :label="$t('form.dengDaiGuanBiShiJian')" v-if="this.devForm.relayOperationMode<3" required>
            <a-input v-model="devForm.waitShutDownTime"></a-input>
          </a-form-item>
          <a-form-item :label="$t('form.shiBieMoShi')">
            <a-col :span="18">
              <!-- v-model="devForm.recognitionMode" -->
              <a-checkbox-group v-model="checkedList" @change="onChangeFace">
                <a-checkbox :value="1" name="type">
                  {{$t('form.renLian')}}
                </a-checkbox>
                <a-checkbox :value="2" name="type">
                  {{$t('form.kouZhao')}}
                </a-checkbox>
                <a-checkbox :value="4" name="type">
                  {{$t('form.ceWen')}}
                </a-checkbox>
              </a-checkbox-group>
            </a-col>
            <a-col :span="12" v-if="checkedModeShow">
              <a-radio-group>
                <a-radio value="1">
                  {{$t('form.jingZhun')}}
                </a-radio>
                <a-radio value="2">
                 {{$t('form.kauiSu')}}
                </a-radio>
              </a-radio-group>
            </a-col>
          </a-form-item>
          <a-form-item  :label="$t('form.shiBieLv')">
            <a-row>
              <a-col :span="5">
                <a-input v-model="devForm.recognitionRate" :min="0" :max="1" style="marginLeft: 16px" suffix="%" />
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item :label="$t('form.kuaiSuYiDongJianCe')">
            <a-switch :checked="this.devForm.fastMovingDetection=='1'" @change="(d3)=>{d3?this.devForm.fastMovingDetection='1':this.devForm.fastMovingDetection='0'}" />
          </a-form-item>
          <a-form-item :label="$t('form.shiBieJiLu')">
            <a-switch :checked="this.devForm.isSaveRecord=='1'" @change="(d)=>{d?this.devForm.isSaveRecord='1':this.devForm.isSaveRecord='0'}" />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <!-- 表格部分 -->
    <a-card>
      <div style="margin-bottom: 16px">
        <div style="float: right;">
          <a-space size="large">
           <span >
              <a class="spanfont">{{$t('form.sqds')}}:</a>
              <a class="spanfont">{{license}}</a>
            </span>
            <span>
              <a class="spanfont">{{$t('form.ky')}}:</a>
              <a class="spanfont">{{counted}}</a>
            </span>
            <span>
              <a class="spanfont">{{$t('form.yy')}}:</a>
              <a class="spanfont">{{count}}</a>
            </span>
          </a-space>
        </div>
      </div>
      <!-- :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" -->
      <a-table 
       :columns="columns"
       :data-source="dataList" 
       :pagination="page" rowKey="deviceId" :loading='queryLoading'>
        <span slot="index" slot-scope="text,record,index">
                      {{index+1}}
                    </span>
        <span slot="isOnLine" slot-scope="text">
          <a-badge v-if="text==true" status="success" :text="$t('form.zaiXian')"></a-badge>
          <a-badge v-else status="default" :text="$t('form.buZaiXian')"></a-badge>
        </span>
        <span slot="action" slot-scope="text,recode">
          <template>
            <a @click="onCheck(recode)">{{$t('form.chaKan')}}</a>
            <a-divider type="vertical" />
            <a @click="onSetting(recode)">{{$t('form.sheZhi')}}</a>
            <a-divider type="vertical" />
            <a @click="onDelete(recode)">{{$t('btn.del')}}</a>
            <a-divider type="vertical" />
            <a @click="onQrcodeBtn(recode)">{{$t('form.fangKeTongXingMa')}}</a>
          </template>
        </span>
      </a-table>
    </a-card>
  </page-header-wrapper>
</template>
<script>
  	
// import QRCode from 'qrcodejs2'
import page from '@/utils/page'
import { queryDevice, updateDevice, createDevice, deleteDevice } from '@/api/deviceManagement'
import { deviceLicense } from "@/api/device"
import { ACCESS_TOKEN, USER_INFO, USER_NAME } from '@/store/mutation-types'
import storage from 'store'
import QRCode from '@/utils/qrcode.js'
// import   {ASlider} from 'ant-design-vue'
export default {
  
  components: {
    // ASlider,
  },
  data () {

    return {
      userinfo:{},
      alarmValue2:'',
      lowTemperatureValue2:'',
      tempDw:'',
      base64:"",
      qrcodeData:{
        title:this.$t("form.fangKeTongXing"),
      },
      lang:'',
      deviceId:'',
      loading: {},
      aVisible:true,
      host:"",
      type:'',
      codeHost:'',
      qrcode:'',
      qrcodeShow:false,
      show: {
      },
      data:{},
      checkedModeShow: false,
      isCreate: true,
      queryLoading: false,
      queryParam: '',
      devinfo: {},
      columns: [
        {
                  title: "#",
                  scopedSlots: { customRender: 'index' },
         },
        {
          title: ()=>{return this.$t('form.deviceName')},
          // title: '设备名称',
          dataIndex: 'name'
        },
        {
          title: ()=>{return this.$t('form.status')},
          dataIndex: 'isOnLine',
          key: 'isOnLine',
          scopedSlots: {
            customRender: 'isOnLine'
          },
        },
        {
          title: 'ID',
          dataIndex: 'deviceId'
        },
        {
          title: 'IP',
          dataIndex: 'ip'
        },
        {
          title: ()=>{return this.$t('form.action')},
          width: '240px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 分页配置
      page: page(this, this.querySysDevice),
      dataList: [],
      //表单数据
      sysDevice: {},
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      visible: false,
      name:'',
      time:"",
      tiem2:'',
      visible2: false,
      devForm: {},
      checkedList: [],
      licenseData:'',
      counted:'',
      count:'',
      license:'',
      code:'',
    };
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0;
    },
  },
  methods: {
    // license
    // getDeviceLicense(){
    //     // console.log('license')
    //   deviceLicense().then(res=>{
    //     // console.log('license',res.result.data)
    //       this.licenseData=res.result.data
    //       this.count=this.licenseData.count
    //       this.license=this.licenseData.license
    //       // this.license=res.result.license
    //       let a= this.license
    //       let b= this.count
    //       this.counted=a-b
    //       // console.log('license22',this.licenseData,this.count)
          
    //   })
    // },
      handleClose() {
          this.aVisible = false;
        },
    // 二维码
    onQrcodeBtn(record){
      console.log("----====-----",this.iszh)
      // if(this.iszh){
      //   this.lang=zh
      // }else{
      //   this.lang=en
      // }
      this.name=record.name
      // console.log(record,"in code")
      this.qrcodeShow=true
      this.deviceId=record.deviceId
      this.base64 = ""
      // this.codeHost=this.host+'?tp='+this.type+'&& delDay='+this.qrcodeData.time
      // this.createcode(this.codeHost)
     },
     createcode(url){
         let div = document.createElement("div")
         var qrcode = new QRCode(div, {
             text: url, // 需要转换为二维码的内容
             width: 250,
             height: 250,
             colorDark: '#000000',
             colorLight: '#ffffff',
             correctLevel: QRCode.CorrectLevel.H
         })
         let _img = div.getElementsByTagName("img")
         _img[0].onload=()=>{
             let base64 = _img[0].attributes["src"].value
             this.base64 = base64
             div = null
         }
     },
    onCreateCode(recode){
      if(!this.qrcodeData.time){
       this.$message.warning(this.$t('messages.qingShuRUShiJian'));
        return
      }
      
      // this.initcode()
      this.time=this.qrcodeData.time
      // this.time2=this.time
      if(this.qrcodeData.time){
        this.type=1
        // this.deviceId=recode.deviceId
        if(this.iszh==true){
          this.lang="zh"
        }else{
          this.lang="en"
        }
       this.codeHost=`${this.host}?tp=1&&day=${this.qrcodeData.time}&&deviceId=${this.deviceId}&&lang=${this.lang}&&title=${this.qrcodeData.title}`+"&&v="+this.code
        // this.codeHost=this.host+'?tp='+this.type+'&& day='+this.qrcodeData.time+'&&'+'deviceId='+this.deviceId+'&&'+this.lang+'&&'+this.qrcodeData.title
        this.createcode(encodeURI(this.codeHost))
        console.log("55",encodeURI(this.codeHost),this.codeHost)
      }else{
        this.type=0
        this.codeHost=this.host
        this.createcode(this.codeHost)
        // this.onQrcode()
        this.qrcodeShow=true
        console.log("区间二维码")
      }
    },
    onQrcode(){
        // base64 
          // make another code.
        
      // var qrcode = new QRCode(this.$refs.qrCodeUrl, {
      //            text: this.codeHost, // 需要转换为二维码的内容
      //            width: 250,
      //            height: 250,
      //            colorDark: '#000000',
      //            colorLight: '#ffffff',
      //            correctLevel: QRCode.CorrectLevel.H
      //        })
             // this.qrcode = qrcode
          this.qrcodeShow=false
      },
    //数据初始化
    initSysDevice () {
    
      this.sysDevice = {
        name: '',
        deviceId: '',
        ip: ''
      }
      this.devForm = {
        name: '',
        deviceId: '',
        ip: '',
        password: '',
        lowTemperatureValue: true
      }
    },
    //按钮加载
    start () {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        // this.selectedRowKeys = [];
        console.log("删除了",this.selectedRowKeys)
      }, 1000);
    },
    // 全选批量删除
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('批量删除', selectedRowKeys,selectedRows);
      this.selectedRowKeys = selectedRowKeys;
    },
    //查
    querySysDevice () {
      this.queryLoading = true
      console.log('queryDevice', 200)
      queryDevice(this.queryParam, { current: this.page.current, size: this.page.pageSize,
      }).then(res => {
        console.log('queryDevice', res)
        if (res.code == 0) {
          this.dataList = res.result.data
          this.count=res.result.page.total
          this.page.total = res.result.page.total
          this.queryLoading = false
          
          // this.userinfo=userinfo
                this.license=this.userinfo.point
                let a= this.license
                let b= this.count
                this.counted=a-b
          console.log(1414,this.userinfo)
          // if(this.devForm.temperatureUnit=='1'){
          //   this.devForm.alarmValue=Number(this.devForm.alarmValue)*1.8+32
          // }else{
          //   this.devForm.alarmValue=this.devForm.alarmValue
          // }
        }
      }).finally(() => {
      })
    },
    //改
    onSetting (recode) {
      this.visible2 = true;
      this.initSysDevice()
      this.devForm = Object.assign({}, recode)
      let num = this.devForm.recognitionMode
      // ，”1” 人脸 +测温，”2” 口罩+测温，”3” 测温，” 4” 人脸+口罩+测温，”5” 人脸，”6” 口罩，”7” 人脸+口罩
      switch (num) {
        case "1": {
          this.checkedList = [1, 4]
          this.checkedModeShow = true
          break
        }
        case "2": {
          this.checkedList = [2, 4]
          this.checkedModeShow = false
          break
        }
        case "3": {
          this.checkedList = [4]
          this.checkedModeShow = false
          break
        }
        case "4": {
          this.checkedList = [1, 2, 4]
          this.checkedModeShow = true
          break
        }
        case "5": {
          this.checkedList = [1]
          this.checkedModeShow = true
          break
        }
        case "6": {
          this.checkedList = [2]
          this.checkedModeShow = false
          break
        }
        case "7": {
          this.checkedList = [1, 2]
          this.checkedModeShow = true
          break
        }
      }
      console.log("recode", recode)
      // if(this.devForm.temperatureUnit=='1'){
      //     console.log("4454",this.devForm.alarmValue)
      //   this.alarmValue2=(Number((this.devForm.alarmValue)-32)/1.8)+""
      //   this.alarmValue2=parseFloat(this.devForm.alarmValue).toFixed(1)
      //   console.log("4455",this.devForm.alarmValue)
      // }else{
      //   this.devForm.alarmValue=parseFloat(this.devForm.alarmValue).toFixed(1)
      // }
    },
    // 单位切换
    changeUnit(){
      console.log("1122")
      // ==1 F ==0 C
     if(this.devForm.temperatureUnit=='1'){
         // console.log("4454",this.devForm.alarmValue)
         // lowTemperatureValue2
       this.alarmValue2=(Number(this.devForm.alarmValue)*1.8+32)+""
       this.alarmValue2=parseFloat(this.alarmValue2).toFixed(1)
       this.lowTemperatureValue2=(Number(this.devForm.lowTemperatureValue)*1.8+32)+""
       this.lowTemperatureValue2=parseFloat(this.lowTemperatureValue2).toFixed(1)
       console.log("4455",this.devForm.alarmValue)
     }else{
       this.devForm.alarmValue=parseFloat(this.devForm.alarmValue).toFixed(1)
       this.devForm.lowTemperatureValue=parseFloat(this.devForm.lowTemperatureValue).toFixed(1)
       console.log("4456",this.devForm.alarmValue)
     }
    },
    onUpdateSysDevice () {
      // if(this.devForm.temperatureUnit=='1'){
      //     console.log("4454",this.devForm.alarmValue)
      //   this.devForm.alarmValue=(Number(this.devForm.alarmValue)*1.8+32)+""
      //   this.devForm.alarmValue=parseFloat(this.devForm.alarmValue).toFixed(1)
      //   console.log("4455",this.devForm.alarmValue)
      // }else{
      //   this.devForm.alarmValue=parseFloat(this.devForm.alarmValue).toFixed(1)
      // }
      console.log("告警阈值",this.devForm.alarmValue,this.devForm.temperatureUnit)
      updateDevice(this.devForm.deviceId, this.devForm).then(res => {
        if (res.code == 0) {
          this.visible2 = false
          this.$message.success(this.$t('messages.sheZhiChengGong'));
          this.querySysDevice()
          console.log(1414)
        }
      }).finally(() => {

      })
    },
    // 查看弹框事件
    handleOk (data) {
      this.querySysDevice()
      console.log(data)
      this.devinfo = data
      let _d = data.lastOnlineAt
      if(_d==0){
        this.devinfo.lastOnlineAt = ""
      }else{
        let d = new Date(_d*1000)
        this.devinfo.lastOnlineAt = d.getFullYear()+ "-"+d.getMonth()+"-"+d.getDay()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
      }
      this.visible = false
    },
    onCheck (data) {
      this.devinfo = data
      this.visible = true;
    },
    //
    handleOk2 () {
      this.onUpdateSysDevice()
      this.visible2 = false
    },
    //删除
    onDelete (recode) {
      var d = Object.assign({}, recode)
      var self = this
      this.$confirm({
        title: this.$t("messages.toDelete") +'[ ' + d.name + ' ]',
        // title: '确定删除[' + d.name + ']吗？',
        onOk () {
          return deleteDevice(d.deviceId).then(res => {
            if (res.code == 0) {
              self.$message.success(self.$t('messages.delSuccess'));
              self.querySysDevice()
            }
          })
        }
      })
    },
    onCancel () {

    },
    onChangeFace (e) {
      console.log(e)


      let count = 0
      this.checkedList.forEach(v => {
        count += v
      })

      switch (count) {
        case 1: {
          this.devForm.recognitionMode = "5"
          this.checkedModeShow = true
          break
        }
        case 2: {
          this.devForm.recognitionMode = "6"
          this.checkedModeShow = false
          break
        }
        case 3: {
          this.devForm.recognitionMode = "7"
          this.checkedModeShow = true
          break
        }
        case 4: {
          this.devForm.recognitionMode = "3"
          this.checkedModeShow = false
          break
        }
        case 5: {
          this.devForm.recognitionMode = "1"
          this.checkedModeShow = true
          break
        }
        case 6: {
          this.devForm.recognitionMode = "2"
          this.checkedModeShow = false
          break
        }
        case 7: {
          this.devForm.recognitionMode = "4"
          this.checkedModeShow = true
          break
        }
      }
      // this.devForm.recognitionMode = !!e.length && e.length < plainOptions.length;
    }
  },
  computed: {
      iszh(){
        return this.$store.getters.lang=='zh'
      },
    },
  mounted () {
    // this.host = process.env.VUE_APP_API_BASE_URL
    
    this.host = window.location.protocol+"//"+window.location.host+"/view/h5.html"
  
    
          // console.log(localStorage.lang)
     this.lang=localStorage.lang.slice(1,localStorage.lang.length-1)
     console.log("6633",this.lang)
   
    let userinfo = storage.get(USER_INFO)
    if (userinfo) {
      this.userId = userinfo.id
    }
      this.userinfo=userinfo
      this.code=userinfo.code
    console.log("userinfo0", userinfo,this.lang,this.code)
    this.querySysDevice()
    
  }
};
</script>
<style scoped lang="less">
#deviceManage {
  .messageBox {
    font-size: 28px;
  }
}
.spanfont{
  margin-right: 5px;
  color:#474747,
  
}
</style>