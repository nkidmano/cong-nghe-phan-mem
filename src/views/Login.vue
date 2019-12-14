<template>
  <div class="login-container">
    <v-container class="login-form">
      <div class="text-center mb-8">
        <v-icon size="67.5">mdi-shield-account</v-icon>
      </div>
      <v-form @submit.prevent="handleLoginClick">
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
        <v-btn class="mb-2" color="primary" type="submit" tile large block>
          Login
        </v-btn>
        <v-btn class="mb-2" color="secondary" block text x-small>
          Forgot password
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
        class="mb-3"
        color="secondary"
        rounded
        outlined
        large
        block
        @click="handleLoginWithFacebookClick"
      >
        Login with Facebook
      </v-btn>
      <v-divider class="mb-5"></v-divider>
      <v-btn class="mb-4" color="primary" tile large block @click="handleSignupClick">
        Create account
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
  private email: string = 'nobudy55@gmail.com'
  private password: string = '123456'
  private error: { message: string; isShow: boolean } = {
    message: '',
    isShow: false,
  }

  private async handleLoginClick(): Promise<void> {
    this.$store.dispatch('loader/toggleLoading')
    this.$store
      .dispatch('auth/loginWithEmail', {
        email: this.email,
        password: this.password,
      })
      .then(() => this.$store.dispatch('loader/toggleLoading'))
      .catch((error: string) => {
        this.clearForm()
        this.showErrorAlert(error)
        this.$store.dispatch('loader/toggleLoading')
      })
  }

  private async handleSignupClick(): Promise<void> {
    this.$store.dispatch('loader/toggleLoading')
    this.$store
      .dispatch('auth/register', {
        email: this.email,
        password: this.password,
      })
      .then(() => this.$store.dispatch('loader/toggleLoading'))
      .catch((error: string) => {
        this.clearForm()
        this.showErrorAlert(error)
        this.$store.dispatch('loader/toggleLoading')
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
