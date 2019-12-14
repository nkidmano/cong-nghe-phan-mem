import { FirebaseService, StorageService } from '@/services'
import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'

interface IAuthState {
  currentUser: object | null
}

const state: IAuthState = {
  currentUser: getCurrentUserSavedState(),
}

type UserCredential = {
  additionalUserInfo: firebase.auth.AdditionalUserInfo
  credential: firebase.auth.AuthCredential
  user: firebase.User
}

const mutations: MutationTree<IAuthState> = {
  SET_CURRENT_USER(state, value) {
    state.currentUser = value
    StorageService.setCurrentUser(JSON.stringify(value))
  },
}

const actions: ActionTree<IAuthState, IAuthState> = {
  async init({ commit }) {
    const credential = await FirebaseService.getLoginResult()
    if (credential) {
      const profile = await createUserProfile(credential)
      commit('SET_CURRENT_USER', profile)
    }
  },

  async login({ commit }, { email, password }) {
    const credential = await FirebaseService.login(email, password)
    const profile = await createUserProfile(credential)
    commit('SET_CURRENT_USER', profile)
  },

  async register({ commit }, { email, password }) {
    const credential = await FirebaseService.register(email, password)
    const profile = await createUserProfile(credential)
    commit('SET_CURRENT_USER', profile)
  },

  logout({ commit }) {
    FirebaseService.logout()
    commit('SET_CURRENT_USER', null)
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

async function createUserProfile({ user, additionalUserInfo }: any): Promise<object> {
  if (!user.emailVerified) user.sendEmailVerification()
  const idToken = await user.getIdToken()
  const profile = {
    name: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    provderId: additionalUserInfo.providerId,
    idToken: idToken,
  }
  return profile
}

function getCurrentUserSavedState(): object | null {
  try {
    const currentUser = StorageService.getCurrentUser()
    return currentUser ? JSON.parse(currentUser) : null
  } catch (error) {
    StorageService.removeCurrentUser()
    return null
  }
}

export default authModule
