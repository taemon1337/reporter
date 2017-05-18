import { RenderTypes } from '../mutation-types'
import Api from '@/api/render'

// init state
const state = {
  all: []
}

// getters
const getters = {
  [RenderTypes.findAll]: state => state.all
}

// actions
const actions = {
  [RenderTypes.findAll] ({ commit }, opts) {
    Api.templates.findAll(opts).then(function (resp) {
      commit(RenderTypes.findAll, { renders: resp })
    })
  }
}

// mutations must be synchronous
const mutations = {
  [RenderTypes.findAll] (state, { renders }) {
    state.all = renders
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
