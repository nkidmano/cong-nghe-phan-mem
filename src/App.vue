<template>
  <v-app>
    <base-header />
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

import BaseHeader from '@/components/BaseHeader.vue'
import { StorageService, FirebaseService } from '@/services'

@Component({
  components: {
    BaseHeader,
  },
})
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
