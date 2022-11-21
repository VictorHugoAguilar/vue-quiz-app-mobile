import { createStore } from 'vuex';

export default createStore({
  state: {
    categories: ['general-knowledge', 'entertainment-film', 'science-geography', 'science-mathematics', 'science-computer']
  },
  getters: {
    allCategories: state => state.categories
  },
  mutations: {},
  actions: {},
  modules: {}
});
