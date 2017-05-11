import { SurveyTypes } from '../mutation-types'
import Api from '@/api'

// init state
const state = {
  all: []
}

// getters
const getters = {
  [SurveyTypes.findAll]: state => state.all
}

// actions
const actions = {
  [SurveyTypes.create] ({ commit }, data) {
    Api.surveys.create(data).then(function (resp) {
      console.log('CREATED SURVEY: ', resp)
      commit(SurveyTypes.create, { survey: {
        _id: resp.data.filename,
        count: '...'
      }})
    })
    .catch(function (err) {
      console.warn('Error creating survey', err)
    })
  },
  [SurveyTypes.findAll] ({ commit }) {
    Api.surveys.findAll().then(function (resp) {
      commit(SurveyTypes.findAll, { surveys: resp.data })
    })
  }
}

// mutations must be synchronous
const mutations = {
  [SurveyTypes.create] (state, { survey }) {
    state.all.push(survey)
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
