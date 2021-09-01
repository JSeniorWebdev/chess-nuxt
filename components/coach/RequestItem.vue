<template>
  <div class="request-item">
    <UserInfo :user="request" />
    <div class="request-item__action">
      <Button
        :label="$t('decline')"
        type="decline"
        size="large"
        position="right"
        width="208px"
        height="40px"
        padding-top="12px"
        @click="declineRequest"
      />
      <Button
        :label="$t('accept')"
        type="cta"
        size="large"
        position="right"
        width="208px"
        height="40px"
        padding-top="12px"
        @click="acceptRequest"
      />
    </div>
  </div>
</template>

<script>
import UserInfo from "~/components/coach/UserInfo";

export default {
  name: "RequestItem",
  components: {
    UserInfo,
  },
  props: {
    request: {
      type: Object,
      required: true,
      default: null,
    },
  },
  mounted() {
    console.log(this.request);
  },
  methods: {
    acceptRequest() {
      this.$store.dispatch(
        "coach/acceptRequest",
        this.request.id ? this.request.id : 1
      );
    },
    declineRequest() {
      this.$store.dispatch("coach/declineRequest", {
        requestId: this.request.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/coach/request-item";
</style>
