import { FirebaseService, StorageService } from '@/services'
import { GetterTree, MutationTree, ActionTree, ModuleTree, StoreOptions, Module } from 'vuex'

interface IAuthState {
  currentUser: object | null
}

const state: IAuthState = {
  currentUser: getCurrentUser(),
}

const mutations: MutationTree<IAuthState> = {
  SET_CURRENT_USER(state, credential) {
    state.currentUser = credential
  },
}

const actions: ActionTree<IAuthState, IAuthState> = {
  async init({ commit }) {
    const credential = await FirebaseService.getLoginResult()
    StorageService.setToken(JSON.stringify(credential))
    if (credential) {
      commit('SET_CURRENT_USER', credential)
    }
  },

  logout({ commit }) {
    commit('SET_CURRENT_USER', null)
  },
}

const getters: GetterTree<IAuthState, IAuthState> = {
  currentUser: (state) => state.currentUser,
}

const authModules: Module<IAuthState, IAuthState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

function getCurrentUser(): object | null {
  const currentUser = StorageService.getToken()
  return currentUser ? JSON.parse(currentUser) : null
}

export default authModules
