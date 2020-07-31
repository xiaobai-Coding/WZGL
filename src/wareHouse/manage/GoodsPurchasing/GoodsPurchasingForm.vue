<!--新增编辑采购页面 -->

<template>
  <div class="v-clock">
    <Form class="formClass" ref="obj" :model="obj" :label-width="100" :rules="ruleInline">
      <div>
        <FormItem label="采购单名称:" prop="name">
          <Input type="text" v-model="obj.name" placeholder="">
          </Input>
        </FormItem>
        <FormItem label="采购单号:">
          <Input type="text" v-model="obj.num" placeholder="自动生成" disabled/>
        </FormItem>
      </div>
      <div>
        <FormItem label="所属项目:" prop="projectId">
          <Select v-model="obj.projectId" placeholder="请选择" @on-change="changeProject">
            <Option v-for="(item,index) in projectList"
                    :value="item.id"
                    :label="item.name"
                    :key="index">
            </Option>
          </Select>
        </FormItem>
        <FormItem label="计划采购日期:">
          <DatePicker type="date" v-model="obj.date"  placeholder="计划采购日期"   format="yyyy-MM-dd"
                      :options="options" @on-change="getCustomDate" style="width: 100%"></DatePicker>
        </FormItem>

      </div>
      <div>
        <FormItem label="申请人姓名:" >
          <Input type="text" v-model="obj.applyUserName" placeholder=""/>
        </FormItem>

        <FormItem label="申请人电话:" >
          <Input type="text" v-model="obj.applyUserPhone" placeholder=""/>
        </FormItem>
      </div>
      <div>
        <FormItem label="审核人姓名:" >
          <Input type="text" v-model="obj.reviewerUserName" placeholder=""/>
        </FormItem>

        <FormItem label="审核人电话:" >
          <Input type="text" v-model="obj.reviewerUserPhone" placeholder=""/>
        </FormItem>
      </div>
      <div>
        <FormItem label="采购用途:" >
          <Input type="textarea" :autosize="{minRows: 1,maxRows: 1}" v-model="obj.purpose" placeholder="">
          </Input>
        </FormItem>
      </div>
      <div>
        <FormItem label="备注说明:" >
          <Input type="textarea" :autosize="{minRows: 3,maxRows: 3}" v-model="obj.remarks" placeholder="">
          </Input>
        </FormItem>
      </div>
      <div style="display: flex;justify-content: space-between;align-items: center">
        <div style="width: 80%">
          <Divider>采购清单</Divider>
        </div>
        <Button type="primary"  @click="addGoods">添加商品 </Button>
      </div>

      <div>
        <PurchasingGoodsListEditForm
          ref="editForm"
          :tableList="selectList"
          @FetchEditList="FetchEditList"
          >
        </PurchasingGoodsListEditForm>
      </div>
    </Form>



    <!--选择商品对话框-->
    <Modal
      v-model="selectGoodsModal"
      title="添加采购商品 / 物品采购单"
      :mask-closable="false"
      @on-ok="submitGoods"
      @on-cancel="selectGoodsModal=false"
      width="800"
      ok-text = '提交'
      cancel-text = '取消'>
      <SelectGoodsForm
        ref="form"
        :selectList="selectList"
        @fetchSelectGoods="fetchSelectGoods"
      >
      </SelectGoodsForm>
    </Modal>
  </div>
</template>

<script>
  import { } from '@/axios/api';
  import PurchasingGoodsListEditForm from "../../manage/GoodsPurchasing/PurchasingGoodsListEditForm";
  import SelectGoodsForm from "../../manage/GoodsPurchasing/SelectGoodsListForm";
  export default {
    name: "GoodsPurchasingForm",
    components: {
      PurchasingGoodsListEditForm,SelectGoodsForm
    },
    props: ['obj','projectList'],
    data() {
      return {
        ruleInline:{
          name: [
            { required: true, message: '请输入采购单名称', trigger: 'blur' }
          ],
          projectId:[
            {required: true, message: '请选择所属项目', trigger: 'change'}],

        },
        options: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now();
          }
        },
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
          that.selectList.list=that.obj.detailList;
        },100)

      },
      changeProject(value){
        this.obj.projectId=value;
        let that=this;
        this.projectList.forEach(function (item) {
          if(item.id==value){
            that.obj.projectName=item.name;
            return;
          }
        })
      },
      getCustomDate(date){
        this.obj.date=date;
      },

      addGoods(){
        this.selectGoodsModal=true;
        this.$refs.form.getPageList();
      },
      submitGoods(){
        this.$refs.form.getSelectGoods();
      },
      fetchSelectGoods(selection){
        this.selectList.list=selection;
        this.$refs.editForm.setData(this.selectList);
      },

      FetchEditList(goods){
        this.obj.detailList=goods.list;
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
    >div:nth-of-type(5){
      display: block;
      >div:nth-of-type(1){
        width: 100%;
      }
    }
    >div:nth-of-type(6){
      display: block;
      >div:nth-of-type(1){
        width: 100%;
      }
    }

    >div:nth-of-type(8){
      display: block;
      >div:nth-of-type(1){
        width: 100%;
      }
    }
  }
  @{deep}.ivu-modal-footer{
    text-align: center!important;
  }
</style>
