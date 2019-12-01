export interface Todo {
  name: string
  priority: 'High' | 'Medium' | 'Low'
  date: string
  description: string
}

export interface EnrichedTodo extends Todo {
  priorityIcon: PriorityIcon
  priorityIconColor: PriorityIconColor
}

export type PriorityIcon = 'mdi-gauge-full' | 'mdi-gauge' | 'mdi-gauge-empty'

export type PriorityIconColor =
  | 'deep-orange darken-3'
  | 'amber darken-3'
  | 'light-blue lighten-1'
