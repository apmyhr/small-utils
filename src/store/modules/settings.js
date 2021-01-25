import * as Cookies from '../../utils/cookieUtils';

const state = () => ({
  darkMode: Cookies.getCookie('darkMode', false)
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
    console.log('newValue')
    console.log(newValue)
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
