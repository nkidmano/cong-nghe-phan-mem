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
        <v-alert type="error" dismissible dense v-model="error.isShow">
          {{ error.message }}
        </v-alert>
        <v-btn class="mb-4" color="secondary" tile large block @click="handleLoginClick">
          Login
        </v-btn>
        <v-btn class="mb-4" color="primary" tile large block @click="handleSignupClick">
          Create account
        </v-btn>
      </v-form>
      <p class="text-center">Or</p>
      <v-btn
        class="mb-3"
        color="secondary"
        rounded
        outlined
        large
        block
        @click="handleLoginWithGoogleClick"
      >
        Login with Google
      </v-btn>
      <v-btn
        color="secondary"
        rounded
        outlined
        large
        block
        @click="handleLoginWithFacebookClick"
      >
        Login with Facebook
      </v-btn>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { FirebaseService, StorageService } from '@/services'

@Component
export default class Login extends Vue {
  private email: string = ''
  private password: string = ''
  private error: { message: string; isShow: boolean } = {
    message: '',
    isShow: false,
  }

  private async handleLoginClick(): Promise<void> {
    this.$store
      .dispatch('auth/loginWithEmail', {
        email: this.email,
        password: this.password,
      })
      .catch((error: string) => {
        this.clearForm()
        this.showErrorAlert(error)
      })
  }

  private async handleSignupClick(): Promise<void> {
    this.$store
      .dispatch('auth/createAccount', {
        email: this.email,
        password: this.password,
      })
      .catch((error: string) => {
        this.clearForm()
        this.showErrorAlert(error)
      })
  }

  private clearForm(): void {
    this.email = ''
    this.password = ''
  }

  private showErrorAlert(message: string): void {
    this.error.isShow = true
    this.error.message = message
  }

  private handleLoginWithGoogleClick(): void {
    FirebaseService.loginWithGoogle()
  }

  private handleLoginWithFacebookClick(): void {
    FirebaseService.loginWithFacebook()
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
