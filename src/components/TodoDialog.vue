<template>
  <v-dialog v-bind="$attrs" persistent no-click-animation max-width="320px">
    <v-card>
      <v-card-title>
        <span class="headline">Create new todo</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field label="Task name" v-model="todo.name"></v-text-field>
          <v-textarea
            label="Description"
            rows="1"
            auto-grow
            v-model="todo.description"
          ></v-textarea>
          <v-select
            v-model="todo.priority"
            :items="['High', 'Medium', 'Low']"
            label="Priority"
            single-line
          ></v-select>
          <v-dialog
            ref="dialog"
            v-model="toggleDatePickerFlag"
            :return-value.sync="todo.date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="todo.date"
                label="Reminder"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="todo.date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="toggleDatePickerFlag = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(todo.date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop, Watch } from 'vue-property-decorator'
import { Todo, EnrichedTodo, TodoPriority } from '@/models'

@Component
export default class TodoDialog extends Vue {
  private toggleDatePickerFlag: boolean = false
  private todo: Todo = {
    name: 'Refactor code for new design',
    priority: 'High',
    date: new Date().toISOString().substr(0, 10),
    description: 'Refactor code and modulize component in Home screen',
  }

  @Watch('$attrs.value')
  private onToggleDialog(show: boolean): void {
    if (!show) this.clearForm()
  }

  @Emit()
  private close(): void {
    return
  }

  @Emit()
  private save(): void {
    this.$store.dispatch('task/setTodo', { ...this.todo })
  }

  private clearForm(): void {
    this.todo = {
      name: '',
      priority: new TodoPriority('High'),
      date: new Date().toISOString().substr(0, 10),
      description: '',
    }
  }
}
</script>
