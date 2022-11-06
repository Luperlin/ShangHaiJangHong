<template>
  <page-header-wrapper :title="false" content="" id="devicerecord">
    <a-modal :visible="previewVisible" :footer="null" @cancel="onCancel2" style="text-align: center;">
      <img :src="host+bigimg" style="max-height: 500px;max-width:400px ;margin: 0 auto;" />
    </a-modal>
    <a-card :bordered="false">
      <div class="box">
        <div class="leftb">
          <div class="devname" style="padding-bottom:0px;font-weight:600">
            <a-icon type="appstore" style="font-size:20px" /> 
            <span style="padding-left:5px">{{$t('form.sheBei')}}</span>
          </div>
          <a-divider style="margin:15px 0" />
          <a-space direction="vertical" size="middle">
            <div>
              <span class="devname" @click="onGroup('',-1)">
                <a-icon v-if="nameindex==-1" type="check-square" />
                <a-icon v-else type="border" />
                <span style="padding-left:5px" :class="{actName:nameindex==-1}">{{$t('form.suoYou')}}</span>
              </span>
            </div>
            <div v-for="(v,k) in deviceList" :key="k" @click="onGroup(v,k)">
              <span class="devname">
                <a-icon v-if="nameindex==k" type="check-square" />
                <a-icon v-else type="border" />
                <span style="padding-left:5px" :class="{actName:k==nameindex}">{{v.name}}</span></span>
            </div>
          </a-space>
        </div>
        <!-- <a-form>   搜索面板-->
        <div class="rightb">

          <a-tabs default-active-key="1" type="card">
            <!-- 认证人员部分 -->
            <a-tab-pane key="1" :tab="$t('form.renZhengRenYuan')">
              <a-row>
                <a-col :span="8">
                  <a-form-item :label="$t('form.gongHao')" :labelCol="{span:4}" :wrapperCol="{span:14}">
                    <a-input v-model="recordParam.jobNum" />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item :label="$t('form.name')" :labelCol="{span:4}" :wrapperCol="{span:14}">
                    <a-input v-model="recordParam.name" />
                  </a-form-item>
                </a-col>
                <template v-if="advanced">
                  <a-col :span="8">
                    <a-form-item :label="$t('form.jieGuo')" :labelCol="{span:4}" :wrapperCol="{span:14}">
                      <a-select v-model="recordParam.result" style="width: 100%" ref="select">
                        <!-- 1:人脸+测温 2:口罩+测温 3:测温 4:人脸+口罩+测温 -->
                        <a-select-option value="">
                          {{$t('form.suoYou')}}
                        </a-select-option>
                        <a-select-option value="1">
                          {{$t('form.yanZhengSuccess')}}
                        </a-select-option>
                        <a-select-option value="0">
                          {{$t('form.yanZhengError')}}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item :label="$t('form.model')" :labelCol="{span:4}" :wrapperCol="{span:14}">
                      <a-select v-model="recordParam.recognitionMode" style="width: 100%" ref="select">
                        <!-- 1:人脸+测温 2:口罩+测温 3:测温 4:人脸+口罩+测温 -->
                        <a-select-option value="">
                          {{$t('form.suoYou')}}
                        </a-select-option>
                        <a-select-option value="3">
                          {{$t('form.ceWen')}}
                        </a-select-option>
                        <a-select-option value="1">
                          {{$t('form.renLian')}}+ {{$t('form.ceWen')}}
                        </a-select-option>
                        <a-select-option value="2">
                          {{$t('form.kouZhao')}}+ {{$t('form.ceWen')}}
                        </a-select-option>
                        <a-select-option value="4">
                          {{$t('form.renLian')}}+{{$t('form.kouZhao')}}+ {{$t('form.ceWen')}}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="16">
                    <a-form-item :label="$t('form.time')" :labelCol="{span:4}" :wrapperCol="{span:14}">
                      <a-range-picker v-model="dateTime" :disabled-date="disabledDate" :show-time="{ format: 'HH:mm:ss' }"
                        format="YYYY-MM-DD HH:mm:ss" :ranges="(()=>{
                      return iszh?{ 
                         '今天': [moment(), moment()],
                         '本周': [moment(), moment().endOf('week')], 
                         '本月': [moment(), moment().endOf('month')] }:
                         {
                              'today': [moment(), moment()],
                              'week': [moment(), moment().endOf('week')], 
                              'month': [moment(), moment().endOf('month')] 
                        }
                    })()" />
                    </a-form-item>
                  </a-col>
                <a-col :span="16"></a-col>
                </template>
                <a-col :span="8">
                  <span :labelCol="{span:4}" :wrapperCol="{span:14}" style="float: right;overflow: hidden;">
                    <a-space>
                      <a-button type="primary" @click="onQueryTraffic">{{$t('form.search')}}</a-button>
                      <a-button @click="onReset">{{$t('btn.reset')}}</a-button>
                      <a-button type="primary" @click="onDownload">{{$t('btn.BatchExport')}}</a-button>
                    </a-space>
                    <a @click="toggleAdvanced" >
                      {{ advanced ? $t('form.shouQi'): $t('form.zhanKai') }}
                      <a-icon :type="advanced ? 'up' : 'down'" />
                    </a>
                  </span>
                </a-col>
              </a-row>
              <a-row>
                <div>
                  <div style="margin:10px 0px">
                    <a-button type="danger" :disabled="!hasSelected" :loading="loading" @click="start">
                      {{$t('form.piLiangShanChu')}}
                    </a-button>
                    <span style="margin-left: 8px">
                      <template v-if="hasSelected">
                        {{ $t('form.piLiangShanChu')+ selectedRowKeys.length+$t('form.ge') }}
                      </template>
                    </span>
                  </div>
                  <a-table :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" :columns="recordTableConf"
                    :data-source="recordList" rowKey="id" :pagination="recordPage">
                    <span slot="index" slot-scope="_, record,index">
                      {{index+1}}
                    </span>
                    <span slot="pic" slot-scope="text, record">
                      <img @click="onPreview(record)" style="width:40px;" :src="host+record.img" />
                    </span>
                    <span slot="result" slot-scope="text">
                      <span v-if="text=='0'">
                        {{$t('form.fail')}}
                      </span>
                      <span v-else>
                        {{$t('form.success')}}
                      </span>
                    </span>
                    <span slot="temperature" slot-scope="i, record,index">
                      <template>
                        <span v-if="unitT==true">
                          {{i|unitTem}}℉
                        </span>
                        <span v-else>
                          {{i}}℃
                        </span>
                      </template>
                    </span>
                    <span slot="recognitionMode" slot-scope="text">
                      <!-- 1:人脸+测温 2:口罩+测温 3:测温 4:人脸+口罩+测温 -->
                      <!-- ”1” 人脸 +测温，”2” 口罩+测温，”3” 测温，” 4” 人脸+口罩+测温，”5” 人脸，”6” 口罩，”7” 人脸+口罩 -->
                      <span v-if="text=='1'">
                        {{$t('form.renLian')}}+{{$t('form.ceWen')}}
                      </span>
                      <span v-else-if="text=='2'">
                        {{$t('form.kouZhao')}}+{{$t('form.ceWen')}}
                      </span>
                      <span v-else-if="text=='3'">
                        {{$t('form.ceWen')}}
                      </span>
                      <span v-else-if="text=='4'">
                        {{$t('form.renLian')}}+{{$t('form.kouZhao')}}+{{$t('form.ceWen')}}
                      </span>
                      <span v-else-if="text=='5'">
                        {{$t('form.renLian')}}
                      </span>
                      <span v-else-if="text=='6'">
                        {{$t('form.kouZhao')}}
                      </span>
                      <span v-else-if="text=='7'">
                        {{$t('form.renLian')}}
                      </span>
                    </span>
                    <span slot="dateTime" slot-scope="text,record">
                      <!-- {{record.startDate}}~{{record.endDate)}} -->
                      {{formatDate(record.clockAt*1000)}}
                    </span>
                    <span slot="action" slot-scope="text,recode">
                      <template>
                        <a @click="onDelete(recode)">{{$t('btn.del')}}</a>
                      </template>
                    </span>
                  </a-table>
                </div>

              </a-row>
            </a-tab-pane>

            <!-- 访客部分 -->
            <a-tab-pane key="2" :tab="$t('form.visitor')" >
              <a-row>
                <a-col :span="8">
                  <a-form-item :label="$t('form.name')" :labelCol="{span:4}" :wrapperCol="{span:14}">
                    <a-input v-model="visitorParam.name" />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item :label="$t('form.jieGuo')" :labelCol="{span:4}" :wrapperCol="{span:14}">
                    <a-select v-model="visitorParam.result" style="width: 100%" ref="select">
                      <!-- 1:人脸+测温 2:口罩+测温 3:测温 4:人脸+口罩+测温 -->
                      <a-select-option value="">
                        {{$t('form.all')}}
                      </a-select-option>
                      <a-select-option value="1">
                        {{$t('form.yanZhengSuccess')}}
                      </a-select-option>
                      <a-select-option value="0">
                        {{$t('form.yanZhengError')}}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <template v-if="advanced">
                  <a-col :span="8">
                    <a-form-item :label="$t('form.model')" :labelCol="{span:4}" :wrapperCol="{span:14}">
                      <a-select v-model="visitorParam.recognitionMode" style="width: 100%" ref="select">
                        <!-- 1:人脸+测温 2:口罩+测温 3:测温 4:人脸+口罩+测温 -->
                        <a-select-option value="">
                          {{$t('form.all')}}
                        </a-select-option>
                        <a-select-option value="3">
                          {{$t('form.ceWen')}}
                        </a-select-option>
                        <a-select-option value="1">
                          {{$t('form.renLian')}}+{{$t('form.ceWen')}}
                        </a-select-option>
                        <a-select-option value="2">
                          {{$t('form.kouZhao')}}+{{$t('form.ceWen')}}
                        </a-select-option>
                        <a-select-option value="4">
                          {{$t('form.renLian')}}+{{$t('form.kouZhao')}}+{{$t('form.ceWen')}}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item :label="$t('form.time')" :labelCol="{span:4}" :wrapperCol="{span:14}">

                      <a-range-picker v-model="dateTime2" :disabled-date="disabledDate" :show-time="{ format: 'HH:mm:ss' }"
                        format="YYYY-MM-DD HH:mm:ss" :ranges="(()=>{
                      return iszh?{ 
                         '今天': [moment(), moment()],
                         '本周': [moment(), moment().endOf('week')], 
                         '本月': [moment(), moment().endOf('month')] }:
                         {
                              'today': [moment(), moment()],
                              'week': [moment(), moment().endOf('week')], 
                              'month': [moment(), moment().endOf('month')] 
                        }
                      
                    })()" />
                    </a-form-item>

                  </a-col>
                  <a-col :span="8">
                  </a-col>
                </template>
                <a-col :span="8">
                  <span :labelCol="{span:4}" :wrapperCol="{span:14}" style="float: right;overflow: hidden;">
                    <a-space>
                      <a-button type="primary" @click="onQueryVisitor()">{{$t('form.search')}}</a-button>
                      <a-button @click="onReset">{{$t('btn.reset')}}</a-button>
                      <a-button type="primary" @click="onDownload2">{{$t('btn.BatchExport')}}</a-button>
                    </a-space>

                    <a @click="toggleAdvanced" >
                      {{ advanced ?$t('form.shouQi') : $t('form.zhanKai') }}
                      <a-icon :type="advanced ? 'up' : 'down'" />
                    </a>
                  </span>
                </a-col>
              </a-row>
              <a-row>
                <div>
                  <div style="margin:10px 0px">
                    <a-button type="danger" :disabled="!hasSelected2" :loading="loading" @click="start2">
                      {{$t('form.piLiangShanChu')}}
                    </a-button>
                    <span style="margin-left: 8px">
                      <template v-if="hasSelected2">
                        {{ $t('form.piLiangShanChu')+ selectedRowKeys2.length+$t('form.ge') }}
                      </template>
                    </span>
                  </div>
                  <a-table :row-selection="{ selectedRowKeys: selectedRowKeys2, onChange: onSelectChange2 }" :columns="visitorClumns"
                    :data-source="visitorData" rowKey="id" :pagination="visitorPage">
                    <span slot="index" slot-scope="_, record,index">
                      {{index+1}}
                    </span>
                    <span slot="pic" slot-scope="text, record">
                      <img @click="onPreview(record)" style="width:40px;" :src="host+record.img" />
                    </span>
                    <span slot="temperature" slot-scope="i, record,index">
                      <template>
                        <span v-if="unitT==true">
                          {{i|unitTem}}℉
                        </span>
                        <span v-else>
                          {{i}}℃
                        </span>
                      </template>
                    </span>
                    <span slot="result" slot-scope="text">
                      <span v-if="text=='0'">
                        {{$t('form.fail')}}
                      </span>
                      <span>
                        {{$t('form.success')}}
                      </span>
                    </span>
                    <span slot="recognitionMode" slot-scope="text">
                      <!-- 1:人脸+测温 2:口罩+测温 3:测温 4:人脸+口罩+测温 -->
                      <!-- ”1” 人脸 +测温，”2” 口罩+测温，”3” 测温，” 4” 人脸+口罩+测温，”5” 人脸，”6” 口罩，”7” 人脸+口罩 -->
                      <span v-if="text=='1'">
                        {{$t('form.renLian')}}+{{$t('form.ceWen')}}
                      </span>
                      <span v-else-if="text=='2'">
                        {{$t('form.kouZhao')}}+{{$t('form.ceWen')}}
                      </span>
                      <span v-else-if="text=='3'">
                        {{$t('form.ceWen')}}
                      </span>
                      <span v-else-if="text=='4'">
                        {{$t('form.renLian')}}+{{$t('form.kouZhao')}}+{{$t('form.ceWen')}}
                      </span>
                      <span v-else-if="text=='5'">
                        {{$t('form.renLian')}}
                      </span>
                      <span v-else-if="text=='6'">
                        {{$t('form.kouZhao')}}
                      </span>
                      <span v-else-if="text=='7'">
                        {{$t('form.renLian')}}
                      </span>
                    </span>
                    <span slot="dateTime2" slot-scope="text,record">
                      <!-- {{record.startDate}}~{{record.endDate)}} -->
                      {{formatDate(record.clockAt*1000)}}
                    </span>
                    <span slot="action" slot-scope="text,recode">
                      <template>
                        <a @click="onDelete2(recode)">{{$t('btn.del')}}</a>
                      </template>
                    </span>
                  </a-table>
                </div>

              </a-row>
          
            </a-tab-pane>
            
            <!-- 其他人员 -->
            <a-tab-pane key="3" :tab="$t('form.others')" >
              <a-row>
                <template >
                  <a-col :span="16">
                      <a-range-picker v-model="dateTime3" :disabled-date="disabledDate" :show-time="{ format: 'HH:mm:ss' }"
                        format="YYYY-MM-DD HH:mm:ss" :ranges="(()=>{
                      return iszh?{ 
                         '今天': [moment(), moment()],
                         '本周': [moment(), moment().endOf('week')], 
                         '本月': [moment(), moment().endOf('month')] }:
                         {
                              'today': [moment(), moment()],
                              'week': [moment(), moment().endOf('week')], 
                              'month': [moment(), moment().endOf('month')] 
                        }
                    })()" />
                    </a-form-item>
                    <a-button style="margin-left:2rem ;" type="primary" @click="onqueryUndf()">{{$t('form.search')}}</a-button>
                  </a-col>
                  <a-col :span="8">
                  </a-col>
                </template>
              </a-row>
              <a-row>
                <div>
                  <div style="margin:10px 0px">
                    <a-button type="danger" :disabled="!hasSelected3" :loading="loading" @click="start3">
                      {{$t('form.piLiangShanChu')}}
                    </a-button>
                    <span style="margin-left: 8px">
                      <template v-if="hasSelected3">
                        {{ $t('form.piLiangShanChu')+ selectedRowKeys3.length+$t('form.ge') }}
                      </template>
                    </span>
                  </div>
                  <a-table :row-selection="{ selectedRowKeys: selectedRowKeys3, onChange: onSelectChange3 }" :columns="undfClumns"
                    :data-source="undfData" rowKey="id" :pagination="undfPage">
                    <span slot="index" slot-scope="_, record,index">
                      {{index+1}}
                    </span>
                    <span slot="pic" slot-scope="text, record">
                      <img @click="onPreview(record)" style="width:40px;" :src="host+record.img" />
                    </span>
                    <span slot="temperature" slot-scope="i, record,index">
                      <template>
                        <span v-if="unitT==true">
                          {{i|unitTem}}℉
                        </span>
                        <span v-else>
                          {{i}}℃
                        </span>
                      </template>
                    </span>
                    <span slot="result" slot-scope="text">
                      <span v-if="text=='0'">
                        {{$t('form.fail')}}
                      </span>
                      <span>
                        {{$t('form.success')}}
                      </span>
                    </span>
                    <span slot="recognitionMode" slot-scope="text">
                      <!-- 1:人脸+测温 2:口罩+测温 3:测温 4:人脸+口罩+测温 -->
                      <!-- ”1” 人脸 +测温，”2” 口罩+测温，”3” 测温，” 4” 人脸+口罩+测温，”5” 人脸，”6” 口罩，”7” 人脸+口罩 -->
                      <span v-if="text=='1'">
                        {{$t('form.renLian')}}+{{$t('form.ceWen')}}
                      </span>
                      <span v-else-if="text=='2'">
                        {{$t('form.kouZhao')}}+{{$t('form.ceWen')}}
                      </span>
                      <span v-else-if="text=='3'">
                        {{$t('form.ceWen')}}
                      </span>
                      <span v-else-if="text=='4'">
                        {{$t('form.renLian')}}+{{$t('form.kouZhao')}}+{{$t('form.ceWen')}}
                      </span>
                      <span v-else-if="text=='5'">
                        {{$t('form.renLian')}}
                      </span>
                      <span v-else-if="text=='6'">
                        {{$t('form.kouZhao')}}
                      </span>
                      <span v-else-if="text=='7'">
                        {{$t('form.renLian')}}
                      </span>
                    </span>
                    <span slot="dateTime3" slot-scope="text,record">
                      <!-- {{record.startDate}}~{{record.endDate)}} -->
                      {{formatDate(record.clockAt*1000)}}
                    </span>
                    <span slot="action" slot-scope="text,recode">
                      <template>
                        <a @click="onDelUndf(recode)">{{$t('btn.del')}}</a>
                      </template>
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
  import moment from 'moment';
  import {
    getDevice,
    traff,
    vtraff,
    downBatch,
    vdownBatch
  } from "@/api/device"
  import storage from 'store'
  import {
    ACCESS_TOKEN,
    USER_INFO,
    USER_NAME
  } from '@/store/mutation-types'
  import {
    _queryTraffic,
    querytrVisitor,
    delTraffic,
    del_Visitor,
    getUndf,
    delUndf,
    delsUndf,
    cvsUndf
  } from "@/api/traffic"
  import page from '@/utils/page'
  import {
    name
  } from 'lodash.pick'
  import {
    queryAttendance
  } from '@/api/attendance'
  export default {
    name: 'devicerecord',
    data: function() {
      return {
        _temperature:'',
        unitT:'',
        selectedRowKeys: [],
        selectedRowKeys2: [],
        selectedRowKeys3: [],
        loading: false,
        status: {},
        attenData: [],
        show: {},
        host: "",
        load: {},
        moment: moment,
        dateTime: [],
        attenTime: '',
        queryParam: {
          jobNum:'',
          name:'',
          result:'',
          model:'',
          time:'',
          
        },
        dateTime2: [],
        dateTime3: [],
        deviceList: [],
        nameindex: -1,
        advanced: false,
        bigimg: "",
        previewVisible: false,
        recordList: [],
        recordPage: page(this, this.onQueryTraffic),
        visitorPage: page(this, this.onQueryVisitor),
        undfPage: page(this, this.onqueryUndf),
        recordParam: {
          "jobNum": "",
          "clockAt": "",
          "deviceId": "",
          "endDate": "",
          "startDate": "",
          "clockAt": "",
          "name": "",
          "result": "",
          "recognitionMode": "",
        },

        recordTableConf: [{
            title: "#",
            scopedSlots: {
              customRender: 'index'
            },
          },
          {
            title: () => {
              return this.$t('form.img')
            },
            width: '80px',
            dataIndex: 'img',
            key: 'pic',
            scopedSlots: {
              customRender: 'pic'
            }
          },
          {
            title: () => {
              return this.$t('form.name')
            },
            dataIndex: "name",
            align: "center",
          },
          {
            title: () => {
              return this.$t('form.gongHao')
            },
            dataIndex: "jobNum",
            align: "center",
          },
          {
            title: () => {
              return this.$t('form.time')
            },
            scopedSlots: {
              customRender: 'dateTime'
            }
          },
          {
            title: () => {
              return this.$t('form.wenDu')
            },
            dataIndex: "temperature",
            scopedSlots:{
              customRender:'temperature'
            }
          },
          {
            title: () => {
              return this.$t('form.jieGuo')
            },
            dataIndex: "result",
            scopedSlots: {
              customRender: 'result'
            },
          },
          {
            title: () => {
              return this.$t('form.model')
            },
            dataIndex: "recognitionMode",
            scopedSlots: {
              customRender: "recognitionMode"
            },
          },
          {
            title: () => {
              return this.$t('form.action')
            },
            width: '240px',
            dataIndex: 'action',
            scopedSlots: {
              customRender: 'action'
            }
          }

        ],

        visitorParam: {
          "clockAt": "",
          "deviceId": "",
          "endDate": "",
          "startDate": "",
          "clockAt": "",
          "name": "",
          "result": "",
          "recognitionMode": "",
        },
        visitorData: [],
        visitorClumns: [{
            title: "#",
            // key:"",
            // key: "id",
            scopedSlots: {
              customRender: 'index'
            },
          },
          {
            title: () => {
              return this.$t('form.img')
            },
            width: '80px',
            dataIndex: 'img',
            // fixed: 'left',
            key: 'pic',
            scopedSlots: {
              customRender: 'pic'
            }
          },

          {
            title: () => {
              return this.$t('form.name')
            },
            dataIndex: "name",
            align: "center",
          },
          {
            title: () => {
              return this.$t('form.time')
            },
            scopedSlots: {
              customRender: 'dateTime2'
            }
          },
          // {
          //   title: () => {
          //     return this.$t('form.wenDu')
          //   },
          //   dataIndex: "temperature",
          // },
          {
            title: () => {
              return this.$t('form.wenDu')
            },
            dataIndex: "temperature",
            scopedSlots:{
              customRender:'temperature'
            }
          },
          {
            title: () => {
              return this.$t('form.jieGuo')
            },
            dataIndex: "result",
            scopedSlots: {
              customRender: 'result'
            },
          },
          {
            title: () => {
              return this.$t('form.model')
            },
            dataIndex: "recognitionMode",
            scopedSlots: {
              customRender: "recognitionMode"
            },
          },
          {
            title: () => {
              return this.$t('form.action')
            },
            width: '240px',
            dataIndex: 'action',
            scopedSlots: {
              customRender: 'action'
            }
          }
        ],
      
        undfParam:{},
        undfData:[],
        undfClumns:[
          {
              title: "#",
              // key:"",
              // key: "id",
              scopedSlots: {
                customRender: 'index'
              },
            },
            {
              // title:"图片",
              title: () => {
                return this.$t('form.img')
              },
              width: '80px',
              dataIndex: 'img',
              // fixed: 'left',
              key: 'pic',
              scopedSlots: {
                customRender: 'pic'
              }
            },
           {
             title: () => {
               return this.$t('form.time')
             },
             scopedSlots: {
               customRender: 'dateTime3'
             }
           },
            // {
            //   title: () => {
            //     return this.$t('form.wenDu')
            //   },
            //   dataIndex: "temperature",
            // },
            {
              title: () => {
                return this.$t('form.wenDu')
              },
              dataIndex: "temperature",
              scopedSlots:{
                customRender:'temperature'
              }
            },
            // {
            //   title: () => {
            //     return this.$t('form.jieGuo')
            //   },
            //   dataIndex: "result",
            //   scopedSlots: {
            //     customRender: 'result'
            //   },
            // },
            {
              title: () => {
                return this.$t('form.model')
              },
              dataIndex: "recognitionMode",
              scopedSlots: {
                customRender: "recognitionMode"
              },
            },
            {
              title: () => {
                return this.$t('form.action')
              },
              width: '240px',
              dataIndex: 'action',
              scopedSlots: {
                customRender: 'action'
              }
            }
        ],
      }
    },
    computed: {
      iszh() {
        return this.$store.getters.lang == 'zh'
      },
      hasSelected() {
        return this.selectedRowKeys.length > 0;
      },
      hasSelected2() {
        return this.selectedRowKeys2.length > 0;
      },
      hasSelected3() {
        return this.selectedRowKeys3.length > 0;
      },
    },
    methods: {
      // 全选批量删除
      onSelectChange(selectedRowKeys, selectedRows) {
        console.log('批量删除', selectedRowKeys, selectedRows);
        this.selectedRowKeys = selectedRowKeys;
      },
      onSelectChange2(selectedRowKeys2, selectedRows2) {
        console.log('批量删除', selectedRowKeys2, selectedRows2);
        this.selectedRowKeys2 = selectedRowKeys2;
      },
      onSelectChange3(selectedRowKeys3, selectedRows3) {
        console.log('批量删除', selectedRowKeys3, selectedRows3);
        this.selectedRowKeys3 = selectedRowKeys3;
      },
      //批量删除
      start() {
        this.$confirm({
          title: this.$t('messages.toBatchDel'),
          onOk: () => {
            // console.log('OK');
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              console.log("删除了", this.selectedRowKeys)
              // this.selectedRowKeys = [];
              // let deviceId2=this.deviceList[this.nameindex].deviceId
              // console.log("删除了...",deviceId2,this.selectedRowKeys)
              traff({
                ids: this.selectedRowKeys
              }).then(res => {
                if (res.code == 0) {
                  this.onQueryTraffic()
                  this.selectedRowKeys = [];
                  this.$message.success(this.$t('messages.delSuccess'));
                }
              }).finally(() => {
                this.loading = false
              })
            }, 1000);
          },
          onCancel() {}
        })

      },
      start2() {
        this.$confirm({
          title: this.$t('messages.toBatchDel'),
          onOk: () => {
            // console.log('OK');
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              console.log("删除了", this.selectedRowKeys2)
              vtraff({
                ids: this.selectedRowKeys2
              }).then(res => {
                if (res.code == 0) {
                  this.onQueryVisitor()
                  this.selectedRowKeys2 = [];
                  this.$message.success(this.$t('messages.delSuccess'));
                }
              }).finally(() => {
                this.loading = false
              })
            }, 1000);
          },
          onCancel() {}
        })

      },
      start3() {
        this.$confirm({
          title: this.$t('messages.toBatchDel'),
          onOk: () => {
            // console.log('OK');
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              console.log("删除了", this.selectedRowKeys3)
              delsUndf({
                ids: this.selectedRowKeys3
              }).then(res => {
                if (res.code == 0) {
                  this.onqueryUndf()
                  this.selectedRowKeys3 = [];
                  this.$message.success(this.$t('messages.delSuccess'));
                }
              }).finally(() => {
                this.loading = false
              })
            }, 1000);
          },
          onCancel() {}
        })
      
      },
      onPreview(record) {
        console.log("9002")
        this.previewVisible = true
        this.bigimg = record.img
        // alert("预览")
        console.log("9002", this.host + record.img)
      },
      onCancel2() {
        this.previewVisible = false
      },
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
      onReset() {
        console.log("record", this.recordParam)
        this.recordParam.name = ""
        this.recordParam.jobNum = ""
        this.recordParam.clockAt = ""
        this.recordParam.recognitionMode = ""
        this.recordParam.dateTime = ""
        this.recordParam.endDate = ""
        this.recordParam.startDate = ""

        this.visitorParam.name = ""
        this.visitorParam.clockAt = ""
        this.visitorParam.recognitionMode = ""
        this.visitorParam.dateTime2 = ""
        this.visitorParam.endDate = ""
        this.visitorParam.startDate = ""
      },
      disabledDate(current) {
        return current && current > moment().endOf('day');
      },
      // 考勤
      getAttendance() {
        
        queryAttendance(this.queryParam, {
          current: 1,
          size: 99
        }).then(res => {
          console.log('114', res)
          if (res.code == 0) {
            
            this.attenData = res.result.data
          }
        }).finally(() => {
          // this.queryLoading = false
        })
      },
      getDevice() {
        getDevice({}, {
          current: "1",
          size: 100
        }).then(res => {
          if (res.code == 0) {
            this.deviceList = res.result.data
            
          }
        }).finally()
      },
      onGroup(data, index) {
        if (index == -1) {
          this.recordParam.deviceId = ""
        } else {
          this.recordParam.deviceId = data.deviceId
          this.visitorParam.deviceId = data.deviceId
          console.log("设备id", this.visitorParam.deviceId)
        }
        let ss=this.deviceList[0]
        console.log("123--------------",ss)
        this.nameindex = index
        this.onQueryTraffic()
        this.onQueryVisitor()
      },
      // 认证人员
      onQueryTraffic() {
        // 转时间戳
        if (this.dateTime == "") {
          this.recordParam.endDate = ""
          this.recordParam.startDate = ""
        } else {
          this.recordParam.endDate = parseInt(this.dateTime[1].valueOf() / 1000)
          this.recordParam.startDate = parseInt(this.dateTime[0].valueOf() / 1000)
        }
        console.log("9001", this.recordParam)
        _queryTraffic(this.recordParam, {
          current: this.recordPage.current,
          size: this.recordPage.pageSize
        }).then(res => {
          if (res.code == 0) {
            console.log("9003", res)
            this.recordList = res.result.data
            console.log(res, res.result.page.total)
            this.recordPage.total = res.result.page.total
            let _index = 0
            if(this.nameindex==-1){
              _index = 0
            }else{
              _index = this.nameindex
            }
            let device = this.deviceList[_index]
            console.log("0021",device,device.temperatureUnit)
            if(device.temperatureUnit==0){
              this.unitT = false
              console.log("654321",this.unitT)
            }else{
              this.unitT = true
              console.log("6543210",this.unitT)
            }
         
          }
        })
      },
      toggleAdvanced() {
        this.advanced = !this.advanced
      },
      // 访客
      onQueryVisitor() {
        if (this.dateTime2 == "") {
          this.recordParam.endDate = ""
          this.recordParam.startDate = ""
        } else {
          this.recordParam.endDate = parseInt(this.dateTime2[1].valueOf() / 1000)
          this.recordParam.startDate = parseInt(this.dateTime2[0].valueOf() / 1000)
        }
        console.log("9002", this.visitorParam)
        querytrVisitor(this.visitorParam, {
          current: this.visitorPage.current,
          size: this.visitorPage.pageSize
        }).then(res => {
          console.log("9004", res, this.visitorParam)
          if (res.code == 0) {
            this.visitorData = res.result.data
            console.log(res, res.result.page.total)
            this.visitorPage.total = res.result.page.total
            // this.clockAt=formatDate(dateTime*1000)
            let _index = 0
            if(this.nameindex==-1){
              _index = 0
            }else{
              _index = this.nameindex
            }
            let device = this.deviceList[_index]
            if(device.temperatureUnit=="0"){
              this.unitT = false
            }else{
              this.unitT = true
            }
          }
        })
      },
      onDelete(recode) {
        console.log("删除了", recode.name)
        console.log(recode)

        var d = Object.assign({}, recode)
        var self = this
        this.$confirm({
          title: this.$t("messages.toDelete") + '[ ' + d.name + ' ]',

          onOk() {
            return delTraffic(d.id).then(
              res => {
                if (res.code == 0) {
                  // self.$success({ title: "删除成功" })
                  self.$message.success(self.$t('messages.delSuccess'));
                  // self.queryUser()
                  self.onQueryTraffic()
                }
              }
            )
          },
          onCancel() {
            console.log('Cancel')
          },
        })
      },
      onDelete2(recode) {
        console.log("删除了", recode.name)
        var d = Object.assign({}, recode)
        var self = this
        this.$confirm({
          title: this.$t("messages.toDelete") + '[ ' + d.name + ' ]',

          onOk() {
            return del_Visitor(d.id).then(res => {
              if (res.code == 0) {
                // self.$success({ title: "删除成功" })
                self.$message.success(self.$t('messages.delSuccess'));
                // self.queryUser()
                self.onQueryVisitor()
              }
            })
          },
          onCancel2() {
            console.log('Cancel')
          },
        })
      },
     
     //查询未注册人员
     onqueryUndf(){
       if (this.dateTime3 == "") {
         this.undfParam.endDate = ""
         this.undfParam.startDate = ""
       } else {
         this.undfParam.endDate = parseInt(this.dateTime3[1].valueOf() / 1000)
         this.undfParam.startDate = parseInt(this.dateTime3[0].valueOf() / 1000)
       }
       console.log("33552",this.recordParam.endDate)
        getUndf(this.undfParam, {
          current: this.undfPage.current,
          size: this.undfPage.pageSize
        }).then(res => {
          console.log("9004", res, this.visitorParam)
          if (res.code == 0) {
            this.undfData = res.result.data
            console.log("115",this.undfData)
            this.undfPage.total = res.result.page.total
            let _index = 0
            if(this.nameindex==-1){
              _index = 0
            }else{
              _index = this.nameindex
            }
            let device = this.deviceList[_index]
            console.log("0021",device)
            if(device.temperatureUnit=="0"){
              this.unitT = false
            }else{
              this.unitT = true
            }
          }
        }) 
     },
     // 未注册单个删除
     onDelUndf(recode) {
       var d = Object.assign({}, recode)
       var self = this
       this.$confirm({
         title: this.$t("messages.toDelete") + '[ ' + d.name + ' ]',
         onOk() {
           return delUndf(d.id).then(
             res => {
               if (res.code == 0) {
                 // self.$success({ title: "删除成功" })
                 self.$message.success(self.$t('messages.delSuccess'));
                 // self.queryUser()
                 self.onqueryUndf()
               }
             }
           )
         },
         onCancel() {
           console.log('Cancel')
         },
       })
     },
     //批量删除未注册人员
      //批量导出---下载
      onDownload() {
        // var d = Object.assign({}, recode)
        var self = this
        this.$confirm({
          title:this.$t("messages.toBatchExport") ,
          onOk() {
            let name = self.recordParam.name
            let jobNum = self.recordParam.jobNum
            let etime = self.recordParam.endDate
            let stime = self.recordParam.startDate
            console.log("导出参数", name, jobNum, etime, stime)
            downBatch({
              name: name,
              jobNum: jobNum,
              endDate: etime,
              startDate: stime
            }).then(res => {
              console.log("待处理数据", res.result.data)
              // var i=1
              self.downData = res.result.data
              self.downData.head = ['#', self.$t('form.name'), self.$t('form.gongHao'), self.$t('form.time'),
                self.$t('form.model'), self.$t('form.jieGuo'), self.$t('form.wenDu')
              ]
              const data = [self.downData.head.join(',')].concat(self.downData.map((item, k) => {
                // let item.clockAt=item.clockAt
                item.clockAt = self.formatDate(item.clockAt * 1000)
                if (item.result == 1) {
                  item.result = self.$t('form.success')
                } else if (item.result == 0) {
                  item.result = self.$t('form.fail')
                }

                if (item.recognitionMode == 1) {
                  item.recognitionMode = self.$t('form.renLian') + self.$t('form.ceWen')
                } else if (item.recognitionMode == 2) {
                  item.recognitionMode = self.$t('form.kouZhao') + self.$t('form.ceWen')
                } else if (item.recognitionMode == 3) {
                  item.recognitionMode = self.$t('form.ceWen')
                } else if (item.recognitionMode == 4) {
                  item.recognitionMode = self.$t('form.renLian') + self.$t('form.kouZhao') + self.$t(
                    'form.ceWen')
                } else if (item.recognitionMode == 5) {
                  item.recognitionMode = self.$t('form.renLian')
                } else if (item.recognitionMode == 6) {
                  item.recognitionMode = self.$t('form.kouZhao')
                } else if (item.recognitionMode == 7) {
                  item.recognitionMode = self.$t('form.renLian') + self.$t('form.kouZhao')
                }
                // 1:人脸+测温 2:口罩+测温 3:测温 4:人脸+口罩+测温 
                // ”1” 人脸 +测温，”2” 口罩+测温，”3” 测温，” 4” 人脸+口罩+测温，”5” 人脸，”6” 口罩，”7” 人脸+口罩 
                if (self.unitT){
                  item.temperature = (item.temperature*1.8+32).toFixed(1)+'℉'
                }else{
                  item.temperature=item.temperature+'℃'
                }
                return [
                  `"${k+1}"`,
                  `"${item.name}"`,
                  `"${item.jobNum}"`,
                  `"${item.clockAt}"`,
                  `"${item.recognitionMode}"`,
                  `"${item.result}"`,
                  `"${item.temperature}"`,

                ].join(',')
              }))
              console.log("3306", data)
              const blob = new Blob(['\ufeff' + data.join('\n')], {
                type: 'text/csv,charset=UTF-8'
              });
              const url = window.URL.createObjectURL(blob)
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'record.csv');
              document.body.appendChild(link);
              link.click();
            })
          }
        })
      },
      onDownload2() {
        // var d = Object.assign({}, recode)
        var self = this
        this.$confirm({
          title:this.$t("messages.toBatchExport") ,
          onOk() {
            let name = self.recordParam.name
            let jobNum = self.recordParam.jobNum
            let etime = self.recordParam.endDate
            let stime = self.recordParam.startDate
            console.log("导出参数", name, jobNum, etime, stime)
            vdownBatch({
              name: name,
              jobNum: jobNum,
              endDate: etime,
              startDate: stime
            }).then(res => {
              console.log("待处理数据", res.result.data)
              // var i=1
              self.downData = res.result.data
              self.downData.head = ['#', self.$t('form.name'), self.$t('form.time'), self.$t('form.model'),
                self.$t('form.jieGuo'), self.$t('form.wenDu')
              ]
              const data = [self.downData.head.join(',')].concat(self.downData.map((item, k) => {
                // let item.clockAt=item.clockAt
                item.clockAt = self.formatDate(item.clockAt * 1000)
                if (item.result == 1) {
                  item.result = self.$t('form.success')
                } else if (item.result == 0) {
                  item.result = self.$t('form.fail')
                }

                if (item.recognitionMode == 1) {
                  item.recognitionMode = self.$t('form.renLian') + self.$t('form.ceWen')
                } else if (item.recognitionMode == 2) {
                  item.recognitionMode = self.$t('form.kouZhao') + self.$t('form.ceWen')
                } else if (item.recognitionMode == 3) {
                  item.recognitionMode = self.$t('form.ceWen')
                } else if (item.recognitionMode == 4) {
                  item.recognitionMode = self.$t('form.renLian') + self.$t('form.kouZhao') + self.$t(
                    'form.ceWen')
                } else if (item.recognitionMode == 5) {
                  item.recognitionMode = self.$t('form.renLian')
                } else if (item.recognitionMode == 6) {
                  item.recognitionMode = self.$t('form.kouZhao')
                } else if (item.recognitionMode == 7) {
                  item.recognitionMode = self.$t('form.renLian') + self.$t('form.kouZhao')
                }
                // 1:人脸+测温 2:口罩+测温 3:测温 4:人脸+口罩+测温 
                // ”1” 人脸 +测温，”2” 口罩+测温，”3” 测温，” 4” 人脸+口罩+测温，”5” 人脸，”6” 口罩，”7” 人脸+口罩 
                return [
                  `"${k+1}"`,
                  `"${item.name}"`,
                  // `"${item.jobNum}"`,
                  `"${item.clockAt}"`,
                  `"${item.recognitionMode}"`,
                  `"${item.result}"`,
                  `"${item.temperature}"`,

                ].join(',')
              }))
              console.log("3306", data)
              const blob = new Blob(['\ufeff' + data.join('\n')], {
                type: 'text/csv,charset=UTF-8'
              });
              const url = window.URL.createObjectURL(blob)
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'record.csv');
              document.body.appendChild(link);
              link.click();
            })
          }
        })
      },
    },
      
     filters:{
       unitTem:function(d){
         
         return (d*1.8+32).toFixed(1)
       }
     },
    mounted() {
      this.host = process.env.VUE_APP_API_BASE_URL
      let userinfo = storage.get(USER_INFO)
      console.log("info",userinfo)
      this.getDevice()
      this.getAttendance()
      this.onQueryTraffic()
      this.onQueryVisitor()
      this.onqueryUndf()
    }
  }
</script>

<style lang="less" scoped>
  #devicerecord {
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
      padding:0 10px;
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
    }
  }
</style>
