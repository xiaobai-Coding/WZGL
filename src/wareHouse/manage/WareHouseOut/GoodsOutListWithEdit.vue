<!--采购列表编辑页面 -->
<template>
  <div class="v-clock">
      <tableTemplate
        ref="tableTemplate"
        :tableList="tableList"
        :columns="columns"
        :size="'small'"
        :height="300"
      >
      </tableTemplate>
  </div>
</template>

<script>
  import tableTemplate from '@/commonComponent/tableTemplate';
    export default {
      name: "GoodsOutListWithEdit",
      components: {
        tableTemplate
      },
      props: ['tableList'],
      data() {
        return {
          columns: [
            {
              title:'序号',
              type: 'index',
              width: 80,
              align: 'center'
            },
            {
              title: '物品名称',
              key: 'goodsName',
              align: 'center',
            },
            {
              title: '物品编号',
              key: 'num',
              align: 'center',
            },
            // {
            //   title: '批次',
            //   key: 'num',
            //   align: 'center',
            // },
            {
              title: '物品类别',
              key: 'categoryName',
              align: 'center',
            },
            {
              title: '所在仓库',
              key: 'storeName',
              align: 'center',
            },
            {
              title: '单位',
              key: 'unit',
              align: 'center',
            },
            {
              title: '规格型号',
              key: 'model',
              align: 'center',
            },
            {
              title: '库存',
              key: 'count',
              align: 'center',
              render: (h, params) => {
                return h('a', [
                  h('span', {
                    style: {
                      color:'#5599e5'
                    },
                  },params.row.count),])}
            },
            {
              title: '出库数量',
              key: 'outCount',
              width: 100,
              align: 'center',
              render: (h, params) => {
                let that=this;
                return h('div', [
                  h('InputNumber', {
                    style: {
                      height: '30px',
                      width: '90px',
                    },
                    props:{
                      type:'number',
                      value:params.row.outCount,
                      min:1,
                      max:params.row.count,
                      required:true,
                    },
                    on: {
                      input:function (value) {
                        that.tableList.list[params.index].outCount=value;
                      }
                    }
                  })
                ])}
            },
            {
              title: '操作',
              key: 'action',
              width: 50,
              align: 'center',
              render: (h, params) => {
                return h('div', [
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
                        this.tableList.list.splice(params.index,1)
                      }
                    }
                  },),

                ])
              }
            }
          ],
        }
      },
      computed: {

      },
      watch: {
      },
      methods: {
        setData(data){
          this.tableList=data;
        },
        getData(){
          this.$emit("FetchEditList",this.tableList);
        }
      },
      created() {

      },
      mounted() {

      },
    }
</script>

<style scoped>

</style>
