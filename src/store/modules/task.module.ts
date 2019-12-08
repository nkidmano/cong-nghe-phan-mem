import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { ITaskState, Todo, EnrichedTodo, TodoPriority } from '@/models'
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
  getEnrichedTodos: (state: ITaskState): EnrichedTodo[] =>
    state.todos.map((todo: Todo) => enrichTodo(todo)),
}

const taskModule: Module<ITaskState, ITaskState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

function enrichTodo(todo: Todo): EnrichedTodo {
  const result = { ...todo } as EnrichedTodo
  return result
}

export default taskModule
