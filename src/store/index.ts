import Vue from 'vue'
import Vuex, { ModuleTree } from 'vuex'
import { vuexfireMutations } from 'vuexfire'

import authModule from './modules/auth'
import taskModule from './modules/task'
import loaderModule from './modules/loader'
import settingModule from './modules/setting'

Vue.use(Vuex)

const modules: ModuleTree<any> = {
  auth: authModule,
  task: taskModule,
  setting: settingModule,
  loader: loaderModule,
}

export default new Vuex.Store({
  modules,
  mutations: {
    ...vuexfireMutations,
  },
})
