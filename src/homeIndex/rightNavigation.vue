<template>
    <div class="v-clock">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Components</BreadcrumbItem>
        <BreadcrumbItem>Layout</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
        Content
      </Content>
    </div>
</template>

<script>

    export default {
        name: "rightNavigation",
        components: {},
        props: [''],
        data() {
            return {}
        },
        computed: {},
        watch: {},
        methods: {},
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
</style>
