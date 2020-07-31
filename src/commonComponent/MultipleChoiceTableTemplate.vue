
<!--多选功能的组件-->
<template>
  <div class="v-clock">
    <tableTemplate
      ref="tableTemplate"
      :tableList="tableList"
      :columns="columns"
      :selectList="selectList"
      :height="600"
      :size="'small'"
      @onSelect="onSelect"
      @onSelectCancel="onSelectCancel"
      :page="currentPage"
      @changePage="changePage"
    >
    </tableTemplate>
  </div>
</template>

<script>
  import tableTemplate from '@/commonComponent/tableTemplate';

  export default {
    name: "MultipleChoiceTableTemplate",
    components: {
      tableTemplate
    },
    props: ['tableList','columns','selectList','currentPage'],
    data() {
      return {

      }
    },
    computed: {},
    watch: {
    },
    methods: {
      //回显放在使用端接口查询后根据需要调用 ==》this.$emit('bindingChangePage',page)
      // showSelection(){
      //   let that=this;
      //   if(that.selectList.list!=undefined && that.selectList.list.length>0){
      //     this.tableList.list.forEach(function (item,index) {
      //       that.selectList.list.forEach(function (selection) {
      //         if(item.id==selection.id){
      //           that.$refs.tableTemplate.$refs.table.objData[index]._isChecked = true;
      //         }
      //       })
      //     })
      //   }
      //   this.tableList.list.forEach(function (item,index) {
      //     if(item.count==0) {
      //       that.$refs.tableTemplate.$refs.table.objData[index]._isDisabled = true;
      //     }
      //   })
      // },

      onSelect(selection,item){
        if(Array.isArray(item)){
          item.forEach(function (select) {
            this.selectList.push(select)
          })
        }else{
          this.selectList.push(item);
        }

      },
      onSelectCancel(selection,item){
        if(Array.isArray(item)){
          item.forEach(function (select) {
            this.deleteIndex(this.findIndex(select));
          })
        }else{
          this.deleteIndex(this.findIndex(item));
        }

      },
      getSelection(){
        this.$emit('getSelection',this.selectList)
      },
      changePage(page){
        this.$emit('bindingChangePage',page)
      },
      findIndex(item){
        let result=-1;
        this.selectList.forEach(function (sItem,index) {
            if(sItem.id==item.id){
              result=index;
            }
        })
        return result;
      },
      deleteIndex(index){
        this.selectList.splice(index,1);
      }
    },
    created() {

    },
    mounted() {

    },

  }
</script>

<style scoped>

</style>
