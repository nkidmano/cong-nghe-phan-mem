import Vue from 'vue'
import Vuex, { ModuleTree } from 'vuex'

import authModule from './modules/auth'
import taskModule from './modules/task'
import loaderModule from './modules/loader'

Vue.use(Vuex)

const modules: ModuleTree<any> = {
  auth: authModule,
  task: taskModule,
  loader: loaderModule,
}

export default new Vuex.Store({
  modules,
})
