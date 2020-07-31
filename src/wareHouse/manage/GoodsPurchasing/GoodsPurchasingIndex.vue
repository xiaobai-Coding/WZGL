<template>
  <div class="v-clock">
    <Card>
      <div style="display:flex;height: 100%;">
        <div style="width: 300px;height: 100%;">

          <div style="height: calc(35% - 40px);text-align: center;">
            <div style="width: 120px;height: 120px;margin: 0 auto;">
              <img src="../../../../static/images/statistical.png" alt="">
            </div>
            <div style="color: #a2a0a0;">本月新增计划</div>
            <div class="moneyColor" style="font-weight: 900;margin: 10px">1条</div>
            <div style="color: #a2a0a0;">新增零星采购</div>
            <div class="moneyColor" style="font-weight: 900;margin: 10px">1件</div>
            <div style="color: #a2a0a0;">本月采购花费金额</div>
            <div class="moneyColor" style="font-weight: 900;margin: 10px">11280元</div>
          </div>

          <div style="height: 40%;">
            <div id="pie-chart" style="width: 100%;height: 100%;"></div>
          </div>

          <div style="height: 20%;text-align: center">
            <div style="width: 40px;height: 40px;margin: 0 auto;">
              <img src="../../../../static/images/batchExport.png" alt="">
            </div>
            <div style="color: #a2a0a0;margin:10px auto;">批量导出</div>

            <div style="width: 40px;height: 40px;margin: 0 auto;" @click="addObj">
              <img src="../../../../static/images/add.png" alt="">
            </div>
            <div style="color: #a2a0a0;margin:10px auto;">新增采购计划</div>

            <div style="width: 40px;height: 40px;margin: 0 auto;" @click="">
              <img src="../../../../static/images/add_lx.svg" alt="">
            </div>
            <div style="color: #a2a0a0;margin:10px auto;">录入零星采购</div>
          </div>

        </div>


        <div style="width: calc(100% - 300px)">
          <div style="display: flex;justify-content: flex-start;align-items: center;">
            <Button :type="buttonType.notExecuted" @click="changeButtonType(0)" style="width: 120px;margin-left: 5px;">待执行采购计划</Button>
            <Button :type="buttonType.executed" @click="changeButtonType(1)" style="width: 120px;margin-left: 5px;">已执行采购计划</Button>
            <Button :type="buttonType.other" @click="changeButtonType(2)" style="width: 120px;margin-left: 5px;">零星采购</Button>

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
                <Select v-model="search.projectId" placeholder="请选择项目">
                  <Option v-for="(item,index) in projectList"
                          :value="item.id"
                          :label="item.name"
                          :key="index">
                  </Option>
                </Select>
              </div>
              <div style="width: 200px">
                <Select v-model="search.danger" clearable placeholder="是否危险品">
                  <Option v-for="(item,index) in status"
                          :value="item.value"
                          :label="item.label"
                          :key="index">
                  </Option>
                </Select>
              </div>
              <div>
                <Input clearable v-model="search.name" placeholder="采购计划名称" />
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
        <!--添加编辑采购计划-->
        <Modal
          v-model="purchasingModal"
          :title="title"
          :loading="submitLoading"
          :mask-closable="false"
          @on-ok="submit('obj')"
          @on-cancel="cancel"
          width="1000"
          ok-text = '提交'
          cancel-text = '取消'>
          <GoodsPurchasingForm
            ref="form"
            :obj="obj"
            :projectList="projectList"
          >
          </GoodsPurchasingForm>
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


  import { getAllOrganizations,getAllProjectsByOrgId,getMaterialPurchasesList,insertMaterialPurchases,updateMaterialPurchases,deleteMaterialPurchases,} from '@/axios/api';
  import tableTemplate from '@/commonComponent/tableTemplate';
  import GoodsPurchasingForm from "../../manage/GoodsPurchasing/GoodsPurchasingForm";

    export default {
      name: "GoodsPurchasingIndex",
      components: {
        tableTemplate,
        GoodsPurchasingForm,
      },
      data() {
        return {
          user:this.$store.getters.submitData,
          orgList:[],
          projectList:[],
          status:[
            {
              value:0,
              label:'全部',
            },
            {
              value:1,
              label:'危险品',
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
            danger:null,
            name:null,
          },
          buttonType:{
            notExecuted:'primary',
            executed:'default',
            other:'default',
          },
          columns: [
            {
              title:'序号',
              type: 'index',
              width: 80,
              align: 'center'
            },
            {
              title: '所属组织',
              key: 'organizationName',
              align: 'center',
            },
            {
              title: '所属项目',
              key: 'projectName',
              align: 'center',
            },
            {
              title: '仓库名称',
              key: 'name',
              align: 'center',
            },
            {
              title: '所在地',
              key: 'location',
              align: 'center',
            },
            {
              title: '负责人',
              key: 'headName',
              align: 'center',
            },
            {
              title: '联系电话',
              key: 'headPhone',
              align: 'center',
            },

            {
              title: '是否启用',
              key: 'enable',
              align: 'center',
              width: 90,
              render: (h, params) => {
                const row = params.row;
                const str = this.$Filters.enableType(params.row.use)
                const color = str == '否' ? 'error' : 'success';
                const text = str == '否' ? '否' : '是';

                return h('Tag', {
                  props: {
                    type: 'dot',
                    color: color
                  },
                }, text);
              }
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


          purchasingModal:false,
          oddPurchasingModal:false,

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
              this.buttonType.notExecuted='primary';
              this.buttonType.executed='default';
              this.buttonType.other='default';
              break;
            case 1:
              this.buttonType.notExecuted='default';
              this.buttonType.executed='primary';
              this.buttonType.other='default';
              break;
            case 2:
              this.buttonType.notExecuted='default';
              this.buttonType.executed='default';
              this.buttonType.other='primary';
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
            type:this.search.queryType,
            orgId:this.search.orgId,
          }
          if (this.search.dateRange[0]!='' && this.search.dateRange[1]!='') {
              data.startDate=this.search.dateRange[0];
              data.endDate=this.search.dateRange[1];
          }
          if (this.search.projectId) {
            data.projectId = this.search.projectId;
          }
          if (this.search.danger) {
            data.status = this.search.danger;
          }
          if (this.search.name) {
            data.name = this.search.name;
          }
          getMaterialPurchasesList(data)
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
          if(this.$PremissionUtil.checkEditPremission(this)){
            this.obj = {}
            this.obj.organizationId = this.search.orgId;
            this.obj.organizationName = this.search.orgName;
            this.obj.reviewerUserId = this.user.user.id;
            this.obj.reviewerUserName = this.user.user.name;
            this.obj.reviewerUserPhone = this.user.user.phone;
            this.obj.detailList=[];
            this.$refs.form.initSelection();
            this.title = '新建采购计划 / 物品采购单'
            this.purchasingModal = true;
          }

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
              deleteMaterialPurchases({
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
          if(this.obj.detailList.length==0){
            this.$Modal.confirm({
              title: '提示',
              content: '请先添加采购商品！',
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
            insertMaterialPurchases(this.obj)
              .then(res => {
                this.purchasingModal = false;
                this.getPageList(this.page.current);
              })
              .catch(err => {
                this.$Message.error(err);
                this.reSetButtonState();
              })
          } else {
            updateMaterialPurchases(this.obj)
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
          let pieChart = echarts.init(document.getElementById('pie-chart'));
          let option =this.$echartUtil.annularChartOption(data,[],lagend,['50%','50%'],undefined,label);
          pieChart.setOption(option);
        },
      },
      created() {
        this.search.orgId=this.user.user.userInfo.company;
        this.search.orgName=this.user.user.userInfo.companyName;
      },
      mounted() {
        this.getPageList(1);
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
