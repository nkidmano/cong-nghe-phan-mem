export interface Todo {
  name: string
  priority: TodoPriorityType
  date: string
  description: string
}

export enum TodoPriorityType {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export enum TodoPriorityIconType {
  High = 'mdi-gauge-full',
  Medium = 'mdi-gauge',
  Low = 'mdi-gauge-empty',
}

export enum TodoPriorityIconColorType {
  High = 'deep-orange darken-3',
  Medium = 'amber darken-3',
  Low = 'light-blue lighten-1',
}

export class TodoPriority {
  public readonly type: TodoPriorityType
  public readonly icon: TodoPriorityIconType
  public readonly iconColor: TodoPriorityIconColorType

  constructor(priority: TodoPriorityType) {
    this.type = priority
    this.icon = TodoPriorityIconType[priority]
    this.iconColor = TodoPriorityIconColorType[priority]
  }
}
