/**
 * api接口统一管理
 */

// const root = process.env.API_ROOT;


import { get, post, $delete, put,putUrl,postUrl } from "./http";

export const image = data => get("/usercenter/media/upload/image", data);



export const login = data => post("/usercenter/user/login", data);
export const userAddUser = data => post("/usercenter/user/addUser", data);
export const update = data => put("/usercenter/user/update", data);
export const untying = data => putUrl("/usercenter/user/untying", data);
export const getAllAccountByPage = data => get("/usercenter/user/getAllAccountByPage", data);
export const userDeleteById = data => $delete("/usercenter/user/deleteById", data);
export const updateList = data => put("/usercenter/user/updateList", data);//批量更新用户角色
export const getAllAccountByRoleId = data => get("/usercenter/user/getAllAccountByRoleId", data);//获取角色下的账号 已绑定  未绑定
export const unboundRole = data => putUrl("/usercenter/user/unboundRole", data);//解绑角色


export const getImgCode = data => get("/usercenter/code/getImgCode", data);
export const checkImgCode = data => get("/usercenter/code/checkImgCode", data);


export const getByPage = data => get("/usercenter/ucUserInfo/getByPage", data);
export const addUser = data => post("/usercenter/ucUserInfo/addUser", data);
export const updateInfo = data => put("/usercenter/ucUserInfo/updateInfo", data);
export const deleteById = data => $delete("/usercenter/ucUserInfo/deleteById", data);
export const getAllUsers = data => get("/usercenter/ucUserInfo/getAllUser", data);



export const insert = data => post("/usercenter/ucDepartments/insert", data);
export const departmentsUpdate = data => put("/usercenter/ucDepartments/update", data);
export const departmentsGetByPage = data => get("/usercenter/ucDepartments/getByPage", data);
export const departmentsDelete = data => $delete("/usercenter/ucDepartments/delete", data);



export const organizationsGetByPage = data => get("/usercenter/ucOrganizations/getByPage", data);
export const organizationInsert = data => post("/usercenter/ucOrganizations/insert", data);
export const organizationsUpdate = data => put("/usercenter/ucOrganizations/update", data);
export const organizationsDelete = data => $delete("/usercenter/ucOrganizations/delete", data);
export const getAllOrganizations = data => get("/usercenter/ucOrganizations/getAllOrgan", data);



export const businessNamesGetByPage = data => get("/usercenter/businessNames/getByPage", data);
export const businessNamesInsert = data => post("/usercenter/businessNames/insert", data);
export const businessNamesUpdate = data => put("/usercenter/businessNames/update", data);
export const businessNamesDeleteById = data => $delete("/usercenter/businessNames/deleteById", data);




export const postNamesGetByPage = data => get("/usercenter/postNames/getByPage", data);
export const postNamesInsert = data => post("/usercenter/postNames/insert", data);
export const postNamesUpdate = data => put("/usercenter/postNames/update", data);
export const postNamesDeleteById = data => $delete("/usercenter/postNames/deleteById", data);




export const positionNamesGetByPage = data => get("/usercenter/positionNames/getByPage", data);
export const positionNamesInsert = data => post("/usercenter/positionNames/insert", data);
export const positionNamesUpdate = data => put("/usercenter/positionNames/update", data);
export const positionNamesDelete = data => $delete("/usercenter/positionNames/delete", data);



export const getByOrganizationId = data => get("/usercenter/systemMenus/getByOrganizationId", data);
export const insertMenu = data => post("/usercenter/systemMenus/insertMenu", data);


export const ucProjectsGetByPage = data => get("/usercenter/ucProjects/getByPage", data);
export const ucProjectsInsert = data => post("/usercenter/ucProjects/insert", data);
export const ucProjectsUpdate = data => put("/usercenter/ucProjects/update", data);
export const ucProjectsDelete = data => $delete("/usercenter/ucProjects/delete", data);
export const getAllProjectsByOrgId = data => get("/usercenter/ucProjects/getAllByOrganId", data);



export const ucRolesGetByPage = data => get("/usercenter/ucRoles/getByPage", data);
export const getResource = data => get("/usercenter/ucRoles/getResource", data);
export const ucRolesInsert = data => post("/usercenter/ucRoles/insert", data);
export const ucRolesAddRole = (data,params) => postUrl("/usercenter/ucRoles/addRole", data , params);
export const ucRolesUpdate = data => put("/usercenter/ucRoles/update", data);
export const ucRolesDelete = data => $delete("/usercenter/ucRoles/delete", data);
export const insertUcRoleAuthority = (data,params) => postUrl("/usercenter/ucRoleAuthority/insert", data , params);



