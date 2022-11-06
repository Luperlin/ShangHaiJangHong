<template>
  <view>
    <template>
  <a-table :columns="columns" :data-source="data">
    <a slot="action" slot-scope="text" href="javascript:;">Delete</a>
    <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
      {{ record.description }}
    </p>
  </a-table>
</template>
<script>
const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  { title: 'Action', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } },
];

const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];

export default {
  data() {
    return {
      data,
      columns,
    };
  },
};
</script>

  </view>
</template>

<script>
import page from '@/utils/page'
import { queryDevice,updateDevice,createDevice} from '@/api/deviceManagement'
import { ACCESS_TOKEN, USER_INFO, USER_NAME } from '@/store/mutation-types'
import storage from 'store'
export default{
  name: 'deviceManagement',
  data (){
    let self = this
    return{
      loading:{},
      show:{},
      isCreate:true,
      queryLoading:false,
      columns:[
        {
          title:'#',
          scopedSlots:{customRender:'serial'}
        },
        {
          title:'one',
          dataIndex:'account'
        },
        {
          title:'操作',
          dataIndex:'action',
          scopedSlots:{ customRender:'action'}
        }
      ],
      // 分页配置
      page:page(this,this.queryapi),
      dataList:[],
    }
  },
  methods: {
    // 查
    querySysDevice(){
     queryDevice({current:this.paee.current,size:this.page.dataPageSize}).then(res=>{
       console.log('queryDevice',res)
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
  
}
</script>

<style>
</style>
