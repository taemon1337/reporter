import { SchemeTypes } from '../mutation-types'
import Api from '@/api'

// init state
const state = {
  default: {},
  all: [],
  current_index: -1
}

// getters
const getters = {
  [SchemeTypes.findAll]: state => state.all,
  [SchemeTypes.active]: state => state.current_index >= 0 ? state.all[state.current_index] : state.default
}

// actions
const actions = {
  [SchemeTypes.save] ({ commit }, data) {
    console.log('Saving scheme', data)
    Api.schemes.save(data).then(function (resp) {
      commit(SchemeTypes.active, { scheme: resp.data })
    })
    .catch(function (err) {
      console.warn('Error saving scheme', data, err)
    })
  },
  [SchemeTypes.findAll] ({ commit }, opts) {
    Api.schemes.findAll(opts).then(function (resp) {
      commit(SchemeTypes.findAll, { schemes: resp.data._items })
    })
  },
  [SchemeTypes.find] ({ commit }, id) {
    if (id === 'new' || !id) {
      commit(SchemeTypes.active, { scheme: { _id: null } })
    } else {
      Api.schemes.find(id).then(function (resp) {
        if (resp.data) {
          commit(SchemeTypes.active, { scheme: resp.data })
        }
      }).catch(function (err) {
        console.log('Error finding scheme', id, err)
      })
    }
  },
  [SchemeTypes.remove] ({ commit }, data) {
    console.log('Removing scheme', data)
    Api.schemes.remove(data).then(function (resp) {
      commit(SchemeTypes.remove, data._id)
    }).catch(function (err) {
      console.log('Error removing scheme', err)
    })
  }
}

// mutations must be synchronous
const mutations = {
  [SchemeTypes.active] (state, { scheme }) {
    if (scheme._id) {
      // if scheme is given, search for it in all
      state.all.forEach(function (s, i) {
        if (s._id === scheme._id) {
          scheme = Object.assign({}, s, scheme) // with new with old
          state.all.splice(i, 1) // remove it
        }
      })

      state.all.push(scheme) // add it
      state.current_index = state.all.length - 1 // set current index
    } else {
      state.current_index = -1 // for new
      state.default = Object.assign({}, state.default)
    }
  },
  [SchemeTypes.findAll] (state, { schemes }) {
    state.all = schemes
  },
  [SchemeTypes.remove] (state, id) {
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
