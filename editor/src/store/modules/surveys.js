import { SurveyTypes } from '../mutation-types'
import Api from '@/api'

// init state
const state = {
  all: [],
  current_index: -1
}

// getters
const getters = {
  [SurveyTypes.findAll]: state => state.all,
  [SurveyTypes.find]: (state, getters) => (id) => state.all.filter(s => s._id === id),
  [SurveyTypes.current]: state => state.current_index >= 0 ? state.all[state.current_index] : {}
}

// actions
const actions = {
  [SurveyTypes.save] ({ commit }, data) {
    Api.surveys.save(data).then(function (resp) {
      commit(SurveyTypes.current, { survey: Object.assign({}, data, resp.data) })
    })
    .catch(function (err) {
      console.warn('Error saving survey', data, err)
    })
  },
  [SurveyTypes.findAll] ({ commit }, opts) {
    Api.surveys.findAll(opts).then(function (resp) {
      commit(SurveyTypes.findAll, { surveys: resp.data._items })
    })
  },
  [SurveyTypes.find] ({ commit }, opts) {
    Api.surveys.find(opts).then(function (resp) {
      if (resp.data && resp.data._items && resp.data._items[0]) {
        commit(SurveyTypes.current, { survey: resp.data._items[0] })
      }
    }).catch(function (err) {
      console.log('Error finding survey', opts, err)
    })
  }
}

// mutations must be synchronous
const mutations = {
  [SurveyTypes.current] (state, { survey }) {
    console.log('setting current survey', survey)
    state.all.forEach(function (s, i) {
      if (s._id === survey._id) {
        survey = Object.assign({}, s, survey)
        state.all.splice(i, 1)
      }
    })

    state.all.push(survey)
    state.current_index = state.all.length - 1
  },
  [SurveyTypes.findAll] (state, { surveys }) {
    state.all = surveys
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
