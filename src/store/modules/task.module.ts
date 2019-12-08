import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { ITaskState, Todo, TodoPriority, TodoPriorityType } from '@/models'
import { db } from '@/services'

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
}

const actions: ActionTree<ITaskState, ITaskState> = {
  setTodos({ commit }, todos: Todo[]) {
    commit('SET_TODOS', todos)
  },

  setTodo({ commit }, todo: Todo) {
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
