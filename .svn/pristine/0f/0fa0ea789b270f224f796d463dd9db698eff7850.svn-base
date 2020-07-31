<!--新增入库单页面 -->

<template>
  <div class="v-clock">
    <Form class="formClass" ref="obj" :model="obj" :label-width="100" :rules="ruleInline">
      <div>
        <FormItem label="物品类别:" prop="categoryId">
          <Cascader v-model="obj.categoryId" :data="categoryList" trigger="hover" :clearable="false" style="margin-top: 5px" @on-change="changeCategory" :disabled="obj.id"></Cascader>
        </FormItem>
        <FormItem label="物品名称:" prop="goodsId">
          <Select v-model="obj.goodsId" placeholder="请选择物品" @on-change="changeGoods" :disabled="obj.id">
            <Option v-for="(item,index) in goodsList"
                    :value="item.id"
                    :label="item.goodsName"
                    :key="index">
            </Option>
          </Select>
        </FormItem>
      </div>
      <!--<div>
        <FormItem label="物品编号:" >
          <Input type="text" v-model="obj.num" placeholder="物品编号" disabled/>
        </FormItem>

        &lt;!&ndash;<FormItem label="批次:" >
          <Input type="text" v-model="obj.series" placeholder="请输入批次"/>
        </FormItem>&ndash;&gt;
      </div>-->
      <div>
        <FormItem label="入库数量:" prop="count">
          <Input type="text" v-model="obj.count" placeholder="请输入入库数量" number maxlength="10"/>
        </FormItem>

        <FormItem label="入库日期:">
          <DatePicker type="date" v-model="obj.putInDate"  placeholder="入库日期"   format="yyyy-MM-dd"
                      :options="options" @on-change="getCustomDate" style="width: 100%"></DatePicker>
        </FormItem>
      </div>
      <div style="display: flex;flex: 1;">
        <FormItem label="存放地点:" prop="storeId" >
          <Select v-model="obj.storeId" placeholder="请选择存放地点" @on-change="changeStore">
            <Option v-for="(item,index) in wareHouseConfigList"
                    :value="item.id"
                    :label="item.name"
                    :key="index">
            </Option>
          </Select>
        </FormItem>
        <Button type="primary" @click="createWareHouse" style="margin-left: 5px;margin-top: 5px" :disabled="user.user.admin!=1">新建仓库</Button>
      </div>
      <div>
        <FormItem label="保管人:" >
          <Input type="text" v-model="obj.keeperName" placeholder=""/>
        </FormItem>

        <FormItem label="保管人电话:" >
          <Input type="text" v-model="obj.keeperPhone" placeholder=""/>
        </FormItem>
      </div>

    </Form>


  </div>
</template>

<script>
  import { getWareHouseConfigList} from '@/axios/api';
  import {getGoodsManagesList} from "../../../axios/api";
  export default {
    name: "WareHouseInForm",
    components: {

    },
    props: ['obj','categoryList','projectList','goodsList'],
    data() {
      return {
        goodsList:[],
        wareHouseConfigList:[],


        ruleInline:{
          categoryId: [
            { required: true, message: '请选择物品类别', trigger: 'change' ,type:'array'}
          ],
          goodsId: [
            { required: true, message: '请选择物品', trigger: 'change' }
          ],
          putInDate: [
            { required: true, message: '请选择入库日期', trigger: 'blur' }
          ],
          count: [
            { required: true, message: '请输入入库数量', trigger: 'blur' , type:'number'}
          ],
          projectId:[
            {required: true, message: '请选择存放地点', trigger: 'change'}],

        },
        options: {
          disabledDate (date) {
            return date && date.valueOf() > Date.now();
          }
        },


        user:this.$store.getters.submitData,
      }
    },
    computed: {},
    watch: {
    },
    methods: {

      changeCategory(value,selectedData){
        this.obj.categoryId = value;
        this.obj.categoryName = [];
        var that = this;
        selectedData.forEach(function (item) {
          that.obj.categoryName.push(item.label);
        })
        this.obj.categoryName=this.obj.categoryName.join('/');
        this.fetchCategoryGoods(1,this.obj.categoryId[this.obj.categoryId.length - 1]);
      },
      changeGoods(value){
        this.obj.goodsId =value;
        let that=this;
        this.goodsList.forEach(function (item) {
          if(item.id==value){
            that.obj.num = item.num;
            that.obj.model = item.model;
            that.obj.goodsName = item.goodsName;
            return;
          }
        })
      },
      changeStore(value){
        this.obj.storeId =value;
        let that=this;
        this.wareHouseConfigList.forEach(function (item) {
          if(item.id==value){
            that.obj.storeName = item.name;
            that.obj.organizationId = item.organizationId;
            that.obj.organizationName = item.organizationName;
            return;
          }
        })
      },

      getCustomDate(date){
        let value=date;
        this.obj.putInDate = value;
      },
      submit(){
        this.$refs.form.getSelectGoods();
      },
      fetchCategoryGoods(page, categoryId){
        let data = {
          pageNum:page,
          categoryId: categoryId,
          use:0,
        }
        getGoodsManagesList(data)
          .then(res => {
            this.goodsList = res.list;
          }).catch(err => {

        })
      },
      createWareHouse(){

      },

      getWareHouseList(page){
        let data = {
          pageNum:page
        }
        getWareHouseConfigList(data)
          .then(res => {
            this.wareHouseConfigList = res.list;
          }).catch(err => {

        })
      },
    },
    created() {

    },
    mounted() {
      this.getWareHouseList(1);

    },
  }
</script>

<style scoped lang="less">
  @deep: ~'>>>';
  @{deep}.ivu-card-body {
    padding: 10px !important;
  }
  .formClass{
    >div{
      display: flex;
      justify-content: space-between;
      >div{
        width: 50%;
      }
    }
    >div:nth-of-type(3){
      display: block;
      >div:nth-of-type(1){
        width: 85%;
      }
    }

  }
  @{deep}.ivu-modal-footer{
    text-align: center!important;
  }
</style>
