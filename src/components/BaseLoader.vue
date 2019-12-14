<template>
  <v-dialog v-if="loading" v-model="loading" fullscreen>
    <v-container fluid fill-height style="background-color: rgba(255, 255, 255, 0.75);">
      <v-layout justify-center align-center>
        <v-progress-linear color="primary" indeterminate absolute top></v-progress-linear>
      </v-layout>
    </v-container>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter } from 'vuex-class'

@Component
export default class BaseLoader extends Vue {
  @Getter('loader/loading')
  private loading!: boolean
}
</script>

<style lang="scss" scoped></style>
