<template>
  <div class="v-clock">
    <Card>
      <div style="display:flex;height: 100%;">
        <div style="width: 300px;height: 100%;">

          <div style="height: calc(30% - 40px);text-align: center;">
            <div style="width: 120px;height: 120px;margin: 0 auto;">
              <img src="../../../../static/images/statistical.png" alt="">
            </div>
            <div style="color: #a2a0a0;">本月出库</div>
            <div class="moneyColor" style="font-weight: 900;margin: 10px">32</div>
            <div style="color: #a2a0a0;">待审批</div>
            <div class="moneyColor" style="font-weight: 900;margin: 10px">15</div>
            <div style="color: #a2a0a0;">本年出库</div>
            <div class="moneyColor" style="font-weight: 900;margin: 10px">11280</div>
          </div>

          <div style="height: 40%;">
            <div id="bar-chart" style="width: 100%;height: 100%;"></div>
          </div>

          <div style="height: 20%;text-align: center">

            <div style="width: 40px;height: 40px;margin: 0 auto;" @click="addObj">
              <img src="../../../../static/images/add.png" alt="">
            </div>
            <div style="color: #a2a0a0;margin:10px auto;">新增出库</div>


          </div>

        </div>


        <div style="width: calc(100% - 300px)">
          <div style="display: flex;justify-content: flex-start;align-items: center;">
            <Button :type="buttonType.one" @click="changeButtonType(0)" style="width: 120px;margin-left: 5px;">物资领用 <Badge :count="3" class="demo-badge" style="display: none" ></Badge></Button>
            <Button :type="buttonType.two" @click="changeButtonType(1)" style="width: 120px;margin-left: 5px;">资产外借</Button>
            <Button :type="buttonType.three" @click="changeButtonType(2)" style="width: 120px;margin-left: 5px;">物品调拨</Button>
            <Button :type="buttonType.four" @click="changeButtonType(3)" style="width: 120px;margin-left: 5px;">以旧换新</Button>

            <Select v-model="search.orgId" placeholder="请选择组织" style="width: 300px;margin-left: 5px;" @on-change="changeOrg" :disabled="user.user.admin!=1">
              <Option v-for="(item,index) in orgList"
                      :value="item.id"
                      :label="item.name"
                      :key="index">
              </Option>
            </Select>
          </div>
          <div class="left">
            <div>
              <div>
                <DatePicker type="daterange" v-model="search.dateRange"  placeholder="开始日期和结束日期" style="width: 200px;"  format="yyyy-MM-dd"
                            :options="options" @on-change="getCustomDate" :clearable="false"></DatePicker>
              </div>
              <div style="width: 200px">
                <Select v-model="search.state" clearable placeholder="出库状态">
                  <Option v-for="(item,index) in status"
                          :value="item.value"
                          :label="item.label"
                          :key="index">
                  </Option>
                </Select>
              </div>
              <div style="width: 200px">
                <Cascader v-model="search.category" :data="categoryList" trigger="hover" filterable change-on-select ></Cascader>
              </div>

              <div>
                <Input clearable v-model="search.name" placeholder="请输入关键字" />
              </div>
              <div>
                <Button type="primary" @click="getPageList(1)">查询</Button>
              </div>
            </div>
          </div>
          <tableTemplate
            ref="tableTemplate"
            :tableList="tableList"
            :columns="columns"
            :page="page"
            :size="'small'"
            @changePage="changePage">
          </tableTemplate>
        </div>


        <!--添加编辑出库单-->
        <Modal
          v-model="purchasingModal"
          :title="title"
          :loading="submitLoading"
          :mask-closable="false"
          @on-ok="submit('obj')"
          @on-cancel="cancel"
          width="800"
          ok-text = '提交'
          cancel-text = '取消'>
          <WareHouseOutForm
            ref="form"
            :obj="obj"
            :categoryList="categoryList"
          >
          </WareHouseOutForm>
        </Modal>

        <!--物资领用出库单详情-->
        <Modal
          v-model="GoodsDetailModal"
          title="查看 / 出库详情"
          :mask-closable="false"
          @on-ok="GoodsDetailModal=false"
          @on-cancel="GoodsDetailModal=false"
          width="800"
          ok-text = '关闭'
          cancel-text = ''>
          <GoodsOutDetail
            ref="DetailComponent"
          >
          </GoodsOutDetail>
        </Modal>
      </div>
    </Card>
  </div>
</template>

