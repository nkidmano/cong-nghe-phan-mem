import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'

interface ISettingState {
  focus: {
    duration: number
    sendNotification: boolean
    playSound: boolean
  }

  shortBreak: {
    duration: number
    sendNotification: boolean
    playSound: boolean
  }

  longBreak: {
    option: string
    duration: number
    sendNotification: boolean
    playSound: boolean
  }
}

const state: ISettingState = {
  focus: {
    duration: 25,
    sendNotification: true,
    playSound: true,
  },
  shortBreak: {
    duration: 5,
    sendNotification: true,
    playSound: true,
  },
  longBreak: {
    duration: 10,
    option: 'Every 2nd break',
    sendNotification: true,
    playSound: true,
  },
}

const mutations: MutationTree<ISettingState> = {
  SET_FOCUS(state, focus) {
    state.focus = focus
  },
  SET_SHORT_BREAK(state, shortBreak) {
    state.shortBreak = shortBreak
  },
  SET_LONG_BREAK(state, longBreak) {
    state.longBreak = longBreak
  },
}

const actions: ActionTree<ISettingState, ISettingState> = {
  updateFocusSetting({ commit }, focusSetting) {
    commit('SET_FOCUS', focusSetting)
  },
  updateShortBreakSetting({ commit }, shortBreak) {
    commit('SET_FOCUS', shortBreak)
  },
  updateLongBreakSetting({ commit }, longBreak) {
    commit('SET_FOCUS', longBreak)
  },
}

const getters: GetterTree<ISettingState, ISettingState> = {
  focusSetting: (state) => state.focus,
  shortBreakSetting: (state) => state.shortBreak,
  longBreakSetting: (state) => state.longBreak,
}

const settingModule: Module<ISettingState, ISettingState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

export default settingModule
