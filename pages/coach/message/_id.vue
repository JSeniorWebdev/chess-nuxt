<template>
  <div class="form">
    <div class="form__content">
      <p class="form__content__title">
        {{ $t("message_for") + " " + coach.display_name }}
      </p>
      <p class="form__content__textarea-header">{{ $t("your_message") }}</p>
      <div>
        <textarea
          v-model="text"
          :label="$t('message')"
          rows="6"
          class="textarea"
          :placeholder="$t('message')"
        />
      </div>
      <div class="form__content__button" align-center>
        <v-btn :disabled="!text" class="view-send-button" @click="sendMessage">
          {{ $t("send") }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coach: {},
      text: "",
    };
  },
  mounted() {
    this.coach = this.$store.dispatch("coach/getCoach", this.$route.query.id);
  },
  methods: {
    sendMessage() {
      // this.$store
      //   .dispatch("user/sendCoachMessage", {
      //     id: this.coach.id,
      //     message: this.text,
      //   })
      //   .then((data) => {
      //     console.log(data);
      this.$router.push(`/coach/details/${this.$route.query.id}/`);
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/send-message-form";
@import "~/assets/scss/components/ui/buttons/button";
</style>
