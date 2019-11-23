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
        ></v-text-field>
        <v-text-field
          class="mb-3"
          type="password"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-key-variant"
          solo
          hide-details
        ></v-text-field>
        <v-btn class="mb-4" color="secondary" tile large block>
          Login
        </v-btn>
      </v-form>
      <p class="text-center">Or</p>
      <v-btn class="mb-3" color="secondary" rounded outlined large block>
        Login with Google
      </v-btn>
      <v-btn color="secondary" rounded large outlined block>
        Login with Facebook
      </v-btn>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Login extends Vue {}
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
