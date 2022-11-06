<template>
  <div class="main" :class="{'mainCard':themes==1,'mainCard2':themes==2,'mainCard3':themes==3,}">
   
   <div class="cardOne">
     <div class="cardOne-theme">
       <p class="cardOne-title" :class="{'font-color1':themes==1,'font-color2':themes==2,'font-color3':themes==3,}">{{$t('form.numOfFace')}}</p>
       <div class="cardOne-theme2" :class="{'font-color1':themes==1,'font-color2':themes==2,'font-color3':themes==3,}">
         <div class="theme1-1"  @click="checkTheme(1)"></div>
         <div class="theme1" @click="checkTheme(1)">{{$t('form.dark')}}</div>
         <div class="theme1-2 border-color2"  @click="checkTheme(2)"></div>
         <div class="theme1" @click="checkTheme(2)">{{$t('form.white')}}</div>
         <div class="border-color1 theme1-3 "  @click="checkTheme(3)"></div>
         <div class="theme1" @click="checkTheme(3)">{{$t('form.zi')}}</div>
       </div>
     </div>
   
     <template>
       <a-row type="flex" justify="space-around" align="middle" :gutter="[20,16]">
        <!-- <a-col :span="6" :order="4">
           <a-row class="cardOne color2" type="flex" align="middle">
             <a-col :span="10">
               <img class="cardOne-img" width="55px" src="../../assets/face.png" />
             </a-col>
             <a-col :span="14">
               <p class="cardOne-number" v-if="personData">{{personData.person.under}}</p>
               <p class="cardOne-number" v-else>{{$t('form.unFlsh')}}</p>
               <p class="cardOne-text">{{$t('form.unregistered')}}</p>
             </a-col>
           </a-row>
         </a-col> -->
         <a-col :span="8" :order="3">
           <a-row class="cardOne color3" type="flex" align="middle">
             <a-col :span="10">
               <img class="cardOne-img" width="55px" src="../../assets/face.png" />
             </a-col>
             <a-col :span="14">
               <p class="cardOne-number" v-if="personData">{{visitor}}</p>
               <p class="cardOne-number" v-else>{{$t('form.unFlsh')}}</p>
               <p class="cardOne-text">{{$t('form.visitor')}}</p>
             </a-col>
           </a-row>
         </a-col>
         <a-col :span="8" :order="2">
           <a-row class="cardOne color4" type="flex" align="middle">
             <a-col :span="10">
               <img class="cardOne-img" width="55px" src="../../assets/face.png" />
             </a-col>
             <a-col :span="14">
               <p class="cardOne-number" v-if="personData">{{employee}}</p>
               <p class="cardOne-number" v-else>{{$t('form.unFlsh')}}</p>
               <p class="cardOne-text">{{$t('form.renZhengRenYuan')}}</p>
             </a-col>
           </a-row>
         </a-col>
         <a-col :span="8" :order="1">
           <a-row class="cardOne color1" type="flex" align="middle">
             <a-col :span="10">
               <img class="cardOne-img" width="55px" src="../../assets/face.png" />
             </a-col>
             <a-col :span="14">
               <p class="cardOne-number" v-if="personData">{{countD}}</p>
               <p class="cardOne-number" v-else>{{$t('form.unFlsh')}}</p>
               <p class="cardOne-text">{{$t('form.count')}}</p>
             </a-col>
           </a-row>
         </a-col>
       </a-row>
     </template>
   </div>
     <!-- 视图2 -->
     <div class="cardTwo">
       <a-row type="flex" justify="space-around" align="middle" :gutter="[20,18]">
         <a-col :span="15">
           <!-- [themes==1?'card-bgcolor':'card-bgcolor2'] -->
           <a-card :class="{'card-bgcolor':themes==1,'card-bgcolor2':themes==2,'card-bgcolor3':themes==3,}">
             <div class="cardTwo-title">
               <p>{{$t('form.devStatus')}}</p>
             </div>
             <a-row type="flex" justify="space-around" align="middle" :gutter="[20,18]">
               <a-col :span="12">
                 <div id="containers"></div>
               </a-col>
               <a-col :span="12">
                 <div class="cardTwo-box">
                   <p>{{$t('form.devCount')}}</p>
                   <div class="cardTwo-box2">
                     <p> {{$t('form.rlssData')}}:{{devData.all}}</p>
                     <div>
                       <a-row :gutter="16" style="padding-left: 10px;">
                         <a-col class="gutter-row" :span="2">
                           <div class="gutter-box cardTwo-box3">
     
                           </div>
                         </a-col>
                         <a-col class="gutter-row" :span="8">
                           <div class="gutter-box cardTwo-box4">
                             {{$t('form.onlinDev')}}
                           </div>
                         </a-col>
                         <a-col class="gutter-row" :span="2">
                           <div class="gutter-box cardTwo-box3 color5">
                           </div>
                         </a-col>
                         <a-col class="gutter-row" :span="8">
                           <div class="gutter-box cardTwo-box4">
                             {{$t('form.offlinDev')}}
                           </div>
                         </a-col>
                       </a-row>
                     </div>
                   </div>
                 </div>
               </a-col>
             </a-row>
           </a-card>
         </a-col>
         <a-col :span="9">
           <a-card :class="{'card-bgcolor':themes==1,'card-bgcolor2':themes==2,'card-bgcolor3':themes==3,}">
             <div class="cardTwo-title">
               <p>{{$t('form.tadayData')}}</p>
             </div>
             <div id="xxxx"></div>
           </a-card>
         </a-col>
     
       </a-row>
     </div>
     <!-- 视图3 -->
     <!-- cardThree -->
     <div :class="{'cardThree':themes==1,'cardThree2':themes==2,'cardThree3':themes==3,}">
       <a-row>
         <a-col :span="12" style="margin-top:24px ;" class="cardThree-title">
           <div class="cardThree-rtbox">
             <span>{{$t('form.rlssData2')}}</span>
           </div>
           <div class="cardThree-rtbox2">
           </div>
         </a-col>
       </a-row>
       <a-row>
         <div class="cardThree-img" >
           <div v-for="(item,index) in imgSrc">
             <img :class="{'cardThree-imgItem':themes==1,'cardThree-imgItem2':themes==2,'cardThree-imgItem3':themes==3}"  
             width="120px" height="160px" :src="host2+item">
           </div>
         </div>
       </a-row>
     </div>
     
  </div>
