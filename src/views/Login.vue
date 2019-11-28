<template>
  <div class="login-container">
    <v-container class="login-form">
      <div class="text-center mb-8">
        <v-icon size="67.5">mdi-shield-account</v-icon>
      </div>
      <v-form>
        <v-text-field
          class="mb-3"
          type="email"
          placeholder="Enter your email"
          prepend-inner-icon="mdi-email-outline"
          solo
          hide-details
          v-model="email"
        ></v-text-field>
        <v-text-field
          class="mb-3"
          type="password"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-key-variant"
          solo
          hide-details
          v-model="password"
        ></v-text-field>
        <v-alert type="error" dismissible dense v-model="error.isShow">{{
          error.message
        }}</v-alert>
        <v-btn class="mb-4" color="secondary" tile large block @click="loginWithEmail">
          Login
        </v-btn>
        <!-- <v-btn class="mb-4" color="primary" tile large block @click="createAccount">
          Create account
        </v-btn> -->
      </v-form>
      <p class="text-center">Or</p>
      <v-btn
        class="mb-3"
        color="secondary"
        rounded
        outlined
        large
        block
        @click="loginWithGoogle"
      >
        Login with Google
      </v-btn>
      <v-btn color="secondary" rounded outlined large block @click="loginWithFacebook">
        Login with Facebook
      </v-btn>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { FirebaseService, StorageService } from '@/services';

@Component({})
export default class Login extends Vue {
  private email: string = '';
  private password: string = '';
  private error: { message: string; isShow: boolean } = {
    message: '',
    isShow: false,
  };

  private async loginWithEmail(): Promise<void> {
    try {
      const credential = await FirebaseService.loginWithEmail(this.email, this.password);
      StorageService.setToken(JSON.stringify(credential));
      this.$store.commit('auth/SET_CURRENT_USER', credential);
    } catch (error) {
      this.clearForm();
      this.showErrorAlert(error);
    }
  }

  private async createAccount(): Promise<void> {
    try {
      const credential = await FirebaseService.createAccount(this.email, this.password);
      StorageService.setToken(JSON.stringify(credential));
      this.$store.commit('auth/SET_CURRENT_USER', credential);
    } catch (error) {
      this.clearForm();
      this.showErrorAlert(error);
    }
  }

  private clearForm(): void {
    this.email = '';
    this.password = '';
  }

  private showErrorAlert(message: string): void {
    this.error.isShow = true;
    this.error.message = message;
  }

  private async loginWithGoogle(): Promise<void> {
    FirebaseService.loginWithGoogle();
  }

  private async loginWithFacebook(): Promise<void> {
    FirebaseService.loginWithFacebook();
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  position: relative;
}

.login-form {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -35%);
  width: 100%;
}
</style>
