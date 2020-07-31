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
        name: "permissionsTable",
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
                  title: '账号',
                  key: 'name',
                  align: 'center',
                },
                {
                  title: '账号状态',
                  align: 'center',
                  width: 140,
                  // render: (h, params) => {
                  //   return h('div', [
                  //     h('div',{
                  //       class:params.row.employeeName == null?'':'fontColor',
                  //     },params.row.employeeName == null?'未激活':'已激活')
                  //   ]);
                  // },
                  render: (h, params) => {
                    const row = params.row;
                    const color = row.employeeName == '未激活' ? 'error' : 'success';
                    const text = row.employeeName == '未激活' ? '未激活' : '已激活';

                    return h('Tag', {
                      props: {
                        type: 'dot',
                        color: color
                      },
                    }, text);
                  }
                },
                {
                  title: '使用人',
                  key: 'employeeName',
                  align: 'center',
                },
                {
                  title: '使用人手机号',
                  key: 'employeePhone',
                  width: 120,
                  align: 'center',
                  render: (h, params) => {
                    return h('div', [
                      h('div',{
                        class:'numberColor',
                      },params.row.employeePhone)
                    ]);
                  },
                },
                {
                  title: '账号角色权限',
                  key: 'roleName',
                  width: 120,
                  align: 'center',
                },
                {
                  title: '最新维护时间',
                  key: 'createTime',
                  align: 'center',
                  width: 140,
                  sortable: true,
                  render: (h, params) => {
                    if(params.row.createTime == null){
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
                  align: 'center',
                  // render: (h, params) => {
                  //   return h('div', [
                  //     h('div',{
                  //       class:'fontColor',
                  //     },params.row.userName + '-' + params.row.userPhone)
                  //   ]);
                  // },
                  render: (h, params) => {
                    let texts = params.row.userName + '-' + params.row.userPhone
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
