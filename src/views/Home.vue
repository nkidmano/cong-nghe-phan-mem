<template>
  <v-container class="pa-0">
    <v-tabs v-model="currentTab" height="56" fixed-tabs background-color="grey darken-3" dark>
      <v-tabs-slider></v-tabs-slider>
      <v-tab href="#tab-todo">
        <v-icon left>mdi-format-list-checks</v-icon>
        Todo
      </v-tab>
      <v-tab href="#tab-watch">
        <v-icon left>mdi-format-list-bulleted</v-icon>
        Watch
      </v-tab>
      <v-tab href="#tab-later">
        <v-icon left>mdi-playlist-edit</v-icon>
        Later
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="currentTab">
      <v-tab-item value="tab-todo">
        <template v-for="(todo, i) in todos">
          <v-btn :key="i" class="justify-start text-none" block x-large tile>
            <v-icon class="mr-5" :color="todo.priority.iconColor" left large>
              {{ todo.priority.icon }}
            </v-icon>
            <span>{{ todo.name }}</span>
          </v-btn>
          <v-divider :key="`v-divider-${i}`"></v-divider>
        </template>
      </v-tab-item>

      <v-tab-item value="tab-watch">
        Watch List
      </v-tab-item>
      <v-tab-item value="tab-later">
        Later List
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Todo, EnrichedTodo } from '@/models'
import { Getter } from 'vuex-class'

@Component
export default class Home extends Vue {
  @Getter('task/getTodos')
  private todos!: Todo[]

  private currentTab = 'tab-todo'
}
</script>

<style lang="scss" scoped></style>
