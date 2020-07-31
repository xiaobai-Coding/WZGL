<template>
  <div class="v-clock">
    <Card>
      <div class="left">
        <div>
          <div style="margin-left: 20px;">所选组织:</div>
          <div>
            <Select  :disabled="selectDisabled" v-model="search.company" placeholder="所选公司" style="width: 300px;margin-left: 20px;">
              <Option
                v-for="(item,index) in companyList"
                :value="item.id"
                :key="index">
                {{ item.name }}
              </Option>
            </Select>
          </div>
          <div style="color: #02A7F0;">
            （用于配置该组织下的可见菜单、标题及展示顺序）
          </div>
        </div>
        <div>
          <div>
            <Button type="primary" :disabled="buttonDisabled" @click="buttonSubimt">提交</Button>
          </div>
        </div>
      </div>


      <div
        style="background-color: rgba(242, 242, 242, 1);
            height: calc(100% - 52px);
            padding: 20px;
            overflow: auto;">
        <Row :gutter="40" class="box">
          <Col span="8" v-for="(i,index) in allMenu" :key="index">
            <userMenuTemplate
              :menu="i"
              @menuOnRowClick="menuOnRowClick"
              @onSelectionChange="menuOnSelectionChange"
              @up="menuUp"
              @menuDown="menuDown"
              @menuUseOpen="menuUseOpen"
              @menuUseClose="menuUseClose">
            </userMenuTemplate>
          </Col>
        </Row>
      </div>
    </Card>
  </div>
</template>

