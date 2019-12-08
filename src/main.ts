import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import 'nprogress/nprogress.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import { db } from './services'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created: () => {
    // TODO encapsulate logic in service, function, etc.
    // TODO add error handle
    db.collection('todos').onSnapshot((response) => {
      const changes = response.docChanges()

      const todos = []
      for (const change of changes) {
        todos.push({
          id: change.doc.id,
          ...change.doc.data(),
        })
      }
      // TODO fix bug
      // error occur when add new todo
      store.dispatch('task/setTodos', todos)
    })
  },
}).$mount('#app')
