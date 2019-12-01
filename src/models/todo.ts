export interface Todo {
  name: string
  priority: TodoPriority | TodoPriorityType
  date: string
  description: string
}

export interface EnrichedTodo extends Todo {}

export type TodoPriorityType = 'High' | 'Medium' | 'Low'
export type TodoPriorityIconType = 'mdi-gauge-full' | 'mdi-gauge' | 'mdi-gauge-empty'
export type TodoPriorityIconColorType =
  | 'deep-orange darken-3'
  | 'amber darken-3'
  | 'light-blue lighten-1'

export class TodoPriority {
  private priority: TodoPriorityType

  constructor(priority: TodoPriorityType) {
    this.priority = priority
  }

  public toString(): string {
    return this.priority
  }

  public get icon(): TodoPriorityIconType {
    switch (this.priority) {
      case 'High':
        return 'mdi-gauge-full'
      case 'Medium':
        return 'mdi-gauge'
      default:
        return 'mdi-gauge-empty'
    }
  }

  public get iconColor(): TodoPriorityIconColorType {
    switch (this.priority) {
      case 'High':
        return 'deep-orange darken-3'
      case 'Medium':
        return 'amber darken-3'
      default:
        return 'light-blue lighten-1'
    }
  }
}
