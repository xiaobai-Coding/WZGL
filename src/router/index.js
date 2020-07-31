import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeIndex',
      redirect: '/login',
      component: () => import(/* webpackChunkName: "HelloWorld" */ '@/homeIndex/homeIndex'),
      children:[
        {
          name: '/index',
          path: '/index',
          component: resolve => require(['@/homeIndex/rightNavigation'], resolve)
        },

        //管理配置
        {
          name: 'userIndex',
          path: '/management/organization/user/userIndex',
          component: resolve => require(['@/management/organization/user/userIndex'], resolve)
        },
        {
          name: 'departmentsIndex',
          path: '/management/organization/departments/departmentsIndex',
          component: resolve => require(['@/management/organization/departments/departmentsIndex'], resolve)
        },
        {
          name: 'organizationManagementIndex',
          path: '/management/organization/organizationManagement/organizationManagementIndex',
          component: resolve => require(['@/management/organization/organizationManagement/organizationManagementIndex'], resolve)
        },
        {
          name: 'accountIndex',
          path: '/management/organization/account/accountIndex',
          component: resolve => require(['@/management/organization/account/accountIndex'], resolve)
        },
        {
          name: 'configurationIndex',
          path: '/management/configurationIndex/configurationIndex',
          component: resolve => require(['@/management/configurationIndex/configurationIndex'], resolve)
        },

        {
          name: 'businessIndex',
          path: '/management/systemArgs/businessName/businessIndex',
          component: resolve => require(['@/management/systemArgs/businessName/businessIndex'], resolve)
        },
        {
          name: 'postNamesIndex',
          path: '/management/systemArgs/postNames/postNamesIndex',
          component: resolve => require(['@/management/systemArgs/postNames/postNamesIndex'], resolve)
        },
        {
          name: 'positionNamesIndex',
          path: '/management/systemArgs/positionNames/positionNamesIndex',
          component: resolve => require(['@/management/systemArgs/positionNames/positionNamesIndex'], resolve)
        },
        {
          name: 'userMenuIndex',
          path: '/management/configuration/userMenu/userMenuIndex',
          component: resolve => require(['@/management/configuration/userMenu/userMenuIndex'], resolve)
        },
        {
          name: 'projectIndex',
          path: '/management/organization/project/projectIndex',
          component: resolve => require(['@/management/organization/project/projectIndex'], resolve)
        },
        {
          name: 'permissionsIndex',
          path: '/management/organization/permissions/permissionsIndex',
          component: resolve => require(['@/management/organization/permissions/permissionsIndex'], resolve)
        },
        {
          name: 'operationLogIndex',
          path: '/management/log/operationLog/operationLogIndex',
          component: resolve => require(['@/management/log/operationLog/operationLogIndex'], resolve)
        },




        //仓库
        {
          name: 'wareHouse',
          path: '/wareHouse/wareHouseIndex/wareHouseIndex',
          component: resolve => require(['@/wareHouse/wareHouseIndex/wareHouseIndex'], resolve)
        },
        //物品类别
        {
          name: 'GoodsCategoryIndex',
          path: '/wareHouse/BaseConfig/GoodsCategory/GoodsCategoryIndex',
          component: resolve => require(['@/wareHouse/BaseConfig/GoodsCategory/GoodsCategoryIndex'], resolve)
        },
        //计量单位
        {
          name: 'UnitMeasureIndex',
          path: '/wareHouse/BaseConfig/UnitMeasureIndex',
          component: resolve => require(['@/wareHouse/BaseConfig/UnitMeasure/UnitMeasureIndex'], resolve)
        },
        //供应商类别
        {
          name: 'SupplierCategoryIndex',
          path: '/wareHouse/BaseConfig/SupplierCategoryIndex',
          component: resolve => require(['@/wareHouse/BaseConfig/SupplierCategory/SupplierCategoryIndex'], resolve)
        },
        //供货单位
        {
          name: 'SupplierCompanyIndex',
          path: '/wareHouse/BaseConfig/SupplierCompanyIndex',
          component: resolve => require(['@/wareHouse/BaseConfig/SupplierCompany/SupplierCompanyIndex'], resolve)
        },
        //仓库配置
        {
          name: 'WareHouseConfigIndex',
          path: '/wareHouse/BaseConfig/WareHouseConfigIndex',
          component: resolve => require(['@/wareHouse/BaseConfig/WareHouseConfig/WareHouseConfigIndex'], resolve)
        },
        //物品管理
        {
          name: 'GoodsManageIndex',
          path: '/wareHouse/BaseConfig/GoodsManageIndex',
          component: resolve => require(['@/wareHouse/BaseConfig/GoodsManage/GoodsManageIndex'], resolve)
        },

        //物资采购
        {
          name: 'GoodsPurchasingIndex',
          path: '/wareHouse/manage/GoodsPurchasingIndex',
          component: resolve => require(['@/wareHouse/manage/GoodsPurchasing/GoodsPurchasingIndex'], resolve)
        },
        //入库管理
        {
          name: 'WareHouseInIndex',
          path: '/wareHouse/manage/WareHouseInIndex',
          component: resolve => require(['@/wareHouse/manage/WareHouseIn/WareHouseInIndex'], resolve)
        },
        //出库管理
        {
          name: 'WareHouseOutIndex',
          path: '/wareHouse/manage/WareHouseOutIndex',
          component: resolve => require(['@/wareHouse/manage/WareHouseOut/WareHouseOutIndex'], resolve)
        },
        //仓库盘点
        {
          name: 'WareHouseInventoryIndex',
          path: '/wareHouse/manage/WareHouseInventoryIndex',
          component: resolve => require(['@/wareHouse/manage/WareHouseInventory/WareHouseInventoryIndex'], resolve)
        },
        //资产台账
        {
          name: 'WareHousePropertyIndex',
          path: '/wareHouse/manage/WareHousePropertyIndex',
          component: resolve => require(['@/wareHouse/manage/WareHouseProperty/WareHousePropertyIndex'], resolve)
        },
      ],
    },
    {
      name: 'login',
      path: '/login',
      component: resolve => require(['@/login/loginIndex'], resolve)
    },
  ]
})
