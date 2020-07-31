
<template>
  <div class="v-clock">
    <Form class="formClass" ref="obj" :model="obj" :label-width="100" :rules="ruleInline">
      <div>
        <FormItem label="出库类型:">
          <Select v-model="obj.type" placeholder="请选择出库类型"  @on-change="changeOutType">
            <Option v-for="(item,index) in typeList"
                    :value="item.value"
                    :label="item.label"
                    :key="index">
            </Option>
          </Select>
        </FormItem>
      </div>

      <div v-if="lay0" >
        <div>
          <FormItem label="领用人姓名:" prop="receiveName">
            <Input type="text" v-model="obj.receiveName" placeholder=""/>
          </FormItem>

          <FormItem label="领用人电话:" prop="receivePhone">
            <Input type="text" v-model="obj.receivePhone" placeholder=""/>
          </FormItem>
        </div>
        <div>
          <FormItem label="审批人姓名:" prop="operaterUserName">
            <Input type="text" v-model="obj.operaterUserName" placeholder=""/>
          </FormItem>

          <FormItem label="审批人电话:" prop="operaterUserPhone">
            <Input type="text" v-model="obj.operaterUserPhone" placeholder=""/>
          </FormItem>
        </div>
        <div>
          <FormItem label="用途:" >
            <Input type="textarea" :autosize="{minRows: 1,maxRows: 1}" v-model="obj.purpose" placeholder="">
            </Input>
          </FormItem>
          <FormItem label="出库日期:" prop="outDate">
            <DatePicker type="date" v-model="obj.outDate"  placeholder="出库日期"   format="yyyy-MM-dd"
                        :options="options" @on-change="getCustomDate" style="width: 100%"></DatePicker>
          </FormItem>

        </div>
      </div>
      <!--- 资产外借页面----->
      <div v-if="lay1">
          <div>
            <FormItem label="借用人姓名:">
              <Input type="text" v-model="obj.borrowUserName" placeholder=""/>
            </FormItem>

            <FormItem label="借用人电话:" >
              <Input type="text" v-model="obj.borrowUserPhone" placeholder=""/>
            </FormItem>
          </div>
          <div>
            <FormItem label="审批人姓名:" >
              <Input type="text" v-model="obj.approverUserName" placeholder=""/>
            </FormItem>

            <FormItem label="审批人电话:">
              <Input type="text" v-model="obj.approverUserPhone" placeholder=""/>
            </FormItem>
          </div>
        <div>
          <FormItem label="出库日期:">
            <DatePicker type="date" v-model="obj.date"  placeholder="出库日期"   format="yyyy-MM-dd"
                        :options="options" @on-change="getCustomDate" style="width: 100%"></DatePicker>
          </FormItem>
        </div>
      </div>
      <!--- 物品调拨页面----->
      <div v-if="lay2">
        <div>
        <FormItem label="调往何处:" prop="type" style="width: 100%">
          <Select v-model="obj.type" placeholder="请选择仓库" @on-change="changeHouse">
            <Option v-for="(item,index) in houseList"
                    :value="item.id"
                    :label="item.name"
                    :key="index">
            </Option>
          </Select>
        </FormItem>
        </div>
        <div>
          <FormItem label="责任人姓名:">
            <Input type="text" v-model="obj.headName" placeholder=""/>
          </FormItem>

          <FormItem label="责任人电话:" >
            <Input type="text" v-model="obj.headPhone" placeholder=""/>
          </FormItem>
        </div>
        <div>
          <FormItem label="出库日期:">
            <DatePicker type="date" v-model="obj.date"  placeholder="出库日期"   format="yyyy-MM-dd"
                        :options="options" @on-change="getCustomDate" style="width: 100%"></DatePicker>
          </FormItem>
          <FormItem label="调往日期:">
            <DatePicker type="date" v-model="obj.date2"  placeholder="调往日期"   format="yyyy-MM-dd"
                        :options="options" @on-change="getCustomDate" style="width: 100%"></DatePicker>
          </FormItem>
        </div>
        <div>
          <FormItem label="审批人姓名:" >
            <Input type="text" v-model="obj.approverUserName" placeholder=""/>
          </FormItem>

          <FormItem label="审批人电话:">
            <Input type="text" v-model="obj.approverUserPhone" placeholder=""/>
          </FormItem>
        </div>
      </div>

      <!--- 以旧换新----->
      <div v-if="lay3">
        <div>
          <FormItem label="领用人姓名:">
            <Input type="text" v-model="obj.checkOutUserName" placeholder=""/>
          </FormItem>

          <FormItem label="领用人电话:" >
            <Input type="text" v-model="obj.checkOutUserPhone" placeholder=""/>
          </FormItem>
        </div>
        <div>
          <FormItem label="审批人姓名:" >
            <Input type="text" v-model="obj.approverUserName" placeholder=""/>
          </FormItem>

          <FormItem label="审批人电话:">
            <Input type="text" v-model="obj.approverUserPhone" placeholder=""/>
          </FormItem>
        </div>
        <div>
          <FormItem label="出库日期:">
            <DatePicker type="date" v-model="obj.date"  placeholder="出库日期"   format="yyyy-MM-dd"
                        :options="options" @on-change="getCustomDate" style="width: 100%"></DatePicker>
          </FormItem>
          <FormItem label="原物品状态:" >
            <Select v-model="obj.type" placeholder="请选择物品状态">
              <Option v-for="(item,index) in goodStatus"
                      :value="item.value"
                      :label="item.label"
                      :key="index">
              </Option>
            </Select>
          </FormItem>
        </div>
      </div>

      <div>
        <FormItem label="出库备注:" style="width: 100%">
          <Input type="textarea" :autosize="{minRows: 5,maxRows: 5}" v-model="obj.remarks" placeholder="">
          </Input>
        </FormItem>
      </div>

      <div style="display: flex;justify-content: space-between;align-items: center">
        <div style="width: 80%">
          <Divider>出库清单</Divider>
        </div>
        <Button type="primary"  @click="addGoods">添加商品 </Button>
      </div>

      <div>
        <GoodsOutListWithEdit
          ref="editForm"
          :tableList="selectList"
          @FetchEditList="FetchEditList"
        >
        </GoodsOutListWithEdit>
      </div>
    </Form>


    <!--选择商品对话框-->
    <Modal
      v-model="selectGoodsModal"
      title="添加商品 / 物品出库单"
      :mask-closable="false"
      @on-ok="submitGoods"
      @on-cancel="selectGoodsModal=false"
      width="800"
      ok-text = '提交'
      cancel-text = '取消'>
      <SelectGoodsListFromHouse
        ref="form"
        :selectList="selectList"
        :houseList="houseList"
        :categoryList="categoryList"
        @fetchSelectGoods="fetchSelectGoods"
      >
      </SelectGoodsListFromHouse>
    </Modal>

  </div>
