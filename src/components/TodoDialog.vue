<template>
  <v-dialog v-model="value" persistent no-click-animation max-width="320px">
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
        <v-btn color="error" text @click="handleCancelClick">
          Cancel
        </v-btn>
        <v-btn color="primary" @click="handleSaveClick">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Todo, EnrichedTodo, TodoPriority } from '@/models'

@Component
export default class TodoDialog extends Vue {
  @Prop() private value!: boolean

  private toggleDatePickerFlag: boolean = false
  private todo: Todo = {
    name: '',
    priority: 'High',
    date: new Date().toISOString().substr(0, 10),
    description: '',
  }

  private handleSaveClick(): void {
    this.$emit('save', { ...this.todo })
    this.clearForm()
    this.closeDialog()
  }

  private handleCancelClick(): void {
    this.clearForm()
    this.closeDialog()
  }

  private closeDialog(): void {
    this.$emit('input', false)
  }

  private clearForm(): void {
    this.todo = {
      name: '',
      priority: 'High',
      date: new Date().toISOString().substr(0, 10),
      description: '',
    }
  }
}
</script>
