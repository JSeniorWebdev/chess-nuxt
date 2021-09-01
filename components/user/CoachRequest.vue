<template>
  <div :class="isAccepted || isDeclined ? 'view-hidden' : ''">
    <div class="overview__content">
      <RequestItem :request="request.coach" />
    </div>
  </div>
</template>

<script>
import RequestItem from "~/components/coach/RequestItem";

export default {
  components: {
    RequestItem,
  },
  props: {
    request: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isAccepted: false,
      isDeclined: false,
    };
  },
  methods: {
    acceptCoach() {
      this.isAccepted = true;
      // TODO some api call to add coach to user list - for now, an emit is used to mock functionality
      this.$emit("accept-coach", this.requests[0]);
    },
    declineCoach() {
      this.isDeclined = true;
      // TODO some api call to remove coach from user-coach requests
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/coach/overview";
@import "/assets/scss/components/coach/study-group-tab";
</style>
