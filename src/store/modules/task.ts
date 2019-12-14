import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { firestoreAction } from 'vuexfire'

import { ITaskState, Todo, TodoPriority } from '@/models'
import { FirestoreService } from '@/services'

const state: ITaskState = {
  todos: [],
  watches: [],
  laters: [],
}

const mutations: MutationTree<ITaskState> = {
  SET_TODO(state: ITaskState, todos: Todo[]) {
    state.todos = todos
  },
  ADD_TODO(state: ITaskState, todo: Todo) {
    state.todos.push(todo)
  },
  REMOVE_TODO(state: ITaskState, todo: Todo) {
    state.todos = state.todos.filter((_todo) => _todo.name !== todo.name)
  },
}

const actions: ActionTree<ITaskState, ITaskState> = {
  async getTodos({ commit }) {
    try {
      const querySnapshot = await FirestoreService.getTodoCollection().get()
      const todos = querySnapshot.docs.map((doc) => doc.data())
      commit('SET_TODO', todos)
      return todos
    } catch (error) {
      return Promise.reject('Unexpected error')
    }
  },

  async addTodo({ commit }, todo: Todo) {
    try {
      commit('ADD_TODO', todo)
      FirestoreService.addTodo(todo)
    } catch (error) {
      commit('REMOVE_TODO', todo)
      return Promise.reject(error)
    }
  },
}

const getters: GetterTree<ITaskState, ITaskState> = {
  todos: (state: ITaskState): Todo[] => state.todos,
  enrichedTodos: (state: ITaskState) =>
    state.todos.map((todo) => ({ ...todo, priority: new TodoPriority(todo.priority) })),
}

const taskModule: Module<ITaskState, ITaskState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

export default taskModule
