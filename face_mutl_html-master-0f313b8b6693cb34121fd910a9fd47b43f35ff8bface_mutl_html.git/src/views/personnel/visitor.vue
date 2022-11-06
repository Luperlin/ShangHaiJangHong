<template>
  <page-header-wrapper :title="false" content="">
    <!-- 图片预览弹框 -->
    <!-- <a-modal :visible="previewVisible" :footer="null" @cancel="onCancel2">
           <img  style="width: 100%" :src="host+formList.img" />
         </a-modal> -->
    <a-modal :visible="previewVisible" :footer="null" @cancel="onCancel2" style="text-align: center;">
      <img :src="host+visitorimg" style="max-height: 500px;max-width:400px ;margin: 0 auto;" />
    </a-modal>

    <!-- 新建修改弹框 -->
    <a-modal :title="isCreate?$t('btn.add'):$t('btn.updata')" :width="650" :visible="showVisitorForm" :okText="$t('btn.ok')"
      :cancelText="$t('btn.cancel')" @ok="()=>{isCreate?onCreate():onUpdata()}" @cancel="onCancelForm">
      <a-spin :spinning="visitorFormLoading">
        <div>
          <a-form :form="formList" :labelCol="{span:4}" :wrapperCol="{span:18}">
            <a-form-item :label="$t('form.name')" required>
              <a-input v-model="formList.name" />
            </a-form-item>
            <a-form-item :label="$t('form.phone')" required>
              <a-input v-model="formList.phone" />
            </a-form-item>
            <a-form-item :label="$t('form.email')" required>
              <a-input v-model="formList.email" />
            </a-form-item>
            
            <a-form-item :label="$t('form.address')" required>
              <a-input v-model="formList.address" />
            </a-form-item>
            <a-form-item :label="$t('form.youXiaoQi')" required>
              <a-range-picker v-model="dateTime" 
              :ranges="(()=>{
                return iszh?{ 
                   '今天': [moment(), moment()],
                   '本周': [moment(), moment().endOf('week')], 
                   '本月': [moment(), moment().endOf('month')] }:
                   {
                        'today': [moment(), moment()],
                        'week': [moment(), moment().endOf('week')], 
                        'month': [moment(), moment().endOf('month')] 
                  }
                
              })()"
              
              
                :show-time="{ format: 'HH:mm:ss' }" format="YYYY-MM-DD HH:mm:ss" />
              <!-- <a-input v-model="dateTime" /> -->
            </a-form-item>
            <a-form-item :label="$t('form.gender')" required> 
              <a-radio-group v-model="formList.gender">
                <a-radio value="0">
                  {{$t('form.baoMi')}}
                </a-radio>
                <a-radio value="1">
                  {{$t('form.nan')}}
                </a-radio>
                <a-radio value="2">
                  {{$t('form.nv')}}
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item  :label="$t('form.img')" required>
              <template>
                <div>
                  <a-upload list-type="picture-card" :file-list="imglist" @preview="handlePreview" @change="handleChange"
                    :before-upload="beforeUpload">
                    <div v-if="imglist.length ==0">
                      <a-icon type="plus" />
                      <div class="ant-upload-text">
                        Upload
                      </div>
                    </div>
                  </a-upload>
                  <a-modal :visible="previewVisible1" :footer="null" @cancel="handleCancel">
                    <img alt="example" style="width: 100%" :src="previewImage1" />
                  </a-modal>
                </div>
              </template>
            </a-form-item>
            <a-form-item  :label="$t('form.shuoMing')">
              <p style="font-size: 12px;line-height: 15px;color: #999999;"> {{$t('form.text1')}}</p>
              <p style="font-size: 12px;line-height: 15px;color: #999999;"> {{$t('form.text2')}}</p>
              <p style="font-size: 12px;line-height: 15px;color: #999999;"> {{$t('form.text3')}}</p>
            </a-form-item>
          </a-form>
        </div>
      </a-spin>
    </a-modal>

    <!-- 搜索面板  -->
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item :label="$t('form.name')">
                <a-input v-model="queryParam.name" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-button type="primary" @click="onQuery"> {{$t('btn.query')}}</a-button>
              <a-button style="margin-left: 8px" @click="init"> {{$t('btn.reset')}}</a-button>
              <a-button style="margin-left: 8px" type="primary" icon="plus" @click="()=>{init(),isCreate=true,
              showVisitorForm=true,
              imglist=[]
              }">
                 {{$t('btn.add')}}
              </a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
     
     <div  style="margin: 20px">
       <a-button type="danger" :disabled="!hasSelected" :loading="loading" @click="start">
         {{$t('form.piLiangShanChu')}}
       </a-button>
       <span style="margin-left: 8px">
         <template v-if="hasSelected">
           {{  $t('form.piLiangShanChu')+ selectedRowKeys.length+$t('form.ge') }}
         </template>
       </span> 
     </div>
     
      <!-- table -->
      <a-table 
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns" 
      :data-source="dataList" 
      rowKey="id" :pagination="page">
        <span slot="index" slot-scope="text,record,index">
          {{index+1}}
        </span>
        <span slot="pic" slot-scope="text, record">
          <img @click="onPreview(record)" style="width:40px;" :src="host+record.img" />
        </span>
        <span slot="gender" slot-scope="text, record,index">
          <template v-if="text=='0'">
             {{$t('form.baoMi')}}
          </template>
          <template v-else-if="text=='1'">
            {{$t('form.nan')}}
          </template>
          <template v-else="text=='2'">
            {{$t('form.nv')}}
          </template>
        </span>
        <span slot="action" slot-scope="text,record,index">
          <template>
            <a @click="onEdit(record)">{{$t('btn.edit')}}</a>
            <a-divider type="vertical" />
            <a @click="onDelete(record)">{{$t('btn.del')}}</a>
          </template>
        </span>
        <span slot="dateTime" slot-scope="text,record">
          <!-- {{record.startDate}}~{{record.endDate)}} -->
          {{formatDate(record.startDate*1000)}}~{{formatDate(record.endDate*1000)}}
        </span>
        </span>
      </a-table>
    </a-card>
  </page-header-wrapper>
