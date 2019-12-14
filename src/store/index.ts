import Vue from 'vue'
import Vuex, { ModuleTree } from 'vuex'

import authModule from './modules/auth.module'
import taskModule from './modules/task.module'
import loaderModule from './modules/loader.module'

Vue.use(Vuex)

const modules: ModuleTree<any> = {
  auth: authModule,
  task: taskModule,
  loader: loaderModule,
}

export default new Vuex.Store({
  modules,
})
