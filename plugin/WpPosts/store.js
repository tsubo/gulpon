import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    apiUrl: '',
    posts: {},
  },
  mutations: {
    setApiUrl(state, apiUrl) {
      state.apiUrl = apiUrl
    },
    setPosts(state, posts) {
      state.posts = posts
    },
  },
})
