import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'

interface ILoaderState {
  loading: boolean
}

const state: ILoaderState = {
  loading: false,
}

const mutations: MutationTree<ILoaderState> = {
  TOGGLE_LOADING(state) {
    state.loading = !state.loading
  },
}

const actions: ActionTree<ILoaderState, ILoaderState> = {
  toggleLoading({ commit }) {
    commit('TOGGLE_LOADING')
  },
}

const getters: GetterTree<ILoaderState, ILoaderState> = {
  loading: (state) => state.loading,
}

const loaderModule: Module<ILoaderState, ILoaderState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

export default loaderModule
