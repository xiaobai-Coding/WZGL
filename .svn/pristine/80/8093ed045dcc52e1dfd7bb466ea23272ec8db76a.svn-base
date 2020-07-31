<template>
    <div class="v-clock">
      <Form class="addAccountUser" ref="managementUser" :model="managementUser" :label-width="100" :rules="ruleInline">
        <div>
          <FormItem label="项目名称:" prop="name">
            <Input type="text" v-model="managementUser.name" placeholder="请输入项目名称">
            </Input>
          </FormItem>
          <FormItem label="所属组织:" prop="organizationName">
            <Select v-model="managementUser.organizationId" :label-in-value="true" @on-change="onChangeOrganizationName" placeholder="请选择所属组织">
<!--              organizationId  organizationName-->
              <Option v-for="(item,index) in managementItem.organizationItem"
                      :label="item.name"
                      :value="item.id"
                      :key="index">
              </Option>
            </Select>
          </FormItem>
        </div>
        <div>
          <FormItem label="合同金额:">
            <InputNumber
              :max="100000000000000" :min="0"
              v-model="managementUser.contractValue"
              :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\$\s?|(,*)/g, '')"></InputNumber>
          </FormItem>
          <FormItem label="人数:">
            <InputNumber :max="1000000" :precision="0" :min="1" v-model="managementUser.peopleCount"></InputNumber>
          </FormItem>
        </div>
        <div>
          <FormItem label="负责人:" prop="headName">
<!--            head-->
            <Select v-model="managementUser.head" :label-in-value="true" @on-change="onChangeHeadName" placeholder="请选择负责人">
              <Option v-for="(item,index) in managementItem.peopleItem"
                      :label="item.name"
                      :value="item.id"
                      :tag="item.phone"
                      :key="index">
              </Option>
            </Select>
          </FormItem>
          <FormItem label="负责人电话:" prop="headPhone">
            <Input type="text" v-model="managementUser.headPhone" placeholder="请填写负责人电话">
            </Input>
          </FormItem>
        </div>
        <div>
          <FormItem label="联系人:" prop="contractName">
<!--            contract-->
            <Select v-model="managementUser.contract" :label-in-value="true" @on-change="onChangeContractName" placeholder="请选择联系人">
              <Option v-for="(item,index) in managementItem.peopleItem"
                      :label="item.name"
                      :value="item.id"
                      :tag="item.phone"
                      :key="index">
              </Option>
            </Select>
          </FormItem>
          <FormItem label="联系人电话:" prop="contractPhone">
            <Input type="text" v-model="managementUser.contractPhone" placeholder="请填写联系人电话">
            </Input>
          </FormItem>
        </div>
        <div>
          <div style="display:flex;">
            <FormItem label="主要业务:">
<!--              businessId   businessName-->
              <Select multiple :max-tag-count="4" v-model="managementUser.businessId" :label-in-value="true" @on-change="onChangeBusinessName" placeholder="请选择主要业务">
                <Option v-for="(item,index) in managementItem.businessItem"
                        :label="item.name"
                        :value="item.id"
                        :key="index">
                </Option>
              </Select>
            </FormItem>
          </div>
        </div>
        <div>
          <FormItem label="合同附件:" class="imgBox">
            <UploadImage
              ref="UploadImage"
              :type="3"
              @setImageList="setImageListPicture"
              :uploadList="annex"
              @delImageList="delImageListPicture"
              @removeImageList="removeImageList"
              :imageTitle="'上传'"
              :imageNum="5">
            </UploadImage>
          </FormItem>
        </div>
        <div>
          <FormItem label="是否启用:" prop="use">
            <RadioGroup v-model="managementUser.use" class="useClass">
              <Radio label="0">是</Radio>
              <Radio label="1">否</Radio>
            </RadioGroup>
          </FormItem>
        </div>
      </Form>
    </div>
</template>

<script>
  import UploadImage from '@/commonComponent/UploadTemplate'
    export default {
        name: "projectForm",
        components: {
          UploadImage,
        },
        props: ['managementUser','managementItem','annex'],
        data() {
            return {
              ruleInline: {
                name: [
                  { required: true, message: '请输入项目名称', trigger: 'blur' }
                ],
                headPhone: [
                  {
                    required: false,
                    type: "string",
                    message: "",
                    trigger: "blur"
                  },
                  {
                    type: "string",
                    pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                    message: "请输入正确负责人电话!",
                    trigger: "blur"
                  }
                ],
                contractPhone: [
                  {
                    required: false,
                    type: "string",
                    message: "",
                    trigger: "blur"
                  },
                  {
                    type: "string",
                    pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                    message: "请输入正确联系人电话!",
                    trigger: "blur"
                  }
                ],
                organizationName: [
                  { required: true, message: '请选择组织', trigger: 'change' }
                ],
                headName: [
                  { required: true, message: '请选择负责人', trigger: 'change' }
                ],
                contractName: [
                  { required: true, message: '请选择联系人', trigger: 'change' }
                ],
                type: [
                  { required: true, message: '请选择组织类型', trigger: 'change' }
                ],
                use: [
                  { required: true, message: '是否开启', trigger: 'change' }
                ],
              },
            }
        },
        computed: {},
        watch: {},
        methods: {
          onChangeAdminName(item){
            this.$emit('onChangeAdminName',item)
          },
          setImageListPicture(item){
            this.$emit('setImageListPicture',item)
          },
          delImageListPicture(item){
            this.$emit('delImageListPicture',item)
          },
          removeImageList(file){
            this.$emit('removeImageList',file)
          },
          onChangeOrganizationName(item){
            this.$emit('onChangeOrganizationName',item)
          },
          onChangeHeadName(item){
            this.$emit('onChangeHeadName',item)
          },
          onChangeContractName(item){
            this.$emit('onChangeContractName',item)
          },
          onChangeBusinessName(item){
            this.$emit('onChangeBusinessName',item)
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
    .addAccountUser{
      >div{
        margin:0px 0;
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
          >div:nth-of-type(1){
            width: 100%;
          }
        }
      }
      >div:nth-of-type(6){
        display: block;
        >div:nth-of-type(1){
          width: 100%;
          >div:nth-of-type(1){
            >div:nth-of-type(1){
              /*display: flex;*/
              /*align-items: center;*/
            }
          }
        }
      }
      >div:nth-of-type(7){
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
    @{deep}.box{
      >.ivu-form-item-label{
        width: 90px!important;
      }
      >.ivu-form-item-content{
        margin-left: 90px!important;
      }
    }
    @{deep}.imgBox{
      >div{
        >div{
          display: flex;
          .demo-upload-list{
            width: 80px;
            height: 80px;
          }
          .demo-upload-list-cover i{
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            margin: 0 2px;
            line-height: 80px;
          }
        }
      }
    }
  .ivu-input-number{
    width: 100%;
  }
  .useClass{
    display: flex;
    justify-content: flex-end;
    >label{
      width: 10%;
    }
  }
</style>
