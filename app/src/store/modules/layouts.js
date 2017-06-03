import { LayoutTypes } from '../mutation-types'
import Api from '@/api'

// init state
const state = {
  default: { name: '', description: '', version: '', template: '' },
  all: [],
  current_index: -1
}

// getters
const getters = {
  [LayoutTypes.findAll]: state => state.all,
  [LayoutTypes.active]: state => state.current_index >= 0 ? state.all[state.current_index] : state.default
}

// actions
const actions = {
  [LayoutTypes.save] ({ commit }, data) {
    Api.layouts.save(data).then(function (resp) {
      commit(LayoutTypes.active, { layout: resp.data })
    })
    .catch(function (err) {
      console.warn('Error saving layout', data, err)
    })
  },
  [LayoutTypes.findAll] ({ commit }, opts) {
    Api.layouts.findAll(opts).then(function (resp) {
      commit(LayoutTypes.findAll, { layouts: resp.data._items })
    })
  },
  [LayoutTypes.find] ({ commit }, id) {
    if (id === 'new' || !id) {
      commit(LayoutTypes.active, { layout: { _id: null } })
    } else {
      Api.layouts.find(id).then(function (resp) {
        if (resp.data) {
          commit(LayoutTypes.active, { layout: resp.data })
        }
      }).catch(function (err) {
        console.log('Error finding layout', id, err)
      })
    }
  },
  [LayoutTypes.remove] ({ commit }, data) {
    console.log('Removing layout', data)
    Api.layouts.remove(data).then(function (resp) {
      commit(LayoutTypes.remove, data._id)
    }).catch(function (err) {
      console.log('Error removing layout', err)
    })
  }
}

// mutations must be synchronous
const mutations = {
  [LayoutTypes.active] (state, { layout }) {
    if (layout._id) {
      // if layout is given, search for it in all
      state.all.forEach(function (s, i) {
        if (s._id === layout._id) {
          layout = Object.assign({}, s, layout) // with new with old
          state.all.splice(i, 1) // remove it
        }
      })

      state.all.push(layout) // add it
      state.current_index = state.all.length - 1 // set current index
    } else {
      state.current_index = -1 // for new
      state.default = Object.assign({}, state.default)
    }
  },
  [LayoutTypes.findAll] (state, { layouts }) {
    state.all = layouts
  },
  [LayoutTypes.remove] (state, id) {
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
