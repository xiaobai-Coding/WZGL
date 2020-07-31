<template>
  <div class="layout">
    <Layout>
      <Header style="background-color: rgba(111, 97, 113, 1)">
        <!--顶部导航-->
        <topNavigation
          :topMenu="topMenu"
          @sideNavigation="sideNavigation">
        </topNavigation>
      </Header>
      <Layout :class="[ leftMenu.length != 0 ? 'sl' : '' ]">
        <Sider v-if="leftMenu.length != 0" hide-trigger :style="{background: '#fff'}">
          <!--左侧导航-->
          <leftNavigation ref="leftNavigation" :leftMenu="leftMenu"></leftNavigation>
        </Sider>

        <Layout :style="{padding: '10px'}">
          <!--右侧路由-->
          <router-view ref="routerView" style="height: 100%;"></router-view>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
    import { getByOrganizationId } from '@/axios/api';
    import topNavigation from './topNavigation'
    import leftNavigation from './leftNavigation'
    import menu from "../menu/menuModule.js";
    export default {
        name: "index",
        components: {
          topNavigation,
          leftNavigation,
        },
        props: [''],
        data() {
            return {
              topMenu:[],
              // topMenu:this.menu,
              leftMenu:[],
            }
        },
        computed: {},
        watch: {},
        methods: {
          sideNavigation(name){
            this.leftMenu = name;
            this.$store.commit('topNav',name)
            if (this.$refs.leftNavigation != undefined) {
              this.$refs.leftNavigation.activeName = '';
              this.$refs.leftNavigation.openActiveName = [''];
              this.$nextTick(() => {
                if (this.$refs.leftNavigation != undefined) {
                  this.$refs.leftNavigation.$refs.menu.updateOpened();
                  this.$refs.leftNavigation.$refs.menu.updateActiveName();
                }
                this.$nextTick(() => {
                  this.$refs.leftNavigation.clickMenu(name[0].name, name[0].url);
                })
              })
            }
          },
          getStore(){
            if(this.$store.getters.topNav != null){
              this.leftMenu = this.$store.getters.topNav
            }
          },
          getMenu(){
            let user=this.$store.getters.submitData.user;
            if(user.admin=="1"){
              getByOrganizationId({
                organizationId:this.$store.getters.submitData.user.userInfo.company,
              }).then(res => {
                this.topMenu = res.menuList
                this.$store.commit('menu',res.menuList)
              }).catch(err => {
                this.$Message.error(err);
              })
            }else{
              //从用户信息里获取菜单
              let ucRoleAuthorityVo=user.ucRoleAuthorityVo;
              if(ucRoleAuthorityVo!=undefined && ucRoleAuthorityVo.ucRoleAuthorityList!=undefined){
                let menuList=ucRoleAuthorityVo.ucRoleAuthorityList;
                let arr = JSON.parse(JSON.stringify(menuList)
                  .replace(/menuFatherId/g, 'fatherId')
                  .replace(/menuId/g, 'id')
                  .replace(/menuLevel/g, 'level')
                  .replace(/menuName/g, 'name')
                  .replace(/ucRoleAuthorityList/g, 'sonList')
                )
                this.topMenu = arr
                this.$store.commit('menu',arr)
              }
            }




          }
        },
        created() {
          // this.topMenu = menu
        },
        mounted() {
          this.getStore();
          this.getMenu();
        },
    }
</script>

<style scoped lang="less">
    @deep: ~'>>>';
    @{deep}.ivu-card-body {
        padding: 10px !important;
    }
    @{deep}.v-clock{
      >div{
        height: 100%;
      }
    }
    .sl {
      display: flex;
      flex-direction: row;
      height: e('calc(100% - 64px)')!important;
      > .ivu-layout-content {
        width: e('calc(100% - 200px)');
      }
    }
</style>
