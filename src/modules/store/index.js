import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    isAnonymous: true,
    uid: null,
  },
  mutations: {
    logIn(state, data) {
      state.currentUser = data.user;
      state.isAnonymous = data.user == null;
      state.uid = data.user.uid;
    },
    logOut(state) {
      state.currentUser = null;
      state.isAnonymous = true;
      state.uid = null;
    },
  },
  actions: {
    async updateUser({ commit }, user) {
      if (user) {
        commit("logIn", { user: user });
      } else {
        commit("logOut");
      }
    },
  },
  modules: {},
  getters: {
    user(state) {
      return state.user;
    },
  },
});
