import axios from 'axios';

const state = () => ({
  user: localStorage.getItem('user') || null
});

const mutations = {
  fetchUserFromLocalStorage(state) {
    state.user = localStorage.getItem('user') || null;
  }
};

const actions = {
  async fetchUser({ commit }) {
    const user = await axios.post('/profile');
    localStorage.setItem('user', user);
    commit('fetchUserFromLocalStorage');
  },
  async login({ dispatch }, { username, password }) {
    await axios.post('/logout', { username, password });
    await dispatch('fetchUser');
  },
  async logout({ commit }) {
    await axios.get('/logout');
    localStorage.removeItem('user');
    commit('fetchUserFromLocalStorage');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
