<template>
    <Menu
      mode="horizontal"
      theme="dark"
      active-name="1"
      class="left"
      style="justify-content: space-between;
             background-color: rgba(93, 109, 195, 1);"
      :active-name="activeName">


      <div class="left">
        <div class="layout-logo">
          <div>
            <img :src="iconImg" class="layout-logo-img"/>
            <span style="
              color: #fff;
              font-size: 28px;
              vertical-align:middle">{{iconName}}</span>
          </div>
        </div>
        <div class="layout-nav">
          <MenuItem
            v-for="(mav,index) in topMenu"
            :name="mav.name"
            :key="mav.id"
            :id="mav.id"
            :class="{'clickActive':index == clickActive }"
            @click.native="clickNav(mav.name,index)">
            <Icon :type="mav.icon" size="19"></Icon>
            {{mav.name}}
          </MenuItem>
<!--          <MenuItem-->
<!--            v-for="(mav,index) in topMenu.indexNav.nav"-->
<!--            :name="mav.url"-->
<!--            :key="mav.id"-->
<!--            :id="mav.id"-->
<!--            :class="{'clickActive':index == clickActive }"-->
<!--            @click.native="clickNav(mav.url,index)">-->
<!--            <Icon :type="mav.icon" size="19"></Icon>-->
<!--            {{mav.name}}-->
<!--          </MenuItem>-->
        </div>
      </div>


      <div class="layout-login">
        <Submenu name="login-user">
          <template slot="title" class="word-v-middle"
                    style="vertical-align: middle;text-align: center;height: 30px">
            <img :src="iconImg" class="layout-login-img"/>
            <div class="dis">
              <div>{{user.user.name}}</div>
              <div>{{user.user.userInfo == undefined?user.user.phone:user.user.userInfo.companyName}}</div>
<!--              <div>财务部 - 科长</div>-->
            </div>
          </template>
          <MenuItem
            @click.native="loginExit"
            name="login-user-1">退出</MenuItem>
        </Submenu>
      </div>


    </Menu>
</template>

<script>

    export default {
        name: "topNavigation",
        components: {},
        props: ['topMenu'],
        data() {
            return {
              clickActive: this.$store.getters.clickActive,
              iconImg: './static/images/logo.png',
              activeName: this.$store.getters.topActive,
              sideNavigation:[],
              iconName:this.$store.getters.iconName == undefined ? "首页" : this.$store.getters.iconName,
              user:this.$store.getters.submitData
            }
        },
        computed: {},
        watch: {},
        methods: {
          clickNav(name,index){
            this.clickActive = index
            this.activeName = name;
            let url =null;
            switch (name) {
              //top导航
              case '仓库管理'://仓库管理
                url = 'wareHouse'
                break;
              case '管理配置'://管理配置
                url = 'configurationIndex'
                break;
            }
            this.sideNavigation = this.topMenu[index].sonList;//侧导航
            this.$store.commit('topActive',name)
            this.iconName = this.topMenu[index].name;//导航标题
            this.$store.commit('iconName',this.iconName)
            this.$emit('sideNavigation',this.sideNavigation)

            this.$router.push({
              name: url,
            })
            this.$store.commit('clickActive',index)
          },
          loginExit(){
            let self = this;
            this.$Modal.confirm({
              title: '退出',
              content: '是否退出登录',
              width: '400px',
              okText: '确定',
              cancelText: '关闭',
              onOk: function () {
                self.$load.show();
                setTimeout(()=>{
                  self.$load.hide();
                  localStorage.clear()
                  self.$router.push({
                    path: '/login',
                  })
                },2000)
              }
            })
          }
        },
        created() {

        },
        mounted() {
          // if (this.$store.getters.navListItem != null) {
          //   this.menuItmes = this.$store.getters.navListItem
          // }
        },
    }
</script>

<style scoped lang="less">
    @deep: ~'>>>';
    @{deep}.ivu-card-body {
        padding: 10px !important;
    }
    .layout-logo-img {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      vertical-align: middle;
    }
    @{deep}.ivu-menu-submenu-title{
      display: flex!important;
      align-items: center!important;
    }
    .dis{
      display: flex;
      flex-direction: column;
      height: 60px;
      >div{
        height: 30%;
        line-height: 35px;
        padding: 0 10px;
      }
    }
   .clickActive{
     background: inherit;
     -webkit-box-sizing: border-box;
     box-sizing: border-box;
     -webkit-box-shadow: none;
     box-shadow: none;
     height: 50px;
     line-height: 50px;
     margin-top: 5px;
     color: #fff !important;
    }
   /*.clickActive{*/
   /*   background: inherit;*/
   /*   background-color: rgba(255, 255, 255, 0.0705882352941176);*/
   /*   box-sizing: border-box;*/
   /*   border-width: 1px;*/
   /*   border-style: solid;*/
   /*   border-color: rgba(255, 255, 255, 1);*/
   /*   border-radius: 8px;*/
   /*   -moz-box-shadow: none;*/
   /*   -webkit-box-shadow: none;*/
   /*   box-shadow: none;*/
   /*   height: 50px;*/
   /*   line-height: 50px;*/
   /*   margin-top: 5px;*/
   /*   color: #fff!important;*/
   /* }*/
  .layout-nav{
    margin-left: 20px;
  }
</style>
