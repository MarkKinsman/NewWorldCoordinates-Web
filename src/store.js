import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appMode: "List"
  },
  mutations: {
    setAppMode(state, appMode) {
      state.appMode = appMode;
    }
  },
  actions: {}
});
