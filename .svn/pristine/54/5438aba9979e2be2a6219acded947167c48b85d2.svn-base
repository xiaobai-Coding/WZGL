<template>
  <div class="v-clock">
    <Card>
      <div style="display:flex;height: 100%;">
        <div style="width: 300px;height: 100%;">
          <div style="height: calc(30% - 40px);text-align: center;">
            <div style="width: 120px;height: 120px;margin: 0 auto;">
              <img src="../../../../static/images/statistical.png" alt="">
            </div>
            <div style="color: #a2a0a0;">物品种类</div>
            <div class="moneyColor" style="font-weight: 900;">7</div>
            <div style="color: #a2a0a0;">物品数量</div>
            <div class="moneyColor" style="font-weight: 900;">621</div>
          </div>
          <div style="height: 60%;">
            <div id="bar-chart" style="width: 100%;height: 100%;"></div>
          </div>
          <div style="height: 40px;">

          </div>
        </div>
        <div style="width: calc(100% - 300px)">
          <div class="right">
            <div>

              <div style="width: 100px">
                <Select v-model="search.level" clearable placeholder="常用级别">
                  <Option
                    v-for="(item,index) in levelArr"
                    :value="item.value"
                    :label="item.label"
                    :key="index">
                  </Option>
                </Select>
              </div>
              <div style="width: 150px">
                <Cascader v-model="search.category" :data="categoryList" trigger="hover"  change-on-select ></Cascader>
              </div>
              <div style="width: 100px">
                <Select v-model="search.use" clearable placeholder="物品状态">
                  <Option v-for="(item,index) in useArr"
                          :value="item.value"
                          :label="item.label"
                          :key="index">
                  </Option>
                </Select>
              </div>
              <div style="width: 130px">
                <Select v-model="search.risk" clearable placeholder="是否危险品">
                  <Option v-for="(item,index) in riskArr"
                          :value="item.value"
                          :label="item.label"
                          :key="index">
                  </Option>
                </Select>
              </div>
              <div>
                <Input clearable v-model="search.content" placeholder="输入关键字" />
              </div>
              <div>
                <Button type="primary" @click="getPageList(1)">查询</Button>
              </div>
              <div>
                <i-button type="primary"  icon="ios-add" @click="addObj" >添加</i-button>
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
      </div>
    </Card>

    <Modal
      v-model="showModal"
      :title="title"
      :loading="submitLoading"
      :mask-closable="false"
      @on-ok="submit('obj')"
      @on-cancel="cancel"
      width="800"
      ok-text = '保存'
      cancel-text = '取消'>
      <GoodsManageForm
        ref="form"
        :obj="obj"
        :categoryList="categoryList"
        :imgList="imgList"
        @setImageList="setImageList"
      >
      </GoodsManageForm>
    </Modal>

    <Modal
      v-model="showDetailModal"
      :title="title"
      :mask-closable="false"
      @on-ok="detailClose"
      @on-cancel="detailClose"
      width="1200"
      ok-text = '确定'>
      <GoodsManageDetail
        :obj="obj"
        :categoryList="categoryList"
        :imgList="imgList"
      >
      </GoodsManageDetail>
    </Modal>
  </div>
</template>

