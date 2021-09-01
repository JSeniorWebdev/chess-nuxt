<template>
  <div>
    <div
      :class="[
        'chip',
        groupDetail ? 'chip__group-details' : 'chip__coach-details',
      ]"
    >
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    groupDetail: {
      type: Boolean,
      default: true,
    },
    coachDetail: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/ui/chip";
</style>
