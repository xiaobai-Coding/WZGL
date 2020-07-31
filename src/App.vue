<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  @deep: ~'>>>';
  @{deep}.ivu-card-body {
    padding: 10px !important;
  }
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
  }
  .ivu-layout {
    height: 100%;
    overflow: auto;
    >.ivu-layout-header{
      background: rgba(93, 109, 195, 1)!important;

      height: 60px;
    }
    > .ivu-layout-content {
      height: 100%;
      padding: 0 !important;
      > .mainCss {
        height: 100%;
        overflow-y: auto;
        /*border: 0;*/
        @{deep}.ivu-card-body {
          height: 100%;
          overflow-y: auto;
          padding: 0;
        }
      }
    }
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  html, body, #app {
    height: 100%;
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  }
</style>
