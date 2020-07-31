let PremissionUtil = {}

PremissionUtil.getPremission=function (context) {
  return {
    edit:context.$route.query.edit,
    visual:context.$route.query.visual,
  }
}
PremissionUtil.checkEditPremission=function (context) {
  let edit=context.$route.query.edit;
  let user=context.$store.getters.submitData;
  if(user.user.admin!="1"){
    if(edit=="0" || edit==undefined){
      context.$Modal.confirm({
        title: '系统提示',
        content: '无权操作,请联系管理员！',
        width: '400px',
        okText: '确定',
        cancelText: ' ',
      })
      return false;
    }else{
      return true;
    }
  }else{
    return true;
  }

}
PremissionUtil.checkQueryPremission=function (context) {
  let visual=context.$route.query.visual;
  let user=context.$store.getters.submitData;
  if(user.user.admin!="1") {
    if (visual == "0" || visual == undefined ) {
      context.$Modal.confirm({
        title: '系统提示',
        content: '无权操作,请联系管理员！',
        width: '400px',
        okText: '确定',
        cancelText: ' ',
      })
      return false;
    }else{
      return true;
    }
  }else{
    return true;
  }
}
export default PremissionUtil
