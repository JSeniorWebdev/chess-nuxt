<template>
  <img src="~/assets/icons/left-arrow.svg" @click="returnToCoachOverview" />
</template>

<script>
export default {
  methods: {
    returnToCoachOverview() {
      this.$router.push("/coach/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/coach/create-edit-group";
</style>
