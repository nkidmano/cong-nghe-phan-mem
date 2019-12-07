<template>
  <v-app>
    <base-header v-if="loggedIn" />
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
  @Getter('auth/loggedIn')
  private loggedIn!: object | null

  @Watch('loggedIn')
  private validateAuthState(loggedIn: any): void {
    if (!loggedIn) {
      this.$router.push({ name: 'login' })
    } else {
      this.$router.push({ name: 'home' })
    }
  }

  created() {
    this.$store.dispatch('auth/init')
  }
}
</script>
