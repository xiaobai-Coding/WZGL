<template>
    <div class="v-clock">
      <Form class="addAccountUser" ref="addAccountUser" :model="addAccountUser" :label-width="90" :rules="ruleInline">
        <div>
          <FormItem label="账号:" prop="name">
            <Input type="text" v-model="addAccountUser.name" placeholder="请输入账号">
            </Input>
          </FormItem>
          <FormItem label="密码:" prop="password">
            <Input type="password" password v-model="addAccountUser.password" placeholder="请输入密码">
            </Input>
          </FormItem>
        </div>
        <div>
          <FormItem label="账号类型:" style="width: 100%;" prop="radio">
            <div style="display: flex;
                        width: 100%;
                        justify-content: space-between;">
              <RadioGroup v-model="addAccountUser.radio" style="    width: calc(100% - 70px);
                          display: flex;
                          justify-content: space-around;">
                <Radio label="0">超级管理员</Radio>
                <Radio label="1">
                  角色权限
                </Radio>
              </RadioGroup>
<!--              <div style="cursor: pointer;" @click="chooseAccount">未设置&nbsp;&nbsp;&nbsp;&nbsp;></div>-->
              <div v-if="addAccountUser.radio == 1?true:false" style="cursor: pointer;" @click="choosePeople(0)">
                <span v-if="addAccountUser.roleName == undefined">未设置&nbsp;&nbsp;&nbsp;&nbsp;></span>
                <span v-else>[{{addAccountUser.roleName}}]</span>
              </div>
            </div>
          </FormItem>
        </div>
        <div>
<!--          <div style="width: 80px;text-align: right;padding: 0px 12px 0px 0;">账号权限:</div>-->
<!--          <div style="cursor: pointer;">未设置&nbsp;&nbsp;&nbsp;&nbsp;></div>-->

        </div>
        <div>
          <FormItem label="备注说明:">
            <Input
              v-model="addAccountUser.remarks"
              type="textarea"
              :autosize="{minRows: 5,maxRows: 5}"
              placeholder="请输入备注说明" />
          </FormItem>
        </div>
        <div>
          <div style="width: 80px;text-align: right;padding: 0px 12px 0px 0;">使用人:</div>
          <div v-if="addAccountUser.employeeName == null" style="cursor: pointer;" @click="choosePeople">请选择&nbsp;&nbsp;&nbsp;&nbsp;></div>
          <div v-else style="cursor: pointer;" @click="choosePeople(1)">{{addAccountUser.employeeName}} - {{addAccountUser.employeePhone}}</div>
        </div>
      </Form>



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
        <accountTable
          ref="accountTable"
          :bindingTableList="bindingTableList"
          :bindingUser="bindingUser"
          :bindingPage="bindingPage"
          :bindingChoose="bindingChoose"
          @onRowClick="bindingSelectionChange"
          @bindingChangePage="bindingChangePage">
        </accountTable>
      </Modal>



<!--      <Modal-->
<!--        v-model="bindAccountModal"-->
<!--        :title="bindAccountTitle"-->
<!--        :loading="bindAccountLoading"-->
<!--        :mask-closable="false"-->
<!--        @on-ok="bindAccountOk"-->
<!--        @on-cancel="bindAccountCancel"-->
<!--        width="1000"-->
<!--        ok-text = '保存'-->
<!--        cancel-text = '取消'>-->

<!--      </Modal>-->
    </div>
</template>

