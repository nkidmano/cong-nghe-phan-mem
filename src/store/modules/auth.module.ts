import { FirebaseService, StorageService } from '@/services'
import { GetterTree, MutationTree, ActionTree, ModuleTree, StoreOptions, Module } from 'vuex'

interface IAuthState {
  currentUser: object | null
}

const state: IAuthState = {
  currentUser: getCurrentUser(),
}

const mutations: MutationTree<IAuthState> = {
  SET_CURRENT_USER(state, value) {
    state.currentUser = value
    StorageService.setCurrentUser(JSON.stringify(value))
  },
  REMOVE_CURRENT_USER(state, value) {
    state.currentUser = null
    StorageService.removeCurrentUser()
  },
}

const actions: ActionTree<IAuthState, IAuthState> = {
  async init({ commit, state }): Promise<void> {
    FirebaseService.onAuthStateChanged()
    await FirebaseService.getLoginResult()
  },

  async loginWithEmail({ commit }, { email, password }): Promise<void> {
    const user = await FirebaseService.loginWithEmail(email, password)
    commit('SET_CURRENT_USER', user)
  },

  async createAccount({ commit }, { email, password }): Promise<void> {
    const user = await FirebaseService.createAccount(email, password)
    commit('SET_CURRENT_USER', user)
  },

  async logout({ commit }): Promise<void> {
    await FirebaseService.logout()
    commit('REMOVE_CURRENT_USER', null)
  },
}

const getters: GetterTree<IAuthState, IAuthState> = {
  loggedIn: (state) => !!state.currentUser,
  currentUser: (state) => state.currentUser,
}

const authModule: Module<IAuthState, IAuthState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

function getCurrentUser(): object | null {
  const currentUser = StorageService.getCurrentUser()
  return currentUser ? JSON.parse(currentUser) : null
}

export default authModule
