<template>
  <div data-app>
    <TestsHeader v-if="isTestsPage" />
    <DefaultHeader v-if="isDefaultPage" />
    <OnboardingHeader v-if="isOnboardingPage" />
    <AuthHeader v-if="isAuthPage" />
    <nuxt />
  </div>
</template>
<script>
import TestsHeader from "~/components/layout/TestsHeader";
import DefaultHeader from "~/components/layout/DefaultHeader";
import OnboardingHeader from "~/components/layout/OnboardingHeader";
import AuthHeader from "~/components/layout/AuthHeader";
export default {
  components: {
    TestsHeader,
    DefaultHeader,
    OnboardingHeader,
    AuthHeader,
  },
  computed: {
    isAuthPage() {
      return (
        this.$route.name === "login" ||
        this.$route.name === "register" ||
        this.$route.name === "forgot-password" ||
        this.$route.name === "verify-email" ||
        this.$route.name === "verify-email-send"
      );
    },
    isOnboardingPage() {
      return (
        this.$route.name === "onboarding" ||
        this.$route.name === "index" ||
        this.$route.name === "check-components"
      );
    },
    isDefaultPage() {
      return (
        this.$route.name &&
        (this.$route.name.includes("profile") ||
          this.$route.name.includes("result") ||
          this.$route.name.includes("coach") ||
          this.$route.name.includes("new-group") ||
          this.$route.name.includes("edit-group") ||
          this.$route.name.includes("user"))
      );
    },
    isTestsPage() {
      return (
        this.$route.name &&
        !this.$route.name.includes("result") &&
        (this.$route.name.includes("tests") ||
          this.$route.name.includes("competitions") ||
          this.$route.name.includes("ranking") ||
          this.$route.name.includes("study"))
      );
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/global.scss";
</style>
