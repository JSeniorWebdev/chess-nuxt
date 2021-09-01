<template>
  <div class="main-container">
    <div class="main-container__divider">
      <div class="main-container__header">{{ $t("my_stats") }}</div>
      <div class="main-container__view-all">{{ $t("view_all") }}</div>
    </div>
    <div class="main-container__info-card">
      <InfoCard class="view-margin-top-16" :is-test="true" />
      <InfoCard :is-learning="true" />
      <InfoCard :is-time="true" />
    </div>
    <div class="main-container__header view-margin-bottom-24">
      {{ $t("lessons") }}
    </div>
    <div class="main-container__lesson-tile">
      <LessonTile />
      <LessonTile />
      <LessonTile />
    </div>
    <div
      class="main-container__divider view-margin-bottom-24 view-margin-top-16"
    >
      <div class="main-container__header">{{ $t("completed_tasks") }}</div>
      <NuxtLink to="/user/completed-tasks" class="main-container__view-all">
        {{ $t("view_all") }}
      </NuxtLink>
    </div>
    <PreviousTask :is-test="true" />
    <PreviousTask :is-test="true" />
    <PreviousTask :is-test="true" />
  </div>
</template>

<script>
import InfoCard from "~/components/stats/InformationCard.vue";
import LessonTile from "~/components/ui/LessonTile.vue";
import PreviousTask from "~/components/ui/PreviousTask.vue";
export default { components: { InfoCard, LessonTile, PreviousTask } };
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/user/overview";
</style>
