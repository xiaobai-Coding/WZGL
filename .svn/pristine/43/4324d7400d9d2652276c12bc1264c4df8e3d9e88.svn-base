
<template>
  <div class="v-clock">
    <Card>
      <Row>
        <i-button type="primary"  icon="ios-add" @click="addObj" >添加</i-button>
        <div style="float: right;display: flex;">
          <Select v-model="search.orgId" placeholder="请选择组织" style="margin-right: 10px">
            <Option v-for="(item,index) in orgList"
                    :value="item.id"
                    :label="item.name"
                    :key="index">
            </Option>
          </Select>
          <Select v-model="obj.status" placeholder="请选择状态" style="margin-right: 10px">
            <Option v-for="(item,index) in status"
                    :value="item.value"
                    :label="item.label"
                    :key="index">
            </Option>
          </Select>
          <i-input clearable v-model="search.content" placeholder="请输入关键字" style="margin-right: 10px"></i-input>
          <i-button type="primary"  icon="ios-search" @click="getPageList(1)">查询</i-button>
        </div>
      </Row>
      <Divider style="height: 2px;background-color:#eeeeee;margin-top: 10px;margin-bottom: 10px;"/>
      <tableTemplate
        :tableList="tableList"
        :columns="columns"
        :page="page"
        :size="'small'"
        @changePage="changePage">
      </tableTemplate>
    </Card>



    <Modal
      v-model="showModal"
      :title="title"
      :loading="submitLoading"
      :mask-closable="false"
      @on-ok="submit('obj')"
      @on-cancel="cancel"
      width="600"
      ok-text = '保存'
      cancel-text = '取消'>
      <WareHouseConfigForm
        ref="form"
        :obj="obj"
        :switchArr="status"
        :orgList="orgList"
      >
      </WareHouseConfigForm>
    </Modal>
  </div>


</template>


