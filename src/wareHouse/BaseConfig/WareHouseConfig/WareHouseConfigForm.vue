
<template>
  <div class="v-clock">
    <Form class="formClass" ref="obj" :model="obj" :label-width="100" :rules="ruleInline">
      <div>
        <FormItem label="仓库名称:" prop="name">
          <Input type="text" v-model="obj.name" placeholder="">
          </Input>
        </FormItem>
        <FormItem label="所在地:">
          <Cascader :data="cityList" v-model="City"  :render-format="format" @on-change="changeCity" style="padding-top: 5px"></Cascader>
        </FormItem>
      </div>
      <div>
        <FormItem label="所属组织:" prop="organizationId" >
          <Select v-model="obj.organizationId" placeholder="请选择" @on-change="changeOrg" :disabled="user.user.admin!=1">
            <Option v-for="(item,index) in orgList"
                    :value="item.id"
                    :label="item.name"
                    :key="index">
            </Option>
          </Select>
        </FormItem>
        <FormItem label="所属项目:">
          <Select v-model="obj.projectId" placeholder="请选择" @on-change="changeProject">
            <Option v-for="(item,index) in projectList"
                    :value="item.id"
                    :label="item.name"
                    :key="index">
            </Option>
          </Select>
        </FormItem>
      </div>
      <div>
        <FormItem label="负责人:" prop="head">
          <Select v-model="obj.head" placeholder="请选择" @on-change="changeHeader">
            <Option v-for="(item,index) in headerList"
                    :value="item.id"
                    :label="item.name+'/'+item.departmentName"
                    :key="index">
            </Option>
          </Select>
        </FormItem>

        <FormItem label="负责人电话:" prop="headPhone">
          <Input type="text" v-model="obj.headPhone" placeholder=""/>
        </FormItem>
      </div>
      <div>
        <FormItem label="备注说明:" >
          <Input type="textarea" :autosize="{minRows: 5,maxRows: 5}" v-model="obj.remarks" placeholder="">
          </Input>
        </FormItem>
      </div>
      <div>
        <FormItem label="是否启用:">
          <Select v-model="obj.use" placeholder="请选择状态">
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
  import { getAllProjectsByOrgId,getAllUsers} from '@/axios/api';
  export default {
    name: "WareHouseConfigForm",
    components: {
    },
    props: ['obj','switchArr','orgList'],
    data() {
      return {
        ruleInline:{
          name: [
            { required: true, message: '请输入仓库名称', trigger: 'blur' }
          ],
          organizationId:[
            {required: true, message: '请选择所属组织', trigger: 'change'}],
          head:[
            {required: true, message: '请选择负责人', trigger: 'change'}],
          headPhone:[
            {required: true, message: '请填写负责人电话', trigger: 'blur'}],
        },


        cityList:this.$cityUtil.getCityList(),
        City:[],

        projectList:[],

        headerList:[],


        user:this.$store.getters.submitData,
      }
    },
    computed: {},
    watch: {
    },
    methods: {
      format (labels, selectedData) {
        return labels.join('>');
      },
      changeCity(value, selectedData){
        this.City=value;
        this.obj.location=value.join('>');
      },
      changeOrg(value){
        this.obj.organizationId=value;
        let that=this;
        this.orgList.forEach(function (item) {
          if(item.id==value){
            that.obj.organizationName=item.name;
            return;
          }
        })
        this.getProjectList(this.obj.organizationId);
      },
      //根据组织id获取所有项目,现在的接口需要增加参数
      getProjectList(orgId){
        let data = {
          organId:orgId
        }
        getAllProjectsByOrgId(data).then(res => {
          this.projectList = res;
          if(this.projectList!=undefined && this.projectList.length>0){
            this.obj.projectId=this.projectList[0].id;
            this.obj.projectName=this.projectList[0].name;
          }else{
            this.obj.projectId=null;
            this.obj.projectName=null;
          }
        }).catch(err => {

        })
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
        this.getProjectList(this.obj.organizationId);
      },
      //获取负责人
      getHeaderList(){
        getAllUsers().then(res => {
          this.headerList = res;
        }).catch(err => {

        })
      },
      changeHeader(value){
        this.obj.head=value;
        let that=this;
        this.headerList.forEach(function (item) {
          if(item.id==value){
            that.obj.headName=item.name;
            that.obj.headPhone=item.phone;
            return;
          }
        })
      },

    },
    created() {

    },
    mounted() {
      this.getHeaderList();
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
    >div:nth-of-type(4){
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
