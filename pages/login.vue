<template>
  <div class="auth login">
    <v-card class="card">
      <v-card-title class="card__title">
        <h1 class="card__title__content">Sign in</h1>
      </v-card-title>
      <v-layout text-xs-center class="auth-link">
        <v-flex md6>
          <div class="auth-link__text">New here?</div>
        </v-flex>
        <v-flex md6 class="auth-link__to">
          <router-link :to="{ name: 'register' }">
            <img
              class="auth-link__icon"
              src="~/assets/icons/arrow-right-circle-black.svg"
            />
            <div class="auth-link__label">Register</div>
          </router-link>
        </v-flex>
      </v-layout>
      <v-card-text class="form">
        <v-form ref="form">
          <GoogleButton label="Sign in with Google" />
          <v-text-field
            v-model="email"
            label="E-mail"
            :rules="[rules.required, rules.email]"
            outlined
          />
          <PasswordField
            v-model="password"
            label="Password"
            :validation-rules="[rules.required]"
            outlined
          />
          <v-btn depressed color="primary" @click="login">Sign in</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import validation from "~/mixins/validation";
import utils from "~/mixins/utils";
import PasswordField from "~/components/ui/fields/PasswordField";
import GoogleButton from "~/components/ui/buttons/GoogleButton";
export default {
  name: "Login",
  components: {
    PasswordField,
    GoogleButton,
  },
  mixins: [validation, utils],
  data() {
    return {
      email: null,
      password: null,
      toast: [],
    };
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        try {
          await this.$auth.loginWith("local", {
            data: { email: this.email, password: this.password },
          });
          await this.$router.push(this.getPageAfterLogin());
          this.toast = document.getElementsByClassName("toasted");
          if (this.toast.length) this.toast[0].remove();
        } catch (err) {
          this.toast = document.getElementsByClassName("toasted");
          if (!this.toast.length) {
            this.$toast.error(this.$t("bad_email_or_password"));
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/auth";
</style>
