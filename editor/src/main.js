// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import App from './App'
import router from './router'
import store from './store'
import '@/filters'

Vue.config.productionTip = false
Vue.use(VueMaterial)

Vue.material.registerTheme({
  default: {
    primary: 'deep-purple',
    accent: 'light-blue'
  },
  sub: {
    background: 'white',
    primary: 'deep-purple',
    accent: 'lime',
    warn: 'red'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})