<script>
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  require("echarts/lib/component/legend")
  require('echarts/lib/chart/pie')


  import { getAllOrganizations,getGoodsCategoryList,getGoodsOutList,insertGoodsOut,updateGoodsOut,deleteGoodsOut} from '@/axios/api';
  import tableTemplate from '@/commonComponent/tableTemplate';
  import WareHouseOutForm from "../../manage/WareHouseOut/WareHouseOutForm";
  import GoodsOutDetail from "../../manage/WareHouseOut/GoodsOutDetail";

  export default {
    name: "WareHouseInventoryIndex",
    components: {
      tableTemplate,
      WareHouseOutForm,
      GoodsOutDetail
    },
    data() {
      return {
        user:this.$store.getters.submitData,
        orgList:[],
        categoryList:[],
        status:[
          {
            value:0,
            label:'已出库',
          },
          {
            value:1,
            label:'待出库',
          },
          {
            value:2,
            label:'未通过',
          },
        ],
        options: {
          disabledDate (date) {
            return date && date.valueOf() > Date.now();
          }
        },
        search:{
          queryType:0,
          orgId:null,
          orgName:null,
          dateRange:['',''],
          category:[],
          state:null,
          name:null,
        },
        buttonType:{
          one:'primary',
          two:'default',
          three:'default',
          four:'default',
        },

        tableList:{},
        page:{
          current:1,
        },
        columns:[],
        columns1: [
          {
            title:'序号',
            type: 'index',
            width: 80,
            align: 'center'
          },
          {
            title: '发起日期',
            key: 'createTime',
            align: 'center',
            render: (h, params) => {
              return h('a', [
                h('span', {
                    style:{color:'#333333'}
                }, this.$moment(params.row.createTime).format("YYYY-MM-DD HH:mm") ),])}
          },

          // {
          //   title: '状态',
          //   key: 'headPhone',
          //   align: 'center',
          // },
          {
            title: '出库日期',
            key: 'outDate',
            align: 'center',
            render: (h, params) => {
              return h('a', [
                h('span', {
                  style:{color:'#333333'}
                }, this.$moment(params.row.outDate).format("YYYY-MM-DD") ),])}
          },
          {
            title: '领用人',
            key: 'receiveName',
            align: 'center',
          },
          {
            title: '领用数量',
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
            title: '审批人',
            key: 'operaterUserName',
            align: 'center',
          },

          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('a', [
                h('span', {
                  style: {
                    color:'#5599e5',
                    display:'none',
                  },
                  on: {
                    click: e => {
                      e.stopPropagation();
                      //出库
                    }
                  }
                },'执行出库'),
                h('Divider', {props: {type: 'vertical',},style:{display: 'none'}}),
                h('span', {
                  style: {
                    color:'#5599e5'
                  },
                  on: {
                    click: e => {
                      e.stopPropagation();
                      //查看详情
                      this.GoodsDetailModal=true;
                      this.$refs.DetailComponent.getGoodsDetail(params.row.id,0);
                    }
                  }
                },'出库单'),

              ])
            }
          }
        ],

        columns2: [
          {
            title:'序号',
            type: 'index',
            width: 80,
            align: 'center'
          },
          {
            title: '发起时间',
            key: 'organizationName',
            align: 'center',
          },
          {
            title: '物品编号',
            key: 'projectName',
            align: 'center',
          },
          {
            title: '物品名称',
            key: 'name',
            align: 'center',
          },
          {
            title: '类别',
            key: 'location',
            align: 'center',
          },
          {
            title: '出库仓库',
            key: 'headName',
            align: 'center',
          },
          {
            title: '状态',
            key: 'headPhone',
            align: 'center',
          },
          {
            title: '出库日期',
            key: 'headPhone',
            align: 'center',
          },
          {
            title: '借用人',
            key: 'headPhone',
            align: 'center',
          },
          {
            title: '借出数量',
            key: 'headPhone',
            align: 'center',
          },
          {
            title: '批准人',
            key: 'headPhone',
            align: 'center',
          },
          {
            title: '是否归还',
            key: 'headPhone',
            align: 'center',
          },

          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('a', [
                h('span', {
                  style: {
                    color:'#5599e5'
                  },
                  on: {
                    click: e => {
                      e.stopPropagation();
                      //出库
                    }
                  }
                },'审批操作'),
                h('Divider', {props: {type: 'vertical'}}),
                h('span', {
                  style: {
                    color:'#5599e5'
                  },
                  on: {
                    click: e => {
                      e.stopPropagation();
                      //验收
                    }
                  }
                },'归还验收'),
                h('Divider', {props: {type: 'vertical'}}),
                h('span', {
                  style: {
                    color:'#5599e5'
                  },
                  on: {
                    click: e => {
                      e.stopPropagation();
                      //查看详情
                    }
                  }
                },'出库单'),

              ])
            }
          }
        ],

        columns3: [
          {
            title:'序号',
            type: 'index',
            width: 80,
            align: 'center'
          },
          {
            title: '发起时间',
            key: 'organizationName',
            align: 'center',
          },
          {
            title: '物品编号',
            key: 'projectName',
            align: 'center',
          },
          {
            title: '物品名称',
            key: 'name',
            align: 'center',
          },
          {
            title: '类别',
            key: 'location',
            align: 'center',
          },
          {
            title: '出库仓库',
            key: 'headName',
            align: 'center',
          },
          {
            title: '调往何处',
            key: 'headName',
            align: 'center',
          },
          {
            title: '状态',
            key: 'headPhone',
            align: 'center',
          },
          {
            title: '出库日期',
            key: 'headPhone',
            align: 'center',
          },
          {
            title: '调往日期',
            key: 'headPhone',
            align: 'center',
          },
          {
            title: '调出数量',
            key: 'headPhone',
            align: 'center',
          },
          {
            title: '审批人',
            key: 'headPhone',
            align: 'center',
          },

          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('a', [
                h('span', {
                  style: {
                    color:'#5599e5'
                  },
                  on: {
                    click: e => {
                      e.stopPropagation();
                      //出库
                    }
                  }
                },'执行出库'),
                h('Divider', {props: {type: 'vertical'}}),
                h('span', {
                  style: {
                    color:'#5599e5'
                  },
                  on: {
                    click: e => {
                      e.stopPropagation();
                      //查看详情
                    }
                  }
                },'出库单'),

              ])
            }
          }
        ],

        columns4: [
          {
            title:'序号',
            type: 'index',
            width: 80,
            align: 'center'
          },
          {
            title: '发起时间',
            key: 'organizationName',
            align: 'center',
          },
          {
            title: '物品编号',
            key: 'projectName',
            align: 'center',
          },
          {
            title: '物品名称',
            key: 'name',
            align: 'center',
          },
          {
            title: '类别',
            key: 'location',
            align: 'center',
          },
          {
            title: '出库仓库',
            key: 'headName',
            align: 'center',
          },
          {
            title: '状态',
            key: 'headPhone',
            align: 'center',
          },
          {
            title: '出库日期',
            key: 'headPhone',
            align: 'center',
          },
          {
            title: '领用人',
            key: 'headPhone',
            align: 'center',
          },
          {
            title: '领用数量',
            key: 'headPhone',
            align: 'center',
          },
          {
            title: '原物状态',
            key: 'headPhone',
            align: 'center',
          },
          {
            title: '批准人',
            key: 'headPhone',
            align: 'center',
          },

          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('a', [
                h('span', {
                  style: {
                    color:'#5599e5'
                  },
                  on: {
                    click: e => {
                      e.stopPropagation();
                      //出库
                    }
                  }
                },'执行出库'),
                h('Divider', {props: {type: 'vertical'}}),
                h('span', {
                  style: {
                    color:'#5599e5'
                  },
                  on: {
                    click: e => {
                      e.stopPropagation();
                      //查看详情
                    }
                  }
                },'出库单'),

              ])
            }
          }
        ],

        purchasingModal:false,

        title:'',
        submitLoading:true,
        obj:{},

        GoodsDetailModal:false,
      }
    },
    methods: {
      changeButtonType(type){
        this.search.queryType=type;
        switch (type) {
          case 0:
            this.columns=this.columns1;
            this.buttonType.one='primary';
            this.buttonType.two='default';
            this.buttonType.three='default';
            this.buttonType.four='default';
            break;
          case 1:
            this.columns=this.columns2;
            this.buttonType.one='default';
            this.buttonType.two='primary';
            this.buttonType.three='default';
            this.buttonType.four='default';
            break;
          case 2:
            this.columns=this.columns3;
            this.buttonType.one='default';
            this.buttonType.two='default';
            this.buttonType.three='primary';
            this.buttonType.four='default';
            break;
          case 3:
            this.columns=this.columns4;
            this.buttonType.one='default';
            this.buttonType.two='default';
            this.buttonType.three='default';
            this.buttonType.four='primary';
            break;
        };
        this.getPageList(1);
      },
      getOrgList() {
        getAllOrganizations({}).then(res => {
          this.orgList = res;
        }).catch(err => {

        })
      },
      changeOrg(value){
        this.search.orgId=value;
        let that=this;
        this.orgList.forEach(function (item) {
          if(item.id==value){
            that.search.orgName=item.name;
            return;
          }
        })
        this.getProjectList(this.search.orgId);
      },
      //获取物品种类
      getGoodsCategoryList(){
        let data = {
          pageNum:1
        }
        getGoodsCategoryList(data).then(res => {
          let arr = JSON.parse(JSON.stringify(res.list)
            .replace(/childList/g, 'children')
            .replace(/id/g, 'value')
            .replace(/name/g, 'label'))

          this.categoryList = arr;
          this.search.category=[];

        }).catch(err => {

        })
      },
      getCustomDate(date){
        let value=[date[0],date[1]];
        this.search.dateRange=value;
      },

      getPageList(page) {
        let data = {
          pageNum: page,
          type:this.search.queryType,
          orgId:this.search.orgId,
        }
        if (this.search.dateRange[0]!='' && this.search.dateRange[1]!='') {
          data.startDate=this.search.dateRange[0];
          data.endDate=this.search.dateRange[1];
        }
        if (this.search.category.length>0) {
          data.categoryId = this.search.category[this.search.category.length-1];
        }
        if (this.search.status) {
          data.status = this.search.state;
        }
        if (this.search.name) {
          data.name = this.search.name;
        }
        getGoodsOutList(data)
          .then(res => {
            this.tableList = res;
          }).catch(err => {
          this.$Message.error(err);
        })
      },
      changePage(page) {
        this.page.current = page;
        this.getPageList(page)
      },


      addObj() {
        this.obj = {}
        this.obj.organizationId = this.search.orgId;
        this.obj.organizationName = this.search.orgName;
        this.obj.operaterUserId = this.user.user.id;
        this.obj.operaterUserName = this.user.user.name;
        this.obj.operaterUserPhone = this.user.user.phone;
        this.obj.type=this.search.queryType;
        this.obj.outReviceWzlyDetailList=[];
        this.$refs.form.initSelection();
        this.title = '出库 / 出库单'
        this.purchasingModal = true;
        this.$refs.form.getPageList();
      },

      delete(id) {
        let self = this;
        this.$Modal.confirm({
          title: '删除',
          content: '是否确认删除？删除后，该信息将不再可见，请谨慎操作！',
          width: '400px',
          okText: '确定',
          cancelText: '关闭',
          onOk: function () {
            deleteGoodsOut({
              userId: self.user.user.id,
              id: id
            }).then(res => {
              self.getPageList(self.page.curren);
            }).catch(err => {
              this.$Message.error(err);
            })
          }
        })
      },
      submit(obj) {
        this.$refs.form.getGoodsResult();//组装选择的商品
        let that=this;
        if(this.obj.outReviceWzlyDetailList.length==0){
          this.$Modal.confirm({
            title: '提示',
            content: '请先添加出库商品！',
            width: '400px',
            cancelText:'  ',
            onOk:function () {
              this.reSetButtonState();
            }
          })

          return;
        }

        this.$refs.form.$refs[obj].validate((valid) => {
          if (valid) {
            this.insertOrUpdate();
          } else {
            this.reSetButtonState();
          }
        })
      },
      insertOrUpdate() {
        if (this.obj.id==undefined) {
          insertGoodsOut(this.obj)
            .then(res => {
              this.purchasingModal = false;
              this.getPageList(this.page.current);
            })
            .catch(err => {
              this.$Message.error(err);
              this.reSetButtonState();
            })
        } else {
          updateGoodsOut(this.obj)
            .then(res => {
              this.purchasingModal = false;
              this.getPageList(1);
            })
            .catch(err => {
              this.$Message.error(err);
              this.reSetButtonState();
            })
        }
      },

      reSetButtonState(){
        let that=this;
        setTimeout(() => {
          that.submitLoading = false;
          that.$nextTick(() => {
            that.submitLoading = true;
          });
        }, 200);
      },
      cancel() {
        this.purchasingModal = false;
      },
      edit(item) {
        this.obj = item
        this.title = '编辑采购计划 / 物品采购单'
        this.purchasingModal = true;
        this.$refs.form.changeCity(this.obj.location.split('>'));
      },



      drawPieChart(){
        let data=[];
        data.push({
          value:4,
          name:'已采购',
        });
        data.push({
          value:8,
          name:'待采购',
        });
        let lagend={
          bottom: 10,
          left: 'center',
          icon:'circle',
          textStyle:{
            color:"#999999",
            fontSize:12,
          }}
        let label={
          formatter: '{d}%',
          color:"#ffffff",
          position:'inside',
        }
        let pieChart = echarts.init(document.getElementById('bar-chart'));
        let option =this.$echartUtil.annularChartOption(data,[],lagend,['50%','50%'],undefined,label);
        pieChart.setOption(option);
      },
    },
    created() {
      this.search.orgId=this.user.user.userInfo.company;
      this.search.orgName=this.user.user.userInfo.companyName;
      this.columns=this.columns1;
    },
    mounted() {
      this.getOrgList();
      this.getGoodsCategoryList();
      this.drawPieChart();
      this.getPageList(1);

    },
  }
</script>

<style scoped lang="less">
  @deep: ~'>>>';
  @{deep}.ivu-card-body {
    padding: 10px !important;
    height: 100%;
  }
  .left{
    >div{
      display: flex;
      >div{
        margin:5px;
      }
      >div:nth-of-type(1){
        margin: 5px 0;
      }
    }
  }
  .demo-badge{
    width: 20px;
    height: 20px;
    background: transparent;
    border-radius: 10px;

    right: -20px;
    top:-10px;
  }
</style>
