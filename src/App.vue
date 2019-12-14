<template>
  <v-app>
    <base-header v-if="loggedIn"></base-header>
    <v-content>
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
    <base-loader></base-loader>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import BaseHeader from '@/components/BaseHeader.vue'
import BaseLoader from '@/components/BaseLoader.vue'

@Component({
  components: {
    BaseHeader,
    BaseLoader,
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
    this.toggleLoading()
    this.$store
      .dispatch('auth/init')
      .then(this.toggleLoading)
      .catch(this.toggleLoading)
  }

  private toggleLoading(): void {
    this.$store.dispatch('loader/toggleLoading')
  }
}
</script>
