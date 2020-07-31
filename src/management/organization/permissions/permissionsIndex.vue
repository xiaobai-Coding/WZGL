<template>
    <div class="v-clock">
        <Card>
          <div class="left">
            <div>
              <div>
                <Button icon="ios-add" type="primary" @click="addProjectModal">添加</Button>
              </div>
            </div>
            <div>
              <div>
                <Select v-model="search.company" placeholder="请选择组织" :clearable="true" @on-change="changeOrg" :disabled="user.user.admin!=1">
                  <Option v-for="item in companyList" :value="item.id" :label="item.name" :key="item.id"></Option>
                </Select>
              </div>
              <div>
                <Input clearable v-model="search.query" placeholder="请输入组织名称关键字" />
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
            @changePage="changePage">
          </tableTemplate>
        </Card>


      <Modal
        v-model="managementModal"
        :title="managementTitle"
        :loading="managementLoading"
        :mask-closable="false"
        @on-ok="managementOk('managementUser')"
        @on-cancel="managementCancel"
        ok-text = '保存'
        cancel-text = '取消'>
        <permissionsForm
          ref="permissionsForm"
          :managementUser="managementUser"
          :managementItem="managementItem">
        </permissionsForm>
      </Modal>



<!--      <Modal-->
<!--        v-model="bindingModal"-->
<!--        :title="bindingTitle"-->
<!--        :loading="bindingLoading"-->
<!--        :mask-closable="false"-->
<!--        @on-ok="bindingOk"-->
<!--        @on-cancel="bindingCancel"-->
<!--        width="1000"-->
<!--        ok-text = '保存'-->
<!--        cancel-text = '取消'>-->
<!--        <permissionsTable-->
<!--          ref="permissionsTable"-->
<!--          :bindingTableList="bindingTableList"-->
<!--          :bindingUser="bindingUser"-->
<!--          :bindingPage="bindingPage"-->
<!--          :bindingChoose="bindingChoose"-->
<!--          @onRowClick="bindingSelectionChange"-->
<!--          @bindingChangePage="bindingChangePage">-->
<!--        </permissionsTable>-->
<!--      </Modal>-->

      <Modal
        v-model="bindingModal"
        :title="bindingTitle"
        :loading="bindingLoading"
        :mask-closable="false"
        @on-ok="bindingOk"
        @on-cancel="bindingCancel"
        width="1000"
        ok-text = '保存'
        cancel-text = '取消'>
        <div style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 10px">
          <Select v-model="accountSearch.depId" placeholder="请选择部门" style="width: 30%" clearable>
            <Option v-for="(item,index) in departmentList"
                    :value="item.id"
                    :label="item.name"
                    :key="index">
            </Option>
          </Select>
          <Input style="width: 50%;margin-left: 10px"  placeholder="请输入人员姓名、手机号或账号" v-model="accountSearch.content" clearable/>
          <Button type="primary" @click="getBindingIndex(1)">查询</Button>
        </div>
        <MultipleChoiceTableTemplate
          ref="MultipleChoiceTable"
          :columns="multipleChoiceTableColumns"
          :tableList="bindingTableList"
          :currentPage="bindingPage.current"
          :selectList="selectList"
          @changePage="bindingChangePage"
          @getSelection="getSelection"
        >
        </MultipleChoiceTableTemplate>
      </Modal>



      <Modal
        v-model="bindingPerModal"
        :title="bindingPerTitle"
        :loading="bindingPerLoading"
        :mask-closable="false"
        @on-ok="bindingPerOk"
        @on-cancel="bindingPerCancel"
        ok-text = '保存'
        cancel-text = '取消'>
        <treeTemplate
          ref="treeTemplate"
          :tableList="bindingPerList"
          :childrenKey="'child'"
          :attribute="attribute"
          @getCheckedAndIndeterminateNodes="getCheckedAndIndeterminateNodes">
        </treeTemplate>
      </Modal>


      <!--已绑定账号列表-->
      <Modal
        v-model="bindedAccountModal"
        title="已绑定账号"
        :mask-closable="false"
        width="1000"
        @on-ok="getIndex(page.current)"
        @on-cancel="bindedAccountModal=false"
        ok-text = '关闭'
        cancel-text = ''>
        <tableTemplate
          :tableList="bindedList"
          :columns="bindedColumns"
          :page="bindedPage"
          :size="'small'"
          height="500"
          @changePage="changeBindedPage">
        </tableTemplate>
      </Modal>
    </div>
