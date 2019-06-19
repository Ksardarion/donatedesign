import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import mock_data from './mock_data'
import require_data from './require_data'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://gmail-import.com/api'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
