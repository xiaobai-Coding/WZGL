<template>
  <div class="v-clock" style="height: 100%;">
    <Menu
      theme="light"
      width="auto"
      accordion
      @on-open-change="twoMenu"
      :active-name="activeName"
      :open-names="openActiveName"
      ref="menu">
      <div v-for="(item,index) in leftMenu"  :key="index">
        <Menu-item :name="item.name" v-if="item.name == '首页'" @click.native="clickMenu(item)">
          {{item.name}}
        </Menu-item>
        <Submenu v-if="item.name != '首页'" :name="item.name">
          <template slot="title" style="background: #5cadff;">
            {{item.name}}
          </template>
          <div v-for="(sub,index) in item.sonList" :key="index">
            <Submenu v-if="sub.subItem != undefined" :name="sub.url">
              <template slot="title">
                {{sub.name}}
              </template>
              <Menu-item
                v-if="sub.subItem != undefined"
                v-for="(small,index) in sub.subItem"
                :name="small.name" :key="index"
                @click.native="clickMenu(small)">
                {{small.name}}
              </Menu-item>
            </Submenu>
            <Menu-item
              v-else
              :name="sub.name"
              @click.native="clickMenu(sub)">
              {{sub.name}}
            </Menu-item>
          </div>
        </Submenu>
      </div>
    </Menu>
  </div>
</template>

<script>

    export default {
        name: "leftNavigation",
        components: {},
        props: ['leftMenu'],
        data() {
            return {
              activeName:'',
              openActiveName:[],
              name:''
            }
        },
        computed: {},
        watch: {},
        methods: {
          clickMenu(item) {
            let name=item.name;
            let id = null;
            if(name == '首页'){
              this.openActiveName = [];
              this.$nextTick(()=>{
                this.$refs.menu.updateOpened()
                this.$refs.menu.updateActiveName()
              })
              this.activeName = id;
              this.$store.commit('openLeftMenuItem',this.openActiveName)
              this.$store.commit('leftMenuActive',id)
            }else{
              switch (name) {
                case '业务名称':
                  id = 'businessIndex'
                  break;
                case '岗位名称':
                  id = 'postNamesIndex'
                  break;
                case '职位名称':
                  id = 'positionNamesIndex'
                  break;
                case '用户菜单管理':
                  id = 'userMenuIndex'
                  break;
                case '组织管理':
                  id = 'organizationManagementIndex'
                  break;
                case '部门管理':
                  id = 'departmentsIndex'
                  break;
                case '人员管理':
                  id = 'userIndex'
                  break;
                case '账号管理':
                  id = 'accountIndex'
                  break;
                case '项目管理':
                  id = 'projectIndex'
                  break;
                case '权限管理':
                  id = 'permissionsIndex'
                  break;
                case '日志管理':
                  id = 'operationLogIndex'
                  break;
                case '物品类别':
                  id = 'GoodsCategoryIndex'
                  break;
                case '计量单位':
                  id = 'UnitMeasureIndex'
                  break;
                case '供应商类别':
                  id = 'SupplierCategoryIndex'
                  break;
                case '供货单位':
                  id = 'SupplierCompanyIndex'
                  break;
                case '仓库配置':
                  id = 'WareHouseConfigIndex'
                  break;
                case '物品管理':
                  id = 'GoodsManageIndex'
                  break;
                case '物资采购':
                  id = 'GoodsPurchasingIndex'
                  break;
                case '入库管理':
                  id = 'WareHouseInIndex'
                  break;
                case '出库管理':
                  id = 'WareHouseOutIndex'
                  break;
                case '仓库盘点':
                  id = 'WareHouseInventoryIndex'
                  break;
                case '资产台账':
                  id = 'WareHousePropertyIndex'
                  break;
              }
              this.openActiveName = [];
              const x = this.$store.getters.openLeftMenuItem;
              x.push(name)
              this.$store.commit('openLeftMenuItem',x)
              this.openActiveName.push(name);
              this.name = this.$store.getters.openLeftMenuItem;
              this.$store.commit('leftMenuActive',name)
            }
            this.$router.push({
              name: id,
              query: {
                edit: item.edit,
                visual:item.visual,
              }
            });
          },
          twoMenu(name){
            let chooseName;
            switch (name[0]) {
              case '系统参数':
                chooseName = 'configurationSystem'
                break;
              case '系统配置':
                chooseName = 'configurationSetting'
                break;
              case '组织架构':
                chooseName = 'configurationOrganization'
                break;
              case '日志管理':
                chooseName = 'configurationLog'
                break;
            }
            // let arr = []
            // arr.push(chooseName)
            this.name = name;
            this.$store.commit('openLeftMenuItem',this.name)
          },
          leftMenuAn(){
            if(this.$store.getters.openLeftMenuItem != null){
              if(this.$store.getters.openLeftMenuItem.length == 0 || this.$store.getters.openLeftMenuItem.length == 1){
                this.openActiveName = [];
              }else{
                if(this.$store.getters.openLeftMenuItem == undefined){
                  this.openActiveName = this.$store.getters.openLeftMenuItem;
                }else{
                  this.openActiveName = this.$store.getters.openLeftMenuItem[0].split(",");
                }
                this.activeName = this.$store.getters.leftMenuActive
              }

              this.$nextTick(()=>{
                this.$refs.menu.updateOpened()
                this.$refs.menu.updateActiveName()
              })
            }
          }
        },
        created() {

        },
        mounted() {
          this.leftMenuAn();
        },
    }
</script>

<style scoped lang="less">
    @deep: ~'>>>';
    @{deep}.ivu-card-body {
        padding: 10px !important;
    }
  ul{
    height: 100%;
  }
</style>