</template>

<script>
  import { getAllAccountByRoleId,updateList,unboundRole,departmentsGetByPage } from '@/axios/api';
  import { ucRolesGetByPage,ucRolesInsert,ucRolesUpdate,ucRolesDelete,getResource,ucRolesAddRole,getByOrganizationId,insertUcRoleAuthority,organizationsGetByPage } from '@/axios/api';
  import tableTemplate from '@/commonComponent/tableTemplate'
  import permissionsForm from './permissionsForm'
  import permissionsTable from './permissionsTable'
  import treeTemplate from '@/commonComponent/treeTemplate'
  import MultipleChoiceTableTemplate from '@/commonComponent/MultipleChoiceTableTemplate'
    export default {
        name: "permissionsIndex",
        components: {
          tableTemplate,
          permissionsForm,
          permissionsTable,
          treeTemplate,
          MultipleChoiceTableTemplate
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
                  width: 60,
                  align: 'center',
                  tooltip:true,
                },
                {
                  title: '角色名称',
                  key: 'name',
                  align: 'center',
                  tooltip:true,
                },
                {
                  title: '所属系统',
                  key: 'systemType',
                  align: 'center',
                  tooltip:true,
                  render: (h, params) => {
                    return h('div',this.$Filters.systemType(params.row.systemType))
                  }
                },
                {
                  title: '功能权限',
                  key: 'functionCount',
                  align: 'center',
                  width: 100,
                  tooltip:true,
                  sortable: true,
                  render: (h, params) => {
                    return h('div', [
                      h('div',{
                        class:'numberColor',
                      },params.row.functionCount)
                    ]);
                  },
                },
                {
                  title: '已授权账号',
                  key: 'accountCount',
                  align: 'center',
                  tooltip:true,
                  width: 100,
                  sortable: true,
                  render: (h, params) => {
                    return h('div', [
                      h('div',{
                        class:'numberColor',
                        on: {
                          click: (e) => {
                            e.stopPropagation();
                            this.accountSearch.row=params.row;
                            this.bindedAccountModal=true;
                            this.getBindedIndex(1)
                          }
                        }
                      },params.row.accountCount)
                    ]);
                  },
                },
                {
                  title: '最新维护时间',
                  key: 'organizationName',
                  align: 'center',
                  tooltip:true,
                  width: 140,
                  sortable: true,
                  render: (h, params) => {
                    if(params.row.updateTime == null){
                      return h('span',{

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
                  key: 'updateUserPhone',
                  align: 'center',
                  tooltip:true,
                },
                {
                  title: '状态',
                  align: 'center',
                  width: 100,
                  // render: (h, params) => {
                  //   return h('div',this.$Filters.statusType(params.row.use))
                  // },
                  render: (h, params) => {
                    const str = this.$Filters.enableType(params.row.status)
                    const color = str == '否' ? 'error' : 'success';
                    const text = str == '否' ? '无效' : '有效';
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
                  align: 'center',
                  width: 200,
                  render: (h, params) => {
                    return h('a', [
                      h('a', {
                        on: {
                          click: () => {
                            this.bindingPermissions(params.row)
                          }
                        }
                      }, '权限配置'),
                      h('Divider', {props: {type: 'vertical'}}),
                      h('a', {
                        on: {
                          click: () => {
                            this.bindingAccount(params.row)
                          }
                        }
                      }, '账号授权'),
                      h('Divider', {props: {type: 'vertical'}}),
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



              managementModal:false,
              managementTitle:'',
              managementLoading:true,
              managementUser:{},
              managementItem:{
                organizationItem:this.$store.getters.menu,
                peopleItem:[],
                businessItem:[],
              },
              pictureItem:[],


              user:this.$store.getters.submitData,




              bindingModal:false,
              bindingTitle:'',
              bindingLoading:true,
              bindingUser:{
                query:'',
              },
              bindingTableList:{},
              bindingPage:{
                current:1,
              },
              bindingClickItem:{},
              //bindingSelection:[],
              bindingChoose: '',




              bindingPerModal:false,
              bindingPerTitle:'',
              bindingPerLoading:true,
              bindingPerUser:{
                query:'',
              },
              bindingPerList:[],
              bindingPerPage:{
                current:1,
              },
              bindingPerClickItem:{},
              bindingPerSelection:[],
              bindingPerChoose: '',
              attribute:{
                showCheckbox:true,
              },
              bindingPerItem:null,



              selectList:[],
              multipleChoiceTableColumns:[
                {
                  title: '操作',
                  type: 'selection',
                  align:'center',
                  width:80,
                },
                {
                  title: '账号',
                  key: 'name',
                  align: 'center',
                },
                {
                  title: '所属组织',
                  key: 'companyName',
                  align: 'center',
                },
                {
                  title: '当前角色',
                  key: 'roleName',
                  align: 'center',
                },
                {
                  title: '绑定人员',
                  key: 'employeeName',
                  align: 'center',
                },
                {
                  title: '手机号',
                  key: 'employeePhone',
                  align: 'center',
                },
                {
                  title: '所属部门',
                  key: 'model',
                  align: 'center',
                },
                {
                  title: '岗位',
                  key: 'unit',
                  align: 'center',
                },
                {
                  title: '最近登录时间',
                  key: 'unit',
                  align: 'center',
                },
              ],
              accountSearch:{content:'',row:null,depId:''},
              departmentList:[],

            bindedAccountModal:false,
            bindedList:{list:[]},
            bindedPage:{
              current:1,
            },
            bindedColumns:[
            {
              title: '账号',
              key: 'name',
              align: 'center',
            },
            {
              title: '所属组织',
              key: 'companyName',
              align: 'center',
            },
            {
              title: '当前角色',
              key: 'roleName',
              align: 'center',
            },
            {
              title: '绑定人员',
              key: 'employeeName',
              align: 'center',
            },
            {
              title: '手机号',
              key: 'employeePhone',
              align: 'center',
            },
            {
              title: '所属部门',
              key: 'departmentName',
              align: 'center',
            },
            {
              title: '岗位',
              key: 'post',
              align: 'center',
            },
            {
              title: '最近登录时间',
              key: 'recentLoginTime',
              align: 'center',
            },
              {
                title: '操作',
                key: '',
                align: 'center',
                render: (h, params) => {
                  let that=this;
                  return h('div', [
                    h('span',{
                      class:'numberColor',
                      on: {
                        click: (e) => {
                          e.stopPropagation();
                          if(e.target.innerHTML=="解绑账号"){
                            this.$Modal.confirm({
                              title: '确定要解绑该账号？',
                              content: '解绑后该账号将失去该角色的所有权限,请慎重操作',
                              width: '400px',
                              okText: '确定',
                              cancelText: '关闭',
                              onOk: function () {
                                //解绑角色
                                that.unboundRole(params.row,e)
                              },
                            })
                          }

                        }
                      }
                    },'解绑账号')
                  ]);
                },
              }
          ],
            }
        },
        computed: {},
        watch: {},
        methods: {
          changeOrg(value){
            this.search.company=value;

            this.this.getIndex(1);
          },
          getIndex(page,query){
            let data = {
              pageNum:page
            }
            if(this.search.company){
              data.organizationId = this.search.company
            }
            if(this.search.query){
              data.searchContent = this.search.query
            }
            ucRolesGetByPage(data).then(res => {
              this.tableList = res;
            }).catch(err => {
              this.$Message.error(err);
            })
          },
          managementOk(content){
            this.$refs.permissionsForm.$refs[content].validate((valid) => {
              if (valid) {
                this.postDepartments(this.managementUser);
              } else {
                setTimeout(() => {
                  this.managementLoading = false;
                  this.$nextTick(() => {
                    this.managementLoading = true;
                  });
                }, 2000);
              }
            })
          },
          postDepartments(item){
            const arr = {...item}
            let text;
            switch (arr.systemType) {
              case '仓库管理':
                text = 0
                break
              case '管理配置':
                text = 1
                break
            }
            arr.systemType  = text
            if(arr.id){
              ucRolesUpdate(arr)
                .then(res => {
                  this.managementModal = false;
                  this.getIndex(this.page.current);
                })
                .catch(err => {
                  this.$Message.error(err);
                })
            }else{
              ucRolesInsert(arr)
                .then(res => {
                  this.managementModal = false;
                  this.getIndex(this.page.current);
                })
                .catch(err => {
                  this.$Message.error(err);
                })
            }
          },
          managementCancel(content){
            this.managementModal = false;
          },
          edit(item){
            this.managementUser = {
              id:item.id,
              name: item.name,
              remark: item.remark,
              status: item.status.toString(),
              updateUser:item.updateUser,
              updateUserName:item.updateUserName,
              organizationId:item.organizationId,
              organizationName:item.organizationName,
            }
            let name;
            switch (item.systemType) {
              case 0:
                name = '仓库管理'
                    break
              case 1:
                name = '管理配置'
                break
              default : name = item.systemType
            }
            this.managementUser.systemType = name
            this.managementTitle = '编辑 / 角色信息'
            this.$nextTick(()=>{
              this.managementModal = true;
            })
          },
          delete(id){
            let self = this;
            this.$Modal.confirm({
              title: '确定要删除该数据？',
              content: '删除后该该角色将不再显示并不可再使用，并且已授权该角色的人员将不再有相应权限，请谨慎操作！',
              width: '400px',
              okText: '确定',
              cancelText: '关闭',
              onOk: function () {
                ucRolesDelete({
                  userId: self.user.user.id,
                  id:id
                }).then(res => {
                  self.getIndex(self.page.current);
                }).catch(err => {
                  this.$Message.error(err);
                })
              }
            })
          },
          addProjectModal(){
            this.pictureItem = [];
            this.managementUser = {}
            this.managementUser.status = '0'
            this.managementUser.updateUser = this.user.user.id
            this.managementUser.updateUserName = this.user.user.name,
            this.managementUser.updateUserPhone = this.user.user.phone,
            this.managementUser.organizationId = this.user.user.userInfo.company;
            this.managementUser.organizationName = this.user.user.userInfo.companyName;

            this.managementTitle = '新建 / 角色信息'
            this.managementModal = true;
          },
          changePage(page){
            this.page.current = page;
            this.getIndex(page)

          },
          bindingChangePage(page){
            this.bindingPage.current = page;
            this.getBindingIndex(page)
          },
          changeBindedPage(page){
            this.bindedPage.current = page;
            this.getBindedIndex(page);
          },
          getSelection(selection){
            this.selectList = selection;
          },
          bindingAccount(item){
            this.bindingClickItem = item
            this.bindingTitle = '账号授权 / 权限管理'
            this.bindingModal = true;
            this.selectList=[];
            this.getBindingIndex(1);//获取数据
          },
          bindingCancel(content){
            this.bindingModal = false;
          },
          bindingOk(){
            let that=this;
            this.$Modal.confirm({
              title: '确定要绑定该角色？',
              content: '已绑定角色的账号将会被此角色覆盖,请慎重操作',
              width: '400px',
              okText: '确定',
              cancelText: '关闭',
              onOk: function () {
                that.$refs.MultipleChoiceTable.getSelection();//获取选择的数据
                if(that.selectList != []){
                  updateList({
                    roleId:that.bindingClickItem.id,
                    userList:that.selectList,
                  }).then(res => {
                    that.getIndex(that.page.current);
                    that.bindingModal = false;
                    that.bindingTableList = res;
                  }).catch(err => {
                    that.$Message.error(err);
                  })
                }else{
                  setTimeout(() => {
                    that.bindingLoading = false;
                    that.$nextTick(() => {
                      that.bindingLoading = true;
                    });
                  }, 2000);
                }
              },
              onCancel:function () {
                setTimeout(() => {
                  that.bindingLoading = false;
                  that.$nextTick(() => {
                    that.bindingLoading = true;
                  });
                }, 2000);
              }
            })
          },
          //获取角色未绑定的账号
          getBindingIndex(page){
            getAllAccountByRoleId({
              pageNum:page,
              roleId:this.bindingClickItem.id,
              status:0,//未绑定
              searchContent:this.accountSearch.content==''?null:this.accountSearch.content,
              departmentId:this.accountSearch.depId==''?null:this.accountSearch.depId,
            }).then(res => {
              this.bindingTableList = res;
            }).catch(err => {
              this.$Message.error(err);
            })
          },


          //获取角色已经绑定的账号
          getBindedIndex(page){
            getAllAccountByRoleId({
              pageNum:page,
              roleId:this.accountSearch.row.id,
              status:1,//已绑定
              //searchContent:this.accountSearch.content==''?null:this.accountSearch.content
            }).then(res => {
              this.bindedList = res;
            }).catch(err => {
              this.$Message.error(err);
            })
          },

          unboundRole(account,e){
            let that=this;
            unboundRole({
              accountId:account.id,
            }).then(res => {
              e.target.innerHTML="<font color='#999999'>已解绑</font>";
            }).catch(err => {
              this.$Message.error(err);
            })
          },


          getBindingPerIndex(item){
            let that=this;
            getByOrganizationId({
              organizationId:this.$store.getters.submitData.user.userInfo.company,
            }).then(res => {
              let list = res.menuList
              let arr = JSON.parse(JSON.stringify(list)
                .replace(/fatherId/g, 'parentId')
                .replace(/sonList/g, 'child'))
                //.replace(/deploy/g, 'checked'))
              list=arr;
              that.packageData(list)
              that.bindingPerList = list;
              //回显
              if(item.ucRoleAuthorityVo!=undefined && item.ucRoleAuthorityVo.ucRoleAuthorityList.length>0){
                let selected=item.ucRoleAuthorityVo.ucRoleAuthorityList;
                selected.forEach(function (select) {
                  that.showSelectedStatus(select,that.bindingPerList)
                })
              }
            }).catch(err => {
              this.$Message.error(err);
            })


            // getResource({
            //   userId:this.user.user.id,
            //   roleId:item.id
            // }).then(res => {
            //   let list = res.body
            //   this.packageData(list)
            //   this.bindingPerList = list;
            // }).catch(err => {
            //   this.$Message.error(err);
            // })
          },

          showSelectedStatus(select,list){
            let that=this;
            list.forEach(function (viewItem,index) {
              if(select.menuId==viewItem.id){
                if(select.visual==1 && select.edit==0){//半选
                  list[index].indeterminate=true;
                }else if(select.visual==1 && select.edit==1){//全选
                  list[index].checked=true;
                }
                if(select.menuLevel==3){//三级菜单要看选中的是编辑还是查看
                  if(select.visual==1){//查看
                    list[index].child[0].checked=true;
                  }else if(select.edit==1){//编辑
                    list[index].child[1].checked=true;
                  }
                }
              }
              if(viewItem.child!=null && viewItem.child.length>0){
                that.showSelectedStatus(select,viewItem.child)
              }
            })
          },

          packageData(list){
            if(list!=undefined && list.length>0){
              for(let i=0;i<list.length;i++){
                let item=list[i];
                if(item.sonCount == 0){
                  item.child=[];
                  item.child.push(
                    {child: null,
                    checked: false,
                    description: item.name+"查看",
                    id: 1,
                    name: "查看",
                    parentId: item.id,
                    level: 4},
                    );
                  item.child.push(
                    {child: null,
                    checked: false,
                    description: item.name+"编辑",
                    id: 2,
                    name: "编辑",
                    parentId: item.id,
                      level: 4}
                    );
                }else{
                  let child = item.child;
                  this.packageData(child)
                }
              }
            }
          },
          bindingPermissions(item){
            this.bindingPerClickItem = item
            this.getBindingPerIndex(item);
            this.$refs.permissionsTable.bindingChoose = ''
            this.bindingPerTitle = '权限设置 / 角色权限'
            this.bindingPerModal = true;
          },
          bindingPerCancel(content){
            this.bindingModal = false;
          },
          bindingPerOk(){
            this.$refs.treeTemplate.getCheckedAndIndeterminateNodes();
            if(this.bindingPerItem != []){
              let tree=this.arrToTree(this.bindingPerItem);

              insertUcRoleAuthority({},{roleId:this.bindingPerClickItem.id,ucRoleAuthorityList:tree}).then(res => {
                this.getIndex(this.page.current);
                this.bindingPerModal = false;
                // this.bindingPerList = res;
              }).catch(err => {
                this.$Message.error(err);
              })
            }else{
              setTimeout(() => {
                this.bindingPerLoading = false;
                this.$nextTick(() => {
                  this.bindingPerLoading = true;
                });
              }, 2000);
            }
          },
          getCheckedAndIndeterminateNodes(item){
            this.bindingPerItem = item;
          },

          arrToTree(checkedList){
            let arr=[];
            let that=this;
            checkedList.forEach(function (item){
              if( (item.level==1|| item.level==2)){//一级二级菜单处于半选状态或选中状态
                if((item.indeterminate)){
                  arr.push({
                    menuFatherId: item.parentId,
                    menuId: item.id,
                    menuLevel: item.level,
                    menuName: item.name,
                    organizationId: item.organizationId,
                    roleId: that.bindingPerClickItem.id,
                    roleName: that.bindingPerClickItem.name,
                    visual: 1,
                    sort:item.sort,
                  })
                } else if(item.checked){
                  arr.push({
                    menuFatherId: item.parentId,
                    menuId: item.id,
                    menuLevel: item.level,
                    menuName: item.name,
                    organizationId: item.organizationId,
                    roleId: that.bindingPerClickItem.id,
                    roleName: that.bindingPerClickItem.name,
                    visual: 1,
                    edit:1,
                    sort:item.sort,
                  })
                }

              }


              if(item.id==1 && item.level==4){//查看
                  let menu=that.findMenuByAcitonId(checkedList,item.parentId);
                  let position=that.hasMenu(arr,menu);
                  if(position!=-1){
                    arr[position].visual=1;
                  }else{
                    arr.push({
                      menuFatherId: menu.parentId,
                      menuId: menu.id,
                      menuLevel: menu.level,
                      menuName: menu.name,
                      organizationId: menu.organizationId,
                      roleId: that.bindingPerClickItem.id,
                      roleName: that.bindingPerClickItem.name,
                      visual: 1,
                      sort:menu.sort,
                    })
                  }

              }
              if(item.id==2 && item.level==4){//编辑
                let menu=that.findMenuByAcitonId(checkedList,item.parentId);
                let position=that.hasMenu(arr,menu);
                if(position!=-1){
                  arr[position].edit=1;
                }else{
                  arr.push({
                    menuFatherId: menu.parentId,
                    menuId: menu.id,
                    menuLevel: menu.level,
                    menuName: menu.name,
                    organizationId: menu.organizationId,
                    roleId: that.bindingClickItem.id,
                    roleName: that.bindingClickItem.name,
                    edit: 1,
                    sort:menu.sort,
                  })
                }
              }
            })
            return arr;
          },
          findMenuByAcitonId(checkedList,parentId){
            let result=null;
            checkedList.forEach(function (item,index){
              if(parentId!=null && item.id==parentId){
                result= item;
              }
            })
            return result;
          },
          hasMenu(array,menu){
            let p=-1;
            array.forEach(function (item,index){
              if(menu!=null && item.menuId==menu.id){
                p= index;
              }
            })
            return p;
          },

          getFirst(page){
            return organizationsGetByPage({
              pageNum:page,
            })
          },
          getSecond(page){
            return departmentsGetByPage({
              pageNum:page,
            })
          },
          apiAll(){
            this.$axios.all([this.getFirst(1),this.getSecond(1)])
              .then(this.$axios.spread((one,two) => {
                this.companyList = one.list;
                this.departmentList = two.list;
              }));
          },
        },
      created() {
        this.search.company=this.user.user.userInfo.company;
      },
      mounted() {
        this.apiAll();
        this.getIndex(1);
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
