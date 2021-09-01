<template>
  <div
    class="user-info"
    :style="{ backgroundColor: isWhite ? 'white' : '#EEEEEE' }"
  >
    <div class="user-info__private">
      <img :src="userPhoto" />
      <div class="user-info__name">{{ user.display_name }}</div>
    </div>
    <div v-if="user.role !== 'coach'" class="user-info__level">
      {{ user.level }}
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  props: {
    user: {
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
    userPhoto() {
      return this.user.avatar
        ? this.user.avatar
        : require("~/assets/images/placeholder.png");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/coach/user-info";
</style>
