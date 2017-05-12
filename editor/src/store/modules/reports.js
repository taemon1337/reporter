import { ReportTypes } from '../mutation-types'
import Api from '@/api'

// init state
const state = {
  all: []
}

// getters
const getters = {
  [ReportTypes.findAll]: state => state.all
}

// actions
const actions = {
  [ReportTypes.create] ({ commit }, data) {
    Api.reports.create(data).then(function (resp) {
      console.log('Created Report: ', resp)
      commit(ReportTypes.create, { report: {
        _id: resp.data.filename,
        count: '...'
      }})
    })
    .catch(function (err) {
      console.warn('Error creating report', err)
    })
  },
  [ReportTypes.findAll] ({ commit }, opts) {
    Api.reports.findAll(opts).then(function (resp) {
      commit(ReportTypes.findAll, { reports: resp.data._items })
    })
  }
}

// mutations must be synchronous
const mutations = {
  [ReportTypes.create] (state, { report }) {
    state.all.push(report)
  },
  [ReportTypes.findAll] (state, { reports }) {
    state.all = reports
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