<script>

  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/bar')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  require("echarts/lib/component/legend")
  require("echarts/lib/chart/gauge")
  require("echarts/lib/chart/funnel")


  import tableTemplate from '@/commonComponent/tableTemplate'
  import GoodsManageForm from './GoodsManageForm'
  import GoodsManageDetail from './GoodsManageDetail'
  import { getGoodsCategoryList,getGoodsManagesList,insertGoodsManages,updateGoodsManages,deleteGoodsManages } from '@/axios/api';
  export default {
    name: "goodsManageIndex",
    components: {
      tableTemplate,
      GoodsManageForm,
      GoodsManageDetail,
    },
    props: [''],
    data() {
      return {

        levelArr:[
          {
            value:1,
            label:'1',
          },
          {
            value:2,
            label:'2',
          },
          {
            value:3,
            label:'3',
          },
          {
            value:4,
            label:'4',
          },
          {
            value:5,
            label:'5',
          },
        ],
        useArr:[
          {
            value:'1',
            label:'未启用',
          },
          {
            value:'0',
            label:'已启用',
          },
        ],
        riskArr:[
          {
            value:'0',
            label:'非危险品',
          },
          {
            value:'1',
            label:'危险品',
          },
        ],


        categoryList:[],
        tableList:{},
        page:{
          current:1,
        },
        columns: [
          {
            title:'序号',
            type: 'index',
            width: 60,
            align: 'center',
            tooltip:true,
          },
          {
            title: '物品编号',
            key: 'num',
            align: 'center',
            tooltip:true,
            width: 120,
          },
          {
            title: '物品名称',
            key: 'goodsName',
            align: 'center',
            tooltip:true,
          },
          {
            title: '品牌',
            key: 'brand',
            align: 'center',
            width: 100,
            tooltip:true,
          },
          {
            title: '常用级别',
            key: 'level',
            align: 'center',
            tooltip:true,
            width: 100,
          },
          {
            title: '类别',
            key: 'categoryName',
            align: 'center',
            tooltip:true,
            width: 140,
          },
          {
            title: '规格',
            key: 'model',
            align: 'center',
            tooltip:true,
            width: 100,
          },
          {
            title: '单位',
            key: 'unit',
            align: 'center',
            tooltip:true,
            width: 90,
          },
          {
            title: '参考单价(元)',
            key: 'price',
            align: 'center',
            tooltip:true,
            width: 110,
          },
          {
            title: '是否启用',
            key: 'use',
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
            align: 'center',
            render: (h, params) => {
              return h('a', [
                h('img', {
                  style: {
                    height: '20px',
                    width: '20px',
                  },
                  attrs: {
                    src: require('../../../assets/images/查看.png')
                  },
                  on: {
                    click: e => {
                      e.stopPropagation();
                      this.detail(params.row)
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
          },
        ],


        search:{
          level: '',
          category:[],
          use:'',
          risk:'',
          content:'',
        },

        showModal:false,
        showDetailModal:false,
        title:'',
        submitLoading:true,
        obj:{
        },
        imgList:[],

        user:this.$store.getters.submitData,
      }
    },
    computed: {},
    watch: {},
    methods: {

      getPageList(page){
        let data = {
          pageNum:page
        }
        if(this.search.content){
          data.searchContent = this.search.content
        }
        if(this.search.level){
          data.level = this.search.level
        }
        if(this.search.risk){
          data.risk = this.search.risk
        }
        if(this.search.use){
          data.use = this.search.use
        }
        if(this.search.category.length > 0){
          data.categoryId = this.search.category[this.search.category.length - 1]
          console.log("======"+data.category)
        }
        getGoodsManagesList(data)
          .then(res => {
            this.tableList = res;
          }).catch(err => {
          this.$Message.error(err);
        })
      },

      getRunningRates(){
        this.drawBarChart();
      },
      drawBarChart(list){
        let chart = echarts.init(document.getElementById('bar-chart'));
        let option = {
          title: {
            text: "",
            x: "center"
          },
          tooltip: {
            trigger: "axis"
          },
          toolbox: {
            feature: {
              mark: {
                show: true
              },
              dataView: {
                show: true,
                readOnly: true
              },
              magicType: {
                show: false,
                type: ["line", "bar"]
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: "value",
              splitNumber: 5,
              axisLine: {
                lineStyle: {
                  width: 2,

                }
              },
              axisLabel: {
                rotate: 55,
                margin: 10,
                textStyle: {
                  fontSize: 12,
                  fontStyle: "italic",
                  fontWeight: "lighter",
                  baseline: "top"
                }
              }
            }
          ],
          yAxis: [
            {
              type: "category",
              data: ["工具类", "文件类", "电器类", "医用类","材料类","服装类","食品类"],
              axisLabel: {
                show: true,
                textStyle: {
                  fontWeight: "lighter",
                  fontStyle: "italic"
                }
              },
              nameTextStyle: {
                fontWeight: "lighter"
              }
            }
          ],
          series: [
            {
              name: "2011年",
              type: "bar",
              data: [34, 130, 55, 70, 32, 200,88]
            }
          ],
          grid: {
            x: 60
          },
          color: '#5599e5',
        };
        chart.setOption(option);
      },
      changePage(page){
        this.page.current = page;
        this.getIndex(page)
      },

      getCategories(page){
        return  getGoodsCategoryList({
          pageNum:page,
        })
      },
      apiAll(){
        this.$axios.all([this.getCategories(1)])
          .then(this.$axios.spread((one) => {
            // this.categoryList = one.list
            let arr = JSON.parse(JSON.stringify(one.list)
              .replace(/childList/g, 'children')
              .replace(/id/g, 'value')
              .replace(/name/g, 'label'))
            this.categoryList = arr;
          }));
      },

      setImageList(item){
        this.imgList = item
      },

      postImage(){
        if(this.imgList != undefined){
          let imageData=new FormData();
          var goodsManageImagesList = new Array();
          for (let i = 0; i < this.imgList.length; i++) {
            if(this.imgList[i].file.src == undefined){
              goodsManageImagesList.push(this.imgList[i].file);
              continue;
            }
            imageData.append("images", this.imgList[i].file);
          }
          imageData.append("userId",'1');
          imageData.append("tokenId",'1');

          this.$axios.all([this.$postUrl('img/media/upload/image',{},imageData)])
            .then(this.$axios.spread((imageOne) => {

              if(imageOne.result != undefined && imageOne.result.length > 0){
                var imgs = imageOne.result;
                for(var i = 0; i < imgs.length; i++){
                  var resObj = {};
                  resObj.url = imgs[i].large.url;
                  goodsManageImagesList.push(resObj);
                }
              }
              this.obj.goodsManageImagesList = goodsManageImagesList;

              this.insertOrUpdate();
            }));
        }

      },

      addObj(){
        this.obj = {}
        this.obj.use = 0
        this.obj.risk = 0
        this.imgList = []
        this.title = '新建 / 物品信息'
        this.showModal = true;
      },
      delete(id){
        let self = this;
        this.$Modal.confirm({
          title: '删除',
          content: '是否确认删除？删除后，该信息将不再可见，请谨慎操作！',
          width: '400px',
          okText: '确定',
          cancelText: '关闭',
          onOk: function () {
            deleteGoodsManages({
              userId: self.user.user.id,
              id:id
            }).then(res => {
              self.getPageList(self.page.curren);
            }).catch(err => {
              this.$Message.error(err);
            })
          }
        })
      },
      submit(obj){
        let that = this;
        this.$refs.form.$refs[obj].validate((valid) => {
          if (valid) {
            that.$refs.form.setImageListPicture()
            if(that.imgList.length > 0){
              that.postImage();
            }else{
              that.insertOrUpdate();
            }
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
      insertOrUpdate(){
        if(this.obj.id){
          updateGoodsManages({
            id: this.obj.id,
            goodsName: this.obj.goodsName,
            categoryId: this.obj.categoryId[this.obj.categoryId.length-1],
            categoryName: this.obj.categoryName,
            status: this.obj.status,
            num: this.obj.num,
            model: this.obj.model,
            level: this.obj.level,
            brand: this.obj.brand,
            company: this.obj.company,
            price: this.obj.price,
            unit: this.obj.unit,
            risk: this.obj.risk,
            place: this.obj.place,
            use: this.obj.use,
            operateId:this.user.user.id,
            operateName:this.user.user.name,
            operatePhone: this.user.user.phone,
            goodsManageImagesList: this.obj.goodsManageImagesList,
          })
            .then(res => {
              this.showModal = false;
              this.getPageList(this.page.current);
            })
            .catch(err => {
              this.$Message.error(err);
            })
        }else{
          insertGoodsManages({
            id: this.obj.id,
            goodsName: this.obj.goodsName,
            categoryId: this.obj.categoryId[this.obj.categoryId.length-1],
            categoryName: this.obj.categoryName,
            num: this.obj.num,
            model: this.obj.model,
            level: this.obj.level,
            brand: this.obj.brand,
            company: this.obj.company,
            price: this.obj.price,
            unit: this.obj.unit,
            risk: this.obj.risk,
            place: this.obj.place,
            use: this.obj.use,
            operateId:this.user.user.id,
            operateName:this.user.user.name,
            operatePhone: this.user.user.phone,
            goodsManageImagesList: this.obj.goodsManageImagesList,
          })
            .then(res => {
              this.showModal = false;
              this.getPageList(1);
            })
            .catch(err => {
              this.$Message.error(err);
            })
        }
        this.showModal = false;
      },
      cancel(){
        this.showModal = false;
      },
      detailClose(){
        this.showDetailModal = false;
      },
      edit(item) {
        this.obj = item
        this.obj.categoryId = [item.categoryId]
        if(this.obj.goodsManageImagesList != null && this.obj.goodsManageImagesList.length > 0){
          this.imgList = new Array();
          for(let i = 0; i< this.obj.goodsManageImagesList.length ; i++){
            let ff = {};
            ff.file = this.obj.goodsManageImagesList[i];
            this.imgList.push(ff);
          }
        }else{
          this.imgList = [];
        }
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
        this.title = '编辑 / 物品信息'
        this.showModal = true;
      },
      detail(item) {
        this.obj = item
        this.obj.categoryId = [item.categoryId]
        if(this.obj.goodsManageImagesList != null && this.obj.goodsManageImagesList.length > 0){
          this.imgList = new Array();
          for(let i = 0; i< this.obj.goodsManageImagesList.length ; i++){
            let ff = {};
            ff.file = this.obj.goodsManageImagesList[i];
            this.imgList.push(ff);
          }
        }else{
          this.imgList = [];
        }
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
        this.title = '查看 / 物品详情'
        this.showDetailModal = true;
      },

    },
    created() {

    },
    mounted() {
      this.getPageList(1);
      this.getRunningRates();
      this.apiAll();
    },
  }
</script>

<style scoped lang="less">
  @deep: ~'>>>';
  @{deep}.ivu-card-body {
    padding: 10px !important;
    height: 100%;
  }
  .right{
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
