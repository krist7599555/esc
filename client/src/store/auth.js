import axios from 'axios';
import { Toast } from 'buefy/dist/components/toast';

const state = () => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null
});

const mutations = {
  fetchUserFromLocalStorage(state) {
    state.user = localStorage.getItem('user') || null;
  }
};

const getters = {
  user: state => state.user
};

const actions = {
  async fetchUser({ commit }) {
    const user = await axios.get('/api/profile');
    localStorage.setItem('user', JSON.stringify(user.data));
    commit('fetchUserFromLocalStorage');
    return user;
  },
  async login({ dispatch }, { username, password }) {
    await axios.post('/api/login', { username, password });
    const res = await dispatch('fetchUser');
    Toast.open({
      type: 'is-success',
      message: 'login success'
    });
    return res;
  },
  async logout({ commit }) {
    const res = await axios.post('/api/logout');
    localStorage.removeItem('user');
    commit('fetchUserFromLocalStorage');
    Toast.open({
      type: 'is-success',
      message: 'logout success'
    });
    return res;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
