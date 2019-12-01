import { Todo } from './todo'

export interface ITaskState {
  todos: Todo[]
  watches: []
  laters: []
}
