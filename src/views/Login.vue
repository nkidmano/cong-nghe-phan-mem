<template>
  <div :class="$style.relative">
    <v-container :class="$style.verticalCenter">
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
import { FirebaseService } from '../services';

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
      this.$store.commit('auth/SET_USER', credential);
    } catch (error) {
      this.email = '';
      this.password = '';
      this.error.message = error;
      this.error.isShow = true;
    }
  }

  private async loginWithGoogle(): Promise<void> {
    FirebaseService.loginWithGoogle();
  }

  private async loginWithFacebook(): Promise<void> {
    FirebaseService.loginWithFacebook();
  }
}
</script>

<style lang="scss" module>
.relative {
  height: 100vh;
  position: relative;
}

.verticalCenter {
  position: absolute;
  top: 35%;
  left: 0;
  transform: translate(0, -35%);
  width: 100%;
}
</style>
