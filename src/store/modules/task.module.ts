import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { ITaskState, Todo, TodoPriority } from '@/models'
import { db } from '@/services'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

const state: ITaskState = {
  todos: [],
  watches: [],
  laters: [],
}

const mutations: MutationTree<ITaskState> = {
  // TODO refactor SET_TODOS and SET_TODO
  SET_TODOS(state: ITaskState, todos: Todo[]) {
    state.todos = todos
  },
  // TODO refactor SET_TODOS and SET_TODO
  SET_TODO(state: ITaskState, todo: Todo): void {
    state.todos.push(todo)
  },
  REMOVE_TODO(state: ITaskState, todo: Todo): void {
    state.todos = state.todos.filter((t) => t.name !== todo.name)
  },

  ...vuexfireMutations,
}

const actions: ActionTree<ITaskState, ITaskState> = {
  getTodos: async ({ commit }) => {
    const querySnapshot = await db.collection('todos').get()
    const todos = querySnapshot.docs.map((doc) => doc.data())
    commit('SET_TODOS', todos)
  },

  setTodo: async ({ commit }, todo: Todo) => {
    try {
      commit('SET_TODO', todo)
      db.collection('todos').add(todo)
    } catch (error) {
      commit('REMOVE_TODO', todo)
      return Promise.reject('Unexpected error, please try again later')
    }
  },
}

const getters: GetterTree<ITaskState, ITaskState> = {
  getTodos: (state: ITaskState): Todo[] => state.todos,
  getEnrichedTodos: (state: ITaskState) =>
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
