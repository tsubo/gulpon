import Vuex from 'vuex'

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
