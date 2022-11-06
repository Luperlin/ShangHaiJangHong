 <template>
  <div id="employ">
    <page-header-wrapper :title="false" content="">
      <!-- 批量添加 -->
      <a-modal 
      :visible="showBatchAdd"   :title="$t('btn.batchAdd')"
       @cancel="onCancel3"  :okText="$t('btn.ok')" :cancelText="$t('btn.cancel')" 
        @ok="()=>{onBatchAdd()}"> 
        <template>
          <p> {{$t('form.shuoMing')}}:</p>
          <p>1、{{$t('form.bataddText1')}}<a  :href="host+dow" download="users.zip">{{$t('form.bataddText2')}}</a>  ，{{$t('form.bataddText3')}}</p>
          <p>2、{{$t('form.bataddText4')}}</p>
          <p>3、{{$t('form.bataddText5')}}</p>
          <p>4、{{$t('form.bataddText6')}}</p>
          <!-- <p>4、压缩文件下为csv文件与图片并将压缩文件命名为users，csv文件命名为user</p> -->
        </template>
       <template>
         <a-upload-dragger
           name="file"
           :multiple="true"
           :before-upload="beforeUpload2"
         >
           <p class="ant-upload-drag-icon">
             <a-icon type="inbox" />
           </p>
           <p class="ant-upload-text">
             {{$t('form.clickUp')}}
           </p>
           <p class="ant-upload-hint">
             {{$t('form.upLoad')}} 
           </p>
         </a-upload-dragger>
       </template>
       
      </a-modal>
      <!-- 图片预览弹框 -->
      <a-modal :visible="previewVisible" :footer="null" @cancel="onCancel2" 
      style="text-align: center;">
        <img :src="host+userimg" 
        style="max-height: 500px;max-width:400px ;margin: 0 auto;" />
      </a-modal>
      <!-- 新建修改弹框 -->

      <a-modal
      :title="isCreate?$t('btn.add'):$t('btn.updata')"
      :width="550" 
      :maskClosable="false"
      :visible="showSysEmployee" :okText="$t('btn.ok')" :cancelText="$t('btn.cancel')" 
      @ok="()=>{isCreate?onCreatEmployee():onUpdataEmployee()}"
        @cancel="onCancel()">
        <a-spin :spinning="employeeLoading">
          <div>
            <a-form :form="sysEmployee" :labelCol="{span:6}" :wrapperCol="{span:16}">
              <a-form-item v-if="curindex==-1" >
          <!--      <a-input disabled value="" v-if="curindex==-1" />
                <a-input disabled :value="groupList[curindex].name" v-else /> -->
              </a-form-item>
              <a-form-item v-else :label="$t('form.buMen')" >
                    <span >{{groupList[curindex].name}}</span>
              <!--      <a-input disabled value="" v-if="curindex==-1" />
                    <a-input disabled :value="groupList[curindex].name" v-else /> -->
                  </a-form-item>
              
              <a-form-item :label="$t('form.gongHao')" required>
                <a-input v-model="sysEmployee.jobNum" :disabled="isCreate?false:true" />
              </a-form-item>
              <a-form-item :label="$t('form.name')" required>
                <a-input v-model="sysEmployee.name" />
              </a-form-item>

              <a-form-item  :label="$t('form.phone')" required>
                <a-input v-model="sysEmployee.phone" />
              </a-form-item>
              <a-form-item :label="$t('form.ICCard')" >
                <a-input v-model="sysEmployee.email" />
              </a-form-item>
              <a-form-item :label="$t('form.gender')" required>
                <a-radio-group v-model="sysEmployee.gender">
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
              <a-form-item :label="$t('form.img')" required>
                <template>
                  <div class="clearfix">
                    <a-upload 
                    list-type="picture-card" 
                    :file-list="imglist" 
                    @preview="handlePreview" 
                    @change="handleChange"
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
              <a-form-item :label="$t('form.shuoMing')">
                <p style="font-size: 12px;line-height: 15px;color: #999999;">{{$t('form.text1')}}</p>
                <p style="font-size: 12px;line-height: 15px;color: #999999;">{{$t('form.text2')}}</p>
                <p style="font-size: 12px;line-height: 15px;color: #999999;">{{$t('form.text3')}} </p>
              </a-form-item>
            </a-form>
          </div>
        </a-spin>
      </a-modal>
      <!-- 分组弹框 -->
      <a-modal 
      :title="isCreate?$t('btn.add'):$t('btn.del')"
      width="30%" :visible="showSysGroup1" 
      :okText="$t('btn.ok')" :cancelText="$t('btn.cancel')"  
      @ok="()=>{isCreate?onCreateGroup():on()}"
        @cancel="onCancel()">
        <a-spin :spinning="employeeLoading">
          <div>
            <a-form :form="sysGroup" :labelCol="{span:8}" :wrapperCol="{span:10}">
              <a-form-item :label="$t('form.groupName')" required>
                <a-input v-model="sysGroup.name" />
              </a-form-item>
            </a-form>
          </div>
        </a-spin>
      </a-modal>
      <!-- 移动分组弹框-->
      <a-modal :title="$t('form.moveEmployee')" :okText="$t('btn.save')" 
      :cancelText="$t('btn.cancel')" 
      :visible="showSysGroup" @cancel="onCancel()" @ok="()=>{onMoveOk()}">
        <a-space direction="vertical" size="middle">
          <div>
            <span class="devname" @click="onGroup2(-1)">
              <a-icon v-if="curindex2==-1" type="check-square" />
              <a-icon v-else type="border" />
              <span style="padding-left:5px" :class="{actName:curindex2==-1}">{{$t('form.company')}} 
              </span>
            </span>
          </div>
          <div v-for="(v,k) in groupList" :key="k">
            <span class="devname" style="padding-left:20px" @click="onGroup2(k)">
              <a-icon v-if="k==curindex2" type="check-square" />
              <a-icon v-else type="border" />
              <span :class="{actName:k==curindex2}">{{v.name}}</span>
            </span>
          </div>
        </a-space>
      </a-modal>
      <!--编辑分组弹框 -->
      <a-modal :title="$t('form.restCompany')" :okText="$t('btn.save')" :cancelText="$t('btn.cancel')" :visible="showUpdataGroup" @cancel="onCancel()" @ok="()=>onUpdataGroup()">
        <a-form :form="groupEditData" :labelCol="{span:8}" :wrapperCol="{span:10}">
          <a-form-item :label="$t('form.groupName')" required>
            <a-input v-model="groupEditData.name" />
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 按钮部分 -->
      <a-card>
        <a-row>
          <div class="box">
          <!-- 左边树结构 -->
            <div class="leftb">
              <a-space direction="vertical" size="middle">
                <div>
                  <span class="devname" @click="onGroup(-1)">
                    <a-icon v-if="curindex==-1" type="check-square" />
                    <a-icon v-else type="border" />
                    <span style="padding-left:5px" :class="{actName:curindex==-1}">{{$t('form.company')}} </span>
                    <a-icon type="plus-circle" style="margin-left:25px" @click="()=>{isCreate=true,showSysGroup1=true}" />
                  </span>
                </div>

                <div v-for="(v,k) in groupList" :key="k">
                  <span class="devname" style="padding-left:20px" @click="onGroup(k)">
                    <a-icon v-if="k==curindex" type="check-square" />
                    <a-icon v-else type="border" />
                    <span :class="{actName:k==curindex}">{{v.name}}</span>
                    <a-icon type="form" style="margin-left:25px" @click="onUpdataGroupbtn(v)" />
                    <a-icon type="minus-circle" style="margin-left:10px" @click="onDeleteGruop(v)" />
                  </span>
                </div>
              </a-space>
            </div>
            <div class="rightb">
              <a-form>
                <a-row style="margin-left: 20px;">
                  <a-col :span="10">
                    <a-form-item :label="$t('form.name')" :labelCol="{span:6}" :wrapperCol="{span:16}">
                      <a-input v-model="queryParam.name" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-space>
                      <a-button type="primary" @click="onQueryEmployee">{{$t('btn.query')}}</a-button>
                      <a-button>{{$t('btn.reset')}}</a-button>
                      <a-button type="primary" @click="()=>{isCreate=true, 
                      initEmployee(),showSysEmployee=true,imglist=[] }">{{$t('btn.add')}}</a-button>
                      <a-button @click="onBatchAddBtn">{{$t('btn.batchAdd')}}</a-button>
                    </a-space>
                  </a-col>
                </a-row>
              </a-form>
              
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
              <a-table 
              :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
              size="default" :loading='queryLoading' 
              style="margin: 20px;" 
              :columns="columns" 
              :data-source="dataList"
              :pagination="page" rowKey='id'>
               
                <span slot="index" slot-scope="_, record,index">
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
                <span slot="group" slot-scope="_,scope">
                  {{scope.group.name}}
                </span>
                <span slot="action" slot-scope="text, record,index">
                  <template>
                    <a @click="onUpdataBtn(record)"> {{$t('btn.updata')}}</a>
                    <a-divider type="vertical" />
                    <a @click="onMove(record)">{{$t('form.move')}}</a>
                    <a-divider type="vertical" />
                    <a @click="onChangeStatus(record,index)">
                      <span v-if="record.status=='1'">
                        {{$t('form.disable')}}
                      </span>
                      <span v-else="record.status=='0'">
                        {{$t('form.enable')}}
                      </span>
                    </a>
                    <a-divider type="vertical" />
                    <a @click="onDeleteEmployee(record)">{{$t('btn.del')}}</a>
                  </template>
                </span>
              </a-table>
            </div>
          </div>
        </a-row>
      </a-card>
    </page-header-wrapper>
  </div>
