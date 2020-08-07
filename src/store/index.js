import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
  mutations: {
    increment(state, addition) {
      state.count += Number(addition)
    }
  },
  actions: {
    increment({ commit }, payload) {
      commit('increment', payload)
    }
  }
})

export default store
