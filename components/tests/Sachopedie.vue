<template>
  <div class="sachopedie">
    <div class="sachopedie__text">
      <div class="sachopedie__title">{{ sachopedie.title }}</div>
      <div class="sachopedie__subtitle">{{ sachopedie.content }}</div>
      <a href="#" class="sachopedie__link">{{ sachopedie.button }}</a>
    </div>
    <img
      class="sachopedie__image"
      :src="require('~/assets/images/' + sachopedie.image)"
    />
  </div>
</template>

<script>
export default {
  name: "Sachopedie",
  props: {
    sachopedie: {
      type: Object,
      required: true,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/tests/sachopedie";
</style>
