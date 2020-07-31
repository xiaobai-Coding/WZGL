import store from '../store/index'


let Filters;
Filters = {
  statusType: (value) => {
    switch (value) {
      case 0:
        return value = "有效"
      case 1:
        return value = "注销"
      case '0':
        return value = "有效"
      case '1':
        return value = "注销"
    }
  },
  enableType: (value) => {
    switch (value) {
      case 0:
        return value = "是"
      case 1:
        return value = "否"
      case '0':
        return value = "是"
      case '1':
        return value = "否"
    }
  },


  useType: (value) => {
    switch (value) {
      case 0:
        return value = false
      case 1:
        return value = true
    }
  },


  systemType: (value) => {
    switch (value) {
      case 0:
        return value = '仓库管理'
      case 1:
        return value = '管理配置'
    }
  },
};

export default Filters
