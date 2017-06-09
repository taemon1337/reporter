import { GlobalTypes } from '../mutation-types'

// init state
const state = {
  colors: {
    schemas: {
      light: 'blue lighten-2 white--text',
      primary: 'blue white--text',
      dark: 'blue darken-3 white--text'
    },
    layouts: {
      light: 'lime lighten-2 dark--text',
      primary: 'lime lighten-3 dark--text',
      dark: 'lime darken-3 white--text'
    },
    reports: {
      light: 'green lighten-3 white--text',
      primary: 'green white--text',
      dark: 'green darken-3 white--text'
    }
  },
  sidebar: {
    open: false
  }
}

// getters
const getters = {
  [GlobalTypes.TOGGLE_SIDEBAR] () {
    return state.sidebar.open
  },
  [GlobalTypes.colors]: state => state.colors,
  [GlobalTypes.schemaColor]: state => state.colors.schemas,
  [GlobalTypes.layoutColor]: state => state.colors.layouts,
  [GlobalTypes.reportColor]: state => state.colors.reports
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
