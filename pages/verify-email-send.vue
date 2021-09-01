<template>
  <div class="auth verify-email">
    <v-card class="card">
      <v-card-title class="card__title">
        <h1 class="card__title__content verify-email">Verify email</h1>
      </v-card-title>
      <v-card-text class="form">
        <v-form>
          <div class="form__message">
            We just sent an e-mail to your email address. Please check your
            e-mail and click on the link provided to verify your address.
          </div>
          <v-btn depressed color="primary" @click="sendEmail">
            Resend email
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import utils from "~/mixins/utils";
export default {
  name: "SendVerifyEmail",
  auth: false,
  mixins: [utils],
  data() {
    return {
      email: null,
    };
  },
  created() {
    if (this.$auth.user.is_email_verified) {
      this.$router.push(this.getPageAfterLogin());
    }
  },
  methods: {
    async sendEmail() {
      try {
        await this.$store.dispatch("sendVerifyEmail");
      } catch (e) {
        this.$toast.error(this.$t("verify_email_send_error"));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/auth";
</style>
