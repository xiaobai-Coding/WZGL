
<template>
  <div class="v-clock">
    <Form class="formClass" ref="obj" :model="obj" :label-width="100" :rules="ruleInline">
      <div>
        <FormItem label="名称:" prop="name">
          <Input type="text" v-model="obj.name" placeholder="">
          </Input>
        </FormItem>
        <FormItem label="供应商类别:" prop="category">
          <Select v-model="obj.category" placeholder="请选择状态">
            <Option v-for="(item,index) in supplierCategoryList"
                    :value="item.id"
                    :label="item.name"
                    :key="index">
            </Option>
          </Select>
        </FormItem>
      </div>
      <div>
        <FormItem label="联系人:">
          <Input type="text" v-model="obj.contactsName" placeholder="">
          </Input>
        </FormItem>
        <FormItem label="联系电话:" >
          <Input type="text" v-model="obj.contactsPhone" placeholder="">
          </Input>
        </FormItem>
      </div>
      <div>
        <FormItem label="地址:" >
          <Input type="text" v-model="obj.location" placeholder="">
          </Input>
        </FormItem>
      </div>
      <div>
        <FormItem label="是否启用:">
          <Select v-model="obj.enable" placeholder="请选择状态">
            <Option v-for="(item,index) in switchArr"
                    :value="item.value"
                    :label="item.label"
                    :key="index">
            </Option>
          </Select>
        </FormItem>
      </div>
    </Form>




  </div>
</template>

<script>
  import { getSupplierCategoryListAll} from '@/axios/api';
  export default {
    name: "SupplierCompanyForm",
    components: {
    },
    props: ['obj'],
    data() {
      return {
        ruleInline:{
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          category:[
            {required: true, message: '请选择供应商类别', trigger: 'blur'}],
        },
        switchArr:[
          {
            value:0,
            label:'是',
          },
          {
            value:1,
            label:'否',
          },
        ],
        supplierCategoryList:[],
      }
    },
    computed: {},
    watch: {},
    methods: {
      getSupplierCategoryList(){
        let data = {
          pageNum:1
        }
        getSupplierCategoryListAll(data)
          .then(res => {
            this.supplierCategoryList = res;
          }).catch(err => {

        })
      },
    },
    created() {

    },
    mounted() {
      this.getSupplierCategoryList();
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
      margin:15px 0;
      display: flex;
      justify-content: space-between;
      >div{
        width: 50%;
      }
    }
    >div:nth-of-type(3){
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
