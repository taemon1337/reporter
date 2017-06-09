// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import store from './store'
import Vue2Filters from 'vue2-filters'
import VueTinymce from 'vue-tinymce'
import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, { locale: 'en-US', locales: { 'en-US': require('vue-timeago/locales/en-US.json') } })
Vue.use(VueTinymce)
Vue.use(Vue2Filters)
Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
