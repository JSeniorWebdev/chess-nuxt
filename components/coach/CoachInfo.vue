<template>
  <div
    class="user-info"
    :style="{ backgroundColor: isWhite ? 'white' : '#EEEEEE' }"
    @click="toCoachDetails"
  >
    <div class="user-info__private">
      <img :src="coachPhoto" />
      <div class="user-info__name">{{ coach.display_name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoachInfo",
  props: {
    linkToProfile: {
      type: Boolean,
      default: false,
    },
    coach: {
      type: Object,
      required: true,
      default: null,
    },
    isWhite: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    coachPhoto() {
      return this.coach.avatar
        ? this.coach.avatar
        : require("~/assets/images/profile_avatar.png");
    },
  },
  methods: {
    toCoachDetails() {
      if (this.linkToProfile) {
        this.$router.push(`/coach/details/accept-request/`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/coach/user-info";
</style>
