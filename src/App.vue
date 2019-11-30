<template>
  <v-app>
    <!-- <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->
    <v-content>
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import { StorageService, FirebaseService } from '@/services'

@Component({})
export default class App extends Vue {
  @Getter('auth/currentUser')
  private currentUser!: object | null

  @Watch('currentUser')
  private onCurrentUserChange(currentUser: any): void {
    if (!currentUser) {
      this.$router.push({ name: 'login' })
      return
    }

    this.$router.push({ name: 'home' })
  }

  created() {
    this.$store.dispatch('auth/init')
  }
}
</script>