<script>
  import { getByOrganizationId,insertMenu,organizationsGetByPage } from '@/axios/api';
  import userMenuTemplate from './userMenuTemplate'
  export default {
    name: "userMenuIndex",
    components: {
      userMenuTemplate,
    },
    props: [''],
    data() {
      return {
        buttonDisabled:true,
        selectDisabled:true,
        search:{
          company: '',
        },
        companyList: [],

        user:this.$store.getters.submitData,



        allMenu:[
          {
            level:1,
            rowClickIndex:0,
            menuTitle:'一级菜单',
            menuDisabled:true,
            menuTableList:{
              list:[],
            },
            menuBoolean:false,
            menuChooseId:'',
            menuColumns:[
              {
                title: '选择',
                type: 'selection',
                width: 40,
                align: 'center',
              },
              {
                title: '一级菜单标题',
                key: 'name',
                align: 'center',
                tooltip: true,
              },
              {
                title: '是否开启',
                key: 'use',
                align: 'center',
                width: 60,
                render: (h, params) => {
                  let that = this;
                  return h('div', [
                    h('i-switch', {
                      props: {
                        size: 'small',
                        value: this.$Filters.useType(params.row.use)
                      },
                      on: {
                        'on-change': (value) => {
                          event.stopPropagation()
                          // this.config.rowClickIndex = 0
                          // this.system.rowClickIndex = 0
                          that.changeLevel1(params,value);
                        },
                      }
                    })
                  ])
                }
              },
              {
                title: '子菜单',
                align: 'center',
                width: 50,
                render: (h, params) => {
                  return h('div', [
                    h('span',{
                      'style':{
                        'color':'#D9001B'
                      },
                      // on: {
                      //   click: () => {
                      //     this.menuOnRowClick(params.row);
                      //   }
                      // }
                    },params.row.sonCountInUse),
                    h('span', {
                      'style':{
                        'color':'#333333'
                      }
                    },'/'),
                    h('span',{
                      'style':{
                        'color':'#333333'
                      }
                    },params.row.sonCount),
                  ]);
                }
              },
            ],
            menuChooseItem:[],
          },
          {
            level:2,
            rowClickIndex:0,
            menuTitle:'管理配置',
            menuDisabled:true,
            menuTableList:{
              list:[],
            },
            menuChooseId:'',
            menuColumns:[
              {
                title: '选择',
                type: 'selection',
                width: 40,
                align: 'center',
              },
              {
                title: '二级菜单标题',
                key: 'name',
                align: 'center',
                tooltip: true,
              },
              {
                title: '是否开启',
                key: 'use',
                align: 'center',
                width: 60,
                render: (h, params) => {
                  let that = this;
                  return h('div', [
                    h('i-switch', {
                      props: {
                        size: 'small',
                        value: this.$Filters.useType(params.row.use)
                      },
                      on: {
                        'on-change': (value) => {
                          event.stopPropagation()
                          // this.config.rowClickIndex = 0
                          // this.system.rowClickIndex = 0
                          let arr = that.menu.menuTableList.list
                          let brr = that.config.menuTableList.list
                          that.changeSwitch(params,arr,brr,value);
                          that.changeLevel2(params,value)
                        }
                      }
                    })
                  ])
                }
              },
              {
                title: '子菜单',
                align: 'center',
                width: 50,
                render: (h, params) => {
                  return h('div', [
                    h('span',{
                      'style':{
                        'color':'#D9001B'
                      }
                    },params.row.sonCountInUse),
                    h('span', {
                      'style':{
                        'color':'#333333'
                      }
                    },'/'),
                    h('span',{
                      'style':{
                        'color':'#333333'
                      }
                    },params.row.sonCount),
                  ]);
                }
              },
            ],
            menuChooseItem:[],
          },
          {
            level:3,
            rowClickIndex:0,
            menuTitle:'系统参数',
            menuDisabled:true,
            menuTableList:{
              list:[],
            },
            menuChooseId:'',
            menuColumns:[
              {
                title: '选择',
                type: 'selection',
                width: 40,
                align: 'center',
              },
              {
                title: '三级菜单标题',
                key: 'name',
                align: 'center',
                tooltip: true,
              },
              {
                title: '是否开启',
                key: 'use',
                align: 'center',
                width: 60,
                render: (h, params) => {
                  let that = this;
                  return h('div', [
                    h('i-switch', {
                      props: {
                        size: 'small',
                        value: this.$Filters.useType(params.row.use)
                      },
                      on: {
                        'on-change': (value) => {
                          event.stopPropagation()
                          let arr = this.allMenu[2]
                          that.changeSwitch(params,value,arr);
                          // that.changeLevel3(params,value)
                        }
                      }
                    })
                  ])
                }
              },
            ],
            menuChooseItem:[],
          }
        ],

      }
    },
    computed: {},
    watch: {},
    methods: {
      getCompanyList(page){
        return  organizationsGetByPage({
          pageNum:page,
        })
      },
      getFirst(organizationId){
        return getByOrganizationId({
          organizationId:organizationId,
        })
      },
      apiAll(){
        let that = this;
        this.$axios.all([this.getCompanyList(1),this.getFirst(this.user.user.userInfo.company)])
          .then(this.$axios.spread((one,two) => {
            this.companyList = one.list
            this.allMenu[0].menuTableList.list = two.menuList
            that.allMenu[0].menuTableList.list[that.allMenu[0].rowClickIndex]._highlight = true;
            this.allMenu[1].menuTableList.list = two.menuList[0].sonList
            that.allMenu[1].menuTableList.list[that.allMenu[1].rowClickIndex]._highlight = true;
            if(two.menuList[0].sonList[0].sonList.length != 0){
              this.allMenu[2].menuTableList.list = two.menuList[0].sonList
              that.allMenu[2].menuTableList.list[that.allMenu[2].rowClickIndex]._highlight = true;
            }
            if(this.user.user.admin == 1){
              this.selectDisabled = false;
            }
            this.search.company = this.user.user.userInfo.company;
          }));
      },



      menuOnSelectionChange(item){
        if(item.length != 0){
          if(item[0].level == 1){
            this.allMenu[0].menuTableList.list  = item
          }else if(item[0].level == 2){
            this.allMenu[1].menuTableList.list  = item
          }else if(item[0].level == 3){
            this.allMenu[2].menuTableList.list  = item
          }
        }
        // if(this.menu.menuChooseItem.length != 0){
        //   this.menu.menuDisabled = false;
        // }
      },
      menuOnRowClick(row,index){
        if(row.level == 1){
          this.allMenu[index].rowClickIndex = index;
          this.allMenu[1].menuTableList.list = row.sonList
          this.allMenu[2].menuTableList.list = row.sonList[0].sonList
          this.allMenu[1].menuTableList.list[this.allMenu[1].rowClickIndex]._highlight = true;
        }else if(row.level == 2){
          this.allMenu[index].rowClickIndex = index;
          this.allMenu[2].menuTableList.list = row.sonList
        }else{
          this.allMenu[index].rowClickIndex = index;
        }
      },


      configOnSelectionChange(item){
        this.config.menuChooseItem = item;
        if(this.config.menuChooseItem.length == 0){
          this.config.menuDisabled = true;
        }else{
          this.config.menuDisabled = false;
        }
      },
      configOnRowClick(row,index){
        this.config.rowClickIndex = index;
        this.system.menuTableList.list = row.sonList
      },


      systemOnSelectionChange(item){
        this.system.menuChooseItem = item;
        if(this.system.menuChooseItem.length == 0){
          this.system.menuDisabled = true;
        }else{
          this.system.menuDisabled = false;
        }
      },
      systemOnRowClick(row,index){
        this.system.rowClickIndex = index;
      },



      menuUp(item){
        let na = item.menuTableList.list.map(function(value){return value.id;});
        let index = null;
        for (let i = 0; i < item.menuChooseItem.length; i++) {
          if(na.includes(item.menuChooseItem[i].id)) {
            index = na.indexOf(item.menuChooseItem[i].id);
            item.menuTableList.list[index] = item.menuTableList.list.splice(index - item.menuChooseItem.length, 1, item.menuTableList.list[index])[0];
          }
        }

        if(item.menuChooseItem.length == item.menuTableList.list.length){
          this.$Message.warning('您选择了全选,无法上移');
          return
        }
        if(index == 0){
          this.$Message.warning('已经为第一个,无法上移');
          return
        }

        for (let n = 0; n < item.menuTableList.list.length; n++) {
          item.menuTableList.list[n].sort = n + 1
        }
        this.buttonDisabled = false;
        item.menuDisabled = true;
      },
      menuDown(item){
        let na = item.menuTableList.list.map(function(value){return value.id;});
        let index = null;
        for (let i = 0; i < item.menuChooseItem.length; i++) {
          if(na.includes(item.menuChooseItem[i].id)) {
            index = na.indexOf(item.menuChooseItem[i].id);
            break
          }
        }
        if(item.menuChooseItem.length == item.menuTableList.list.length){
          this.$Message.error('您选择了全选,无法上移');
          return
        }
        if(index == item.menuTableList.list.length - 1){
          this.$Message.warning('已经为最后一个一个,无法下移');
          return
        }

        item.menuTableList.list[index] = item.menuTableList.list.splice(index + item.menuChooseItem.length, 1, item.menuTableList.list[index])[0];
        for (let n = 0; n < item.menuTableList.list.length; n++) {
          item.menuTableList.list[n].sort = n + 1
        }
        this.buttonDisabled = false;
        item.menuDisabled = true;
      },


      menuUseOpen(item){
        // this.config.rowClickIndex = 0
        // this.system.rowClickIndex = 0
        let index = 0;
        for (let k = 0; k < item.menuChooseItem.length; k++) {
          if(item.menuChooseItem[k].use == 1){
            index++
          }
        }
        if(index == item.menuChooseItem.length){
          this.$Message.warning('已经全部开启!');
          return;
        }
        let newItem
        for (let i = 0; i < item.menuChooseItem.length; i++) {
          newItem ={
            index:i,
            row:item.menuChooseItem[i]
          }
          if(item.level == 1){
            this.changeLevel1(newItem,true);
          }else if(item.level == 2){
            let arr = this.menu.menuTableList.list
            let brr = this.config.menuTableList.list
            this.changeSwitch(newItem,arr,brr,true);
            this.changeLevel2(newItem,true);
          } if(item.level == 3){
            let arr = this.config.menuTableList.list
            let brr = this.system.menuTableList.list
            this.changeSwitch(newItem,arr,brr,true);
            this.changeLevel3(newItem,true);
          }

        }
        item.menuDisabled = true;
      },
      // menuUseOpen(item){
      //   let arr = [];
      //   let brr = [];
      //   if(item.level == 1){
      //     arr = this.menu.menuTableList.list;//原数组
      //     this.menu.menuTableList.list = [];
      //   }else if(item.level == 2){
      //     arr = this.config.menuTableList.list;
      //     brr = this.menu.menuTableList.list;
      //     this.config.menuTableList.list = [];
      //   }else{
      //     arr = this.system.menuTableList.list;
      //     brr = this.config.menuTableList.list;//原数组
      //     this.system.menuTableList.list = [];
      //   }
      //
      //
      //   let chooseIndex = 0;
      //   for (let k = 0; k < item.menuChooseItem.length; k++) {
      //     if(item.menuChooseItem[k].use == 0){
      //       chooseIndex ++
      //     }
      //   }
      //   let level = brr.map(function(value){return value.id;});
      //   let levelIndex
      //   if(item.menuChooseItem[0].fatherId == null){
      //     levelIndex = level.indexOf(item.menuChooseItem[0].id)
      //   }else{
      //     levelIndex = level.indexOf(item.menuChooseItem[0].fatherId)
      //   }
      //   if(chooseIndex == 0){
      //     if(item.level == 1){
      //       this.menu.menuTableList.list = arr;
      //     }else if(item.level == 2){
      //       this.config.menuTableList.list = arr;
      //
      //     }else{
      //       this.system.menuTableList.list = arr;
      //     }
      //     this.$Message.warning('已经全部打开!');
      //     return;
      //   }
      //
      //   let na = arr.map(function(value){return value.id;});
      //   let index = null;
      //   for (let i = 0; i < item.menuChooseItem.length; i++) {
      //     if(na.includes(item.menuChooseItem[i].id)) {
      //       index = na.indexOf(item.menuChooseItem[i].id);
      //       arr[index].use = 1;
      //     }
      //   }
      //
      //
      //
      //
      //   if(item.level == 1){
      //     this.menu.menuTableList.list = arr;
      //     this.menu.menuDisabled = true;
      //   }else if(item.level == 2){
      //     this.config.menuTableList.list = arr;
      //     this.config.menuDisabled = true;
      //
      //   }else{
      //     this.system.menuTableList.list = arr;
      //     this.system.menuDisabled = true;
      //   }
      //
      //   brr[levelIndex].sonCountInUse = brr[levelIndex].sonCountInUse + chooseIndex
      //
      //   // if(this.menu.menuTableList.list.length != 0){
      //   //   this.menu.menuTableList.list[0]._highlight = false;
      //   //   this.menu.menuTableList.list[this.menu.rowClickIndex]._highlight = true;
      //   // }
      //   if(this.config.menuTableList.list.length != 0){
      //     let arr = JSON.parse(JSON.stringify(this.menu.menuTableList.list).replace(/_highlight/g, 'false'))
      //     this.menu.menuTableList.list = arr;
      //     this.menu.menuTableList.list[this.menu.rowClickIndex]._highlight = true;
      //   }
      //   if(this.system.menuTableList.list.length != 0){
      //     this.config.menuTableList.list[0]._highlight = false;
      //     this.config.menuTableList.list[this.config.rowClickIndex]._highlight = true;
      //   }
      //   this.buttonDisabled = false;
      // },
      menuUseClose(item){
        // this.config.rowClickIndex = 0
        // this.system.rowClickIndex = 0
        let index = 0;
        for (let k = 0; k < item.menuChooseItem.length; k++) {
          if(item.menuChooseItem[k].use == 0){
            index++
          }
        }
        if(index == item.menuChooseItem.length){
          this.$Message.warning('已经全部关闭!');
          return;
        }
        let newItem
        for (let i = 0; i < item.menuChooseItem.length; i++) {
          newItem ={
            index:i,
            row:item.menuChooseItem[i]
          }
          if(item.level == 1){
            this.changeLevel1(newItem,false);
          }else if(item.level == 2){
            let arr = this.menu.menuTableList.list
            let brr = this.config.menuTableList.list
            this.changeSwitch(newItem,arr,brr,false);
            this.changeLevel2(newItem,false);
          } if(item.level == 3){
            let arr = this.config.menuTableList.list
            let brr = this.system.menuTableList.list
            this.changeSwitch(newItem,arr,brr,false);
            this.changeLevel3(newItem,false);
          }
        }
        item.menuDisabled = true;


      },
      // menuUseClose(item){
      //   let arr = [];
      //   let brr = [];
      //   if(item.level == 1){
      //     arr = this.menu.menuTableList.list;//原数组
      //     brr = this.menu.menuTableList.list;
      //     this.menu.menuTableList.list = [];
      //   }else if(item.level == 2){
      //     arr = this.config.menuTableList.list;
      //     brr = this.menu.menuTableList.list;
      //     this.config.menuTableList.list = [];
      //   }else{
      //     arr = this.system.menuTableList.list;
      //     brr = this.config.menuTableList.list;//原数组
      //     this.system.menuTableList.list = [];
      //   }
      //
      //
      //   let chooseIndex = 0;
      //   for (let k = 0; k < item.menuChooseItem.length; k++) {
      //     if(item.menuChooseItem[k].use == 1){
      //       chooseIndex ++
      //     }
      //   }
      //   let level = brr.map(function(value){return value.id;});
      //   let levelIndex
      //   if(item.menuChooseItem[0].fatherId == null){
      //     levelIndex = level.indexOf(item.menuChooseItem[0].id)
      //   }else{
      //     levelIndex = level.indexOf(item.menuChooseItem[0].fatherId)
      //   }
      //
      //   if(chooseIndex == 0){
      //     if(item.level == 1){
      //       this.menu.menuTableList.list = arr;
      //     }else if(item.level == 2){
      //       this.config.menuTableList.list = arr;
      //
      //     }else{
      //       this.system.menuTableList.list = arr;
      //     }
      //     this.$Message.warning('已经全部关闭!');
      //     return;
      //   }
      //
      //   let na = arr.map(function(value){return value.id;});
      //   let index = null;
      //   for (let i = 0; i < item.menuChooseItem.length; i++) {
      //     if(na.includes(item.menuChooseItem[i].id)) {
      //       index = na.indexOf(item.menuChooseItem[i].id);
      //       arr[index].use = 0;
      //     }
      //   }
      //
      //
      //
      //
      //   if(item.level == 1){
      //     this.menu.menuTableList.list = arr;
      //     this.menu.menuDisabled = true;
      //   }else if(item.level == 2){
      //     this.config.menuTableList.list = arr;
      //     this.config.menuDisabled = true;
      //
      //   }else{
      //     this.system.menuTableList.list = arr;
      //     this.system.menuDisabled = true;
      //   }
      //
      //   brr[levelIndex].sonCountInUse = brr[levelIndex].sonCountInUse - chooseIndex
      //
      //   // if(this.menu.menuTableList.list.length != 0){
      //   //   this.menu.menuTableList.list[0]._highlight = false;
      //   //   this.menu.menuTableList.list[this.menu.rowClickIndex]._highlight = true;
      //   // }
      //   if(this.config.menuTableList.list.length != 0){
      //     for (let number = 0; number < this.menu.menuTableList.list.length; number++) {
      //       this.menu.menuTableList.list[number]._highlight = false;
      //     }
      //     this.menu.menuTableList.list[this.menu.rowClickIndex]._highlight = true;
      //   }
      //   if(this.system.menuTableList.list.length != 0){
      //     for (let b = 0; b < this.config.menuTableList.list.length; b++) {
      //       this.config.menuTableList.list[b]._highlight = false;
      //     }
      //     this.config.menuTableList.list[this.config.rowClickIndex]._highlight = true;
      //   }
      //   this.buttonDisabled = false;
      //
      // },
      buttonSubimt(){
        this.changeList(this.menu.menuTableList.list)
        insertMenu({
          "menuList":this.menu.menuTableList.list
        }).then(res => {
          this.apiAll();
        }).catch(err => {
          this.$Message.error(err);
        })
      },
      changeList(list){
        if(list!=undefined && list.length>0){
          for(let i=0;i<list.length;i++){
            let item=list[i];
            delete item['_highlight'];
            let children = item.sonList;
            this.changeList(children)
          }
        }
      },
      changeSwitch(params,value,arr){
        if(value){
          // if(params.row.use != 1){
          //   arr[index].sonCountInUse = arr[index].sonCountInUse + 1
          // }
          params.row.use = 1
        }else{
          // if(params.row.use != 0){
          //   arr[index].sonCountInUse = arr[index].sonCountInUse - 1
          // }
          params.row.use = 0
        }
        arr.menuTableList.list[params.index] = params.row

        // let that = this;
        //
        // let na = arr.map(function(value){return value.id;});
        // let index = na.indexOf(params.row.fatherId)
        //
        //
        // let ba = brr.map(function(value){return value.id;});
        // let bndex = ba.indexOf(params.row.id)
        // if(value){
        //   if(brr[bndex].use != 1){
        //     arr[index].sonCountInUse = arr[index].sonCountInUse + 1
        //   }
        //   brr[bndex].use = 1
        // }else{
        //   if(brr[bndex].use != 0){
        //     arr[index].sonCountInUse = arr[index].sonCountInUse - 1
        //   }
        //   brr[bndex].use = 0
        // }
        // for (let i = 0; i < brr.length; i++) {
        //   brr[i]._highlight = false;
        // }
        // for (let i = 0; i < arr.length; i++) {
        //   arr[i]._highlight = false;
        // }
        // arr[index]._highlight = true;
        // if(params.row.level == 1){
        //   brr[this.menu.rowClickIndex]._highlight = true;
        // }else if(params.row.level == 2){
        //   brr[this.config.rowClickIndex]._highlight = true;
        // }else{
        //   brr[this.system.rowClickIndex]._highlight = true;
        // }
        //
        // this.buttonDisabled = false;
        //
        //
        // this.menu.menuTableList.list
      },

      changeLevel1(params,value){
        let arr = this.menu.menuTableList.list
        this.menu.menuTableList.list = []
        let arrIdItem = arr.map(function(value){return value.id;});
        let i = arrIdItem.indexOf(params.row.id)
        // let i = params.index
        if(value){
          arr[i].use = 1;
          arr[i].sonCountInUse = arr[i].sonList.length;
          for (let j = 0; j < arr[i].sonList.length; j++) {
            arr[i].sonList[j].use = 1;
            arr[i].sonList[j].sonCountInUse = arr[i].sonList[j].sonList.length;
            for (let k = 0; k < arr[i].sonList[j].sonList.length; k++) {
              arr[i].sonList[j].sonList[k].use = 1;
              arr[i].sonList[j].sonList[k].sonCountInUse = 0;
            }
          }
        }else{
          arr[i].use = 0;
          arr[i].sonCountInUse = 0;
          for (let e = 0; e < arr[i].sonList.length; e++) {
            arr[i].sonList[e].use = 0;
            arr[i].sonList[e].sonCountInUse = 0;
            for (let f = 0; f < arr[i].sonList[e].sonList.length; f++) {
              arr[i].sonList[e].sonList[f].use = 0;
              arr[i].sonList[e].sonList[f].sonCountInUse = 0;
            }
          }
        }


        this.menu.menuTableList.list = arr;
        for (let n = 0; n < this.menu.menuTableList.list.length; n++) {
          this.menu.menuTableList.list[n]._highlight = false;
        }
        // this.menu.menuTableList.list[this.menu.rowClickIndex]._highlight = true;


        this.config.menuTableList.list = arr[this.menu.rowClickIndex].sonList;
        for (let v = 0; v < this.config.menuTableList.list.length; v++) {
          this.config.menuTableList.list[v]._highlight = false;
        }

        this.config.menuTableList.list[this.config.rowClickIndex]._highlight = true;


        if(arr[i].sonList.length != 0){
          if(this.system.menuTableList.list.length != 0){
            this.system.menuTableList.list = arr[i].sonList[0].sonList;
            for (let t = 0; t < this.system.menuTableList.list.length; t++) {
              this.system.menuTableList.list[t]._highlight = false;
            }
            // if(this.system.menuTableList.list.length != 0){
            //   this.system.menuTableList.list[this.system.rowClickIndex]._highlight = true;
            // }
          }
        }
        this.buttonDisabled = false;
      },
      changeLevel2(params,value){
        let arr = this.config.menuTableList.list
        this.config.menuTableList.list = []
        let arrIdItem = arr.map(function(value){return value.id;});
        let i = arrIdItem.indexOf(params.row.id)
        // let i = params.index
        if(value){
          arr[i].use = 1;
          arr[i].sonCountInUse = arr[i].sonList.length;
          for (let j = 0; j < arr[i].sonList.length; j++) {
            arr[i].sonList[j].use = 1;
            arr[i].sonList[j].sonCountInUse = arr[i].sonList.length;
          }
        }else{
          arr[i].use = 0;
          arr[i].sonCountInUse = 0;
          for (let e = 0; e < arr[i].sonList.length; e++) {
            arr[i].sonList[e].use = 0;
            arr[i].sonList[e].sonCountInUse = 0;
          }
        }



        for (let v = 0; v < this.config.menuTableList.list.length; v++) {
          this.config.menuTableList.list[v]._highlight = false;
        }


        this.config.menuTableList.list = arr;
        // this.config.menuTableList.list[this.config.rowClickIndex]._highlight = true;


        if(arr[i].sonList.length != 0){
          if(this.system.menuTableList.list.length != 0){
            this.system.menuTableList.list = arr[this.config.rowClickIndex].sonList;
            for (let t = 0; t < this.system.menuTableList.list.length; t++) {
              this.system.menuTableList.list[t]._highlight = false;
            }
            // if(this.system.menuTableList.list.length != 0){
            //   this.system.menuTableList.list[this.system.rowClickIndex]._highlight = true;
            // }
          }
        }
        this.menu.menuTableList.list
        this.buttonDisabled = false;


      },
      changeLevel3(params,value){
        let arr = this.system.menuTableList.list
        this.system.menuTableList.list = []
        let arrIdItem = arr.map(function(value){return value.id;});
        let i = arrIdItem.indexOf(params.row.id)
        if(value){
          arr[i].use = 1;

        }else{
          arr[i].use = 0;
        }



        for (let v = 0; v < this.system.menuTableList.list.length; v++) {
          this.system.menuTableList.list[v]._highlight = false;
        }

        this.system.menuTableList.list = arr;
        this.menu.menuTableList.list[this.menu.rowClickIndex].sonList[this.config.rowClickIndex].sonList = arr

        // this.config.menuTableList.list[this.config.rowClickIndex]._highlight = true;



        this.menu.menuTableList.list
        this.buttonDisabled = false;
      }


    },
    created() {

    },
    mounted() {
      this.apiAll();
    },
  }
</script>

<style scoped lang="less">
  @deep: ~'>>>';
  @{deep}.ivu-card-body {
    padding: 10px !important;
    height: 100%;
  }
  @{deep}.ivu-checkbox-wrapper {
    margin-right: 0!important;
  }
  .left{
    >div{
      display: flex;
      align-items: center;
      >div{
        margin:5px;
      }
      >div:nth-of-type(1){
        margin: 5px 0;
      }
      >button{
        width: 60px;
        padding: 0 5px;
      }
    }
  }
  .box{
    height: 100%!important;
    >div{
      height: 100%!important;
      >div{
        height: 100%!important;
        >div{
          height: 100%!important;
        }
      }
    }
  }
  @{deep}.ivu-table-cell{
    padding: 0 5px;
  }
</style>

