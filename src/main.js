import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

// this is were the entire app gets mounted and rendered
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
