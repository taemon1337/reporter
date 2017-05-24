import { SurveyDesignerTypes } from '../mutation-types'

// init state
const state = {
  all: [],
  current_index: -1
}

// getters
const getters = {
  [SurveyDesignerTypes.findAll]: state => state.all,
  [SurveyDesignerTypes.active]: state => state.current_index >= 0 ? state.all[state.current_index] : null
}

// actions
const actions = {
  [SurveyDesignerTypes.active] ({ commit, component }) {
    commit(SurveyDesignerTypes.active, { component })
  },
  [SurveyDesignerTypes.register] ({ commit }, opts) {
    commit(SurveyDesignerTypes.register, opts)
  },
  [SurveyDesignerTypes.findAll] ({ commit }, opts) {
    commit(SurveyDesignerTypes.findAll, opts)
  }
}

// mutations must be synchronous
const mutations = {
  [SurveyDesignerTypes.register] (state, opts) {
    state.all.push(opts)
    state.current_index = state.all.length - 1
  },
  [SurveyDesignerTypes.active] (state, { component }) {
    if (component._id) {
      // if survey is given, search for it in all
      state.all.forEach(function (s, i) {
        if (s._id === component._id) {
          component = Object.assign({}, s, component) // with new with old
          state.all.splice(i, 1) // remove it
        }
      })

      state.all.push(component) // add it
      state.current_index = state.all.length - 1 // set current index
    }
  },
  [SurveyDesignerTypes.findAll] (state, { surveys }) {
    state.all = surveys
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