<script>
  import { getWareHouseConfigList,insertWareHouseConfig,updateWareHouseConfig,deleteWareHouseConfig,getAllOrganizations} from '@/axios/api';
  import tableTemplate from '@/commonComponent/tableTemplate'
  import WareHouseConfigForm from './WareHouseConfigForm'
  export default {
    name: "WareHouseConfigIndex",
    components: {
      tableTemplate,
      WareHouseConfigForm,
    },
    data() {
      return {
        tableList:{},
        page:{
          current:1,
        },
        search:{
          orgId:null,
          status:null,
          content:null,
        },
        columns: [
          {
            title:'序号',
            type: 'index',
            width: 80,
            align: 'center'
          },
          {
            title: '所属组织',
            key: 'organizationName',
            align: 'center',
          },
          {
            title: '所属项目',
            key: 'projectName',
            align: 'center',
          },
          {
            title: '仓库名称',
            key: 'name',
            align: 'center',
          },
          {
            title: '所在地',
            key: 'location',
            align: 'center',
          },
          {
            title: '负责人',
            key: 'headName',
            align: 'center',
          },
          {
            title: '联系电话',
            key: 'headPhone',
            align: 'center',
          },

          {
            title: '是否启用',
            key: 'enable',
            align: 'center',
            width: 90,
            render: (h, params) => {
              const row = params.row;
              const str = this.$Filters.enableType(params.row.use)
              const color = str == '否' ? 'error' : 'success';
              const text = str == '否' ? '否' : '是';

              return h('Tag', {
                props: {
                  type: 'dot',
                  color: color
                },
              }, text);
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('a', [
                h('img', {
                  style: {
                    height: '20px',
                    width: '20px',
                  },
                  attrs: {
                    src: require('../../../assets/images/编辑.png')
                  },
                  on: {
                    click: e => {
                      e.stopPropagation();
                      this.edit(params.row)
                    }
                  }
                }),
                h('Divider', {props: {type: 'vertical'}}),
                h('img', {
                  style: {
                    height: '20px',
                    width: '20px',
                  },
                  attrs: {
                    src: require('../../../assets/images/删除.png')
                  },
                  on: {
                    click: e => {
                      e.stopPropagation();
                      this.delete(params.row.id)
                    }
                  }
                },),

              ])
            }
          }
        ],


        showModal:false,
        title:'',
        submitLoading:true,
        obj:{},


        user:this.$store.getters.submitData,


        orgList:[],
        status:[
          {
            value:0,
            label:'是',
          },
          {
            value:1,
            label:'否',
          },
        ],

      }
    },
    methods: {
      getPageList(page){
        let data = {
          pageNum:page
        }
        if(this.search.content){
          data.searchContent = this.search.content
        }
        if(this.search.orgId){
          data.organizationId = this.search.orgId
        }
        if(this.search.status){
          data.status = this.search.status
        }
        getWareHouseConfigList(data)
          .then(res => {
            this.tableList = res;
          }).catch(err => {
          this.$Message.error(err);
        })
      },
      changePage(page){
        this.page.current = page;
        this.getPageList(page)
      },
      addObj(){
        this.obj = {}
        this.obj.organizationId=this.user.user.userInfo.company;
        this.obj.organizationName=this.user.user.userInfo.companyName;
        this.obj.use = 0
        this.title = '新建 / 仓库配置'
        this.showModal = true;
        this.$refs.form.getProjectList(this.obj.organizationId);
      },
      delete(id){
        let self = this;
        this.$Modal.confirm({
          title: '删除',
          content: '是否确认删除？删除后，该信息将不再可见，请谨慎操作！',
          width: '400px',
          okText: '确定',
          cancelText: '关闭',
          onOk: function () {
            deleteWareHouseConfig({
              userId: self.user.user.id,
              id:id
            }).then(res => {
              self.getPageList(self.page.curren);
            }).catch(err => {
              this.$Message.error(err);
            })
          }
        })
      },
      submit(obj){
        this.$refs.form.$refs[obj].validate((valid) => {
          if (valid) {
            this.insertOrUpdate();
          } else {
            setTimeout(() => {
              this.submitLoading = false;
              this.$nextTick(() => {
                this.submitLoading = true;
              });
            }, 2000);
          }
        })
      },
      insertOrUpdate(){
        if(this.obj.id){
          updateWareHouseConfig({
            id: this.obj.id,
            name: this.obj.name,
            use: this.obj.use,
            head:this.obj.head,
            headName:this.obj.headName,
            headPhone:this.obj.headPhone,
            location:this.obj.location,
            organizationId:this.obj.organizationId,
            organizationName:this.obj.organizationName,
            projectId:this.obj.projectId,
            projectName:this.obj.projectName,
            operateId:this.user.user.id,
            operateName:this.user.user.name,
            operatePhone: this.user.user.phone,
            remarks:this.obj.remarks,
          })
            .then(res => {
              this.showModal = false;
              this.getPageList(this.page.current);
            })
            .catch(err => {
              this.$Message.error(err);
            })
        }else{
          insertWareHouseConfig({
            id: this.obj.id,
            name: this.obj.name,
            use: this.obj.use,
            head:this.obj.head,
            headName:this.obj.headName,
            headPhone:this.obj.headPhone,
            location:this.obj.location,
            organizationId:this.obj.organizationId,
            organizationName:this.obj.organizationName,
            projectId:this.obj.projectId,
            projectName:this.obj.projectName,
            operateId:this.user.user.id,
            operateName:this.user.user.name,
            operatePhone: this.user.user.phone,
            remarks:this.obj.remarks,
          })
            .then(res => {
              this.showModal = false;
              this.getPageList(1);
            })
            .catch(err => {
              this.$Message.error(err);
            })
        }
        this.showModal = false;
      },
      cancel(){
        this.showModal = false;
      },
      edit(item) {
        this.obj = item
        this.title = '编辑 / 仓库配置'
        this.showModal = true;
        this.$refs.form.getProjectList(this.obj.organizationId);
        this.$refs.form.changeCity(this.obj.location.split('>'));
      },

      getOrgList(){
        getAllOrganizations({}).then(res => {
          this.orgList = res;
        }).catch(err => {

        })
      },
    },
    created() {},
    mounted() {
      this.getPageList(1);
      this.getOrgList();
    },
  }
</script>
<style scoped lang="less">
  @deep: ~'>>>';
  @{deep}.ivu-card-body {
    padding: 10px !important;
  }
  @{deep}.ivu-modal-footer{
    text-align: center!important;
  }
</style>>

