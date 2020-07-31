<template>
    <div class="v-clock">
      <div class="right">
        <Input clearable style="width: 200px;" v-model="bindingUser.query" placeholder="请输入人员姓名或手机号" />
        <Button type="primary">查询</Button>
      </div>
      <tableTemplate
        ref="tableTemplate"
        :tableList="bindingTableList"
        :columns="columns"
        :page="bindingPage"
        :size="'small'"
        :height="450"
        @changePage="changePage"
        @onRowClick="onRowClick"
        @onSelectionChange="onSelectionChange">
      </tableTemplate>
    </div>
</template>

<script>
  import tableTemplate from '@/commonComponent/tableTemplate'
    export default {
        name: "accountTable",
        components: {
          tableTemplate,
        },
        props: ['bindingTableList','bindingUser','bindingPage'],
        data() {
            return {
              bindingChoose:'',
              columns: [
                {
                  title: '选择',
                  key: 'id',
                  width: 70,
                  align: 'center',
                  render: (h, params) => {
                    let id = params.row.id;
                    let flag = false;
                    if (this.bindingChoose === id) {
                      flag = true
                    } else {
                      flag = false
                    }
                    let self = this
                    return h('div', [
                      h('Radio', {
                        props: {
                          value: flag
                        },
                        on: {
                          'on-change': () => {
                            self.bindingChoose = id;
                          }
                        }
                      })
                    ])
                  }
                },
                {
                  title: '人员姓名',
                  key: 'name',
                  align: 'center',
                },
                {
                  title: '手机号',
                  key: 'phone',
                  align: 'center',
                },
                {
                  title: '所属部门',
                  key: 'departmentName',
                  align: 'center',
                },
                {
                  title: '所属组织',
                  key: 'companyName',
                  align: 'center',
                },
                {
                  title: '账号',
                  align: 'center',
                  render: (h, params) => {
                    if(params.row.accountName == null){
                      return h('span',{
                        'style':{
                          'color':'red'
                        }
                      },'无')
                    }else{
                      return h('span',{},params.row.accountName)
                    }
                  }
                },
              ],
            }
        },
        computed: {},
        watch: {},
        methods: {
          changePage(page){
            this.$emit('bindingChangePage',page)
          },
          onRowClick(item){
            this.$emit('onRowClick',item)
          },
          onSelectionChange(item){
            this.$emit('onSelectionChange',item)
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
</style>
