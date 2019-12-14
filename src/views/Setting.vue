<template>
  <v-container>
    <v-card class="mb-4">
      <v-card-title>Focus</v-card-title>
      <v-card-text>
        <v-text-field
          type="number"
          hint="minutes"
          label="Duration"
          hide-details
          outlined
          dense
        ></v-text-field>
        <v-switch label="Show notification on complete" hide-details></v-switch>
        <v-switch label="Play sound on complete" hide-details></v-switch>
      </v-card-text>
    </v-card>

    <v-card class="mb-4">
      <v-card-title>Short Break</v-card-title>
      <v-card-text>
        <v-text-field
          type="number"
          hint="minutes"
          label="Duration"
          hide-details
          outlined
          dense
        ></v-text-field>
        <v-switch label="Show notification on complete" hide-details></v-switch>
        <v-switch label="Play sound on complete" hide-details></v-switch>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>Long Break</v-card-title>
      <v-card-text>
        <v-select
          class="mb-2"
          :items="longBreakOptions"
          label="Take a long break on"
          dense
          outlined
          hide-details
        ></v-select>
        <v-text-field
          type="number"
          hint="minutes"
          label="Duration"
          hide-details
          outlined
          dense
        ></v-text-field>
        <v-switch label="Show notification on complete" hide-details></v-switch>
        <v-switch label="Play sound on complete" hide-details></v-switch>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Setting extends Vue {
  private longBreakOptions = [
    'Never',
    'Every 2nd break',
    'Every 3rd break',
    'Every 4th break',
    'Every 5th break',
  ]
}
</script>

<style lang="scss" scoped>
// TODO remove
.red-border {
  border: 1px dashed red;
}
</style>
