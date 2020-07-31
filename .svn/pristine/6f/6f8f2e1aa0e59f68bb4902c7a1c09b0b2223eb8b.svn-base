<template>
    <div class="v-clock">
        <Card>
          <div class="left">
            <div>
              <div>
                <Button icon="ios-add" type="primary" @click="addDepartments">添加</Button>
              </div>
            </div>
            <div>
              <div>
                <Select v-model="search.company" placeholder="请选择组织" :clearable="true" @on-change="changeOrg" :disabled="user.user.admin!=1">
                  <Option v-for="item in this.departmentsItem.organisationItem" :value="item.id" :key="item.id" >{{ item.name }}</Option>
                </Select>
              </div>
              <div>
                <Input clearable v-model="search.query" placeholder="请输入部门名称关键字" />
              </div>
              <div>
                <Button type="primary" @click="getIndex(1)">查询</Button>
              </div>
            </div>
          </div>


          <tableTemplate
            :tableList="tableList"
            :columns="columns"
            :page="page"
            :size="'small'"
            @changePage="changePage"
            @onRowClick="onRowClick"
            @onSelectionChange="onSelectionChange">
          </tableTemplate>
        </Card>


      <Modal
        v-model="departmentsModal"
        :title="departmentsTitle"
        :loading="departmentsLoading"
        :mask-closable="false"
        @on-ok="departmentsOk('departmentsUser')"
        @on-cancel="departmentsCancel"
        width="700"
        ok-text = '保存'
        cancel-text = '取消'>
        <departmentsForm
          ref="departmentsForm"
          :departmentsUser="departmentsUser"
          :departmentsItem="departmentsItem"
          :tableList="tableList.list"
          @onChangeAdminName="onChangeAdminName"
          @onChangeHead="onChangeHead"
          @choosePeople="choosePeople">
        </departmentsForm>
      </Modal>
    </div>
</template>

