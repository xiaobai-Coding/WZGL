<template>
  <div class="v-clock">
    <div style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 10px">
      <Select v-model="search.houseId" placeholder="所属仓库" style="width: 20%" clearable>
        <Option v-for="(item,index) in houseList"
                :value="item.id"
                :label="item.name"
                :key="index">
        </Option>
      </Select>
      <Cascader v-model="search.categoryId" :data="categoryList" trigger="hover" style="width: 20%"></Cascader>
      <Input style="width: 20%"  placeholder="物品名称" v-model="search.name" clearable/>
      <Button type="primary" @click="getPageList()">查询</Button>
    </div>
    <tableTemplate
      ref="tableTemplate"
      :tableList="tableList"
      :columns="columns"
      :height="600"
      :size="'small'"
      @onSelectionChange="onSelectionChange"
    >
    </tableTemplate>
  </div>
</template>

<script>
  import tableTemplate from '@/commonComponent/tableTemplate';
  import {getInWareHouseGoodsList, } from '@/axios/api';
    export default {
      name: "SelectGoodsListFromHouse",
      components: {
        tableTemplate
      },
      props: ['houseList','categoryList','selectList'],
      data() {
        return {
          search:{
            houseId:'',
            categoryId:[],
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
              title: '所在仓库',
              key: 'storeName',
              align: 'center',
            },
            {
              title: '物品名称',
              key: 'goodsName',
              align: 'center',
            },
            {
              title: '物品编号',
              key: 'num',
              align: 'center',
            },
            {
              title: '物品类别',
              key: 'categoryName',
              align: 'center',
            },
            {
              title: '规格型号',
              key: 'model',
              align: 'center',
            },
            {
              title: '单位',
              key: 'unit',
              align: 'center',
            },

            {
              title: '库存',
              key: 'count',
              align: 'center',
              render: (h, params) => {
                return h('a', [
                  h('span', {
                    style: {
                      color:'#5599e5'
                    },
                  },params.row.count),])}
            },
            // {
            //   title: '出库数量',
            //   key: 'count',
            //   align: 'center',
            // },
            {
              title: '操作',
              type: 'selection',
              align:'center',
              width:80,
            },
          ],
        }
      },
      computed: {},
      watch: {
      },
      methods: {
        //获取所有已入库的商品，从入库的商品中选择
        getPageList(page) {
          let data = {

          }
          if (this.search.houseId) {
            data.storeId = this.search.houseId;
          }
          if (this.search.categoryId.length>0) {
            data.categoryId = this.search.categoryId[this.search.categoryId.length-1];
          }
          if (this.search.name) {
            data.searchContent = this.search.name;
          }
          let that=this;
          getInWareHouseGoodsList(data)
            .then(res => {
              that.tableList.list = res;
              that.tableList.list.forEach(function (item,index) {
                item.outCount=1;
                })
              //回显已经选中的
              setTimeout(function () {
                that.showSelection();
              },200)
            }).catch(error => {
            this.$Message.error(error);
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
