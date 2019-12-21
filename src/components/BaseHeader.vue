<template>
  <v-container class="pa-0">
    <v-app-bar v-if="loggedIn" app extension-height="150" dark flat color="grey darken-2">
      <v-app-bar-nav-icon @click.stop="showDrawer = !showDrawer" />
      <v-spacer />
      <v-toolbar-title>{{ $route.meta.viewName }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon @click.stop="showCreateTodoDialog = true">mdi-plus</v-icon>
      </v-btn>

      <template v-if="showTimer" v-slot:extension>
        <v-container class="pa-0">
          <template v-if="timer.isPlaying">
            <v-row class="mb-1" no-gutters @click="handleStopClick">
              <v-col class="display-3 font-weight-bold text-right" cols="5">
                {{ timer.time | minute }}
              </v-col>
              <v-col class="display-3 font-weight-bold text-center" cols="2">:</v-col>
              <v-col class="display-3 font-weight-bold" cols="5">
                {{ timer.time | second }}
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col class="time--text subtitle-1 font-weight-thin text-right" cols="5">
                <span class="mr-1">Mins</span>
              </v-col>
              <v-col cols="2">&nbsp;</v-col>
              <v-col class="time--text subtitle-1 font-weight-thin" cols="5">
                <span class="ml-4">Secs</span>
              </v-col>
            </v-row>
          </template>
          <v-row class="justify-center" v-else>
            <v-btn @click="handlePlayClick" icon>
              <v-icon size="100">mdi-play-circle-outline</v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="showDrawer" width="165" app>
      <v-layout align-center justify-space-between column fill-height>
        <v-list style="margin-top: 75px" dense>
          <v-list-item class="mb-5">
            <v-list-item-avatar color="blue">
              <span class="white--text">CJ</span>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-action>
                <v-btn class="text-none" @click="$router.push({ name: 'home' })" text>
                  Home
                </v-btn>
              </v-list-item-action>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>History</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Statistics</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-action>
                <v-btn class="text-none" @click="$router.push({ name: 'setting' })" text>
                  Setting
                </v-btn>
              </v-list-item-action>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list style="margin-bottom: 60px" dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-action>
                <v-btn class="text-none" @click="logout" text>
                  Logout
                </v-btn>
              </v-list-item-action>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-layout>
    </v-navigation-drawer>

    <todo-dialog v-model="showCreateTodoDialog" @save="handleSaveClick" />

    <v-snackbar
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      top
    >
      {{ snackbar.message }}
      <v-btn text @click="snackbar.show = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { format } from 'date-fns'

import TodoDialog from './TodoDialog.vue'
import { Todo } from '@/models'
import { Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Getter, Action } from 'vuex-class'

@Component({
  components: {
    TodoDialog,
  },
})
export default class BaseHeader extends Vue {
  @Getter('auth/loggedIn')
  private loggedIn!: boolean

  private showTimer: boolean = false
  private showDrawer: boolean = false
  private showCreateTodoDialog: boolean = false
  private timer = {
    time: 1500000,
    interval: 0,
    isPlaying: false,
  }
  private snackbar: { show: boolean; timeout: number; color: string; message: string } = {
    show: false,
    timeout: 3000,
    color: '',
    message: '',
  }

  @Action('auth/logout')
  private logout!: () => Promise<void>

  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route): void {
    if (route.name !== 'home') {
      this.showTimer = false
    } else {
      this.showTimer = true
    }
  }

  @Watch('timer')
  private onTimerChange(ms: number): void {
    if (ms === 0) {
      clearInterval(this.timer.interval)
    }
  }

  private handlePlayClick(): void {
    this.startCountdown()
  }

  private startCountdown(): void {
    this.timer.isPlaying = true
    this.timer.interval = setInterval(() => {
      this.timer.time -= 1000
    }, 1000)
  }

  private handleStopClick(): void {
    this.stopCountDown()
  }

  private stopCountDown(): void {
    this.timer.isPlaying = false
    clearInterval(this.timer.interval)
  }

  private resetCountDown(): void {
    this.timer.time = 1500000
  }

  private async handleSaveClick(todo: Todo): Promise<void> {
    this.addTodo(todo)
  }

  private async addTodo(todo: Todo): Promise<void> {
    try {
      await this.$store.dispatch('task/addTodo', { ...todo })
      this.showSnackbar('success', 'Yay, new thing todo !!!')
    } catch (error) {
      this.showSnackbar('error', error)
    }
  }

  private showSnackbar(type: string, message: string): void {
    this.snackbar.show = true
    this.snackbar.color = type
    this.snackbar.message = message
  }
}
</script>

<style lang="scss" scoped>
.time--text {
  font-size: 1.4rem !important;
}
</style>
