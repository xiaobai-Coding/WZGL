<template>
    <div class="v-clock">
      <Form ref="modalUser" :model="modalUser" :label-width="80" :rules="ruleInline">
        <Divider orientation="left">
          <Button style="color: #02A7F0">个人信息</Button>
        </Divider>
        <div class="demo-split" v-if="modalControl">
          <Split v-model="split1">
            <div slot="left" class="demo-split-pane boxFlex"
                 style="display: flex;
                        flex-wrap: wrap;
                        width: 100%;
                        height: 100%;
                        position: relative;">
              <div v-if="pictureItem.length == 0 || pictureItem[0].url == null">
                <Icon type="md-camera" size="100" />
              </div>
              <div>
                <UploadImage
                  ref="UploadImage"
                  :type="3"
                  @setImageList="setImageListPicture"
                  :uploadList="pictureItem"
                  @delImageList="delImageListPicture"
                  @removeImageList="removeImageList"
                  :imageTitle="'上传个人照片'"
                  :imageNum="1">
                </UploadImage>
              </div>
            </div>
            <div slot="right" class="demo-split-pane">
              <div class="middle">
                <FormItem prop="name" label="姓名">
                  <Input type="text" v-model="modalUser.name" placeholder="请输入姓名">
                  </Input>
                </FormItem>
                <FormItem prop="phone" label="手机号">
                  <Input type="text" v-model="modalUser.phone" placeholder="请输入手机号">
                  </Input>
                </FormItem>
              </div>
              <div class="middle">
                <FormItem prop="sex" label="性别">
                  <Select v-model="modalUser.sex"
                          style="width:80px">
                    <Option v-for="(item,index) in modalUserItem.sexItem"
                            :value="item.value"
                            :label="item.label"
                            :key="index">
                    </Option>
                  </Select>
                </FormItem>
                <FormItem label="证件号码" prop="idNum">
                  <div style="display:flex;">
                    <Select v-model="modalUser.type"
                            style="width:80px">
                      <Option v-for="(item,index) in modalUserItem.typeItem"
                              :value="item.value"
                              :key="index">
                        {{item.label}}
                      </Option>
                    </Select>
                    <Input style="margin-left: 1%;" type="text" v-model="modalUser.idNum" placeholder="请输入证件号码">
                    </Input>
                  </div>
                </FormItem>
              </div>

              <div class="middle">
                <FormItem label="职称">
                  <Select v-model="modalUser.title"
                          style="width:160px">
                    <Option v-for="(item,index) in modalUserItem.titleTypeItem"
                            :value="item.id"
                            :label="item.name"
                            :key="index">
                    </Option>
                  </Select>
                </FormItem>
                <FormItem label="邮箱" prop="email">
                  <Input type="text" v-model="modalUser.email" placeholder="请输入邮箱">
                  </Input>
                </FormItem>
              </div>
              <div>
                <FormItem label="联系地址">
                  <Input type="text" v-model="modalUser.address" placeholder="请输入联系地址">
                  </Input>
                </FormItem>
              </div>
            </div>
          </Split>
        </div>


        <Divider orientation="left">
          <Button style="color: #02A7F0">系统信息</Button>
        </Divider>
        <div class="demo-split2" v-if="modalControl">
          <Split v-model="split2" mode="vertical">
            <div slot="top" class="demo-split-pane">
              <div class="middle">
                <FormItem prop="company" label="所属组织">
                  <div style="display:flex;">
                    <Select v-model="modalUser.company" :label-in-value="true" filterable @on-change="onChangeCompany">
                      <Option v-for="(item,index) in modalUserItem.companyItem"
                              :label="item.name"
                              :value="item.id"
                              :key="index">
                      </Option>
                    </Select>
                  </div>
                </FormItem>
                <FormItem label="所属部门" prop="department">
                  <div style="display:flex;">
                    <Select v-model="modalUser.department" :label-in-value="true" filterable @on-change="onChangeDepartment">
                      <Option v-for="(item,index) in modalUserItem.departmentItem"
                              :label="item.name"
                              :value="item.id"
                              :key="index">
                      </Option>
                    </Select>
                  </div>
                </FormItem>
              </div>
              <div class="middle">
                <FormItem prop="post" label="岗位">
                  <Input type="text" v-model="modalUser.post" placeholder="请输入岗位">
                  </Input>
                </FormItem>
                <FormItem label="工号" prop="jobNum">
                  <Input type="text" v-model="modalUser.jobNum" placeholder="请输入工号">
                  </Input>
                </FormItem>
              </div>
              <div>
                <FormItem prop="jobStatus" label="在职状态">
                  <Select v-model="modalUser.jobStatus">
                    <Option v-for="(item,index) in modalUserItem.jobStatusItem"
                            :value="item.value"
                            :label="item.label"
                            :key="index">
                    </Option>
                  </Select>
                </FormItem>
              </div>
            </div>
            <div slot="bottom" class="demo-split-pane">
              <div>
                <FormItem label="备注说明">
                  <Input type="textarea" :autosize="{minRows: 2,maxRows: 2}" v-model="modalUser.remarks" placeholder="请输入备注">
                  </Input>
                </FormItem>
              </div>
            </div>
          </Split>
        </div>

