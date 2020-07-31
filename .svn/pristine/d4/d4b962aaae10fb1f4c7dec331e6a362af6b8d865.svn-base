<template>
  <div class="v-clock">
    <Form class="formClass" ref="obj" :model="obj" :label-width="100" :rules="ruleInline">
      <div>
        <FormItem label="名称:" prop="name">
          <Input type="text" v-model="obj.name" placeholder="">
          </Input>
        </FormItem>
        <FormItem label="排序码:" prop="sort">
          <Input type="text"  v-model="obj.sort" placeholder="请输入部门序号">
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
      <div>
        <FormItem label="备注">
          <Input
            v-model="obj.remarks"
            type="textarea"
            :autosize="{minRows: 5,maxRows: 5}"
            placeholder="请输入备注" />
        </FormItem>
      </div>
    </Form>




  </div>
</template>

<script>
  export default {
    name: "objForm",
    components: {
    },
    props: ['obj'],
    data() {
      return {
        ruleInline:{
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          sort:[
            {required: true, message: '请输入排序码', trigger: 'blur'},
            {
              type: 'string',
              pattern: /^\+?[1-9][0-9]*$/,
              message: '排序码为非0正整数!',
              trigger: 'blur'
            }
          ],
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
