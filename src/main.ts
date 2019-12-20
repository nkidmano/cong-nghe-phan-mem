import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

Vue.filter('minute', (ms: number) => {
  return Math.floor((+ms / 1000 / 60) % 60)
})

Vue.filter('second', (ms: number) => {
  const result: number = Math.floor((ms / 1000) % 60)
  return result < 10 ? '0' + result : result
})

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
