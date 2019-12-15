<template>
  <v-container>
    <v-card class="mb-4">
      <v-card-title>Focus</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="focus.duration"
          type="number"
          hint="minutes"
          label="Duration"
          hide-details
          outlined
          dense
        ></v-text-field>
        <v-switch
          v-model="focus.sendNotification"
          label="Show notification on complete"
          hide-details
        ></v-switch>
        <v-switch
          v-model="focus.playSound"
          label="Play sound on complete"
          hide-details
        ></v-switch>
      </v-card-text>
    </v-card>

    <v-card class="mb-4">
      <v-card-title>Short Break</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="shortBreak.duration"
          type="number"
          hint="minutes"
          label="Duration"
          hide-details
          outlined
          dense
        ></v-text-field>
        <v-switch
          v-model="shortBreak.sendNotification"
          label="Show notification on complete"
          hide-details
        ></v-switch>
        <v-switch
          v-model="shortBreak.playSound"
          label="Play sound on complete"
          hide-details
        ></v-switch>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>Long Break</v-card-title>
      <v-card-text>
        <v-select
          class="mb-2"
          v-model="longBreak.option"
          :items="longBreakOptions"
          label="Take a long break on"
          dense
          outlined
          hide-details
        ></v-select>
        <v-text-field
          v-model="longBreak.duration"
          :disabled="longBreak.option === 'Never'"
          type="number"
          hint="minutes"
          label="Duration"
          hide-details
          outlined
          dense
        ></v-text-field>
        <v-switch
          v-model="shortBreak.sendNotification"
          label="Show notification on complete"
          hide-details
        ></v-switch>
        <v-switch
          v-model="shortBreak.playSound"
          label="Play sound on complete"
          hide-details
        ></v-switch>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Setting extends Vue {
  private focus: object = {
    duration: 25,
    sendNotification: true,
    playSound: true,
  }

  private shortBreak: object = {
    duration: 5,
    sendNotification: true,
    playSound: true,
  }

  private longBreak: object = {
    duration: 10,
    option: 'Every 2nd break',
    sendNotification: true,
    playSound: true,
  }

  private longBreakOptions: string[] = [
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
