<template>
  <div class="icon-set">
    <img class="icon-spacing" src="~/assets/icons/alarm.svg" />
    <div>{{ Math.round(competition.time_limit / 60) }} {{ $t("min") }}</div>
    <img class="icon-spacing" src="~/assets/icons/heart.svg" />
    <div>{{ competition.lives }} {{ $t("lives") }}</div>
    <img class="icon-spacing" src="~/assets/icons/re-try.svg" />
    <div>{{ competition.attempts }} {{ $t("attempts") }}</div>
  </div>
</template>

<script>
export default {
  props: { competition: { type: Object, required: true } },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/icon-set";
</style>
