<template>
  <div class="v-clock">
    <Card>
    <Row type="flex" justify="center" style="height: 40px;background: #eeeeee;align-items: center;">
      <Col span="4" style="font-weight: bold;text-align: center">出库类型</Col>
      <Col span="4" style="font-weight: bold;text-align: center">领用人</Col>
      <Col span="4" style="font-weight: bold;text-align: center">出库日期</Col>
      <Col span="4" style="font-weight: bold;text-align: center">用途</Col>
      <Col span="4" style="font-weight: bold;text-align: center">审批人</Col>
      <Col span="4" style="font-weight: bold;text-align: center">出库备注</Col>
    </Row>
    <Row type="flex" justify="center" style="margin-top: 5px;height: 40px;align-items: center;">
      <Col span="4" style="text-align: center">{{outTypeName}}</Col>
      <Col span="4" style="text-align: center">{{detail.receiveName}}</Col>
      <Col span="4" style="text-align: center">{{this.$moment(detail.outDate).format("YYYY-MM-DD") }}</Col>
      <Col span="4" style="text-align: center">{{detail.purpose}}</Col>
      <Col span="4" style="text-align: center">{{detail.operaterUserName}}</Col>
      <Col span="4" style="text-align: center">{{detail.remarks}}</Col>
    </Row>

    <div style="display: flex;justify-content: space-between;align-items: center">
      <div style="width: 100%">
        <Divider>出库清单</Divider>
      </div>
    </div>

    <div>
      <tableTemplate
        ref="tableTemplate"
        :tableList="tableList"
        :columns="columns"
        :height="300"
        :size="'small'">
      </tableTemplate>
    </div>
    </Card>
  </div>


</template>

<script>
  import { getWZLYGoodsDetail} from '@/axios/api';
  import tableTemplate from '@/commonComponent/tableTemplate';
    export default {
        name: "GoodsOutDetail",
        components: {
          tableTemplate
        },
        props: [],
        data() {
          return {
            outTypeName:'',
            detail:{},
            tableList:{list:[]},
            columns:[
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
                title: '出库数量',
                key: 'outCount',
                align: 'center',
              },
            ]
          }
        },
        computed: {},
        watch: {
        },
        methods: {
          getGoodsDetail(id,type) {
            switch (type) {
              case 0:
                this.outTypeName="物资领用";
                this.getWZLYGoodsDetail(id);
                break;
              case 1:
                this.outTypeName="资产外借";
                break;
              case 2:
                this.outTypeName="物品调拨";
                break;
              case 3:
                this.outTypeName="以旧换新";
                break;
            }
          },

          getWZLYGoodsDetail(id){
            let data = {
              id: id,
            }
            getWZLYGoodsDetail(data)
              .then(res => {
                this.detail = res;
                this.tableList.list=res.outReviceWzlyDetailList;
              }).catch(err => {
              this.$Message.error(err);
            })
          }
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
           height: 100%;
         }
</style>
