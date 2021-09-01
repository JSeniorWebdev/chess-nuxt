<template>
  <div class="google-button" @click="loginWithGoogle">
    <div class="button-container">
      <img src="~/assets/icons/google-logo.svg" class="icon" alt="" />
      <div class="label">{{ label }}</div>
    </div>
  </div>
</template>

<script>
import utils from "~/mixins/utils";

export default {
  name: "GoogleButton",
  mixins: [utils],
  props: {
    label: {
      type: String,
      required: true,
      default: "",
    },
  },
  methods: {
    async loginWithGoogle() {
      try {
        const user = await this.$gAuth.signIn();
        const token = user.getAuthResponse().access_token;
        const response = await this.$store.dispatch("oauthGoogleLogin", token);
        await this.$auth.setUserToken(response.token);
        await this.$router.push(this.getPageAfterLogin());
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t("google_oauth_error"));
      }
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/components/ui/buttons/google-button";
</style>
