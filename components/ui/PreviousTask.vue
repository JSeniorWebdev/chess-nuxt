<template>
  <div class="task-container view-margin-bottom-16">
    <div class="task-container__row">
      <div v-if="isTest" class="task-container__col-start view-width-70">
        <div class="task-container__number">{{ number }}</div>
        <img
          class="view-margin-horizontal view-resize-icon"
          src="~/assets/icons/unfinished.svg"
        />
        <div>{{ $t("more_difficult_profits") }}</div>
      </div>
      <div v-else class="task-container__col-start view-width-70">
        {{ competitionName }}
      </div>
      <div class="task-container__date task-container__col-end view-width-30">
        {{ date }}
      </div>
    </div>
    <div class="task-container__row__center view-margin-vertical">
      <div>
        <img
          class="view-resize-star view-margin-right"
          src="~/assets/icons/star-color.svg"
        />
      </div>
      <div>
        <img
          class="view-resize-star view-margin-right"
          src="~/assets/icons/star-color.svg"
        />
      </div>
      <div>
        <img class="view-resize-star" src="~/assets/icons/star-noncolor.svg" />
      </div>
    </div>
    <div class="task-container__row">
      <div class="task-container__col-start view-width-third">
        <img
          class="view-margin-right view-resize-icon"
          src="~/assets/icons/timer.svg"
        />{{ minutes }} {{ $t("min") }}
      </div>
      <div
        v-if="isTest"
        class="
          task-container__attempt task-container__col__center
          view-width-third
        "
      >
        <img
          class="view-margin-right view-resize-icon"
          src="~/assets/icons/restart.svg"
        />
        <div>{{ attempts }} {{ $t("attempts") }}</div>
      </div>
      <div v-else class="task-container__col__center view-width-third">
        {{ points }} {{ $t("points") }}
      </div>
      <div v-if="isTest" class="task-container__col-end view-width-third">
        <img
          class="view-margin-right view-resize-icon"
          src="~/assets/icons/check-circle.svg"
        />{{ points }} {{ $t("points") }}
      </div>
      <div v-else class="task-container__col-end view-width-third">
        <img
          class="view-margin-right view-resize-icon"
          src="~/assets/icons/heart.svg"
        />{{ lives }} {{ $t("lives") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isTest: {
      type: Boolean,
      default: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      competitionName: "{ Competition Name }",
      date: "17/06/21 12:33",
      number: "05",
      points: "30/40",
      attempts: 2,
      minutes: 8,
      timer: "1:53 min",
      lives: "7/8",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/previous-task-tile";
</style>
