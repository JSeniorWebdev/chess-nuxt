<template>
  <div :class="['main-container', id === 1 ? 'main-container__first' : '']">
    <div class="main-container__left">
      <div>{{ id }}</div>
      <img
        src="~/assets/images/profile_avatar.png"
        class="main-container__left__img"
      />
      <div>{{ data.student.display_name }}</div>
    </div>
    <div class="main-container__right">
      <div>{{ data.total_points }} {{ $t("points") }}</div>
      <div class="view-left-margin view-flex view-vertical-margins">
        <div class="view-icon-spacing">
          {{ data.lives }}
        </div>
        <img class="img-resize" src="~/assets/icons/heart.svg" />
      </div>
      <div class="view-left-margin view-flex bg-green">
        <div class="view-icon-spacing">
          {{ data.time_spend }} {{ $t("min") }}
        </div>
        <img class="img-resize" src="~/assets/icons/timer.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    first: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ranking-tile";
</style>
