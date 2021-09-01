export default {
  methods: {
    getPageAfterLogin() {
      let nextPage;
      if (!this.$auth.user.is_email_verified) {
        nextPage = "/verify-email-send";
      } else if (this.$auth.user.username === "") {
        nextPage = "/onboarding";
      } else {
        nextPage = "/profile";
      }
      return nextPage;
    },
    getProgress(count, completedCount) {
      if (count === 0 || count < completedCount) {
        return 100;
      }
      return Math.round((100 / count) * completedCount);
    },
  },
};
