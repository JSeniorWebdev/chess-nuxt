<template>
  <div>Email verification in progress..</div>
</template>

<script>
export default {
  name: "VerifyEmail",
  auth: false,
  components: {},
  data() {
    return {
      email: null,
    };
  },
  mounted() {
    this.verifyEmailWithToken(this.$route.query.token);
  },
  methods: {
    async verifyEmailWithToken(token) {
      try {
        await this.$store.dispatch("verifyEmail", token);
        await this.$router.push("/login");
        this.$toast.success(this.$t("verify_email_success"));
      } catch (e) {
        this.$toast.error(this.$t("verify_email_error"));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/auth";
</style>
