<template>
  <div class="v-clock">
    <div style="display: flex;justify-content: center;align-items: center;margin-bottom: 10px">
      <Input style="width: 80%" search enter-button placeholder="请输入商品名称或编号" v-model="search.name" @on-click="getPageList()"/>
      <Button type="primary"  @click="showModal=true" style="margin-left: 20px;display: none"> 新增商品 </Button>
    </div>
    <tableTemplate
      ref="tableTemplate"
      :tableList="tableList"
      :columns="columns"
      :height="600"
      :size="'small'"
      @onSelectionChange="onSelectionChange">
    </tableTemplate>
  </div>
</template>

<script>
  import tableTemplate from '@/commonComponent/tableTemplate';
  import {getAllGoodsManagesList, } from '@/axios/api';
    export default {
      name: "SelectGoodsListForm",
      components: {
        tableTemplate
      },
      props: ['selectList'],
      data() {
        return {
          search:{
            name:'',
          },
          showModal:false,

          tableList:{list:[]},

          columns:[
            {
              title:'序号',
              type: 'index',
              width: 80,
              align: 'center'
            },
            {
              title: '商品名称',
              key: 'goodsName',
              align: 'center',
            },
            {
              title: '商品编号',
              key: 'num',
              align: 'center',
            },
            {
              title: '物品类别',
              key: 'categoryName',
              align: 'center',
            },
            {
              title: '品牌',
              key: 'brand',
              align: 'center',
            },
            {
              title: '规格',
              key: 'model',
              align: 'center',
            },
            {
              title: '单位',
              key: 'unit',
              align: 'center',
            },
            {
              title: '商品参考价(元)',
              key: 'price',
              align: 'center',
            },
            // {
            //   title: '备注',
            //   key: 'remarks',
            //   align: 'center',
            // },
            {
              title: '采购记录',
              key: 'recordCount',
              align: 'center',
            },
            {
              title: '历史采购价单价区间',
              key: 'priceRange',
              align: 'center',
            },
            {
              title: '操作',
              type: 'selection',
              align:'center',
              width:80,
            },
          ]
        }
      },
      computed: {},
      watch: {
      },
      methods: {
        getPageList() {
          let data = {}
          if (this.search.name) {
            data.searchContent = this.search.name;
          }
          let that=this;
          getAllGoodsManagesList(data)
            .then(res => {
              that.tableList.list = res;
              that.tableList.list.forEach(function (item,index) {
                item.count=1;
                item.totalPrice=item.count*item.price;
                item.remarks="";
              })
              //回显已经选中的
              setTimeout(function () {
                that.showSelection();
              },200)
            }).catch(err => {
            this.$Message.error(err);
          })
        },
        showSelection(){
          let that=this;
          if(that.selectList.list!=undefined && that.selectList.list.length>0){
            this.tableList.list.forEach(function (item,index) {
              that.selectList.list.forEach(function (selection) {
                if(item.id==selection.id){
                  that.$refs.tableTemplate.$refs.table.objData[index]._isChecked = true;
                }
              })
            })
          }
          this.tableList.list.forEach(function (item,index) {
            if(item.count==0) {
              that.$refs.tableTemplate.$refs.table.objData[index]._isDisabled = true;
            }
          })

        },
        onSelectionChange(selection){
          console.log(selection.length);
          this.selectList.list=selection;
        },
        getSelectGoods(){
          this.$emit('fetchSelectGoods',this.selectList.list)
        },
      },
      created() {

      },
      mounted() {

      },

    }
</script>

<style scoped>

</style>
