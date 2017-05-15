import { TemplateTypes } from '../mutation-types'
import Api from '@/api'

// init state
const state = {
  default: { version: '0.0.1', title: '', description: '' },
  all: [],
  current_index: -1
}

// getters
const getters = {
  [TemplateTypes.findAll]: state => state.all,
  [TemplateTypes.active]: state => state.current_index >= 0 ? state.all[state.current_index] : state.default
}

// actions
const actions = {
  [TemplateTypes.save] ({ commit }, data) {
    console.log('Saving template', data)
    Api.templates.save(data).then(function (resp) {
      commit(TemplateTypes.active, { template: Object.assign({}, data, resp.data) })
    })
    .catch(function (err) {
      console.warn('Error saving template', data, err)
    })
  },
  [TemplateTypes.findAll] ({ commit }, opts) {
    Api.templates.findAll(opts).then(function (resp) {
      commit(TemplateTypes.findAll, { templates: resp.data._items })
    })
  },
  [TemplateTypes.find] ({ commit }, id) {
    if (id === 'new' || !id) {
      commit(TemplateTypes.active, { template: { _id: null } })
    } else {
      Api.templates.find(id).then(function (resp) {
        if (resp.data) {
          commit(TemplateTypes.active, { template: resp.data })
        }
      }).catch(function (err) {
        console.log('Error finding template', id, err)
      })
    }
  },
  [TemplateTypes.remove] ({ commit }, data) {
    console.log('Removing template', data)
    Api.templates.remove(data).then(function (resp) {
      commit(TemplateTypes.remove, data._id)
    }).catch(function (err) {
      console.log('Error removing template', err)
    })
  }
}

// mutations must be synchronous
const mutations = {
  [TemplateTypes.active] (state, { template }) {
    if (template._id) {
      // if template is given, search for it in all
      state.all.forEach(function (s, i) {
        if (s._id === template._id) {
          template = Object.assign({}, s, template) // with new with old
          state.all.splice(i, 1) // remove it
        }
      })

      state.all.push(template) // add it
      state.current_index = state.all.length - 1 // set current index
    } else {
      state.current_index = -1 // for new
      state.default = Object.assign({}, state.default)
    }
  },
  [TemplateTypes.findAll] (state, { templates }) {
    state.all = templates
  },
  [TemplateTypes.remove] (state, id) {
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
