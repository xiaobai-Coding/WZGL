<template>
  <div class="v-clock">
    <Form class="formClass" ref="obj" :model="obj" :label-width="100" >
      <div>
        <FormItem label="物品类别:" prop="categoryId">
          <Cascader v-model="obj.categoryId" :data="categoryList" trigger="hover" style="margin-top: 5px" :clearable="false" disabled></Cascader>
        </FormItem>
        <FormItem label="物品名称:" prop="goodsName">
          <Input type="text"  v-model="obj.goodsName" placeholder="请输入名称" disabled>
          </Input>
        </FormItem>
      </div>
      <div>
        <FormItem label="物品编号:" prop="num">
          <Input type="text"  v-model="obj.num" placeholder="请输入物品编号" disabled>
          </Input>
        </FormItem>
        <FormItem label="常用级别:" prop="level">
          <Select v-model="obj.level"  placeholder="请选择常用级别" disabled>
            <Option
              v-for="(item,index) in levelArr"
              :value="item.value"
              :label="item.label"
              :key="index">
            </Option>
          </Select>
        </FormItem>
      </div>
      <div>
        <FormItem label="品牌:" prop="brand">
          <Input type="text"  v-model="obj.brand" placeholder="请输入品牌" disabled>
          </Input>
        </FormItem>
        <FormItem label="是否危险品、易爆、易燃、有毒物品:" prop="risk" :label-width="250">
          <RadioGroup v-model="obj.risk" >
            <Radio :label=1  disabled>是</Radio>
            <Radio :label=0  disabled>否</Radio>
          </RadioGroup>
        </FormItem>
      </div>
      <div>
        <FormItem label="单位:" prop="unit">
          <Input type="text"  v-model="obj.unit" placeholder="请输入单位" disabled>
          </Input>
        </FormItem>
        <FormItem label="参考单价:" prop="price">
          <Input type="text"  v-model="obj.price" placeholder="请输入单价" style="width: 92%" number maxlength="10" disabled>
          </Input>
          元
        </FormItem>
      </div>
      <div>
        <FormItem label="规格:" prop="model">
          <Input type="text"  v-model="obj.model" placeholder="请输入规格" disabled>
          </Input>
        </FormItem>
        <FormItem label="产地:" prop="place">
          <Input type="text"  v-model="obj.place" placeholder="请输入产地" disabled>
          </Input>
        </FormItem>
      </div>
      <div>
        <FormItem label="供货单位:" prop="company">
          <Input type="text"  v-model="obj.company" placeholder="请输入供货单位" disabled>
          </Input>
        </FormItem>
        <FormItem label="是否启用:">
          <Select v-model="obj.use" placeholder="请选择状态" disabled>
            <Option v-for="(item,index) in switchArr"
                    :value="item.value"
                    :label="item.label"
                    :key="index">
            </Option>
          </Select>
        </FormItem>
      </div>


      <div>
        <FormItem label="物品照片:">
          <form action name="fileinfo">
            <div class="img_box">
              <div
                class="img_size"
                v-for="(item,index) of imgList"
                :key="index"
                v-show="imgList.length!=0"
              >
                <img preview="0" preview-text="" v-if="item.file.src != undefined" :src="item.file.src">
                <img preview="0" preview-text="" v-else :src="item.file.url">
              </div>

              <input
                id="inpu"
                name="files"
                style="display: none;"
                multiple="true"
                type="file"
                ref="file"
                accept="image/*"
              >
            </div>
          </form>
        </FormItem>
      </div>
    </Form>




  </div>
</template>

<script>
  export default {
    name: "goodsDetail",
    components: {
    },
    props: ['obj','categoryList', 'imgList'],
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
    watch: {


    },
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

    >div:nth-of-type(7){
      display: block;
      >div:nth-of-type(1){
        width: 100%;
      }
    }
  }
  @{deep}.ivu-modal-footer{
    text-align: center!important;
  }


  .img_box {
    width: 100%;
    padding: 2%;
    display: flex;
    flex: 1;
    flex-wrap: wrap;

    .img_size {
      position: relative;
      width: 100px;
      height: 100px;
      padding: 5px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }

      .remove_logo {
        position: absolute;
        width: 20px;
        height: 20px;
        background: red;
        border-radius: 25px;
        top: 5px;
        right: 5px;
        text-align: center;
        line-height: 15px;
        font-size: 25px;
        color: #777777;
      }
    }

    .add_img {
      width: 100px;
      height: 100px;
      margin-top: 5px;
      text-align: center;
      line-height: 90px;
      font-size: 30px;
      color: #777777;
      border: 1px solid #cccccc;
      border-radius: 5px;
    }
  }
</style>

