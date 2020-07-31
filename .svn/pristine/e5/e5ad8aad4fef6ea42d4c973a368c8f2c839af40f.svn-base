<template>
    <div class="v-clock">
      <Form class="addAccountUser" ref="managementUser" :model="managementUser" :label-width="100" :rules="ruleInline">
        <div>
          <FormItem label="角色名称:" prop="name">
            <Input type="text" v-model="managementUser.name" placeholder="请输入角色名称">
            </Input>
          </FormItem>
          <FormItem label="所属系统:" prop="systemType">
            <Select v-model="managementUser.systemType" placeholder="请选择所属系统">
              <!--              organizationId  organizationName-->
              <Option v-for="(item,index) in managementItem.organizationItem"
                      :label="item.name"
                      :value="item.name"
                      :key="index">
              </Option>
            </Select>
          </FormItem>
        </div>
        <div>
          <FormItem label="角色描述:">
            <Input
              v-model="managementUser.remark"
              type="textarea"
              :autosize="{minRows: 5,maxRows: 5}"
              placeholder="请输入角色描述" />
          </FormItem>
        </div>
        <div>
          <FormItem label="角色状态:" prop="status">
            <RadioGroup v-model="managementUser.status" class="useClass">
              <Radio label="0">有效</Radio>
              <Radio label="1">无效</Radio>
            </RadioGroup>
          </FormItem>
        </div>
      </Form>
    </div>
</template>

<script>

    export default {
        name: "permissionsForm",
        components: {},
        props: ['managementUser','managementItem'],
        data() {
            return {
              ruleInline: {
                name: [
                  { required: true, message: '请输入角色名称', trigger: 'blur' }
                ],
                systemType: [
                  { required: true, message: '请选择组织', trigger: 'change' }
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
    .useClass{
      display: flex;
      justify-content: flex-end;
      >label{
        width: 10%;
      }
    }
</style>
