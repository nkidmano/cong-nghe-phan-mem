<template>
  <v-container>
    <p class="title">Focus</p>
    <v-divider></v-divider>

    <div class="duration-option mb-2">
      <span>Duration:</span>
      <input class="red-border" type="number" />
      <span>minutes</span>
    </div>

    <div class="complete-option mb-2">
      <span>When complete:</span>
      <div class="option-box">
        <label class="ml-6" for="notification">
          <input class="red-border" id="notification" type="checkbox" />
          Show notification
        </label>
        <label for="sound" class="ml-6">
          <input class="red-border" id="sound" type="checkbox" />
          Play sound
        </label>
      </div>
    </div>

    <p class="title">Short Break</p>
    <v-divider></v-divider>

    <div class="duration-option mb-2">
      <span>Duration:</span>
      <input class="red-border" type="number" />
      <span>minutes</span>
    </div>

    <div class="complete-option mb-2">
      <span>When complete:</span>
      <div class="option-box">
        <label class="ml-6" for="notification">
          <input id="notification" type="checkbox" />
          Show notification
        </label>
        <label for="sound" class="ml-6">
          <input id="sound" type="checkbox" />
          Play sound
        </label>
      </div>
    </div>

    <p class="title">Long Break</p>
    <v-divider></v-divider>

    <div class="duration-option mb-2">
      <span>Take a long break:</span>
      <select class="red-border" name="long-break" id="">
        <option value="0">never</option>
        <option value="2">every 2nd break</option>
        <option value="3">every 3rd break</option>
        <option value="4">every 4th break</option>
        <option value="5">every 5th break</option>
      </select>
    </div>

    <div class="complete-option mb-2">
      <span>When complete:</span>
      <div class="option-box">
        <label class="ml-6" for="notification">
          <input id="notification" type="checkbox" />
          Show notification
        </label>
        <label for="sound" class="ml-6">
          <input id="sound" type="checkbox" />
          Play sound
        </label>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Setting extends Vue {}
</script>

<style lang="scss" scoped>
// TODO remove
.red-border {
  border: 1px dashed red;
}
</style>
