<template>
  <div class="v-clock">
    <Form class="formClass" ref="obj" :model="obj" :label-width="100" :rules="ruleInline">
      <div>
        <FormItem label="物品类别:" prop="categoryId">
          <Cascader v-model="obj.categoryId" :data="categoryList" trigger="hover" style="margin-top: 5px" :clearable="false" @on-change="changeCategory"></Cascader>
        </FormItem>
        <FormItem label="物品名称:" prop="goodsName">
          <Input type="text"  v-model="obj.goodsName" placeholder="请输入名称">
          </Input>
        </FormItem>
      </div>
      <div>
        <FormItem label="物品编号:" prop="num">
          <Input type="text"  v-model="obj.num" placeholder="请输入物品编号">
          </Input>
        </FormItem>
        <FormItem label="常用级别:" prop="level">
          <Select v-model="obj.level"  placeholder="请选择常用级别">
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
          <Input type="text"  v-model="obj.brand" placeholder="请输入品牌">
          </Input>
        </FormItem>
        <FormItem label="是否危险品、易爆、易燃、有毒物品:" prop="risk" :label-width="250">
          <RadioGroup v-model="obj.risk">
            <Radio :label=1>是</Radio>
            <Radio :label=0>否</Radio>
          </RadioGroup>
        </FormItem>
      </div>
      <div>
        <FormItem label="单位:" prop="unit">
          <Input type="text"  v-model="obj.unit" placeholder="请输入单位">
          </Input>
        </FormItem>
        <FormItem label="参考单价:" prop="price">
          <Input type="text"  v-model="obj.price" placeholder="请输入单价" style="width: 92%" number maxlength="10">
          </Input>
          元
        </FormItem>
      </div>
      <div>
        <FormItem label="规格:" prop="model">
          <Input type="text"  v-model="obj.model" placeholder="请输入规格">
          </Input>
        </FormItem>
        <FormItem label="产地:" prop="place">
          <Input type="text"  v-model="obj.place" placeholder="请输入产地">
          </Input>
        </FormItem>
      </div>
      <div>
        <FormItem label="供货单位:" prop="company">
          <Input type="text"  v-model="obj.company" placeholder="请输入供货单位">
          </Input>
        </FormItem>
        <FormItem label="是否启用:">
          <Select v-model="obj.use" placeholder="请选择状态">
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
                <div class="remove_logo" @click="fileDel">×</div>
              </div>
              <div class="add_img" @click="fileClick" v-show="addState">
                <span> + </span>
              </div>
             <!-- <div @click="uploadImage">
                tijiao
              </div>-->
              <input
                id="inpu"
                name="files"
                style="display: none;"
                multiple="true"
                @change="fileChange($event)"
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
    name: "goodsForm",
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

        ruleInline:{
          categoryId: [
            { required: true, message: '请选择物品类别', trigger: 'change' ,type:'array'}
          ],
          goodsName: [
            { required: true, message: '请输入物品名称', trigger: 'blur' }
          ],
          num: [
            { required: true, message: '请输入物品编号', trigger: 'blur' }
          ],
          level: [
            { required: true, message: '请选择常用级别', trigger: 'change', type:'number'}
          ],
        },
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

        addState: true
      }
    },
    computed: {},
    watch: {
      'imgList.length':{
        handler:function(val,oldval){
          if (val >9) {
            this.imgList = this.imgList.slice(0, 9);
          }
          if(this.imgList.length == 9){
            this.addState = false;
          } else {
            this.addState = true;
          }
        },
        deep:true//对象内部的属性监听，也叫深度监听
      },

    },
    methods: {

      changeCategory(value,selectedData){
        this.obj.categoryId = value;
        this.obj.categoryName = [];
        var that = this;
        selectedData.forEach(function (item) {
          that.obj.categoryName.push(item.label);
        })
        this.obj.categoryName=this.obj.categoryName.join('/');
      },


      fileClick() {
        document.getElementById("inpu").click();
      },
      fileChange(el) {
        const list = this.$refs.file.files;
        if (!el.target.files[0].size) return;
        this.fileList(el.target);
        el.target.value = "";
      },
      fileList(fileList) {
        let files = fileList.files;
        for (let i = 0; i < files.length; i++) {
          //判断是否为文件夹
          if (files[i].type != "") {
            this.fileAdd(files[i]);
          } else {
            //文件夹处理
            this.folders(fileList.items[i]);
          }
        }
      },
      //文件夹处理
      folders(files) {
        let _this = this;
        //判断是否为原生file
        if (files.kind) {
          files = files.webkitGetAsEntry();
        }
        files.createReader().readEntries(function(file) {
          for (let i = 0; i < file.length; i++) {
            if (file[i].isFile) {
              _this.foldersAdd(file[i]);
            } else {
              _this.folders(file[i]);
            }
          }
        });
      },
      foldersAdd(entry) {
        let _this = this;
        entry.file(function(file) {
          _this.fileAdd(file);
        });
      },
      fileAdd(file) {
        //总大小
        this.size = this.size + file.size;
        let reader = new FileReader();
        reader.vue = this;
        reader.readAsDataURL(file);
        reader.onload = function() {
          file.src = this.result;
          this.vue.imgList.push({
            file
          });
        };
      },
      fileDel(index) {
        this.imgList.splice(index, 1);
      },

      setImageListPicture(){
        this.$emit('setImageList',this.imgList)
      },

      bytesToSize(bytes) {
        if (bytes === 0) return "0 B";
        let k = 1000, // or 1024
          sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
          i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
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

