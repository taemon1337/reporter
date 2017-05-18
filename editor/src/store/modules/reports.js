import { ReportTypes } from '../mutation-types'
import Api from '@/api'
import { parseJson } from '@/lib/parse-json'

// init state
const state = {
  default: { title: '', subtitle: '', state: 'draft', comments: '' },
  all: [],
  current_index: -1
}

// getters
const getters = {
  [ReportTypes.findAll]: state => state.all,
  [ReportTypes.active]: state => state.current_index >= 0 ? state.all[state.current_index] : state.default,
  [ReportTypes.activeReportSurvey]: state => state.current_index >= 0 ? state.all[state.current_index].survey : '',
  [ReportTypes.activeReportSurveyJson]: state => state.current_index >= 0 ? parseJson(state.all[state.current_index].survey.pages_json) : {},
  [ReportTypes.activeReportJson]: state => state.current_index >= 0 ? parseJson(state.all[state.current_index].report_json) : {}
}

// actions
const actions = {
  [ReportTypes.save] ({ commit }, data) {
    console.log('SAVING', data)
    Api.reports.save(data).then(function (resp) {
      commit(ReportTypes.active, { report: resp.data })
    })
    .catch(function (err) {
      console.warn('Error saving report', data, err)
    })
  },
  [ReportTypes.findAll] ({ commit }, opts) {
    Api.reports.findAll(opts).then(function (resp) {
      commit(ReportTypes.findAll, { reports: resp.data._items })
    })
  },
  [ReportTypes.find] ({ commit }, id) {
    if (id === 'new' || !id) {
      commit(ReportTypes.active, { report: { _id: null } })
    } else {
      Api.reports.find(id).then(function (resp) {
        if (resp.data) {
          commit(ReportTypes.active, { report: resp.data })
        }
      }).catch(function (err) {
        console.log('Error finding report', id, err)
      })
    }
  },
  [ReportTypes.remove] ({ commit }, data) {
    console.log('Removing report', data)
    Api.reports.remove(data).then(function (resp) {
      commit(ReportTypes.remove, data._id)
    }).catch(function (err) {
      console.log('Error removing report', err)
    })
  },
  [ReportTypes.download] ({ commit }, report) {
    return Api.reports.download(report)
  }
}

// mutations must be synchronous
const mutations = {
  [ReportTypes.active] (state, { report }) {
    if (report._id) {
      // if report is given, search for it in all
      state.all.forEach(function (s, i) {
        if (s._id === report._id) {
          report = Object.assign({}, s, report) // with new with old
          state.all.splice(i, 1) // remove it
        }
      })

      state.all.push(report) // add it
      state.current_index = state.all.length - 1 // set current index
    } else {
      state.current_index = -1 // for new
      state.default = Object.assign({}, state.default)
    }
  },
  [ReportTypes.findAll] (state, { reports }) {
    state.all = reports
  },
  [ReportTypes.remove] (state, id) {
    state.all.forEach(function (s, i) {
      if (s._id === id) {
        state.all.splice(i, 1)
        if (state.current_index === i) {
          state.current_index = -1
        }
      }
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