</template>

<script>
  import page from '@/utils/page'
  import axios from 'axios'
  import EXIF from '@/utils/jsdelivr.js'
  import {
    queryEmployees,
    updateEmployees,
    deleteEmployees,
    createEmployees,
    employeeStatus,
    updataGroup,
    queryGroup,
    createGroup,
    deleteGruop,
    employeeBind,
    employeeUbind,
    addEmployees,
    moveGroup,
    upLoadImage,
  } from '@/api/employees'
  import {workuserBatch } from '@/api/device'
  import {
    ACCESS_TOKEN,
    USER_INFO,
    USER_NAME
  } from '@/store/mutation-types'
  import storage from 'store'
  // 图片旋转
  function rotateImg(file,type) {
          return new Promise((resolve, reject) => {
              let img = new Image();
              img.src = window.URL.createObjectURL(file);
              img.onload = () => {
                  // 获取图片源数据 上面已经引入EXIF全局变量
                  EXIF.getData(img, function () {
                      // 获取图片orientation值
                      console.log(EXIF.getAllTags(this))
                      let orientation = EXIF.getTag(this, "Orientation");
                      let canvas = document.createElement("canvas");
                      let ctx = canvas.getContext("2d");
                      console.log("orientation",orientation)
                      switch (orientation) {
                          case 3: // 旋转180°
                              canvas.width = img.width;
                              canvas.height = img.height;
                              ctx.rotate((180 * Math.PI) / 180);
                              ctx.drawImage(img, -img.width, -img.height, img.width, img.height);
                              // ctx.drawImage(img, 0, 0, img.width, img.height);
                              console.log("orientation -90")
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
                              // ctx.drawImage(img, 0, 0, img.width, img.height);
                              console.log("orientation -90")
                              break;
                          default: // 没有源信息的图片和正常的图片是不需要旋转的
                              canvas.width = img.width;
                              canvas.height = img.height;
                              ctx.drawImage(img, 0, 0, img.width, img.height);
                              console.log("orientation none")
                              break;
                      }
                      // http://tools.jb51.net/aideddesign/img_exif
                      // 处理完返回 (这里返回都是被压缩的，根据实际情况更改正常的图片处理方式)
                      canvas.toBlob(file =>{
                        // console.log(EXIF.getAllTags(file))
                        // let orientation = EXIF.getTag(file, "Orientation");
                        // console.log("file orientation:",orientation)
                         resolve(file)
                      }
                     , type, 1)
                  })
              }
          })
      }
