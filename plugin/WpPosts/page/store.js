import Vuex from 'vuex'

window.Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: '',
  },
  mutations: {
    setApiUrl(state, apiUrl) {
      state.apiUrl = apiUrl
    },
  },
})
