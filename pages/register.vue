<template>
  <div class="auth register">
    <v-card class="card register">
      <v-card-title class="card__title">
        <h1 class="card__title__content">Register</h1>
      </v-card-title>
      <v-layout text-xs-center class="auth-link">
        <v-flex md7>
          <div class="auth-link__text">Already have an account?</div>
        </v-flex>
        <v-flex md5 class="auth-link__to">
          <router-link :to="{ name: 'login' }">
            <img
              class="auth-link__icon"
              src="~/assets/icons/arrow-right-circle-black.svg"
            />
            <div class="auth-link__label">Sign in</div>
          </router-link>
        </v-flex>
      </v-layout>
      <v-card-text class="form">
        <v-form ref="form">
          <GoogleButton label="Register with Google" />
          <v-text-field
            v-model="email"
            label="E-mail"
            :rules="[rules.required, rules.email]"
            outlined
          />
          <v-text-field
            v-model="full_name"
            label="Full name"
            :rules="[rules.required, rules.min_2, rules.max_32]"
            outlined
          />
          <PasswordField
            v-model="password"
            label="Password"
            :validation-rules="[rules.required]"
            outlined
          />
          <PasswordField
            v-model="repeatPassword"
            label="Re-type password"
            :validation-rules="[rules.required, rules.passwordMatch]"
            outlined
          />
          <v-btn depressed color="primary" @click="register">Register</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import validation from "~/mixins/validation";
import PasswordField from "~/components/ui/fields/PasswordField";
import GoogleButton from "~/components/ui/buttons/GoogleButton";

export default {
  name: "Register",
  auth: false,
  components: {
    PasswordField,
    GoogleButton,
  },
  mixins: [validation],
  data() {
    return {
      full_name: "",
      email: "",
      password: "",
      repeatPassword: "",
    };
  },
  methods: {
    async register() {
      if (this.$refs.form.validate()) {
        const payload = {
          full_name: this.full_name,
          email: this.email,
          password: this.password,
        };
        await this.$store.dispatch("register", payload);
        this.$toast.success(this.$t("registration_success"));
        await this.$router.push("/verify-email-send");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/auth";
</style>
