import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { ITaskState, Todo, EnrichedTodo, PriorityIcon, PriorityIconColor } from '@/models'

const mockTodos: Todo[] = [
  {
    name: 'Refactor UI to new design',
    priority: 'High',
    date: new Date().toISOString().substr(0, 10),
    description: 'Refactor UI and modulize component in Home screen',
  },
  {
    name: 'Make function list',
    priority: 'Medium',
    date: new Date().toISOString().substr(0, 10),
    description: 'Lists of main functionality of Chat App',
  },
  {
    name: 'Review code',
    priority: 'Low',
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
  result.priorityIcon = filterPriorityIcon(result)
  result.priorityIconColor = filterPriorityIconColor(result)
  return result
}

function filterPriorityIcon(todo: Todo): PriorityIcon {
  switch (todo.priority) {
    case 'High':
      return 'mdi-gauge-full'
    case 'Medium':
      return 'mdi-gauge'
    case 'Low':
      return 'mdi-gauge-empty'
    default:
      throw new Error('Unknown todo priority type')
  }
}

function filterPriorityIconColor(todo: Todo): PriorityIconColor {
  switch (todo.priority) {
    case 'High':
      return 'deep-orange darken-3'
    case 'Medium':
      return 'amber darken-3'
    case 'Low':
      return 'light-blue lighten-1'
    default:
      throw new Error('Unknown todo priority type')
  }
}

export default taskModule
