import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    url: '',
    posts: {},
  },
  mutations: {
    setUrl(state, url) {
      state.url = url
    },
    setPosts(state, posts) {
      state.posts = posts
    },
  },
  getters: {
    post: state => key => {
      return state.posts[key]
    },
  },
})
