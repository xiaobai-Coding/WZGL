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
      name: "PurchasingGoodsListEditForm",
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
              width: 50,
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
            {
              title: '品牌',
              key: 'brand',
              align: 'center',
            },
            {
              title: '规格',
              key: 'model',
              align: 'center',
            },
            {
              title: '单位',
              key: 'unit',
              align: 'center',
              width: 60,
            },
            {
              title: '采购数量',
              key: 'count',
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
                      value:params.row.count,
                      min:1,
                      step:1,
                      required:true,
                      formatter:function(value){
                        return parseInt(value);
                      },
                    },
                    on: {
                      input:function (value) {
                        let count=parseInt(value);
                        params.row.count=count;
                        params.row.totalPrice=that.getTotalPrice(params.row);
                        setTimeout(function () {
                          that.tableList.list[params.index].count=params.row.count;
                          that.tableList.list[params.index].totalPrice=params.row.totalPrice;
                        },200)
                      }
                    }
                  })
                ])}
            },
            {
              title: '预计单价(元)',
              key: 'price',
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
                      value:params.row.price,
                      min:1,
                      step:0.01,
                      required:true,
                      formatter:function(value){
                        return Math.floor(value * 100) / 100;
                      },
                    },
                    on: {
                      input:function (value) {
                        let price=Math.floor(value * 100) / 100;
                        params.row.price=price;
                        params.row.totalPrice=that.getTotalPrice(params.row);
                        setTimeout(function () {
                          that.tableList.list[params.index].price=params.row.price;
                          that.tableList.list[params.index].totalPrice=params.row.totalPrice;
                        },200)
                      }
                    }
                  })
                ])}
            },
            {
              title: '预计花费总金额(元)',
              key: 'totalPrice',
              align: 'center',
              render: (h, params) => {
                return h('a', [
                  h('span', {
                    style: {
                      height: '30px',
                      width: '90px',
                    }},params.row.totalPrice)
                ])}
            },
            {
              title: '备注',
              key: 'remarks',
              align: 'center',
              render: (h, params) => {
                let that=this;
                return h('div', [
                  h('input', {
                    style: {
                      height: '30px',
                      width: '90px',
                    },
                    props:{
                      type:'text',
                      value:params.row.remarks,
                      min:0,
                      max:30,
                      required:false,
                      placeholder:'请输入备注信息',
                    },
                    on: {
                      input:function (value) {
                        that.tableList.list[params.index].remarks=value;
                      }
                    }
                  })
                ])}
            },
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
        },
        getTotalPrice(item){
          return item.price*item.count;
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
