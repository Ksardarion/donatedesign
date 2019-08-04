import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import mock_data from './mock_data'
import require_data from './require_data'
// import VueClipboard from 'vue-clipboard2'
import VueSwimlane from 'vue-swimlane'

Vue.use(VueSwimlane)

Vue.config.productionTip = false

import { config } from '@/config'
axios.defaults.baseURL = config.baseURL

// Vue.use(VueClipboard)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