</template>

<script>
  import GoodsOutListWithEdit from "../../manage/WareHouseOut/GoodsOutListWithEdit";
  import SelectGoodsListFromHouse from "../../manage/WareHouseOut/SelectGoodsListFromHouse";

  import {getWareHouseConfigList } from '@/axios/api';
  export default {
    name: "WareHouseOutForm",
    components: {
      GoodsOutListWithEdit,SelectGoodsListFromHouse
    },
    props: ['obj','categoryList'],
    data() {
      return {
        ruleInline:{
          receiveName: [
            { required: true, message: '请输入领用人姓名', trigger: 'blur' }
          ],
          receivePhone:[
            {required: true, message: '请输入领用人电话', trigger: 'blur'}],
          operaterUserName:[
            {required: true, message: '请输入审核人姓名', trigger: 'blur'}],
          operaterUserPhone:[
            {required: true, message: '请输入审核人电话', trigger: 'blur'}],
          outDate:[
            {required: true, message: '请选择出库日期', trigger: 'change'}],
        },

        options: {
          disabledDate (date) {
            //return date && date.valueOf() < Date.now();
          }
        },
        lay0:true,
        lay1:false,
        lay2:false,
        lay3:false,

        typeList:[
          {value:0,label:'物资领用'},{value:1,label:'资产外借'},{value:2,label:'物品调拨'},{value:3,label:'以旧换新'},
        ],

        houseList:[],
        goodStatus:[{value:0,label:'未失效'},{value:1,label:'已失效'}],

        selectList:{list:[]},
        selectGoodsModal:false,
        user:this.$store.getters.submitData,
      }
    },
    computed: {},
    watch: {
    },
    methods: {
      initSelection(){
        let that=this;
        setTimeout(function () {
          that.selectList.list=that.obj.outReviceWzlyDetailList;
        },100)

      },
      changeOutType(value){
        switch (value) {
          case 0:
            this.lay0=true;
            this.lay1=false;
            this.lay2=false;
            this.lay3=false;
            break;
          case 1:
            this.lay0=false;
            this.lay1=true;
            this.lay2=false;
            this.lay3=false;
            break;
          case 2:
            this.lay0=false;
            this.lay1=false;
            this.lay2=true;
            this.lay3=false;
            break;
          case 3:
            this.lay0=false;
            this.lay1=false;
            this.lay2=false;
            this.lay3=true;
            break;
        }
      },
      getCustomDate(date){
        this.obj.outDate = date

      },
      getPageList(){
        let data = {
          pageNum:1,

        }
        getWareHouseConfigList(data)
          .then(res => {
            this.houseList = res.list;
          }).catch(err => {
          this.$Message.error(err);
        })
      },
      changeHouse(value){
        // this.obj.houseId=value;
        // let that=this;
        // this.houseList.forEach(function (item) {
        //   if(item.id==value){
        //     that.obj.houseName=item.name;
        //     return;
        //   }
        // })
      },


      addGoods(){
        this.selectGoodsModal=true;
        this.$refs.form.getPageList(1);
      },
      submitGoods(){
        this.$refs.form.getSelectGoods();
      },
      fetchSelectGoods(selection){
        this.selectList.list=selection;
        this.$refs.editForm.setData(this.selectList);
      },

      FetchEditList(goods){
        this.obj.outReviceWzlyDetailList=goods.list;
      },

      getGoodsResult(){
        this.$refs.editForm.getData();
      }
    },
    created() {

    },
    mounted() {

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
    >div:nth-of-type(1){
      display: block;
      >div:nth-of-type(1){
        width: 100%;
      }
    }
    >div:nth-of-type(5){
      display: block;
      >div:nth-of-type(1){
        width: 100%;
      }
    }
    >div:nth-of-type(2){
      display: flex;
      flex-direction: column;
      >div{
        width: 100%;
        display: flex;
        justify-content: space-between;
        >div{
          width: 50%;
        }
      }
    }
  }
  @{deep}.ivu-modal-footer{
    text-align: center!important;
  }
</style>
