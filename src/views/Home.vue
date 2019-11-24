<template>
  <v-container>
    <h1>this is home page</h1>

    <v-btn color="secondary" tile @click="logout">Log out</v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { FirebaseService, StorageService } from '../services';

@Component({})
export default class Home extends Vue {
  private async logout(): Promise<void> {
    FirebaseService.logout();
    StorageService.destroyToken();
    this.$store.dispatch('auth/logout');
  }
}
</script>

<style lang="scss" module></style>
