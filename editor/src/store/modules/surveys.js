import { SurveyTypes } from '../mutation-types'
import Api from '@/api'

// init state
const state = {
  default: { version: '0.0.1', title: '', description: '' },
  all: [],
  current_index: -1
}

// getters
const getters = {
  [SurveyTypes.default]: state => Object.assign({}, state.default),
  [SurveyTypes.findAll]: state => state.all,
  [SurveyTypes.active]: state => state.current_index >= 0 ? state.all[state.current_index] : state.default,
  [SurveyTypes.surveyJson]: state => state.current_index >= 0 ? state.all[state.current_index].pages_json : '{}'
}

// actions
const actions = {
  [SurveyTypes.save] ({ commit }, data) {
    console.log('Saving survey', data)
    Api.surveys.save(data).then(function (resp) {
      commit(SurveyTypes.active, { survey: resp.data })
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
  [SurveyTypes.find] ({ commit }, id) {
    if (id === 'new' || !id) {
      commit(SurveyTypes.active, { survey: { _id: null } })
    } else {
      Api.surveys.find(id).then(function (resp) {
        if (resp.data) {
          commit(SurveyTypes.active, { survey: resp.data })
        }
      }).catch(function (err) {
        console.log('Error finding survey', id, err)
      })
    }
  },
  [SurveyTypes.remove] ({ commit }, data) {
    console.log('Removing survey', data)
    Api.surveys.remove(data).then(function (resp) {
      commit(SurveyTypes.remove, data._id)
    }).catch(function (err) {
      console.log('Error removing survey', err)
    })
  }
}

// mutations must be synchronous
const mutations = {
  [SurveyTypes.active] (state, { survey }) {
    if (survey._id) {
      // if survey is given, search for it in all
      state.all.forEach(function (s, i) {
        if (s._id === survey._id) {
          survey = Object.assign({}, s, survey) // with new with old
          state.all.splice(i, 1) // remove it
        }
      })

      state.all.push(survey) // add it
      state.current_index = state.all.length - 1 // set current index
    } else {
      state.current_index = -1 // for new
      state.default = Object.assign({}, state.default)
    }
  },
  [SurveyTypes.findAll] (state, { surveys }) {
    state.all = surveys
  },
  [SurveyTypes.remove] (state, id) {
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