</template>


<script>
  import {
    Chart,
    Util
  } from '@antv/g2';
  import storage from 'store'
  import { queryEmployees, } from '@/api/employees'
  import {queryVisitor,} from '@/api/visitor'
  export default {
    // name: "card",
    data() {
      return {
        visitor:'',
        employee:'',
        data: "",
        data2: '',
        chart: '',
        chart2: '',
        dataddd: {},
        personData: '',
        tadayData: '',
        allPerson:'',
        devData: '',
        countD: '',
        countD2: '',
        themes: 1,
        token: '',
        imgSrc: [],
        nums:[],
        // host: "",
        queryParam:{},
        host: "121.196.32.56:9000",
        host2: "http://121.196.32.56:9000",
        // host2: "",
        ip:"",
        wsProtocol:"ws",
      }
    },

    methods: {
      // 主题切换
      checkTheme(n) {
        if (n == 1) {
          this.themes = 1
        } else if (n == 2) {
          this.themes = 2
        } else if (n == 3) {
          this.themes = 3
        }
        console.log("当前主题为", this.themes)
      },
      // 查
      onQuery() {
        queryVisitor(this.queryParam, { current:1,size: 1
        }).then(res => {
          console.log('110', res)
          if (res.code == 0) {
            this.visitor = res.result.page.total
          }
        }).finally(() => {
          this.queryLoading = false
        })
      },
      onQueryEmployee() {
        queryEmployees(this.queryParam, {
          current:1,
          size: 1
        }).then(res => {
          console.log('111', res)
          if (res.code == 0) {
            this.employee = res.result.page.total
          }
        }).finally(() => {
          this.queryLoading = false
        })
      },
      initWs() {
        var self = this
        let con = new WebSocket(self.wsProtocol+"://"+self.ip + "/ws")
        this.ws = con
          console.log("ws110",con)
        con.onopen = function() {
          self.send({
            "token": self.token
          })
          console.log("ws opend")
        }
        con.onclose = function() {
          // this.initWs()
          console.log("ws close")
        }
        con.onmessage = this.getmsg
        con.onerror = function(res) {
          console.log("err:", res)
        }
      },
      send(data) {
        console.log("send data", data)
        this.ws.send(JSON.stringify(data))
      },
      getmsg(msg) {
        console.log("getmsg", msg)
        let a = JSON.parse(msg.data)
        if (a.code == 1) {
          console.log("人员数据")
          console.log("datalist", a.data)
          this.personData = a.data
          this.countD = this.visitor+this.employee
          this.tadayData = a.data.todayPerson
            let count=this.tadayData.work
            let percent=this.tadayData.work/100
            console.log("1144",this.data2)
            let all = a.data.todayPerson.work+a.data.todayPerson.visitor+a.data.todayPerson.under
            
            this.allPerson=all
            console.log("all",all,a,a.todayPerson)
            console.log("1100",a.data.todayPerson.under,a.data.todayPerson.visitor,a.data.todayPerson.work )
            let d=[]
            console.log("--=-=-=-=-=-",Number((a.data.todayPerson.under/all).toFixed(2)),Number((a.data.todayPerson.visitor/all).toFixed(2)))
            // if( a.data.todayPerson.work==0 || a.data.todayPerson.visitor==0 || a.data.todayPerson.under==0){
            
             if( a.data.todayPerson.work==0){
               d = [
                {
                  item: this.$t('form.renZhengRenYuan'),
                  count: a.data.todayPerson.work,
                  percent: 0
                },
                {
                  item: this.$t('form.visitor'),
                  count: a.data.todayPerson.visitor,
                  percent:Number((a.data.todayPerson.visitor/all).toFixed(2))
                }, 
                {
                  item: this.$t('form.weirz'),
                  count: a.data.todayPerson.under,
                  percent:Number((a.data.todayPerson.under/all).toFixed(2))
                },
              ];
            }else if(a.data.todayPerson.visitor==0){
              d = [
                {
                  item: this.$t('form.renZhengRenYuan'),
                  count: a.data.todayPerson.work,
                  percent: Number((a.data.todayPerson.work/all).toFixed(2))
                },
                {
                  item: this.$t('form.visitor'),
                  count: a.data.todayPerson.visitor,
                  percent:0
                }, 
                {
                  item: this.$t('form.weirz'),
                  count: a.data.todayPerson.under,
                  percent:Number((a.data.todayPerson.under/all).toFixed(2))
                },
              ];
            } else if(a.data.todayPerson.under==0){
              d = [
                {
                  item: this.$t('form.renZhengRenYuan'),
                  count: a.data.todayPerson.work,
                  percent: Number((a.data.todayPerson.work/all).toFixed(2))
                },
                {
                  item: this.$t('form.visitor'),
                  count: a.data.todayPerson.visitor,
                  percent:Number((a.data.todayPerson.visitor/all).toFixed(2))
                }, 
                {
                  item: this.$t('form.weirz'),
                  count: a.data.todayPerson.under,
                  percent:0
                },
              ];
            }else{
             d = [
                {
                  item: this.$t('form.renZhengRenYuan'),
                  count: a.data.todayPerson.work,
                  percent: Number((a.data.todayPerson.work/all).toFixed(2))
                },
                {
                  item: this.$t('form.visitor'),
                  count: a.data.todayPerson.visitor,
                  percent:  Number((a.data.todayPerson.visitor/all).toFixed(2))
                },
                {
                  item: this.$t('form.weirz'),
                  count: a.data.todayPerson.under,
                  // percent:1-Number((a.data.todayPerson.visitor/all).toFixed(2))-Number((a.data.todayPerson.work/all).toFixed(2))
                  percent:Number((a.data.todayPerson.under/all).toFixed(2))
                },
              ];
            }
        
        this.tadayData=d
        this.chart2.data(d);
        this.chart2.annotation().clear(true)
        this.chart2.annotation().text({
           position: ['50%', '50%'],
           content: this.$t('form.countFace'),
           style: {
             fontSize: 14,
             fill: '#f1f1f1',
             textAlign: 'center',
           },
           offsetY: -20,
         })
        .text({
           position: ['51%', '50%'],
           content:  this.allPerson+"" ,
           style: {
             fontSize: 20,
             fill: '#f1f1f1',
             textAlign: 'center',
           },
           offsetX: -10,
           offsetY: 20,
         })
         // .text({
         //   position: ['50%', '50%'],
         //   content: this.$t('form.ci'),
         //   style: {
         //     fontSize: 14,
         //     fill: '#f1f1f1',
         //     textAlign: 'center',
         //   },
         //   offsetY: 20,
         //   offsetX: 20,
         // })

        this.chart2.render()
          // 数据处理
        } else if (a.code == 2) {
          console.log("设备数据")
          this.devData = a.data
            let q=[
              {
                type: this.$t('form.onlinDev'),
                value: a.data.online
                // value: 4,
              },
              {
                type:this.$t('form.offlinDev'),
                value: a.data.outline
                // value: 4,
              },
            ];
            this.chart.data(q);
            this.chart.render()
          console.log("8001", this.countD)
          console.log("8002", this.tadayData)


        } else if (a.code == 3) {
          console.log("人脸数据")
           if(this.imgSrc.length<=5){
             this.imgSrc.push(a.data.img)
           }else{
             let b = this.imgSrc.splice(1,this.imgSrc.length)
            b.push(a.data.img)
            this.imgSrc = b
           }
        }
    
      },
    },
    mounted() {
      this.onQuery()
      this.onQueryEmployee()
        var protocol = window.location.protocol
      //打包
      // if(protocol=="http:"){
      //   this.wsProtocol = "ws"
      // }else{
      //   this.wsProtocol = "wss"
      // }
      // this.ip  = window.location.host
      
      this.ip = "121.196.32.56:9000"
      this.host = process.env.VUE_APP_API_BASE_URL
      
      console.log(this.host)
      this.token = storage.get("Access-Token")
 
      console.log(this.token)
      console.log("================")
      this.chart = new Chart({
        container: 'containers',
        autoFit: true,
        height: 300,
      });
      console.log("this.char",this.chart)
      this.chart.data(this.data);
      this.chart.coordinate('theta', {
        radius: 0.75
      });
      this.chart.tooltip({
        showMarkers: false
      });
      const interval = this.chart
        .interval()
        .adjust('stack')
        .position('value')
        .color('type', [ '#38c060', '#ff5500'])
        .style({
          opacity: 0.9,
          color: '#FFFFFF',
        })
        .state({
          active: {
            style: (element) => {
              const shape = element.shape;
              return {
                matrix: Util.zoom(shape, 1.1),
              }
            }
          }
        })
        .label('type', (val) => {
          const opacity = val === '' ? 1 : 0.5;
          return {
            offset: -30,
            style: {
              color: 'white',
              opacity,
              fill: 'white',
              fontSize: 12,
              shadowBlur: 2,
              shadowColor: 'rgba(0, 0, 0, 0)',
            },
            content: (obj) => {
              return obj.type + '\n' + obj.value;
            },
          };
        });

      this.chart.interaction('element-single-selected');
      
      
      let self=this
      this.chart2 = new Chart({
        container: 'xxxx',
        autoFit: true,
        height: 300,
      });
      console.log("this.chart2----------",this.chart2)
      this.chart2.scale('percent', {});
      this.chart2.coordinate('theta', {
        radius: 0.75,
        innerRadius: 0.6,
      });
      this.chart2.tooltip({
        showTitle: false,
        showMarkers: false,
        itemTpl: '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}({per}%)</li>',
      });
      this.chart2
        .interval()
        .adjust('stack')
        .position('percent')
        .color('item')
        .label('percent', (percent) => {
          console.log("---===饼图++++",percent)
          percent = percent*100
          let a=percent.toFixed(0)
          a = a+"%"
          console.log("---===饼图",percent)
          return {
            content: (data) => {
              console.log(492,":=======",data)
              return `${data.item}: ${a}`;
            },
          };
        })
        .tooltip('item*percent*count', (item, percent,count) => {
          console.log("497====",item,percent,count)
          percent = percent*100
          let a=percent.toFixed(0)
          // a = a+"%"
          return {
            name: item,
            value: count,
            per:a,
          };
        });
       this.chart2
         .annotation()
         .text({
           position: ['50%', '50%'],
           content: '',
           style: {
             fontSize: 14,
             fill: '#f1f1f1',
             textAlign: 'center',
           },
           offsetY: -20,
         })
         .text({
           position: ['50%', '50%'],
           content: '',
           style: {
             fontSize: 20,
             fill: '#f1f1f1',
             textAlign: 'center',
           },
           offsetX: -10,
           offsetY: 20,
         })
         .text({
           position: ['50%', '50%'],
           content: '',
           style: {
             fontSize: 14,
             fill: '#f1f1f1',
             textAlign: 'center',
           },
           offsetY: 20,
           offsetX: 20,
         });
      this.chart2.interaction('element-active');
      this.chart2.render();
      this.initWs()
           // this.initWs()
    },
    destroyed() {
      // 页面销毁关闭连接
      this.ws.close()
    },
  }
