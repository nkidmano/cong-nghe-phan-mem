<template>
  <v-layout>
    <v-navigation-drawer v-model="toggleDrawerFlag" width="165" app>
      <v-layout align-center justify-space-between column fill-height>
        <v-list style="margin-top: 75px" dense>
          <v-list-item class="mb-5">
            <v-list-item-avatar>
              <v-img
                src="https://lh5.googleusercontent.com/-90yLBML9urw/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdAC9H5GdcrJeSnZWFNGYgIm5Ygrw/photo.jpg"
              ></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>List</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Statistics</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list style="margin-bottom: 60px" dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-layout>
    </v-navigation-drawer>
    <v-app-bar app extension-height="150" dark flat color="grey darken-2">
      <v-app-bar-nav-icon @click.stop="toggleDrawerFlag = !toggleDrawerFlag" />
      <v-spacer />
      <v-toolbar-title>Working Task</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon @click.stop="toggleCreateTodoDialog">mdi-plus</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-container class="pa-0">
          <v-row class="mb-1" no-gutters>
            <v-col class="display-3 font-weight-bold text-right" cols="5">09</v-col>
            <v-col class="display-3 font-weight-bold text-center" cols="2">:</v-col>
            <v-col class="display-3 font-weight-bold" cols="5">12</v-col>
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
        </v-container>
      </template>
    </v-app-bar>

    <v-tabs v-model="currentTab" height="56" fixed-tabs background-color="grey darken-3" dark>
      <v-tabs-slider></v-tabs-slider>
      <v-tab href="#tab-todo">
        <v-icon left>mdi-format-list-checks</v-icon>
        Todo
      </v-tab>
      <v-tab href="#tab-watch">
        <v-icon left>mdi-format-list-bulleted</v-icon>
        Watch
      </v-tab>
      <v-tab href="#tab-later">
        <v-icon left>mdi-playlist-edit</v-icon>
        Later
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="currentTab">
      <v-tab-item value="tab-todo">
        Todo List
      </v-tab-item>
      <v-tab-item value="tab-watch">
        Watch List
      </v-tab-item>
      <v-tab-item value="tab-later">
        Later List
      </v-tab-item>
    </v-tabs-items>

    <todo-dialog
      v-model="showCreateTodoDialog"
      @close="toggleCreateTodoDialog"
      @save="saveCreateTodoDialog"
    />
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import TodoDialog from '@/components/TodoDialog.vue'
import { FirebaseService, StorageService } from '@/services'

@Component({
  components: {
    TodoDialog,
  },
})
export default class Home extends Vue {
  private toggleDrawerFlag: boolean = false
  private showCreateTodoDialog: boolean = false
  private task = {}
  private currentTab = 'tab-todo'

  private toggleCreateTodoDialog(): void {
    this.showCreateTodoDialog = !this.showCreateTodoDialog
  }

  private saveCreateTodoDialog(task: object): void {
    this.toggleCreateTodoDialog()
    this.task = Object.assign({}, task)
  }

  private async logout(): Promise<void> {
    FirebaseService.logout()
    StorageService.destroyToken()
    this.$store.dispatch('auth/logout')
  }
}
</script>

<style lang="scss" scoped>
.v-list-item {
  padding-left: 0px;
  margin-left: -16px;
}

.time--text {
  font-size: 1.4rem !important;
}
</style>