export const systemLogsGetByPage = data => get("/usercenter/systemLogs/getByPage", data);
export const systemLogsDelete = data => $delete("/usercenter/systemLogs/deleteById", data);

//供应商类别
export const getSupplierCategoryList = data => get("/warehouse/systemSupplierCategory/findByPage", data);
export const insertSupplierCategory = data => post("/warehouse/systemSupplierCategory/insert", data);
export const updateSupplierCategory = data => put("/warehouse/systemSupplierCategory/update", data);
export const deleteSupplierCategory = data => $delete("/warehouse/systemSupplierCategory/deleteById", data);
export const getSupplierCategoryListAll = data => get("/warehouse/systemSupplierCategory/findAll", data);


//供货单位
export const getSupplierCompanyList = data => get("/warehouse/systemSupplierNames/findByPage", data);
export const insertSupplierCompany = data => post("/warehouse/systemSupplierNames/insert", data);
export const updateSupplierCompany = data => put("/warehouse/systemSupplierNames/update", data);
export const deleteSupplierCompany = data => $delete("/warehouse/systemSupplierNames/deleteById", data);

//物品类别
export const getGoodsCategoryList = data => get("/warehouse/systemItemCategory/findByPage", data);
export const insertGoodsCategory = data => post("/warehouse/systemItemCategory/insert", data);
export const updateGoodsCategory = data => put("/warehouse/systemItemCategory/update", data);
export const deleteGoodsCategory = data => $delete("/warehouse/systemItemCategory/deleteById", data);

//仓库配置
export const getWareHouseConfigList = data => get("/warehouse/storeSettings/getByPage", data);
export const insertWareHouseConfig = data => post("/warehouse/storeSettings/insert", data);
export const updateWareHouseConfig = data => put("/warehouse/storeSettings/update", data);
export const deleteWareHouseConfig = data => $delete("/warehouse/storeSettings/delete", data);

//计量单位
export const getSysMeterNamesList = data => get("/warehouse/sysMeterNames/findByPage", data);
export const insertSysMeterNames = data => post("/warehouse/sysMeterNames/insert", data);
export const updateSysMeterNames = data => put("/warehouse/sysMeterNames/update", data);
export const deleteSysMeterNames = data => $delete("/warehouse/sysMeterNames/deleteById", data);


//采购管理
export const getMaterialPurchasesList = data => get("/warehouse/materialPurchases/getByPage", data);
export const insertMaterialPurchases = data => post("/warehouse/materialPurchases/insert", data);
export const updateMaterialPurchases = data => put("/warehouse/materialPurchases/update", data);
export const deleteMaterialPurchases = data => $delete("/warehouse/materialPurchases/delete", data);

//物品管理
export const getGoodsManagesList = data => get("/warehouse/goodsManages/getByPage", data);
export const insertGoodsManages = data => post("/warehouse/goodsManages/insert", data);
export const updateGoodsManages = data => put("/warehouse/goodsManages/update", data);
export const deleteGoodsManages = data => $delete("/warehouse/goodsManages/delete", data);
export const getAllGoodsManagesList = data => get("/warehouse/goodsManages/getAll", data);


//出库管理
export const getGoodsOutList = data => get("/warehouse/exit/getOutReviceByPage", data);
export const insertGoodsOut = data => post("/warehouse/exit/insert", data);
export const updateGoodsOut = data => put("/warehouse/exit/update", data);
export const deleteGoodsOut = data => $delete("/warehouse/exit/delete", data);
export const getInWareHouseGoodsList = data => get("/warehouse/storeGoods/getBySearchContent", data);//获取所有入库的商品列表
export const getWZLYGoodsDetail = data => get("/warehouse/exit/getOutReviceById", data);//获取物资领用出库详情

//入库管理
export const getPutInStorageList = data => get("/warehouse/putInStorage/getByPage", data);
export const getPutInStorageStayList = data => get("/warehouse/putInStorage/getStayList", data);
export const insertPutInStorage = data => post("/warehouse/putInStorage/insert", data);
export const updatePutInStorage = data => put("/warehouse/putInStorage/update", data);
export const deletePutInStorage = data => $delete("/warehouse/putInStorage/delete", data);








