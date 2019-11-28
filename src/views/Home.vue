<template>
  <v-container>
    <v-app-bar app clipped-right color="blue-grey" dark>
      <v-app-bar-nav-icon @click.stop="toggleDawerFlag = !toggleDawerFlag" />
      <v-spacer />
      <v-toolbar-title>Working Task</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon @click.stop="toggleCreateTodoDialog">mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="toggleDawerFlag" width="165" app>
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

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row justify="center" align="center">
          <v-col class="shrink">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn icon large target="_blank" v-on="on">
                  <v-icon large>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>Source</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  large
                  href="https://codepen.io/johnjleider/pen/QewYYx"
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>mdi-codepen</v-icon>
                </v-btn>
              </template>
              <span>Codepen</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <todo-dialog
      v-model="showCreateTodoDialog"
      @close="toggleCreateTodoDialog"
      @save="saveCreateTodoDialog"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import TodoDialog from '@/components/TodoDialog.vue';
import { FirebaseService, StorageService } from '@/services';

@Component({
  components: {
    TodoDialog,
  },
})
export default class Home extends Vue {
  private toggleDawerFlag = null;
  private showCreateTodoDialog = true;
  private task = {};

  private toggleCreateTodoDialog(): void {
    this.showCreateTodoDialog = !this.showCreateTodoDialog;
  }

  private saveCreateTodoDialog(task: object): void {
    this.toggleCreateTodoDialog();
    this.task = Object.assign({}, task);
  }

  private async logout(): Promise<void> {
    FirebaseService.logout();
    StorageService.destroyToken();
    this.$store.dispatch('auth/logout');
  }
}
</script>

<style lang="scss" scoped>
.v-list-item {
  padding-left: 0px;
  margin-left: -16px;
}
</style>
