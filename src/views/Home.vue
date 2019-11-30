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
        <v-btn class="justify-start text-none" block x-large tile>
          <v-icon class="mr-5" color="deep-orange darken-3" left large>mdi-gauge-full</v-icon>
          <span>Refactor UI to new design</span>
        </v-btn>
        <v-divider></v-divider>

        <v-btn class="justify-start text-none" block x-large tile>
          <v-icon class="mr-5" color="amber darken-3" left large>mdi-gauge</v-icon>
          <span>Make function list</span>
        </v-btn>
        <v-divider></v-divider>

        <v-btn class="justify-start text-none" block x-large tile>
          <v-icon class="mr-5" color="light-blue lighten-1" left large>mdi-gauge-empty</v-icon>
          <span>Review code and write list of ...</span>
        </v-btn>
        <v-divider></v-divider>
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

@Component
export default class Home extends Vue {
  private currentTab = 'tab-todo'
}
</script>

<style lang="scss" scoped></style>