<!--        <Divider orientation="left">账号信息</Divider>-->
<!--        <div class="demo-split3" v-if="modalControl">-->
<!--          <Split v-model="split3" mode="vertical">-->
<!--            <div slot="top" class="demo-split-pane" style="text-align: center;">-->
<!--              <div class="middle">-->
<!--                <FormItem prop="accountName" label="账号">-->
<!--                  <Input type="text" v-model="modalUser.accountName" placeholder="请输入账号">-->
<!--                  </Input>-->
<!--                </FormItem>-->
<!--                <FormItem prop="password" label="密码">-->
<!--                  <Input type="text" v-model="modalUser.password" placeholder="请输入密码">-->
<!--                  </Input>-->
<!--                </FormItem>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div slot="bottom" class="demo-split-pane">-->
<!--              <div class="middle">-->
<!--                <FormItem label="账号">-->
<!--                  <Radio v-model="modalUser.openAccount">开通账号</Radio>-->
<!--                </FormItem>-->
<!--                <FormItem label="账号权限">-->
<!--                  <div style="text-decoration: underline;">未设置</div>-->
<!--                </FormItem>-->
<!--              </div>-->
<!--            </div>-->
<!--          </Split>-->
<!--        </div>-->
<!--        <FormItem>-->
<!--          <Button type="primary" @click="handleSubmit('modalUser')">Signin</Button>-->
<!--        </FormItem>-->
      </Form>
    </div>
</template>

<script>
  import UploadImage from '@/commonComponent/UploadTemplate'
    export default {
        name: "personnel",
        components: {
          UploadImage,
        },
        props: ['modalUser','modalControl','modalUserItem','pictureItem'],
        data() {
            return {
              formInline: {
                user: '',
                password: ''
              },
              ruleInline: {
                name: [
                  { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                phone: [
                  {
                    required: true,
                    type: "string",
                    message: "手机号不能为空",
                    trigger: "blur"
                  },
                  {
                    type: "string",
                    pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                    message: "请输入正确手机号!",
                    trigger: "blur"
                  }
                ],
                idNum: [
                  {
                    required: false,
                    type: "string",
                    message: "",
                    trigger: "blur"
                  },
                  {
                    type: "string",
                    pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                    // pattern: /\\d{14}[[0-9],0-9xX]/,
                    message: "请输入正确身份证号码!",
                    trigger: "blur"
                  }
                ],
                email: [
                  {
                    required: false,
                    type: "string",
                    message: "",
                    trigger: "blur"
                  },
                  {
                    type: "string",
                    pattern: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
                    message: "请输入正确邮箱!",
                    trigger: "blur"
                  }
                ],
                sex: [
                  {required: true, message: '请输入性别', trigger: 'change'}
                ],
                company: [
                  {required: true, message: '请输入所属组织', trigger: 'change'}
                ],
                department: [
                  {required: true, message: '请输入所属组织', trigger: 'change'}
                ],
                post: [
                  {required: true, message: '请输入岗位', trigger: 'change'}
                ],
                jobStatus: [
                  {required: true, message: '请输入在职状态', trigger: 'change'}
                ],
                // accountName: [
                //   {required: true, message: '请输入账号', trigger: 'change'}
                // ],
                // password: [
                //   {required: true, message: '请输入密码', trigger: 'blur'},
                //   {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'change'}
                // ],
              },
              split1: 0.3,
              split2: 0.7,
              split3: 0.6,

            }
        },
        computed: {},
        watch: {},
        methods: {
          setImageListPicture(item){
            this.$emit('setImageListPicture',item)
          },
          delImageListPicture(item){
            this.$emit('delImageListPicture',item)
          },
          removeImageList(file){
            this.$emit('removeImageList',file)
          },
          onChangeCompany(item){
            this.$emit('onChangeCompany',item)
          },
          onChangeDepartment(item){
            this.$emit('onChangeDepartment',item)
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
    .demo-split{
      height: 250px;
      border: 1px solid #dcdee2;
    }
    .demo-split2{
      height: 270px;
      border: 1px solid #dcdee2;
    }

    .demo-split3{
      height: 150px;
      border: 1px solid #dcdee2;
    }
    .demo-split-pane{
      padding: 10px;
    }
    .middle{
      >div{
        width: 50%;
        padding: 0 2%;
      }
    }
  .boxFlex{
    >div{
      width: 100%;
      text-align: center;
    }
    >div:nth-of-type(1){
      height: 70%;
    }
  }
</style>
