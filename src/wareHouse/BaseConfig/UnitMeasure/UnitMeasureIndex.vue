<template>
  <div class="v-clock">
    <Card>
      <Row>
        <i-button type="primary"  icon="ios-add" @click="addObj" >添加</i-button>
        <div style="float: right">
          <i-input clearable v-model="search.content" placeholder="请输入关键字" style="width: 300px"></i-input>
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
      <UnitMeasureForm
        ref="form"
        :obj="obj">
      </UnitMeasureForm>
    </Modal>
  </div>


</template>


<script>
  import { getSysMeterNamesList,insertSysMeterNames,updateSysMeterNames,deleteSysMeterNames } from '@/axios/api';
  import tableTemplate from '@/commonComponent/tableTemplate'
  import UnitMeasureForm from './UnitMeasureForm'
  export default {
    name: "UnitMeasureIndex",
    components: {
      tableTemplate,
      UnitMeasureForm,
    },
    data() {
      return {
        tableList:{},
        page:{
          current:1,
        },
        search:{
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
            title: '计量单位',
            key: 'name',
            align: 'center',
          },
          {
            title: '排序码',
            key: 'sort',
            align: 'center',
            width: 80,
            tooltip:true,
            sortable: true,
            render: (h, params) => {
              return h('div', [
                h('div',{
                  class:'numberColor',
                },params.row.sort)
              ]);
            },
          },
          {
            title: '备注',
            key: 'remarks',
            align: 'center',
          },
          {
            title: '最新维护时间',
            align: 'center',
            render: (h, params) => {
              if(params.row.updateTime == null){
                return h('span',{
                  'style':{
                    // 'color':'red'
                  }
                },'无')
              }else{
                return h('span',{
                  class:'numberColor',
                },this.$moment(params.row.updateTime).format('YYYY-MM-DD HH:mm'))
              }
            }
          },
          {
            title: '维护人',
            align: 'center',
            render: (h, params) => {
              if(params.row.updateUserName == null || params.row.updateUserPhone == null){
                return h('div', [
                  h('div',{
                    class:'fontColor',
                  },'无')
                ]);
              }else{
                return h('div', [
                  h('div',{
                    class:'fontColor',
                  },params.row.updateUserName + '-' + params.row.updateUserPhone)
                ]);
              }

            },
          },
          {
            title: '是否启用',
            key: 'enable',
            align: 'center',
            width: 90,
            render: (h, params) => {
              const row = params.row;
              const str = this.$Filters.enableType(params.row.enable)
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
        getSysMeterNamesList(data)
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
        this.obj.enable = 0
        this.title = '新建 / 计量单位'
        this.showModal = true;
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
            deleteSysMeterNames({
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
          updateSysMeterNames({
            id: this.obj.id,
            name: this.obj.name,
            enable: this.obj.enable,
            sort: this.obj.sort,
            status: this.obj.status,
            remarks: this.obj.remarks,
            updateUserId:this.user.user.employeeId,
            updateUserName:this.user.user.employeeName,
            updateUserPhone: this.user.user.employeePhone,
          })
            .then(res => {
              this.showModal = false;
              this.getPageList(this.page.current);
            })
            .catch(err => {
              this.$Message.error(err);
            })
        }else{
          insertSysMeterNames({
            id: this.obj.id,
            name: this.obj.name,
            enable: this.obj.enable,
            sort: this.obj.sort,
            status: this.obj.status,
            remarks: this.obj.remarks,
            updateUserId:this.user.user.employeeId,
            updateUserName:this.user.user.employeeName,
            updateUserPhone: this.user.user.employeePhone,
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
        this.obj.sort = item.sort.toString()
        this.title = '编辑 / 计量单位'
        this.showModal = true;
      },
    },
    created() {},
    mounted() {
      this.getPageList(1);
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

