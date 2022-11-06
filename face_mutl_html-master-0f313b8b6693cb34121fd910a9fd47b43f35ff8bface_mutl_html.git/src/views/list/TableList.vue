<template>
  <a-card>
    <a-table ref="table" size="default" :loading='queryLoading' :columns="columns"
    :data-source="dataList" :pagination="page" rowKey='id'>
    
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
     <!-- <span slot="isOnLine" slot-scope="text">
        <a-badge v-if="isOnLine==1"text="在线"></a-badge>
        <a-badge v-else  text="不在线"></a-badge>
      </span> -->
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="onEdit(record)">查看</a>
          <a-divider type="vertical" />
          <a @click="onDelete(record)">设置</a>
          <a-divider type="vertical" />
          <a @click="onResetPassword(record)">删除</a>
        </template>
    
      </span>
    
    </a-table>
  </a-card>
  
</template>
<script>
import page from '@/utils/page'
import { queryDevice,updateDevice,createDevice} from '@/api/deviceManagement'
import { ACCESS_TOKEN, USER_INFO, USER_NAME } from '@/store/mutation-types'
import storage from 'store'
export default {
 name: 'deviceManagement',
  data() {
   return{
     loading:{},
     show:{},
     isCreate:true,
     queryLoading:false,
     queryParam:'',
     columns:[
       {
         title:'#',
         scopedSlots:{customRender:'serial'}
       },
       {
         title:'设备名称',
         dataIndex:'name'
       },
       {
         title:'状态',
         dataIndex:'isOnLine'
       },
       {
         title:'ID',
         dataIndex:'deviceId'
       },
       {
         title:'IP',
         dataIndex:'ip'
       },
       {
         title:'操作',
         dataIndex:'action',
         scopedSlots:{ customRender:'action'}
       }
     ],
     // 分页配置
     page:page(this,this.querySysDevice),
     dataList:[],
     //表单数据
     sysDevice:{}
   }
  },
  methods: {
    // 查
    querySysDevice(){
      console.log('queryDevice',200)
     queryDevice(this.queryParam,{ current: this.page.current, size: this.page.pageSize }).then(res=>{
       console.log('queryDevice',res)
       if(res.code == 0){
         this.dataList = res.result.data
         this.page.total = res.result.page.total
       }
     }).finally(()=>{
     })
    },
    //增
    createSysDevice(){
      createDevice(this.sysDevice).then(res=>{
        
      })
    }
    
  },
  mounted () {
    let userinfo = storage.get(USER_INFO)
    if (userinfo) {
      this.userId = userinfo.id
    }
    console.log("userinfo", userinfo)
    this.querySysDevice()
  }
};
</script>
