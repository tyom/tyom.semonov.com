export const state = () => ({
  content: {},
});

let content;

if (process.server) {
  const yamlParser = require('../yaml-parser');
  content = yamlParser('./content');
}

export const actions = {
  async nuxtServerInit({ commit }) {
    commit('setContent', await content);
  },
};

export const mutations = {
  setContent(state, payload) {
    state.content = payload;
  },
};
