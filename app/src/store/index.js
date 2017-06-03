import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import ui from './modules/ui'
import currentUser from './modules/current_user'
import schemes from './modules/schemes'
import reports from './modules/reports'
import layouts from './modules/layouts'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    ui,
    currentUser,
    schemes,
    layouts,
    reports
  },
  strict: debug
})
