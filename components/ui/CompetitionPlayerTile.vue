<template>
  <div class="main-container">
    <div class="main-container__tile">
      <div class="main-container__tile__left">
        <div class="main-container__tile__col1">
          <div class="main-container__tile__col1__position pb1">
            {{ data.position }}
          </div>
          <img
            class="main-container__tile__col1__img"
            src="~/assets/icons/empty_circle.svg"
          />
        </div>
        <div class="main-container__tile__col2">
          <div class="main-container__tile__col2__name pb2 pl1">
            {{ data.name }}
          </div>
          <img class="pl1" src="~/assets/icons/star-noncolor.svg" />
          <img src="~/assets/icons/star-noncolor.svg" />
          <img src="~/assets/icons/star-noncolor.svg" />
        </div>
      </div>
      <div class="main-container__tile__right">
        <div class="main-container__tile__col3">
          <div class="main-container__tile__col3__time pb3">
            {{ data.time }} {{ $t("min") }}
          </div>
          <div class="main-container__tile__col3__difficulty">
            <img src="~/assets/icons/medium.svg" /> {{ $t("medium") }}
          </div>
        </div>
      </div>
    </div>

    <div class="main-container__play-button">
      <div @click="onClick">
        {{ $t("play") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        id: 1,
        position: 1,
        name: "{{ name }}",
        time: 20,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/player-tile";
</style>
