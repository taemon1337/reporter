import { GlobalTypes } from '../mutation-types'

// init state
const state = {
  sidebar: {
    open: false
  }
}

// getters
const getters = {
  [GlobalTypes.TOGGLE_SIDEBAR] () {
    return state.sidebar.open
  }
}

// actions
const actions = {
  [GlobalTypes.TOGGLE_SIDEBAR] ({ commit }) {
    commit(GlobalTypes.TOGGLE_SIDEBAR)
  }
}

// mutations
const mutations = {
  [GlobalTypes.TOGGLE_SIDEBAR] (state) {
    state.sidebar.open = !state.sidebar.open
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
