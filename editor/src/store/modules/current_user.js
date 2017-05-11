// import shop from '@/api/shop'
import { GlobalTypes } from '../mutation-types'

// fix later
const shop = { getCurrentUser: function () {} }

// init state
const state = {
  id: '',
  name: 'Testie Tester',
  role: 'user',
  profile: {
    // avatar: 'http://asiapacificarts.usc.edu/files/images/201151815311oliviamunnhbo.png'
    avatar: 'http://cdn.koreaboo.com/wp-content/uploads/2015/10/kara.jpg',
    status: 'KPOP for life!'
  }
}

// getters
const getters = {
  [GlobalTypes.GET_CURRENT_USER]: state => state
}

// actions
const actions = {
  [GlobalTypes.GET_CURRENT_USER] ({ commit }) {
    shop.getCurrentUser(user => {
      commit(GlobalTypes.GET_CURRENT_USER, { user })
    })
  }
}

// mutations
const mutations = {
  [GlobalTypes.GET_CURRENT_USER] (state) {
    state.current_user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