<script>
  import { departmentsGetByPage,insert,departmentsUpdate,departmentsDelete,organizationsGetByPage,getByPage } from '@/axios/api';
  import tableTemplate from '@/commonComponent/tableTemplate'
  import departmentsForm from './departmentsForm'
    export default {
        name: "departmentsIndex",
        components: {
          tableTemplate,
          departmentsForm,
        },
        props: [''],
        data() {
            return {
              search:{
                company: '',
                query: '',
              },
              companyList: [],

              tableList:{},
              page:{
                current:1,
              },
              columns: [
                {
                  title:'序号',
                  type: 'index',
                  width: 80,
                  align: 'center'
                },
                {
                  title: '部门名称',
                  key: 'name',
                  tree: true
                },
                {
                  title: '负责人',
                  key: 'headName',
                  align: 'center',
                },
                {
                  title: '负责人电话',
                  key: 'headPhone',
                  align: 'center',
                  tooltip:true,
                  render: (h, params) => {
                    return h('div', [
                      h('div',{
                        class:'numberColor',
                      },params.row.headPhone)
                    ]);
                  },
                },
                {
                  title: '人员数',
                  key: 'peopleCount',
                  align: 'center',
                  tooltip:true,
                  sortable: true,
                  render: (h, params) => {
                    return h('div', [
                      h('div',{
                        class:'numberColor',
                      },params.row.peopleCount)
                    ]);
                  },
                },
                {
                  title: '状态',
                  key: 'status',
                  align: 'center',
                  // render: (h, params) => {
                  //   return h('div',this.$Filters.statusType(params.row.status))
                  // }
                  render: (h, params) => {
                    const str = this.$Filters.statusType(params.row.status)
                    const color = str == '注销' ? 'error' : 'success';
                    const text = str == '注销' ? '注销' : '有效';
                    return h('Tag', {
                      props: {
                        type: 'dot',
                        color: color
                      },
                    }, text);
                  }
                },
                {
                  title: '最新维护时间',
                  key: 'updateTime',
                  align: 'center',
                  width: 140,
                  sortable: true,
                  render: (h, params) => {
                    if(params.row.updateTime == null){
                      return h('span',{
                        class:'numberColor',
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
                  key: 'updateUserName',
                  align: 'center',
                  render: (h, params) => {
                    if(params.row.updateUserName == null){
                      return h('div','无')
                    }else{
                      let texts = params.row.updateUserName +'-'+ params.row.updateUserPhone
                      let arrJoin = texts
                      if (arrJoin != null) {
                        if (arrJoin.length > 7) {
                          texts = arrJoin.slice(0, 7) + '...' // 进行数字截取
                        } else {
                          texts = arrJoin
                        }
                      }
                      return h('div', [
                        h('Tooltip', {
                          props: {
                            placement: 'top',
                            transfer: true
                          }
                        }, [texts, h('span', {
                          slot: 'content',
                          style: {
                            whiteSpace: 'normal'
                          }
                        }, arrJoin)
                        ])
                      ])
                    }

                  }
                },
                {
                  title: '操作',
                  key: 'action',
                  width: 240,
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
                },
              ],



              departmentsModal:false,
              departmentsTitle:'',
              departmentsLoading:true,
              departmentsUser:{},
              departmentsItem:{
                organisationItem:[],
                headItem:[],
                statusItem:[
                  {
                    value:'0',
                    label:'有效',
                  },
                  {
                    value:'1',
                    label:'注销',
                  },
                ],
                fatherItem:[],
              },


              user:this.$store.getters.submitData,
            }
        },
        computed: {},
        watch: {},
        methods: {
          getIndex(page){
            let data = {
              pageNum:page
            }
            if(this.search.company){
              data.organizationId = this.search.company
            }
            if(this.search.query){
              data.searchContent = this.search.query
            }
            departmentsGetByPage(data).then(res => {
              let arr = JSON.parse(JSON.stringify(res.list).replace(/departmentList/g, 'children'))
              res.list = arr;
              this.tableList = res;
            }).catch(err => {
              this.$Message.error(err);
            })
          },
          changePage(page){
            this.page.current = page;
            this.getIndex(page)
          },
          onRowClick(item){
          },
          onSelectionChange(item){
          },
          departmentsOk(content){
            if(this.departmentsUser.headName == undefined){
              this.$Message.error('请选择负责人');
              setTimeout(() => {
                this.departmentsLoading = false;
                this.$nextTick(() => {
                  this.departmentsLoading = true;
                });
              }, 2000);
              return;
            }
            this.$refs.departmentsForm.$refs[content].validate((valid) => {
              if (valid) {
                this.postDepartments();
              } else {
                setTimeout(() => {
                  this.departmentsLoading = false;
                  this.$nextTick(() => {
                    this.departmentsLoading = true;
                  });
                }, 2000);
              }
            })
          },
          postDepartments(){
            if(this.departmentsUser.id){
              departmentsUpdate({
                id: this.departmentsUser.id,
                code: this.departmentsUser.code,
                num: this.departmentsUser.num,
                name: this.departmentsUser.name,
                organizationId: this.departmentsUser.organizationId,
                organizationName: this.departmentsUser.organizationName,
                fatherId: this.departmentsUser.fatherId,
                fatherName: this.departmentsUser.fatherName,
                head: this.departmentsUser.head,
                headName: this.departmentsUser.headName,
                headPhone: this.departmentsUser.headPhone,
                phone: this.departmentsUser.phone,
                status: this.departmentsUser.status,
                remarks: this.departmentsUser.remarks,
                updateUserId:this.user.user.id,
                updateUserName:this.user.user.name,
                updateUserPhone:this.user.user.phone,
              })
                .then(res => {
                  this.departmentsModal = false;
                  this.getIndex(1);
                })
                .catch(err => {
                  this.$Message.error(err);
                })
            }else{
              insert({
                code: this.departmentsUser.code,
                num: this.departmentsUser.num,
                name: this.departmentsUser.name,
                organizationId: this.departmentsUser.organizationId,
                organizationName: this.departmentsUser.organizationName,
                fatherId: this.departmentsUser.fatherId,
                fatherName: this.departmentsUser.fatherName,
                head: this.departmentsUser.head,
                headName: this.departmentsUser.headName,
                headPhone: this.departmentsUser.headPhone,
                phone: this.departmentsUser.phone,
                status: this.departmentsUser.status,
                remarks: this.departmentsUser.remarks,
                updateUserId:this.user.user.id,
                updateUserName:this.user.user.name,
                updateUserPhone:this.user.user.phone,
              })
                .then(res => {
                  this.departmentsModal = false;
                  this.getIndex(1);
                })
                .catch(err => {
                  this.$Message.error(err);
                })
            }
            this.departmentsModal = false;
          },
          departmentsCancel(content){
            this.departmentsModal = false;
          },
          addDepartments(){
            this.departmentsUser = {}
            this.departmentsUser.status = '0'
            this.departmentsUser.num = '0'
            this.departmentsTitle = '新建 / 部门机构'
            this.departmentsModal = true;
          },
          edit(item){
            this.departmentsUser = {
              id:item.id,
              code:item.code,
              num:item.num,
              name:item.name,
              organizationId:item.organizationId,
              organizationName:item.organizationName,
              fatherId:item.fatherId,
              fatherName:item.fatherName,
              head: item.head,
              headName: item.headName,
              headPhone: item.headPhone,
              phone:item.phone,
              status:item.status,
              remarks:item.remarks,
              updateUserId:this.user.user.id,
              updateUserName:this.user.user.name,
              updateUserPhone:this.user.user.phone,
            }
            this.departmentsTitle = '编辑 / 部门机构'
            this.departmentsModal = true;
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
                departmentsDelete({
                  userId: self.user.user.id,
                  id:id
                }).then(res => {
                  self.getIndex(1);
                }).catch(err => {
                  console.log(err)
                })
              }
            })
          },
          changeOrg(value){
            this.search.company=value;

            this.this.getIndex(1);
          },
          getFirst(page){
            return organizationsGetByPage({
              pageNum:page,
            })
          },
          getSecond(page){
            return getByPage({
              pageNum:page,
            })
          },
          apiAll(){
            this.$axios.all([this.getFirst(1),this.getSecond(1)])
              .then(this.$axios.spread((one,two) => {
                this.departmentsItem.organisationItem = one.list;
                this.departmentsItem.headItem = two.list;
              }));
          },
          onChangeAdminName(item){
            if(item != undefined){
              this.departmentsUser.organizationId  = item.value
              this.departmentsUser.organizationName  = item.label
            }
          },
          onChangeHead(item){
            if(item != undefined){
              this.departmentsUser.head  = item.value
              this.departmentsUser.headName  = item.label
              this.departmentsUser.headPhone  = item.tag
            }
          },
          choosePeople(item){
            this.departmentsUser.head = item.id
            this.departmentsUser.headName = item.name
            this.departmentsUser.headPhone = item.phone
          },
        },
        created() {
          this.search.company=this.user.user.userInfo.company;
        },
        mounted() {
          this.getIndex(1);
          this.apiAll();
        },
    }
</script>

<style scoped lang="less">
    @deep: ~'>>>';
    @{deep}.ivu-card-body {
        padding: 10px !important;
    }
    .left{
      >div{
        display: flex;
        >div{
          margin:5px;
        }
        >div:nth-of-type(1){
          margin: 5px 0;
        }
      }
    }
    @{deep}.ivu-modal-footer{
      text-align: center!important;
    }
</style>
