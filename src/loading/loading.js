import Vue from 'vue'
import loadingComponent from './loading.vue'

const LoadingConstructor = Vue.extend(loadingComponent)

const instance = new LoadingConstructor({
  el: document.createElement('div')
})

instance.show = false
const loading = {
  show() {
    instance.show = true
    document.body.appendChild(instance.$el)
  },
  hide() {
    instance.show = false
  }
}

export default {
  install() {
    if (!Vue.$load) {
      Vue.$load = loading
    }
    Vue.mixin({
      created() {
        this.$load = Vue.$load
      }
    })
  }
}
