import * as Cookies from '../../utils/cookieUtils';

const state = () => ({
  darkMode: Cookies.getCookie('darkMode', true)
})

// getters
const getters = {
  
}

// actions
const actions = {
  
}

// mutations
const mutations = {
  darkMode (state, newValue) {
    state.darkMode = newValue;
    Cookies.setCookie('darkMode', newValue);
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