// base64
  var getBase64 = function(file) {

    return new Promise((resolve, reject) => {
      
      rotateImg(file,file.type).then(file=>{
        
        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log("1111",file,reader)
        
        reader.onload = () => {
          console.log("ok11",reader.result)
        resolve(reader.result)}
        reader.onerror = error => {
          console.log(error)
          
          reject(error)};
          
        
      }).catch(res=>{
        reject(res)
      })
      
      
   
    });
  }
  const detectDeviceType = () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      ? 'Mobile'
      : 'Desktop';
   
  // 事例
  detectDeviceType();
  export default {
    name: 'employees',
    data() {
      let self = this
      return {
        dow:'/static/users.zip',
        selectedRowKeys: [],
        host: "",
        loading: '',
        userimg: "",
        queryLoading: false,
        loading: false,
        recode: {},
        show: {},
        employeeLoading: false,
        isCreate: true,
        previewVisible: false,
        showSysEmployee: false,
        showBatchAdd:false,
        showSysGroup: false,
        sysEmployee: {},
        queryParam: {
          name:''
        },
        statusData: {},
        imglist: [],
        columns: [{
            title: "#",
            scopedSlots: {
              customRender: 'index'
            },
          },
          {
            title: () => {
              return self.$t('form.img')
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
            title: ()=>{return this.$t('form.name')},
            dataIndex: 'name'
          },
          // {
          //   title: 'Email',
          //   dataIndex: 'email'
          // },
          {
            title: ()=>{return this.$t('form.phone')},
            dataIndex: 'phone'
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
            title: ()=>{return this.$t('form.gongHao')},
            dataIndex: 'jobNum'
          },
          {
            title: ()=>{return this.$t('form.buMen')},
            dataIndex: 'groupId',
            scopedSlots: {
              customRender: 'group'
            }
          },

          {
            title: ()=>{return this.$t('form.action')},
            dataIndex: 'action',
            width: '210px',
            align: 'center',
            scopedSlots: {
              customRender: 'action'
            }
          }
        ],
        dataList: [],
        page: page(this, this.onQueryEmployee),
        groupData: {},
        groupList: {},
        moveData: {},
        groupEditData: {},
        nameindex: -1,
        curindex: -1,
        curindex2: -1,
        sysGroup: {},
        showSysGroup1: false,
        showUpdataGroup: false,
        // imgList:[],
        previewVisible1: false,
        previewImage1: '',
        showUploadList: true,
        // 批量上传
        formData:{},
        _employeeStatus:'',
        groupId:'',
        
      }
    },
   computed: {
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
        title:this.$t('messages.toBatchDel'),
        onOk:()=>{
          // console.log('OK');
          this.loading = true;
           setTimeout(() => {
             this.loading = false;
             console.log("删除了",this.selectedRowKeys)
             // this.selectedRowKeys = [];
             // let deviceId2=this.deviceList[this.nameindex].deviceId
             // console.log("删除了...",deviceId2,this.selectedRowKeys)
             workuserBatch({userIds:this.selectedRowKeys}).then(res=>{
              if(res.code==0){
                this.onQueryEmployee()
                this.selectedRowKeys = [];
                this.$message.success(this.$t('messages.delSuccess'));
                console.log("批量绑定成功")
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
        this.previewVisible = true
        this.userimg = record.img
        // alert("预览")
        console.log("9002", this.host + record.img)
      },
      // 初始化
      initEmployee() {
        this.sysEmployee = {
          img: '',
          name: '',
          jobNum: '',
          gender: "0",
          status: '',
          phone: "",
          email:'',
          groupId: "0",

        }
        this.groupData = {
          title: '',
          key: '0',
          children: [],
        }
        this.curindex2=""
      },
      onCancel2() {
        this.previewVisible = false
      },
      onCancel() {
        this.showSysEmployee = false
        this.showSysGroup = false
        this.showUpdataGroup = false
        this.showSysGroup1 = false
        this.previewVisible = false
      },
      onCancel3(){
       this.showBatchAdd=false
      },
      gettoken() {
        return storage.get(ACCESS_TOKEN)
      },
      optImg(file) {
        return new Promise((ok, bad) => {
          console.log(file)
        })
      },
      // 图片上传
      onUpLoadImage(res) {
        console.log("555",res)
        if (res.file.status == "done") {
          if (res.file.response.code == 0) {
            let url = res.file.response.result.data
            console.log(res.file)
            console.log(url)
            this.sysEmployee.img = url
          }

        } else if (res.file.status == "error") {
          // this.$message.error(this.$t('messages.imgError'));
          // this.$error({
          //   title: "图片上传失败"
          // })
        } else if (res.file.status == "removed") {

        }
      },
      onQueryEmployee() {
        this.queryLoading = true
        queryEmployees(this.queryParam, {
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
      //添加
      onCreatEmployee() {
        this.loading = true
        // var self = this
        createEmployees(this.sysEmployee).then(res => {
          if (res.code == 0) {
            this.showSysEmployee = false
            this.onQueryEmployee()
            this.$message.success(this.$t('messages.creatSuccess'));
            // this.$success({
              // title: "创建成功",
              // onOk: () => {

              // }
            // })
          }else{
            // this.$message.error(this.$t('messages.creatError'));
          }
        }).finally(() => {
          this.employeeLoading = false
        })
        // console.log("添加")
      },
      //修改
      onUpdataBtn(recode) {
        console.log(recode)
        this.isCreate = false
        this.sysEmployee = Object.assign({}, recode)
        this.imglist[0] = {
          uid: '-1',
          name: "xxx",
          status: 'done',
          url: this.host + recode.img,
        }
        this.showSysEmployee = true
        console.log(this.sysEmployee, "441")
      },
      onUpdataEmployee() {
        this.employeeLoading = true
        // this.sysEmployee.groupId = parseInt(this.sysEmployee.groupId) //字符类型转换
        var self = this
        updateEmployees(this.sysEmployee.id, this.sysEmployee).then(res => {
          // console.log("用户修改",record)
          if (res.code == 0) {

            this.showSysEmployee = false
            this.onQueryEmployee()
            this.$message.success(this.$t('messages.updataSuccess'));
            // this.$success({
            //   title: '更新成功',
            //   onOk: () => {

            //   }
            // })
          }
        }).finally(() => {
          this.employeeLoading = false
        })
      },
      //删除
      onDeleteEmployee(recode) {
        var d = Object.assign({}, recode)
        var self = this
        this.$confirm({
          title: self.$t("messages.toDelete") +'[ ' + d.name + ' ]',
          cancelText: self.$t("btn.cancel"),
          onOk() {
            return deleteEmployees(d.id).then(res => {
              if (res.code == 0) {
                self.$message.success(self.$t('messages.delSuccess'));
                self.onQueryEmployee()
              }
            })
          },
          oncancel() {
          }
        })

      },
     
     
      // 状态改变
      onChangeStatus(recode, index) {
        let self=this
        this._employeeStatus = recode.status
        console.log(this.employeeStatus)
        if(this._employeeStatus=="1"){
          this.$confirm({
            title:self.$t('form.text4'),
            onOk(){
              self._employeeStatus="0"
              console.log(self.employeeStatus,"1122")
              employeeStatus(recode.id, self._employeeStatus).then(res => {
                if (res.code == 0) {
                   // let _status = recode.status == "1"
                  // this.dataList[index].status = _status
                  self._employeeStatus="1"
                  self.onQueryEmployee()
                }
                // console.log(this.dataList.status)
              })
             
            }
          })
        }else{
          self._employeeStatus="1"
          console.log(self.employeeStatus,"1122")
          employeeStatus(recode.id, self._employeeStatus).then(res => {
            if (res.code == 0) {
               // let _status = recode.status == "1"
              // this.dataList[index].status = _status
              self._employeeStatus="0"
              self.onQueryEmployee()
            }
            // console.log(this.dataList.status)
          })
        }
        // employeeStatus(recode.id, _status).then(res => {
        //   if (res.code == 0) {
        //     this.dataList[index].status = _status
        //   }
        //   console.log(this.dataList.status)
        // })
      },
      // ——————————————————————————————————————————————————————————group————————————————————————————————————————————————————————————————
      // ——————————————————————————————————————————————————————————group————————————————————————————————————————————————————————————————
      // employeeGroup 查
      onQueryGroups() {
        let self = this
        queryGroup(this.queryParam, {
          current: 1,
          size: 999
        }).then(res => {
          console.log("组数据....", res)
          if (res.code == 0) {
            self.groupList = res.result.data
            console.log("组数据2....", this.groupList)
          }
        })
      },
      // 增
      onCreateGroup() {
        createGroup(this.sysGroup).then(res => {
          if (res.code == 0) {
            this.sysGroup = res.result.data
            this.showSysGroup1 = false
            this.$message.success(this.$t('messages.creatSuccess'));
            this.onQueryGroups()
            // this.$success({
            //   title: "创建成功",
            //   onOk: () => {
            //     this.onQueryGroups()
            //   }
            // })
          }
        }).finally(() => {
          this.employeeLoading = false
        })
      },
      // 删
      onDeleteGruop(recode) {
        console.log("删除分组", recode)
        var d = Object.assign({}, recode)
        var self = this
        this.$confirm({
          cancelText: this.$t("btn.cancel"),
          title: this.$t("messages.toDelete") +'[ ' + d.name + ' ]',
          onOk() {
            return deleteGruop(d.id).then(res => {
              if (res.code == 0) {
                self.$message.success(self.$t('messages.delSuccess'))
                self.onQueryGroups()
              }
            })
          },
          oncancel() {
            console.log("删除后")
          }
        })
      },
      onUpdataGroupbtn(recode) {
        this.showUpdataGroup = true
        this.groupEditData = Object.assign({}, recode)
      },
      onUpdataGroup() {
        updataGroup(this.groupEditData.id, this.groupEditData).then(res => {
          if (res.code == 0) {
            this.showUpdataGroup = false
            this.$message.success(this.$t('messages.updataSuccess'))
            // this.$success({
            //   title: '更新成功',
            //   onOk: () => {
            //     this.onQueryGroups()
            //   }
            // })
          }
        })
      },
      onGroup(n) {
        this.curindex = n
        console.log(n)
        if (n == -1) {
          this.queryParam.groupId = ""
          this.sysEmployee.groupId = ""
          this.onQueryEmployee(this.queryParam, {
            current: this.page.current,
            size: this.page.pageSize
          })
          this.onQueryGroups(this.sysEmployee)

        } else {
          let id = this.groupList[n].id
          this.queryParam = {
            groupId: id
          }
          this.onQueryEmployee(this.queryParam, {
            current: this.page.current,
            size: this.page.pageSize
          })
        }
        // console.log("group id",this.nameindex,n,this.dataList[n].groupId)
      },
      onMove(recode) {
        console.log("选择分组内容", recode)
        this.showSysGroup = true
        // this.groupList = Object.assign({}, recode)
        this.moveData = Object.assign({}, recode)
      },
      onGroup2(n) {
        console.log("6655",n)
        this.curindex2 = n
        let id = this.groupList[this.curindex2].id
        this.moveData.groupId = id
        
        // console.log(n)
        console.log("选择分组", this.moveData)
      },
      onMoveOk() {
        let groupId=this.moveData.groupId
        console.log(this.moveData.id)
        this.employeeLoading = true
        moveGroup(this.moveData.id,groupId ).then(res => {
          // console.log("用户修改",record)
          this.curindex2=-1
          console.log("1144",this.curindex2 )
          if (res.code == 0) {
            this.showSysGroup = false
            this.$message.success(this.$t('messages.moveSuccess'))
            // console.log("清空index")
            // this.$success({
            //   title: '移动成功',
            //   onOk: () => {
    
            //   }
            // })
                this.onQueryGroups()
                this.onQueryEmployee()
              
          }
        }).finally(() => {
          this.employeeLoading = false
        })
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
      handleChange({imglist}) {
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
           console.log("file.size",file.size)
          if ( file.size > 1000000) {
            // 创建Canvas对象(画布)
            let canvas = document.createElement('canvas')
            // 获取对应的CanvasRenderingContext2D对象(画笔)
            let context = canvas.getContext('2d')
            // 创建新的图片对象 
            let img = new Image()
            // 指定图片的DataURL(图片的base64编码数据)
            img.src =  a
              // 监听浏览器加载图片完成，然后进行进行绘制
              img.onload = () => {

                let h = img.height
                let w = img.width



                canvas.height = 800
                canvas.width = img.width * 800 / img.height
                console.log(img.height,img.width,canvas.height,canvas.width)

                /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。
                如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。*/
                context.drawImage(img, 0, 0, canvas.width,canvas.height)
                // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
                self.sysEmployee.base64 = canvas.toDataURL(file.type, 0.92)
                console.log(1,self.sysEmployee.base64)
                // console.log(this.form.base64.size)
                // 最后将base64编码的图片保存到数组中，留待上传。
                // this.form.base64 = file.content
              }
          } else {
            console.log(2432,self.sysEmployee.base64)
            self.sysEmployee.base64 = a
          }
        }).catch(res=>{console.log("file err",res)})
        return false
      },
     
     //批量添加
     onBatchAddBtn(){
       this.showBatchAdd=true
       this.groupId=this.curindex
       console.log("批量上传",this.formData,this.groupId)
     },
     beforeUpload2(file,fileList){
       // console.log("批量上传",file)
       console.log("上传文件数据列表",file,fileList)
       let formdatas = new FormData()
       formdatas.append("file",file)
       formdatas.append("groupId",this.groupId)     
       this.formData=formdatas
      console.log("批量上传",this.formData,this.groupId)
      return false
     
     },
     onBatchAdd(){
       addEmployees(this.formData).then(res=>{
         let code = res.code
         if(code==0){
           // this.$message.success("导入成功")
           this.$message.success(this.$t('messages.importSuccess'))
           this.onQueryEmployee()
           this.showBatchAdd=false
           
         }else if(code==40001){
           this.$message.success(this.$t('messages.isCard'))+res.result.data
           // this.$message.error("工号已存在"+ res.result.data)
         }else if(code==40002){
           // this.$message.error("导入失败")
           this.$message.error(this.$t('messages.importDef'))
         }else if(code==40003){
           // this.$message.error("压缩文件格式不正确")
           this.$message.error(this.$t('messages.IncorrectFormat'))
         }else if(code==40004){
           // this.$message.error("压缩文件超过200M")
           this.$message.error(this.$t('messages.tooLarge'))
         }else if(code==40005){
           // this.$message.error("部门不存在")
           this.$message.error(this.$t('messages.depNotExist'))
         }
       })
     },
   
     
    },
    // computed: {
    //   rowSelection() {
    //     return {
    //       onChange: (selectedRowKeys, selectedRows) => {
    //         // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //       },
    //       getCheckboxProps: record => ({
    //         props: {
    //           disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //           name: record.name,
    //         },
    //       })
    //     }
    //   },
      
    // },
    mounted() {
      console.log("--------------------",detectDeviceType)
      this.host = process.env.VUE_APP_API_BASE_URL
      console.log("host", this.host)
      // console.log("host", this.host)
      let userinfo = storage.get(USER_INFO)
      if (userinfo) {
        this.userId = userinfo.id
      }
      // console.log("userinfo", userinfo)
      this.onQueryEmployee()
      this.onQueryGroups()
    }
    
  }
</script>

<style scoped lang="less">
  #employ {}

  .leftb {
    border-right: 1px solid #ddd;
    // flex: 250px;
    width: 250px;
  }

  .box {
    display: flex;
  }

  .rightb {
    flex: auto;
    padding: 10px;
    // display: inline-block;
  }

  .devname {
    display: block;
    width: 240px;
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

  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }
</style>
