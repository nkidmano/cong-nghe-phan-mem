import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { ITaskState, Todo, EnrichedTodo, TodoPriority } from '@/models'

const mockTodos: Todo[] = [
  {
    name: 'Refactor UI to new design',
    priority: new TodoPriority('High'),
    date: new Date().toISOString().substr(0, 10),
    description: 'Refactor UI and modulize component in Home screen',
  },
  {
    name: 'Make function list',
    priority: new TodoPriority('Medium'),
    date: new Date().toISOString().substr(0, 10),
    description: 'Lists of main functionality of Chat App',
  },
  {
    name: 'Review code',
    priority: new TodoPriority('Low'),
    date: new Date().toISOString().substr(0, 10),
    description: 'Review features/LAM_0001 code',
  },
]

const state: ITaskState = {
  todos: [...mockTodos],
  watches: [],
  laters: [],
}

const mutations: MutationTree<ITaskState> = {
  SET_TODO(state: ITaskState, todo: Todo): void {
    state.todos = [...state.todos, todo]
  },
}

const actions: ActionTree<ITaskState, ITaskState> = {
  setTodo({ commit }, todo: Todo): void {
    commit('SET_TODO', todo)
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