</script>


<style scoped>
  html{
    height: 100%;
  }
  body{
    height: 100%;
  }
  .main{
    width: 100%;
    min-height: 100%;
    flex-direction: column;
    display: flex;
    height: 100%;
    padding:0 24px 24px 24px;
  }
  .ant-layout-content{
    margin: 0;
  }
.mainCard{
    background-color: #6b6b6b;
  }
  .mainCard2{
    background-color: #f4f4f4;
  }
  .mainCard3{
    background-color: #d1caeb;
  }
  
  .card-bgcolor {
    background-color: #002740;
    color: #FFFFFF;
    border-radius: 8px;
    
  }

  .card-bgcolor2 {
    background-color: #FFFFFF;
    color: #000000;
    border-radius: 8px;
  }

  .card-bgcolor3 {
    background-color: #361F3E;
    color: #ffffff;
    border-radius: 8px;
  }

  .font-color1 {
    color: #FFFFFF;
  }

  .font-color2 {
    color: #000000;
  }

  .font-color3 {
    color: #02435f;
  }

  .color2 {
    background-color: #8db438;
  }

  .color1 {
    background-color: #6699CC;
  }

  .color3 {
    background-color: #00B271;
  }
  .color4 {
    background-color: #F66238;
  }

  .border-color1 {
    border: 1px solid #000000;
  }

  .border-color2 {
    border: 1px solid #ffffff;
  }

  .border-color3 {
    border: 1px solid #000000;
  }

  .cardOne {
    width: 100%;
    border-radius: 8px;
    /* height: 140px; */
    min-height: 104px;
  }

  .cardOne-theme {
    color: #1e5839;
    /* color: #FFFFFF; */
    /* border: 1px solid red; */
    display: flex;
    flex-direction: row;
    justify-content: space-between
    
  }

  .cardOne-theme2 {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center
  }

  .cardOne-img {
    margin-left: 40px;
  }

  .cardOne-text {
    color: #e5e5e5;
    font-size: 15px;
  }

  .cardOne-number {
    padding-bottom: 10px;
    margin-bottom: 30px;
    margin-top: 10px;
    color: #FFFFFF;
    font-size: 30px;
  }

  .cardOne-title {
    margin: 6px 0;
    font-weight: 600;
    font-size: 18px;
  }

  .theme1 {
    font-size: 16px;
    margin: 0 18px 0 4px;
    cursor: pointer;
  }

  .theme1-1 {
    border: 8px solid #002740;
    border-radius: 50%;
    height: 6px;
    width: 6px;
  }

  .theme1-2 {
    border: 8px solid #FFFFFF;
    border-radius: 50%;
    height: 6px;
    width: 6px;
  }

  .theme1-3 {
    border: 8px solid #361F3E;
    border-radius: 50%;
    height: 6px;
    width: 6px;
  }


  .cardTwo {
    margin: 12px 0;
  }

  .cardTwo-title {
    border-bottom: 1px solid #32aac5;
    width: 100%;
    font-size: 16px;
    /* padding: 0px 10px; */
    font-weight: 600;
    font-size: 18px;
  }

  .cardTwo-box {
    height: 300px;
    padding: 15px 0;
    font-size: 20px;
  }

  .cardTwo-box2 {
    font-size: 18px;
    border: 1px solid #4fb4b4;
    border-radius: 8px;
    padding: 15px 10px;
  }

  .cardTwo-box3 {
    border: 10px solid #42C368;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    float: right;
    margin-top: 0px;

  }

  .color5 {
    border: 10px solid #ff5500;
  }

  .cardTwo-box4 {
    font-size: 14px;
  }

  .cardThree {
    width: 100%;
    border-radius: 8px;
    background-color: #002740;
    height: 270px;
    color: #FFFFFF;
    padding:0 24px;
  }

  .cardThree2 {
    width: 100%;
    border-radius: 8px;
    padding:0 24px;
    background-color: #FFFFFF;
    height: 270px;
    color: #000000;
  }

  .cardThree3 {
    width: 100%;
    border-radius: 8px;
    padding:0 24px;
    background-color: #361F3E;
    height: 270px;
    color: #ffffff;
  }

 .ant-card-bordered{
   border:none;
 }

  .cardThree-title {
    border-bottom: 1px solid #32aac5;
    width: 100%;
    font-size: 16px;
    /* padding: 0px 20px; */
    font-weight: 600;
    font-size: 18px;
  }

  .cardThree-rtbox {
    display: inline-block;
    margin-bottom: 18px;
  }

  .cardThree-rtbox2 {
    float: right;
    width: 260px;
    display: inline-block;
  }

  .cardThree-itembox {
    margin-right: 6px;
  }

  .cardThree-itembox2 {
    margin-right: 12px;
  }

  .cardThree-img {
    display: flex;
    margin-top: 24px;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
  } 
  .cardThree-imgItem{
    border:1px solid #a5a5a5;
    border-radius: 4px;
    /* box-shadow:4px 4px 8px #5b5b5b; */
  }
  .cardThree-imgItem2{
    border:1px solid #a5a5a5;
    border-radius: 4px;
    box-shadow:4px 4px 8px #b4b4b4;
  }
   .cardThree-imgItem3{
     border:1px solid #a5a5a5;
     border-radius: 4px;
     /* box-shadow:4px 4px 8px #c6c5c7; */
   }
</style>