<script>
  import { getByPage,ucRolesGetByPage } from '@/axios/api';
  import accountTable from './accountTable'
    export default {
        name: "accountForm",
        components: {
          accountTable,
        },
        props: ['addAccountUser'],
        data() {
            return {
              ruleInline: {
                name: [
                  {required: true, message: '请输入账号', trigger: 'blur'},
                  {
                    type: 'string',
                    pattern: /^[0-9a-zA-Z]{5,49}.+$/,
                    message: '账号为6-11位数字或字母!',
                    trigger: 'blur'
                  }
                ],
                password: [
                  {required: true, message: '请输入密码', trigger: 'blur'},
                  {
                    type: 'string',
                    pattern: /^[0-9a-zA-Z]{5,49}.+$/,
                    message: '密码为6-32位数字或字母!',
                    trigger: 'blur'
                  }
                ],
                // radio: [
                //   {required: true, message: '请输入密码', trigger: 'blur'},
                //   {
                //     type: 'string',
                //     pattern: /^[0-9a-zA-Z]{5,49}.+$/,
                //     message: '密码为6-32位数字或字母!',
                //     trigger: 'blur'
                //   }
                // ],
                radio: [
                  {required: true, message: '请选择角色权限', trigger: 'change'}
                ],
              },


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
              bindingSelection:[],
              bindingChoose: '',


              clickNumber:null,

              // bindAccountModal:false,
              // bindAccountTitle:'',
              // bindAccountLoading:true,
              // bindAccountUser:{
              //   query:'',
              // },
              // bindAccountTableList:{},
              // bindAccountPage:{
              //   current:1,
              // },
              // bindAccountClickItem:{},
              // bindAccountSelection:[],
              // bindAccountChoose: '',
            }
        },
        computed: {},
        watch: {},
        methods: {
          bindingOk(){
            if(this.bindingSelection != []){
              this.$emit('choosePeople',this.clickNumber,this.bindingSelection)
              this.bindingModal = false;
            }else{
              setTimeout(() => {
                this.bindingLoading = false;
                this.$nextTick(() => {
                  this.bindingLoading = true;
                });
              }, 2000);
            }
          },
          bindingCancel(content){
            this.bindingModal = false;
          },
          bindingChangePage(page){
            this.bindingPage.current = page;
            if(this.clickNumber == 0){
              this.getAccountIndex(page);
            }else {
              this.getBindingIndex(page);
            }
          },
          bindingSelectionChange(item){
            this.bindingSelection = item;
          },
          choosePeople(number){
            this.clickNumber = number;
            if(this.clickNumber == 0){
              this.getAccountIndex(1);
              this.bindingTitle = '选择权限'
            }else {
              this.getBindingIndex(1);
              this.bindingTitle = '选择使用人'
            }
            this.$refs.accountTable.bindingChoose = ''
            this.bindingModal = true;
          },
          getBindingIndex(page){
            getByPage({
              pageNum:page,
            }).then(res => {
              this.bindingTableList = res;
            }).catch(err => {
              this.$Message.error(err);
            })
          },


          // bindAccountOk(){
          //   if(this.bindAccountSelection != []){
          //     // this.$emit('choosePeople',this.bindAccountSelection)
          //     this.bindAccountModal = false;
          //   }else{
          //     setTimeout(() => {
          //       this.bindAccountLoading = false;
          //       this.$nextTick(() => {
          //         this.bindAccountLoading = true;
          //       });
          //     }, 2000);
          //   }
          // },
          // bindAccountCancel(content){
          //   this.bindAccountModal = false;
          // },
          // bindAccountChangePage(page){
          //   this.bindAccountPage.current = page;
          //   this.getAccountIndex(page)
          // },
          // bindAccountSelectionChange(item){
          //   this.bindAccountSelection = item;
          // },
          //
          // chooseAccount(){
          //   this.getAccountIndex(1);
          //   this.$refs.accountTable.bindingChoose = ''
          //   this.bindAccountTitle = '选择权限'
          //   this.bindAccountModal = true;
          // },
          getAccountIndex(page){
            ucRolesGetByPage({
              pageNum:page,
            }).then(res => {
              this.bindingTableList = res;
            }).catch(err => {
              this.$Message.error(err);
            })
          },
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
    @{deep}.ivu-form-item {
        margin: 0px !important;
    }
  .addAccountUser{
    >div{
      margin:15px 0;
      display: flex;
      justify-content: space-between;
    }
    >div:nth-of-type(4){
      display: block;
    }
  }
    @{deep}.ivu-modal-footer{
      text-align: center!important;
    }
</style>
