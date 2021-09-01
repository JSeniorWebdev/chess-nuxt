<template>
  <div class="short-result">
    <div class="short-result__top">
      <div class="short-result__top__title">
        <img :src="require('~/assets/icons/' + result.icon)" />
        <div>{{ result.title }}</div>
      </div>
      <div class="short-result__top__date">{{ result.date }}</div>
    </div>
    <ShortResultContent :result="result" />
  </div>
</template>

<script>
import ShortResultContent from "~/components/tests/ShortResultContent";

export default {
  name: "ShortResult",
  components: {
    ShortResultContent,
  },
  props: {
    result: {
      type: Object,
      required: true,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/tests/short-result";
</style>
