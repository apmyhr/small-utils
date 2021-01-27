import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'

//This makes the icons available offline, but it adds about 3MB to the deployment.
//yarn add @mdi/font -D
//yarn add @fortawesome/fontawesome-free -D
//import '@mdi/font/css/materialdesignicons.css'
//import '@fortawesome/fontawesome-free/css/all.css' 

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
