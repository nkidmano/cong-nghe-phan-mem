<template>
  <v-dialog v-bind="$attrs" persistent max-width="320px">
    <v-card>
      <v-card-title>
        <span class="headline">Create new todo</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field label="Task name" v-model="task.name"></v-text-field>
          <v-textarea
            label="Description"
            rows="1"
            auto-grow
            v-model="task.description"
          ></v-textarea>
          <v-select
            v-model="task.priority"
            :items="['High', 'Medium', 'Low']"
            label="Priority"
          ></v-select>
          <v-dialog
            ref="dialog"
            v-model="toggleDatePickerFlag"
            :return-value.sync="task.date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="task.date"
                label="Reminder"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="task.date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="toggleDatePickerFlag = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(task.date)">
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
import { Vue, Component, Emit, Prop } from 'vue-property-decorator';

@Component
export default class TodoDialog extends Vue {
  private toggleDatePickerFlag: boolean = false;
  private task: TodoItem = {
    name: '',
    priority: 'High',
    date: new Date().toISOString().substr(0, 10),
    description: '',
  };

  private toggleFlag = {
    todoDatePicker: false,
  };

  mounted() {
    console.log(this.$attrs);
  }

  @Emit()
  close() {
    return false;
  }

  @Emit()
  save() {
    return this.task;
  }
}

interface TodoItem {
  name: string;
  priority: string;
  date: string;
  description: string;
}
</script>