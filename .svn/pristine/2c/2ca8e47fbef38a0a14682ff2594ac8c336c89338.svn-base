<template>
  <div class="v-clock">
    <Card>
      <div style="display:flex;height: 100%;">
        <div style="width: 300px;height: 100%;">

          <div style="height: calc(30% - 40px);text-align: center;">
            <div style="width: 120px;height: 120px;margin: 0 auto;">
              <img src="../../../../static/images/statistical.png" alt="">
            </div>
            <div style="color: #a2a0a0;">本月新增入库</div>
            <div class="moneyColor" style="font-weight: 900;margin: 10px">32</div>
            <div style="color: #a2a0a0;">待入库</div>
            <div class="moneyColor" style="font-weight: 900;margin: 10px">15</div>
          </div>

          <div style="color: #a2a0a0;margin:10px auto;text-align: center">本年入库物品类型比</div>
          <div style="height: 30%;">
            <div id="pie-chart" style="width: 100%;height: 100%;"></div>
          </div>

          <div style="height: 30%;text-align: center; margin-top: 20px">
            <div style="width: 40px;height: 40px;margin: 0 auto;">
              <img src="../../../../static/images/batchExport.png" alt="">
            </div>
            <div style="color: #a2a0a0;margin:10px auto;">批量导出</div>

            <div style="width: 40px;height: 40px;margin: 0 auto;" @click="addObj">
              <img src="../../../../static/images/add.png" alt="">
            </div>
            <div style="color: #a2a0a0;margin:10px auto;">新增入库</div>


          </div>

        </div>


        <div style="width: calc(100% - 300px)">
          <div style="display: flex;justify-content: flex-start;align-items: center; margin-bottom: 10px">
            <Button :type="buttonType.stockIn" @click="changeButtonType(0)" style="width: 120px;">已入库</Button>
            <Button :type="buttonType.notStockIn" @click="changeButtonType(1)" style="width: 120px;">未入库</Button>

            <Select v-model="search.orgId" placeholder="请选择组织" style="width: 300px;margin-left: 5px;" @on-change="changeOrg" :disabled="user.user.admin!=1">
              <Option v-for="(item,index) in orgList"
                      :value="item.id"
                      :label="item.name"
                      :key="index">
              </Option>
            </Select>

            <div>
              <DatePicker type="daterange" v-model="search.dateRange"  placeholder="开始日期和结束日期" style="width: 200px;margin-left: 5px;"  format="yyyy-MM-dd"
                          :options="options" @on-change="getCustomDate" :clearable="false"></DatePicker>
            </div>

            <div style="width: 150px;margin-left: 5px;">
              <Cascader v-model="search.category" :data="categoryList" trigger="hover"  placeholder="物品类别"></Cascader>
            </div>

            <div>
              <Input clearable v-model="search.goodsName" placeholder="物品名称" style="margin-left: 5px;"/>
            </div>
            <div >
              <Select style="width: 100px;margin-left: 10px;" v-model="search.purchaseType" clearable placeholder="采购类型">
                <Option v-for="(item,index) in purchaseType"
                        :value="item.value"
                        :label="item.label"
                        :key="index">
                </Option>
              </Select>
            </div>
            <div>
              <Input clearable v-model="search.plan" placeholder="所属采购计划" style="margin-left: 5px;"/>
            </div>
            <div>
              <Button type="primary" @click="doSearch" style="margin-left: 10px;">查询</Button>
            </div>
          </div>

          <tableTemplate
            ref="tableTemplate"
            :tableList="tableList"
            :columns="columns"
            :page="page"
            :size="'small'"
            @changePage="changePage"
            @onSelectionChange="onSelectionChange">
          </tableTemplate>
        </div>
        <!--添加编辑直接入库-->
        <Modal
          v-model="showModal"
          :title="title"
          :loading="submitLoading"
          :mask-closable="false"
          @on-ok="submit('obj')"
          @on-cancel="cancel"
          width="800"
          ok-text = '提交'
          cancel-text = '取消'>
          <WareHouseInForm
            ref="form"
            :obj="obj"
            :categoryList="categoryList"
            :goodsList="goodsList"
          >
          </WareHouseInForm>
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


  import { getGoodsCategoryList,getAllOrganizations,getAllProjectsByOrgId,getPutInStorageList,getPutInStorageStayList,insertPutInStorage,updatePutInStorage,deletePutInStorage} from '@/axios/api';
  import tableTemplate from '@/commonComponent/tableTemplate';
  import WareHouseInForm from "../../manage/WareHouseIn/WareHouseInForm";

  export default {
    name: "wareHouseInIndex",
    components: {
      tableTemplate,
      WareHouseInForm,
    },
    data() {
      return {
        user:this.$store.getters.submitData,

        categoryList:[],
        goodsList:[],
        orgList:[],
        projectList:[],
        purchaseType:[
          {
            value:0,
            label:'零星采购',
          },
          {
            value:1,
            label:'计划采购',
          },
          {
            value:2,
            label:'直接入库',
          },
        ],
        options: {
          disabledDate (date) {
            return date && date.valueOf() > Date.now();
          }
        },
        tableList:{},
        page:{
          current:1,
        },
        search:{
          queryType:0,
          orgId:null,
          orgName:null,
          dateRange:['',''],
          projectId:null,
          purchaseType:null,
          plan:null,
          goodsName:null,
          category:[],
        },
        buttonType:{
          stockIn:'primary',
          notStockIn:'default',
        },

        columns1: [
          {
            title:'序号',
            type: 'index',
            width: 80,
            align: 'center'
          },
          {
            title: '物品编号',
            key: 'num',
            align: 'center',
          },
          {
            title: '物品名称',
            key: 'goodsName',
            align: 'center',
          },
          {
            title: '类别',
            key: 'categoryName',
            align: 'center',
          },
          {
            title: '规格',
            key: 'model',
            align: 'center',
          },
          {
            title: '入库数量',
            key: 'count',
            align: 'center',
          },
          {
            title: '入库日期',
            key: 'putInDate',
            align: 'center',
          },
          {
            title: '采购类型',
            key: 'type',
            align: 'center',
            render: (h, params) => {
              if(params.row.type == 0){
                return h('div', [
                  h('div',{
                    // class:'fontColor',
                  },'零星采购')
                ]);
              }if(params.row.type == 1){
                return h('div', [
                  h('div',{
                    // class:'fontColor',
                  },'计划采购')
                ]);
              }else{
                return h('div', [
                  h('div',{
                    // class:'fontColor',
                  },'直接入库')
                ]);
              }

            },
          },
          {
            title: '所属采购计划',
            key: 'purchaseName',
            align: 'center',
            render: (h, params) => {
              if(params.row.purchaseName == null){
                return h('div', [
                  h('div',{
                  },'无')
                ]);
              }else{
                return h('div', [
                  h('div',{
                  },params.row.purchaseName)
                ]);
              }

            },
          },
          {
            title: '入库执行人',
            key: 'updateUserName',
            align: 'center',

          },

          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('a', [
                h('img', {
                  style: {
                    height: '20px',
                    width: '20px',
                  },
                  attrs: {
                    src: require('../../../assets/images/编辑.png')
                  },
                  on: {
                    click: e => {
                      e.stopPropagation();
                      this.edit(params.row)
                    }
                  }
                }),
                h('Divider', {props: {type: 'vertical'}}),
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
                      this.delete(params.row.id)
                    }
                  }
                },),

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
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '物品编号',
            key: 'num',
            align: 'center',
          },
          {
            title: '物品名称',
            key: 'goodsName',
            align: 'center',
          },
          {
            title: '类别',
            key: 'categoryName',
            align: 'center',
          },
          {
            title: '规格',
            key: 'model',
            align: 'center',
          },
          {
            title: '采购数量',
            key: 'count',
            align: 'center',
          },
          {
            title: '采购类型',
            key: 'type',
            align: 'center',
            render: (h, params) => {
              if(params.row.type == 0){
                return h('div', [
                  h('div',{
                    // class:'fontColor',
                  },'零星采购')
                ]);
              }if(params.row.type == 1){
                return h('div', [
                  h('div',{
                    // class:'fontColor',
                  },'计划采购')
                ]);
              }else{
                return h('div', [
                  h('div',{
                    // class:'fontColor',
                  },'直接入库')
                ]);
              }

            },
          },
          {
            title: '所属采购计划',
            key: 'purchaseName',
            align: 'center',
            render: (h, params) => {
              if(params.row.purchaseName == null){
                return h('div', [
                  h('div',{
                  },'无')
                ]);
              }else{
                return h('div', [
                  h('div',{
                  },params.row.purchaseName)
                ]);
              }

            },
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('a', [
                h('img', {
                  style: {
                    height: '20px',
                    width: '20px',
                  },
                  attrs: {
                    src: require('../../../assets/images/编辑.png')
                  },
                  on: {
                    click: e => {
                      e.stopPropagation();
                      this.edit(params.row)
                    }
                  }
                }),
                h('Divider', {props: {type: 'vertical'}}),
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
                      this.delete(params.row.id)
                    }
                  }
                },),

              ])
            }
          }
        ],
        columns:[],

        showModal:false,

        title:'',
        submitLoading:true,
        obj:{},


      }
    },
    methods: {
      changeButtonType(type){
        this.queryType=type;
        switch (type) {
          case 0:
            this.columns = this.columns1;
            this.buttonType.stockIn='primary';
            this.buttonType.notStockIn='default';
            break;
          case 1:
            this.columns = this.columns2;
            this.buttonType.stockIn='default';
            this.buttonType.notStockIn='primary';
            break;
        };
        if(this.queryType == 0){
          this.getPageList(1);
        }else{
          this.getStayList(1);
        }
      },
      doSearch(){
         if(this.queryType == 0){
           this.getPageList(1);
         }else{
           this.getStayList(1);
         }
      },
      getCategories(page){
        let data = {
          pageNum:page
        }
        if(this.search.content){
          data.searchContent = this.search.content
        }
        getGoodsCategoryList(data)
          .then(res => {
            let arr = JSON.parse(JSON.stringify(res.list)
              .replace(/childList/g, 'children')
              .replace(/id/g, 'value')
              .replace(/name/g, 'label'))
            this.categoryList = arr;
          }).catch(err => {

        })
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
      //根据组织id获取所有项目,现在的接口需要增加参数
      getProjectList(orgId){
        let data = {
          organId:orgId
        }
        getAllProjectsByOrgId(data).then(res => {
          this.projectList = res;
          this.obj.projectId=null;
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
        }
        if (this.search.dateRange[0]!='' && this.search.dateRange[1]!='') {
          data.startDate=this.search.dateRange[0];
          data.endDate=this.search.dateRange[1];
        }
        if(this.search.type){
          data.type = this.search.purchaseType
        }
        if (this.search.projectId) {
          data.projectId = this.search.projectId;
        }
        if(this.search.category.length > 0){
          data.categoryId = this.search.category[this.search.category.length - 1]
          console.log("======"+data.category)
        }
        if (this.search.goodsName) {
          data.goodsName = this.search.goodsName;
        }
        if (this.search.plan) {
          data.searchContent = this.search.plan;
        }
        getPutInStorageList(data)
          .then(res => {
            this.tableList = res;
          }).catch(err => {
          this.$Message.error(err);
        })
      },

      getStayList(page) {
        let data = {
          pageNum: page,
        }
        if (this.search.dateRange[0]!='' && this.search.dateRange[1]!='') {
          data.startDate=this.search.dateRange[0];
          data.endDate=this.search.dateRange[1];
        }
        if(this.search.type){
          data.type = this.search.purchaseType
        }
        if (this.search.projectId) {
          data.projectId = this.search.projectId;
        }
        if(this.search.category.length > 0){
          data.categoryId = this.search.category[this.search.category.length - 1]
          console.log("======"+data.category)
        }
        if (this.search.goodsName) {
          data.goodsName = this.search.goodsName;
        }
        if (this.search.plan) {
          data.searchContent = this.search.plan;
        }
        getPutInStorageStayList(data)
          .then(res => {
            this.tableList = res;
          }).catch(err => {
          this.$Message.error(err);
        })
      },
      changePage(page) {
        this.page.current = page;
        if(this.queryType == 0){
          this.getPageList(page);
        }else{
          this.getStayList(page);
        }
      },

      onSelectionChange(item){
      },
      addObj() {
        this.obj = {}
        this.obj.organizationId = this.search.orgId;
        this.obj.organizationName = this.search.orgName;
        this.obj.putInDate=this.$moment().format('YYYY-MM-DD')
        this.goodsList = [];
        this.title = '新建 / 入库单'
        this.showModal = true;
      },
      edit(item) {
        this.obj = item
        this.obj.categoryId = [item.categoryId]
        var that = this;
        this.categoryList.forEach(function (cItem) {
          if(cItem.children.length > 0){
            cItem.children.forEach(function (childItem) {
              if(childItem.value==that.obj.categoryId && childItem.fatherId != null){
                that.obj.categoryId.splice(0,0,childItem.fatherId);
                return;
              }

            })
          }
        })
        this.goodsList = [{id:item.goodsId,goodsName:item.goodsName}];
        this.title = '编辑 / 入库单'
        this.showModal = true;
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
            deletePutInStorage({
              userId: self.user.user.id,
              id: id
            }).then(res => {
              if(self.queryType == 0){
                self.getPageList(self.page.current);
              }else{
                self.getStayList(self.page.current);
              }
            }).catch(err => {
              this.$Message.error(err);
            })
          }
        })
      },
      submit(obj) {
        this.$refs.form.$refs[obj].validate((valid) => {
          if (valid) {
            this.insertOrUpdate();
          } else {
            setTimeout(() => {
              this.submitLoading = false;
              this.$nextTick(() => {
                this.submitLoading = true;
              });
            }, 2000);
          }
        })
      },
      insertOrUpdate() {
        if (this.obj.id) {
          updatePutInStorage({
            id: this.obj.id,
            goodsId: this.obj.goodsId,
            goodsName: this.obj.goodsName,
            categoryId: this.obj.categoryId[this.obj.categoryId.length-1],
            categoryName: this.obj.categoryName,
            num: this.obj.num,
            model: this.obj.model,
            count: this.obj.count,
            putInDate: this.$moment(this.obj.putInDate).format('YYYY-MM-DD'),
            keeperName: this.obj.keeperName,
            keeperPhone: this.obj.keeperPhone,
            storeId: this.obj.storeId,
            storeName: this.obj.storeName,
            organizationId: this.obj.organizationId,
            organizationName: this.obj.organizationName,
            type:2,
            updateUserId: this.user.user.id,
            updateUserName: this.user.user.name,
          })
            .then(res => {
              this.showModal = false;
              if(this.queryType == 0){
                this.getPageList(this.page.current);
              }else{
                this.getStayList(this.page.current);
              }
            })
            .catch(err => {
              this.$Message.error(err);
            })
        } else {
          insertPutInStorage({
            id: this.obj.id,
            goodsId: this.obj.goodsId,
            goodsName: this.obj.goodsName,
            categoryId: this.obj.categoryId[this.obj.categoryId.length-1],
            categoryName: this.obj.categoryName,
            num: this.obj.num,
            model: this.obj.model,
            count: this.obj.count,
            putInDate: this.$moment(this.obj.putInDate).format('YYYY-MM-DD'),
            keeperName: this.obj.keeperName,
            keeperPhone: this.obj.keeperPhone,
            storeId: this.obj.storeId,
            storeName: this.obj.storeName,
            organizationId: this.obj.organizationId,
            organizationName: this.obj.organizationName,
            type:2,
            updateUserId: this.user.user.id,
            updateUserName: this.user.user.name,
          })
            .then(res => {
              this.showModal = false;
              if(this.queryType == 0){
                this.getPageList(1);
              }else{
                this.getStayList(1);
              }
            })
            .catch(err => {
              this.$Message.error(err);
            })
        }
        this.showModal = false;
      },
      cancel() {
        this.showModal = false;
      },




      drawPieChart(){
        let data=[];
        data.push({
          value:4,
          name:'清洁类',
        });
        data.push({
          value:8,
          name:'电子类',
        });
        data.push({
          value:12,
          name:'文件类',
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
        let pieChart = echarts.init(document.getElementById('pie-chart'));
        let option =this.$echartUtil.annularChartOption(data,[],lagend,['50%','50%'],undefined,label);
        pieChart.setOption(option);
      },
    },
    created() {
      this.columns = this.columns1;
      this.search.orgId=this.user.user.userInfo.company;
      this.search.orgName=this.user.user.userInfo.companyName;
    },
    mounted() {
      this.getPageList(1);
      this.getCategories();
      this.getOrgList();
      this.getProjectList(this.search.orgId);
      this.drawPieChart();
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
</style>