</template>
<script>
  import moment from 'moment';
  import 'moment/locale/zh-cn';
  import page from '@/utils/page'
  import {
    ACCESS_TOKEN,
    USER_INFO,
    USER_NAME
  } from '@/store/mutation-types'
  import storage from 'store'
  import {vBatch } from '@/api/device'
  import EXIF from '@/utils/jsdelivr.js'
  import {
    queryVisitor,
    createVisitor,
    updateVisitor,
    deleteVisitor
  } from '@/api/visitor'
  
  // 图片旋转 
  function rotateImg(file, type) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        // 获取图片源数据 上面已经引入EXIF全局变量
        EXIF.getData(img, function() {
          // 获取图片orientation值
          console.log(EXIF.getAllTags(this))
          let orientation = EXIF.getTag(this, "Orientation");
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");
          console.log("orientation", orientation)
          switch (orientation) {
            case 3: // 旋转180°
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.rotate((180 * Math.PI) / 180);
              ctx.drawImage(img, -img.width, -img.height, img.width, img.height);
              break;
           case 6: // 旋转90°
           
               if( img.height > img.width){
                 canvas.height = img.height
                 canvas.width = img.width;
                 
                 ctx.drawImage(img,0, 0,img.width,img.height)
               }else{
                 canvas.width = img.height;
                 canvas.height = img.width;
                 ctx.rotate((90 * Math.PI) / 180);
                 ctx.drawImage(img, 0, -img.height, img.width, img.height);
                 // ctx.drawImage(img, 0, 0, img.width, img.height);
                 console.log("orientation 90")
               }
              
               
                       
            
               break;
            case 8: // 旋转-90°
              canvas.width = img.height;
              canvas.height = img.width;
              ctx.rotate((-90 * Math.PI) / 180);
              ctx.drawImage(img, -img.width, 0, img.width, img.height);
              break;
            default: // 没有源信息的图片和正常的图片是不需要旋转的
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0, img.width, img.height);
              break;
          }
          // 处理完返回 (这里返回都是被压缩的，根据实际情况更改正常的图片处理方式)
          canvas.toBlob(file => resolve(file), type, 1)
        })
      }
    })
  }
  // base64
  var getBase64 = function(file) {

    return new Promise((resolve, reject) => {

      rotateImg(file, file.type).then(file => {

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


      }).catch(res => {
        reject(res)
      })



    });
  }

  export default {
    name: 'visitor',
    data() {
      return {
        default_start:null,
        default_end:null,
        default_value:[],
        selectedRowKeys: [],
        loading: false,
        moment: moment,
        host: "",
        dataList: [],
        formList: {},
        visitorimg: '',
        recode: {},
        show: {},
        dateTime: [moment(), moment()],
        choseTime: "",
        isCreate: true,
        visitorForm: "",
        visitorFormLoading: false,
        formLoading: false,
        previewVisible: false,
        queryLoading: false,
        showVisitorForm: false,
        queryParam: {
          name: ''
        },
        page: page(this, this.onQuery),
        columns: [{
            title: "#",
            scopedSlots: {
              customRender: 'index'
            },
          },
          {
            title: ()=>{return this.$t('form.img')},
            // title: "图片",
            width: '80px',
            dataIndex: 'img',
            // fixed: 'left',
            key: 'pic',
            scopedSlots: {
              customRender: 'pic'
            }
          },
          {
            title: ()=>{return this.$t('form.name')},
            dataIndex: 'name'
          },
          {
            title: ()=>{return this.$t('form.phone')},
            dataIndex: 'phone'
          },

          {
            title: ()=>{return this.$t('form.address')},
            dataIndex: 'address'
          },
          {
           title: ()=>{return this.$t('form.email')},
            dataIndex: 'email'
          },
          {
            title: ()=>{return this.$t('form.gender')},
            dataIndex: 'gender',
            key: 'gender',
            scopedSlots: {
              customRender: 'gender'
            }
          },
          {
            title: ()=>{return this.$t('form.youXiaoQi')},
            scopedSlots: {
              customRender: 'dateTime'
            }
          },
          {
            title: ()=>{return this.$t('form.action')},
            width: '160px',
            dataIndex: 'action',
            scopedSlots: {
              customRender: 'action'
            }
          }
        ],
        imglist: [],
        previewVisible1: false,
        previewImage1: '',
        showUploadList: true,

      };
    },
    computed: {
      iszh(){
        return this.$store.getters.lang=='zh'
      },
      hasSelected () {
        return this.selectedRowKeys.length > 0;
      },
    },
 
    methods: {
      // 全选批量删除
      onSelectChange (selectedRowKeys, selectedRows) {
        console.log('批量删除', selectedRowKeys,selectedRows);
        this.selectedRowKeys = selectedRowKeys;
      },
      //批量按钮加载
    start () {
      this.$confirm({
        // title:'确定要批量删除吗？',
      title:this.$t('messages.toBatchDel'),
        onOk:()=>{
          // console.log('OK');
          this.loading = true;
           setTimeout(() => {
             this.loading = false;
             console.log("删除了",this.selectedRowKeys)
             vBatch({userIds:this.selectedRowKeys}).then(res=>{
              if(res.code==0){
                this.onQuery()
                this.selectedRowKeys = [];
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
     
      //
      onPreview(record) {
        console.log("9002")
        this.previewVisible = true
        this.visitorimg = record.img
        // alert("预览")
        console.log("9002", this.host + record.img)
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
      onCancelForm() {
        this.showVisitorForm = false
      },
      // 初始化
      init() {
        this.formList = {
          name: "",
          img: "",
          gender: "0",
          address: "",
          phone: "",
          email: "",
          startDate: "",
          endDate: "",
        }
        this.queryParam.name=""
        let tm = [
          moment("00:00:00","HH:mm:ss"),
          moment("23:59:59","HH:mm:ss")
        ]
        this.dateTime = tm
        // this.default_value = tm
        console.log("表单有效期",this.default_value)
 
      },
      onCancel() {
        this.previewVisible = false
      },
      onCancel2() {
        this.previewVisible = false
      },
      // 查
      onQuery() {
        this.queryLoading = true
        queryVisitor(this.queryParam, {
          current: this.page.current,
          size: this.page.pageSize
        }).then(res => {
          console.log('110', res)
          if (res.code == 0) {
            this.dataList = res.result.data
            this.page.total = res.result.page.total
            this.queryLoading = false
          }
        }).finally(() => {
          this.queryLoading = false
        })
      },
      //增
      onCreate() {
        console.log("===========", this.dateTime)
        this.showVisitorForm = true
        this.loading = true
        var self = this
        console.log("3306", this.dateTime[0].valueOf())
        // 转时间戳
        this.formList.startDate = parseInt(this.dateTime[0].valueOf() / 1000)
        this.formList.endDate = parseInt(this.dateTime[1].valueOf() / 1000)
        console.log("时间", this.formList.startDate, this.formList.endDate)

        createVisitor(this.formList).then(res => {
          if (res.code == 0) {
            this.showVisitorForm = false
            this.$message.success(this.$t('messages.creatSuccess'));
            self.onQuery()
          } else {
            // this.$message.error(this.$t('messages.creatError'));
          }
        }).finally(() => {
          this.employeeLoading = false
        })
      },
      gettoken() {
        return storage.get(ACCESS_TOKEN)
      },
      // 图片上传
      onUpLoadImage(res) {
        console.log("1102", res)
        if (res.file.status == "done") {
          if (res.file.response.code == 0) {
            let url = res.file.response.result.data
            console.log(url)
            this.formList.img = url
          }

        } else if (res.file.status == "error") {
          // this.$message.error(this.$t('messages.imgError'));
          // this.$error({
          //   title: "图片上传失败"
          // })
        } else if (res.file.status == "removed") {

        }
      },
      //改
      onEdit(recode) {

        // this.formList.startDate
        // let =this.formatDate(this.dateTime[0])
        // console.log("11221",this.formatDate(recode.startDate) )

        this.formList = Object.assign({}, recode)

        this.dateTime[0] = moment(this.formatDate(recode.startDate * 1000), "YYYY-MM-DD HH:mm:ss") //recode.startDate //10
        this.dateTime[1] = moment(this.formatDate(recode.endDate * 1000), "YYYY-MM-DD HH:mm:ss") //re
        this.isCreate = false
        this.showVisitorForm = true
        this.imglist[0] = {
          uid: '-1',
          name: "xxx",
          status: 'done',
          url: this.host + recode.img,
        }

        console.log(this.dataList, "441")
      },
      onUpdata() {
        this.visitorFormLoading = true
        var self = this
        this.formList.startDate = parseInt(this.dateTime[0].valueOf() / 1000)
        this.formList.endDate = parseInt(this.dateTime[1].valueOf() / 1000)
        
        updateVisitor(this.formList.id, this.formList).then(res => {
          if (res.code == 0) {
            this.showVisitorForm = false
            
            this.$message.success(this.$t('messages.updataSuccess'));
            self.onQuery()
          }
        }).finally(() => {
          this.visitorFormLoading = false
        })
      },
      //删
      onDelete(recode) {
        var d = Object.assign({}, recode)
        var self = this
        this.$confirm({
         title: this.$t("messages.toDelete") +'[ ' + d.name + ' ]',
         cancelText: this.$t("btn.cancel"),
          onOk() {
            return deleteVisitor(d.id).then(res => {
              if (res.code == 0) {
                self.$message.success(self.$t('messages.delSuccess'));
                self.onQuery()
              }
            })
          },
          oncancel() {
            console.log("删除后")
          }
        })
      },
      // 图片上传处理
      optImg(file) {
        return new Promise((ok, bad) => {
          console.log(file)
        })
      },
      onUpLoadImage(res) {
        console.log(res)
        if (res.file.status == "done") {
          if (res.file.response.code == 0) {
            let url = res.file.response.result.data
            console.log(res.file)
            console.log(url)
            this.formList.img = url
          }

        } else if (res.file.status == "error") {
          // this.$message.error(this.$t('messages.imgError'));
          // this.$error({
          //   title: "图片上传失败"
          // })
        } else if (res.file.status == "removed") {

        }
      },
      async handlePreview(file) {
        console.log(file)
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        this.previewImage1 = file.url || file.preview;
        this.previewVisible1 = true;
      },
      handleCancel() {
        this.previewVisible1 = false;
      },
      handleChange({
        imglist
      }) {
        this.imglist.pop()

        // this.imglist = imglist;
      },
      transformFile(file) {
        console.log('tran', file)
        return new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            console.log(file)
            const canvas = document.createElement('canvas');
            const img = document.createElement('img');
            img.src = reader.result;
            img.onload = () => {
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0);
              ctx.fillStyle = 'red';
              ctx.textBaseline = 'middle';
              ctx.fillText('Ant Design', 20, 20);
              canvas.toBlob(resolve);
            }

          }
        })
      },
      beforeUpload(file) {
        console.log("before update", file)
        var self = this
        getBase64(file).then(a => {
          // console.log(123,a)
          self.imglist.push({
            uid: '-1',
            name: "",
            status: 'done',
            url: a,
          })

          // 转换函数
          console.log("file.size", file.size)
          if (file.size > 1000000) {
            console.log("进入一")
            // 创建Canvas对象(画布)
            let canvas = document.createElement('canvas')
            // 获取对应的CanvasRenderingContext2D对象(画笔)
            let context = canvas.getContext('2d')
            // 创建新的图片对象 
            let img = new Image()
            // 指定图片的DataURL(图片的base64编码数据)
            img.src = a
            // 监听浏览器加载图片完成，然后进行进行绘制
            img.onload = () => {

              let h = img.height
              let w = img.width



              canvas.height = 800
              canvas.width = img.width * 800 / img.height
              console.log(img.height, img.width, canvas.height, canvas.width)

              /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。
              如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。*/
              context.drawImage(img, 0, 0, canvas.width, canvas.height)
              // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
              self.formList.base64 = canvas.toDataURL(file.type, 0.92)
              console.log(1, self.formList.base64)
              // console.log(this.form.base64.size)
              // 最后将base64编码的图片保存到数组中，留待上传。
              // this.form.base64 = file.content
            }
          } else {
            console.log("进入二")
            console.log(2432, self.formList.base64)
            self.formList.base64 = a
          }
        }).catch(res => {
          console.log("file err", res)
        })
        return false
      },

    },
   
    mounted() {
      // console.log()
      this.host = process.env.VUE_APP_API_BASE_URL
      let userinfo = storage.get(USER_INFO)

      if (userinfo) {
        this.userId = userinfo.id
      }
      console.log("userinfo", userinfo)
      this.onQuery()
    }
  };
</script>

<style>
</style>
